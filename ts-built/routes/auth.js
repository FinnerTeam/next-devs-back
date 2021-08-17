"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = require("../validators/auth");
var auth_2 = require("../controllers/auth");
var router = express_1.Router();
router.post("/signUp", auth_1.signUpValidator, auth_2.signUpController);
router.post("/login", auth_1.loginValidator, auth_2.loginController);
// router.post("/logout", (res, req, next) => {});
exports.default = router;
//# sourceMappingURL=auth.js.map