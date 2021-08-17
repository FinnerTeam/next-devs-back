"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = exports.signUpValidator = exports.passwordMsg = exports.aboutMe = exports.postalCodeMsg = exports.cityMsg = exports.countryMsg = exports.companyMsg = exports.lastNameMsg = exports.firstNameMsg = exports.usernameMsg = exports.emailMsg = void 0;
var express_validator_1 = require("express-validator");
var validMsg = "Please enter a valid ";
exports.emailMsg = validMsg + "email address";
exports.usernameMsg = validMsg + "username, (2-25) characters";
exports.firstNameMsg = validMsg + "first name, (2-25) characters";
exports.lastNameMsg = validMsg + "last name, (2-25) characters";
exports.companyMsg = validMsg + "company name";
exports.countryMsg = validMsg + "country";
exports.cityMsg = validMsg + "city";
exports.postalCodeMsg = validMsg + "postal code (6-8) numbers";
exports.aboutMe = validMsg + "about me description 500 max characters";
exports.passwordMsg = validMsg +
    "password which contains numbers and letters, (8-25) letters and numbers";
exports.signUpValidator = [
    express_validator_1.body("email", exports.emailMsg).trim().normalizeEmail().isEmail(),
    express_validator_1.body("userName", exports.usernameMsg).trim().isString().isLength({ min: 2, max: 25 }),
    express_validator_1.body("password", exports.passwordMsg)
        .trim()
        .isAlphanumeric()
        .isLength({ min: 8, max: 25 }),
    express_validator_1.body("firstName", exports.firstNameMsg)
        .trim()
        .isString()
        .isLength({ min: 2, max: 25 })
        .toUpperCase(),
    express_validator_1.body("lastName", exports.lastNameMsg)
        .trim()
        .isString()
        .isLength({ min: 2, max: 16 })
        .toUpperCase(),
    express_validator_1.body("company", exports.companyMsg).trim().isString(),
    express_validator_1.body("country", exports.countryMsg)
        .trim()
        .isString()
        .custom(function (value) {
        ///body for country from known countries
        return Promise.resolve();
    }),
    express_validator_1.body("city", exports.cityMsg)
        .trim()
        .isString()
        .custom(function (value) {
        ///body for city from known cities in the country
        return Promise.resolve();
    }),
    express_validator_1.body("postalCode", exports.postalCodeMsg).isNumeric().isLength({ min: 6, max: 8 }),
    express_validator_1.body("aboutMe", exports.aboutMe).trim().isString().isLength({ min: 2, max: 250 }),
];
exports.loginValidator = [
    express_validator_1.body("email", exports.emailMsg).trim().normalizeEmail().isEmail(),
    express_validator_1.body("password", exports.passwordMsg).trim(),
];
//# sourceMappingURL=auth.js.map