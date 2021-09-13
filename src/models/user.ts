import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcrypt";
import { IUser } from "../types/models";
import { updateProfileBody } from "../types/express";
import { errorHandler } from "../helpers/errorHandler";

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    company: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: true },
    aboutMe: { type: String },
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator, {
  message: "{PATH} is already exists. ",
});

userSchema.pre(
  "save",
  async function (this: IUser, next: mongoose.HookNextFunction) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    return next();
  }
);

// export const login = async function (password: string, userData: any) {
//   const {
//     userName,
//     firstName,
//     lastName,
//     company,
//     city,
//     country,
//     postalCode,
//     aboutMe,
//     email,
//     _id,
//   } = userData;
//   const isPasswordValid = await bcrypt.compare(password, userData.password);
//   if (!isPasswordValid) {
//     throw errorHandler("Email or password are incorrect", 401);
//   }
//   if (process.env.JWT_SECRET_KEY) {
//     const accessToken = tokenGenerator(email, _id, "ACCESS");
//     const refreshToken = tokenGenerator(email, _id, "REFRESH");
//     return {
//       accessToken,
//       refreshToken,
//       userName,
//       firstName,
//       lastName,
//       company,
//       city,
//       country,
//       postalCode,
//       aboutMe,
//     };
//   } else {
//     throw errorHandler("An unknown error occurred", 500);
//   }
// };

export const updateProfile = async (
  fieldsToUpdate: updateProfileBody,
  userId: string
) => {
  const user = await UserDB.findOne({
    _id: userId,
  });
  if (user._id.toString() !== userId.toString()) {
    throw errorHandler("You are not allowed to edit this user", 401);
  }
  if (fieldsToUpdate.password) {
    const salt = await bcrypt.genSalt();
    fieldsToUpdate.password = await bcrypt.hash(fieldsToUpdate.password, salt);
  }
  return await UserDB.findOneAndUpdate(
    { _id: user._id },
    {
      $set: fieldsToUpdate,
    },
    { new: true }
  ).select({ password: 0, _id: 0, createdAt: 0, updatedAt: 0 });
};

export const UserDB = mongoose.model<IUser>("User", userSchema);
