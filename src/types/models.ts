import mongoose from "mongoose";
export interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  company: string;
  city: string;
  country: string;
  postalCode: number;
  aboutMe: string;
  _id?: mongoose.Types.ObjectId;
}
