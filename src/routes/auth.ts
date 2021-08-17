import { Router } from "express";
import { signUpValidator, loginValidator } from "../validators/auth";
import { signUpController, loginController } from "../controllers/auth";
const router = Router();

router.post("/signUp", signUpValidator, signUpController);

router.post("/login", loginValidator, loginController);

// router.post("/logout", (res, req, next) => {});

export default router;
