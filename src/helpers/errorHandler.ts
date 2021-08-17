import { ValidationError } from "express-validator";

interface error extends Error {
  statusCode: number;
  validErrors: ValidationError[];
}
export const errorHandler = (
  message = "An unknown error occurred",
  status = 500,
  validErrors = [] as ValidationError[]
) => {
  const error = new Error(message) as error;
  error.statusCode = status;
  if (validErrors.length > 0) {
    const validMassages = validErrors.map((err) => err.msg);
    error.validErrors = validMassages;
  }
  return error;
};
