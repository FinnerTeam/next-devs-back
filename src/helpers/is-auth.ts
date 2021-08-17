import { res, req, next } from "../types/express";
import jwt from "jsonwebtoken";
import { errorHandler } from "./errorHandler";
import mongoose from "mongoose";

type token = string | undefined;
interface userId extends req {
  userId?: mongoose.Types.ObjectId;
}

const ignored_routes = ["/auth/login", "/auth/signUp"];

export const isAuth = (req: userId, res: res, next: next) => {
  if (ignored_routes.includes(req.baseUrl)) {
    return next();
  }
  console.log(req.headers);
  if (!process.env.JWT_SECRET_KEY || !req.get("Auth")) {
    console.log(req.get("Auth"));
    throw errorHandler("Not authorized", 401);
  }
  const token: token = req.get("Auth")?.split("  ")[1];
  if (!token) {
    throw errorHandler("User token is missing", 401);
  }
  const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!decodedToken || !decodedToken.userId) {
    throw errorHandler("Not authenticated", 401);
  }
  req.userId = mongoose.Types.ObjectId(decodedToken.userId);
  next();
};
