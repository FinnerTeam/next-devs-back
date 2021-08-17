"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileValidator = void 0;
var express_validator_1 = require("express-validator");
var auth_1 = require("./auth");
exports.updateProfileValidator = [
    express_validator_1.body("email", auth_1.emailMsg).optional().trim().normalizeEmail().isEmail(),
    express_validator_1.body("userName", auth_1.usernameMsg)
        .optional()
        .trim()
        .isString()
        .isLength({ min: 2, max: 25 }),
    express_validator_1.body("password", auth_1.passwordMsg)
        .optional()
        .trim()
        .isAlphanumeric()
        .isLength({ min: 8, max: 25 }),
    express_validator_1.body("firstName", auth_1.firstNameMsg)
        .optional()
        .trim()
        .isString()
        .isLength({ min: 2, max: 25 })
        .toUpperCase(),
    express_validator_1.body("lastName", auth_1.lastNameMsg)
        .optional()
        .trim()
        .isString()
        .isLength({ min: 2, max: 16 })
        .toUpperCase(),
    express_validator_1.body("company", auth_1.companyMsg).optional().trim().isString(),
    express_validator_1.body("country", auth_1.countryMsg)
        .optional()
        .trim()
        .isString()
        .custom(function (value) {
        ///body for country from known countries
        return Promise.resolve();
    }),
    express_validator_1.body("city", auth_1.cityMsg)
        .optional()
        .trim()
        .isString()
        .custom(function (value) {
        ///body for city from known cities in the country
        return Promise.resolve();
    }),
    express_validator_1.body("postalCode", auth_1.postalCodeMsg)
        .isNumeric()
        .isLength({ min: 6, max: 8 })
        .optional(),
    express_validator_1.body("aboutMe", auth_1.aboutMe)
        .trim()
        .isString()
        .isLength({ min: 2, max: 250 })
        .optional(),
];
//# sourceMappingURL=user.js.map