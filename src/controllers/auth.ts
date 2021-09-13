import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { validationResult } from "express-validator";
import { errorHandler } from "../helpers/errorHandler";
import {
  res,
  next,
  signUpBody,
  loginBody,
  refreshTokenBody,
  tokens,
} from "../types/express";
import { UserDB } from "../models/user";
import { accessTokenGenerator, refreshTokenGenerator } from "../helpers/tokens";
import { redisClient } from "../app";

const HOUR_IN_SECONDS = 60 * 60;
const YEAR_IN_SECONDS = HOUR_IN_SECONDS * 24 * 365;

export const signUpController = async (
  req: signUpBody,
  res: res,
  next: next
) => {
  const {
    email,
    userName,
    password,
    firstName,
    lastName,
    company,
    city,
    country,
    postalCode,
    aboutMe,
  } = req.body;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      throw errorHandler("Validation failed", 422, errors.array());
    }
    await UserDB.create({
      email,
      userName,
      password,
      firstName,
      lastName,
      company,
      city,
      country,
      postalCode,
      aboutMe,
    });
    return res.status(201).json({
      message: "User signed up successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const loginController = async (req: loginBody, res: res, next: next) => {
  const { email, password } = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw errorHandler("Validation failed", 422, errors.array());
    }
    const user = await UserDB.findOne({ email });

    if (!user) {
      throw errorHandler("Email or password are incorrect", 401);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw errorHandler("Email or password are incorrect", 401);
    }
    if (process.env.JWT_SECRET_KEY) {
      const accessToken = accessTokenGenerator(user.email, user._id);
      const tokenId = email + uuidv4();
      const refreshToken = refreshTokenGenerator(user.email, user._id, tokenId);
      redisClient.setex(tokenId, YEAR_IN_SECONDS, JSON.stringify(refreshToken));
      const userData = {
        accessToken,
        refreshToken,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        company: user.company,
        city: user.city,
        country: user.country,
        postalCode: user.postalCode,
        aboutMe: user.aboutMe,
      };
      res.status(200).json(userData);
    } else {
      throw errorHandler("An unknown error occurred", 500);
    }
  } catch (err) {
    next(err);
  }
};

export const logOutController = (req: tokens, res: res, next: next) => {
  const { refreshToken, accessToken } = req.body;
  try {
    const decodedToken: any = jwt.verify(
      refreshToken,
      process.env.JWT_SECRET_KEY
    );
    if (!decodedToken || !decodedToken.userId) {
      throw errorHandler("Not authenticated", 401);
    }
    redisClient.del(decodedToken.tokenId);
    redisClient.setex(accessToken, HOUR_IN_SECONDS, "");
    res.status(200);
  } catch (err) {
    next(err);
  }
};

export const getNewTokensController = (
  req: refreshTokenBody,
  res: res,
  next: next
) => {
  const { refreshToken } = req.body;
  try {
    const decodedToken: any = jwt.verify(
      refreshToken,
      process.env.JWT_SECRET_KEY
    );
    if (!decodedToken || !decodedToken.userId) {
      throw errorHandler("Not authenticated", 401);
    }
    redisClient.del(decodedToken.tokenId);
    const accessToken = accessTokenGenerator(
      decodedToken.email,
      decodedToken._id
    );
    const tokenId = decodedToken.email + uuidv4();
    const newRefreshToken = refreshTokenGenerator(
      decodedToken.email,
      decodedToken._id,
      tokenId
    );
    redisClient.setex(tokenId, YEAR_IN_SECONDS, JSON.stringify(refreshToken));
    res.status(200).json({ accessToken, refreshToken: newRefreshToken });
  } catch (err) {
    next(err);
  }
};
