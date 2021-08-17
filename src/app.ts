import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import { isAuth } from "./helpers/is-auth";
import morgan from "morgan";
import fs from "fs";
import path from "path";

import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@clear-cluster.2zd4u.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`;
const accessLogStream = fs.createWriteStream(
  path.join(path.resolve(), "access.log"),
  { flags: "a" }
);

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("combined", { stream: accessLogStream }));

app.use("*", isAuth);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("Node server is listening on port " + process.env.PORT);
    });
  })
  .catch((err) => console.log(err));

app.use((error: any, {}, res: express.Response, {}) => {
  const { statusCode, message, validErrors } = error;
  let msg = message;
  console.log(message);
  if (message.includes(":")) {
    msg = message.split(":")[2].split(" ,")[0];
  }
  return res.status(statusCode || 500).json({
    message: msg || "An unknown error occurred",
    validErrors: validErrors || [],
  });
});
