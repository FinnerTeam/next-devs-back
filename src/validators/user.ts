import { body } from "express-validator";
import {
  emailMsg,
  usernameMsg,
  passwordMsg,
  firstNameMsg,
  cityMsg,
  lastNameMsg,
  companyMsg,
  countryMsg,
  postalCodeMsg,
  aboutMe,
} from "./auth";
export const updateProfileValidator = [
  body("email", emailMsg).optional().trim().normalizeEmail().isEmail(),
  body("userName", usernameMsg)
    .optional()
    .trim()
    .isString()
    .isLength({ min: 2, max: 25 }),
  body("password", passwordMsg)
    .optional()
    .trim()
    .isAlphanumeric()
    .isLength({ min: 8, max: 25 }),
  body("firstName", firstNameMsg)
    .optional()
    .trim()
    .isString()
    .isLength({ min: 2, max: 25 })
    .toUpperCase(),
  body("lastName", lastNameMsg)
    .optional()
    .trim()
    .isString()
    .isLength({ min: 2, max: 16 })
    .toUpperCase(),
  body("company", companyMsg).optional().trim().isString(),
  body("country", countryMsg)
    .optional()
    .trim()
    .isString()
    .custom((value) => {
      ///body for country from known countries
      return Promise.resolve();
    }),
  body("city", cityMsg)
    .optional()
    .trim()
    .isString()
    .custom((value) => {
      ///body for city from known cities in the country
      return Promise.resolve();
    }),
  body("postalCode", postalCodeMsg)
    .isNumeric()
    .isLength({ min: 6, max: 8 })
    .optional(),
  body("aboutMe", aboutMe)
    .trim()
    .isString()
    .isLength({ min: 2, max: 250 })
    .optional(),
];
