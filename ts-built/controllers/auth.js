"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = exports.signUpController = void 0;
var express_validator_1 = require("express-validator");
var errorHandler_1 = require("../helpers/errorHandler");
var user_1 = require("../models/user");
var signUpController = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, userName, password, firstName, lastName, company, city, country, postalCode, aboutMe, errors, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, userName = _a.userName, password = _a.password, firstName = _a.firstName, lastName = _a.lastName, company = _a.company, city = _a.city, country = _a.country, postalCode = _a.postalCode, aboutMe = _a.aboutMe;
                errors = express_validator_1.validationResult(req);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                if (!errors.isEmpty()) {
                    throw errorHandler_1.errorHandler("Validation failed", 422, errors.array());
                }
                return [4 /*yield*/, user_1.UserDB.create({
                        email: email,
                        userName: userName,
                        password: password,
                        firstName: firstName,
                        lastName: lastName,
                        company: company,
                        city: city,
                        country: country,
                        postalCode: postalCode,
                        aboutMe: aboutMe,
                    })];
            case 2:
                _b.sent();
                return [2 /*return*/, res.status(201).json({
                        message: "User signed up successfully",
                    })];
            case 3:
                err_1 = _b.sent();
                next(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.signUpController = signUpController;
var loginController = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, errors, isUserExists, user, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    throw errorHandler_1.errorHandler("Validation failed", 422, errors.array());
                }
                return [4 /*yield*/, user_1.UserDB.exists({ email: email })];
            case 2:
                isUserExists = _b.sent();
                if (!isUserExists) {
                    throw errorHandler_1.errorHandler("Email user does not exist", 401);
                }
                return [4 /*yield*/, user_1.login(email, password)];
            case 3:
                user = _b.sent();
                res.status(200).json(user);
                return [3 /*break*/, 5];
            case 4:
                err_2 = _b.sent();
                next(err_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.loginController = loginController;
//# sourceMappingURL=auth.js.map