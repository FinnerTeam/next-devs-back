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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDB = exports.updateProfile = exports.login = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var errorHandler_1 = require("../helpers/errorHandler");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var userSchema = new mongoose_1.default.Schema({
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
}, { timestamps: true });
userSchema.plugin(mongoose_unique_validator_1.default, {
    message: "{PATH} is already exists. ",
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function () {
        var salt, hashedPassword;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bcrypt_1.default.genSalt()];
                case 1:
                    salt = _a.sent();
                    return [4 /*yield*/, bcrypt_1.default.hash(this.password, salt)];
                case 2:
                    hashedPassword = _a.sent();
                    this.password = hashedPassword;
                    return [2 /*return*/, next()];
            }
        });
    });
});
var login = function (email, password) {
    return __awaiter(this, void 0, void 0, function () {
        var user, userName, firstName, lastName, company, city, country, postalCode, aboutMe, isPasswordValid, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.UserDB.findOne({ email: email })];
                case 1:
                    user = _a.sent();
                    userName = user.userName, firstName = user.firstName, lastName = user.lastName, company = user.company, city = user.city, country = user.country, postalCode = user.postalCode, aboutMe = user.aboutMe;
                    return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
                case 2:
                    isPasswordValid = _a.sent();
                    if (!isPasswordValid) {
                        throw errorHandler_1.errorHandler("Wrong password!", 401);
                    }
                    if (process.env.JWT_SECRET_KEY) {
                        token = jsonwebtoken_1.default.sign({ email: user.email, userId: user._id.toString() }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
                        return [2 /*return*/, {
                                token: token,
                                userName: userName,
                                firstName: firstName,
                                lastName: lastName,
                                company: company,
                                city: city,
                                country: country,
                                postalCode: postalCode,
                                aboutMe: aboutMe,
                            }];
                    }
                    else {
                        throw errorHandler_1.errorHandler("An unknown error occurred", 500);
                    }
                    return [2 /*return*/];
            }
        });
    });
};
exports.login = login;
var updateProfile = function (fieldsToUpdate, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var user, salt, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, exports.UserDB.findOne({
                    _id: userId,
                })];
            case 1:
                user = _b.sent();
                if (user._id.toString() !== userId.toString()) {
                    throw errorHandler_1.errorHandler("You are not allowed to edit this user", 401);
                }
                if (!fieldsToUpdate.password) return [3 /*break*/, 4];
                return [4 /*yield*/, bcrypt_1.default.genSalt()];
            case 2:
                salt = _b.sent();
                _a = fieldsToUpdate;
                return [4 /*yield*/, bcrypt_1.default.hash(fieldsToUpdate.password, salt)];
            case 3:
                _a.password = _b.sent();
                _b.label = 4;
            case 4: return [4 /*yield*/, exports.UserDB.findOneAndUpdate({ _id: user._id }, {
                    $set: fieldsToUpdate,
                }, { new: true }).select({ password: 0, _id: 0, createdAt: 0, updatedAt: 0 })];
            case 5: return [2 /*return*/, _b.sent()];
        }
    });
}); };
exports.updateProfile = updateProfile;
exports.UserDB = mongoose_1.default.model("User", userSchema);
//# sourceMappingURL=user.js.map