import { validationResult } from "express-validator";
import { errorHandler } from "../helpers/errorHandler";
import { res, next, updateProfileBody } from "../types/express";
import { updateProfile, UserDB } from "../models/user";

export const updateUserProfileController = async (
  req: updateProfileBody,
  res: res,
  next: next
) => {
  const fieldsToUpdate = req.body;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      throw errorHandler("Validation failed", 422, errors.array());
    }
    const updatedUserProfile = await updateProfile(fieldsToUpdate, req.userId);
    res.status(201).json(updatedUserProfile);
  } catch (err) {
    next(err);
  }
};
export const getUserProfileController = async (
  req: updateProfileBody,
  res: res,
  next: next
) => {
  try {
    const user = await UserDB.findOne({ _id: req.userId }).select({
      password: 0,
      _id: 0,
      createdAt: 0,
      updatedAt: 0,
    });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
