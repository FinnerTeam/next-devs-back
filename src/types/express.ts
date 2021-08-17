import { Response, Request, NextFunction } from "express";
export type res = Response;
export type req = Request;
export type next = NextFunction;

//Body requests
export interface signUpBody extends Request {
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
}
export interface updateProfileBody extends Request {
  userName?: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  city?: string;
  country?: string;
  postalCode?: number;
  aboutMe?: string;
  userId?: string;
}
export interface loginBody extends Request {
  email: string;
  password: string;
}
