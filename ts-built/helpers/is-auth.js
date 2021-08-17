"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var errorHandler_1 = require("./errorHandler");
var mongoose_1 = __importDefault(require("mongoose"));
var ignored_routes = ["/auth/login", "/auth/signUp"];
var isAuth = function (req, res, next) {
    var _a;
    if (ignored_routes.includes(req.baseUrl)) {
        return next();
    }
    console.log(req.headers);
    if (!process.env.JWT_SECRET_KEY || !req.get("Auth")) {
        console.log(req.get("Auth"));
        throw errorHandler_1.errorHandler("Not authorized", 401);
    }
    var token = (_a = req.get("Auth")) === null || _a === void 0 ? void 0 : _a.split("  ")[1];
    if (!token) {
        throw errorHandler_1.errorHandler("User token is missing", 401);
    }
    var decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
    if (!decodedToken || !decodedToken.userId) {
        throw errorHandler_1.errorHandler("Not authenticated", 401);
    }
    req.userId = mongoose_1.default.Types.ObjectId(decodedToken.userId);
    next();
};
exports.isAuth = isAuth;
//# sourceMappingURL=is-auth.js.map