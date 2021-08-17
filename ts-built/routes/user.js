"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_1 = require("../validators/user");
var user_2 = require("../controllers/user");
var router = express_1.Router();
router.patch("/profile", user_1.updateProfileValidator, user_2.updateUserProfileController);
router.get("/profile", user_2.getUserProfileController);
exports.default = router;
//# sourceMappingURL=user.js.map