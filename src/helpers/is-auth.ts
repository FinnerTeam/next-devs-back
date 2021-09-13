import { res, req, next } from "../types/express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { errorHandler } from "./errorHandler";
import { redisClient } from "../app";

type token = string | undefined;
interface userId extends req {
  userId?: mongoose.Types.ObjectId;
  pathname: string;
}

const ignored_routes = ["/auth/login", "/auth/signUp", "/auth/logout"];

export const isAuth = (req: userId, res: res, next: next) => {
  if (ignored_routes.includes(req.originalUrl)) {
    return next();
  }
  if (!process.env.JWT_SECRET_KEY || !req.get("Auth")) {
    throw errorHandler("Unauthorized", 401);
  }
  const token: token = req.get("Auth")?.split("  ")[1];
  if (!token) {
    throw errorHandler("User token is missing", 401);
  }
  if (redisClient.get(token)) {
    throw errorHandler("Unauthorized", 401);
  }
  const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!decodedToken || !decodedToken.userId) {
    throw errorHandler("Not authenticated", 401);
  }
  req.userId = mongoose.Types.ObjectId(decodedToken.userId);
  next();
};
