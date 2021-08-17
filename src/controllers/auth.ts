import { validationResult } from "express-validator";
import { errorHandler } from "../helpers/errorHandler";
import { res, next, signUpBody, loginBody } from "../types/express";
import { UserDB, login } from "../models/user";
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
    const isUserExists = await UserDB.exists({ email });
    if (!isUserExists) {
      throw errorHandler("Email user does not exist", 401);
    }
    const user = await login(email, password);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
