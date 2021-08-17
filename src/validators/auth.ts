import { body } from "express-validator";

const validMsg = "Please enter a valid ";

export const emailMsg = validMsg + "email address";
export const usernameMsg = validMsg + "username, (2-25) characters";
export const firstNameMsg = validMsg + "first name, (2-25) characters";
export const lastNameMsg = validMsg + "last name, (2-25) characters";
export const companyMsg = validMsg + "company name";
export const countryMsg = validMsg + "country";
export const cityMsg = validMsg + "city";
export const postalCodeMsg = validMsg + "postal code (6-8) numbers";
export const aboutMe = validMsg + "about me description 500 max characters";
export const passwordMsg =
  validMsg +
  "password which contains numbers and letters, (8-25) letters and numbers";

export const signUpValidator = [
  body("email", emailMsg).trim().normalizeEmail().isEmail(),
  body("userName", usernameMsg).trim().isString().isLength({ min: 2, max: 25 }),
  body("password", passwordMsg)
    .trim()
    .isAlphanumeric()
    .isLength({ min: 8, max: 25 }),
  body("firstName", firstNameMsg)
    .trim()
    .isString()
    .isLength({ min: 2, max: 25 })
    .toUpperCase(),
  body("lastName", lastNameMsg)
    .trim()
    .isString()
    .isLength({ min: 2, max: 16 })
    .toUpperCase(),
  body("company", companyMsg).trim().isString(),
  body("country", countryMsg)
    .trim()
    .isString()
    .custom((value) => {
      ///body for country from known countries
      return Promise.resolve();
    }),
  body("city", cityMsg)
    .trim()
    .isString()
    .custom((value) => {
      ///body for city from known cities in the country
      return Promise.resolve();
    }),
  body("postalCode", postalCodeMsg).isNumeric().isLength({ min: 6, max: 8 }),
  body("aboutMe", aboutMe).trim().isString().isLength({ min: 2, max: 250 }),
];

export const loginValidator = [
  body("email", emailMsg).trim().normalizeEmail().isEmail(),
  body("password", passwordMsg).trim(),
];
