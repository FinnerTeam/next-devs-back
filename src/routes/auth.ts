import { Router } from "express";
import {
  signUpValidator,
  loginValidator,
  refreshTokenValidator,
  logOutValidator,
} from "../validators/auth";
import {
  signUpController,
  loginController,
  logOutController,
  getNewTokensController,
} from "../controllers/auth";
const router = Router();

router.post("/signUp", signUpValidator, signUpController);

router.post("/login", loginValidator, loginController);

router.post("/logout", logOutValidator, logOutController);

router.post("/token", refreshTokenValidator, getNewTokensController);

export default router;
