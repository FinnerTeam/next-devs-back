import { Router } from "express";
import { updateProfileValidator } from "../validators/user";
import {
  updateUserProfileController,
  getUserProfileController,
} from "../controllers/user";
const router = Router();

router.patch("/profile", updateProfileValidator, updateUserProfileController);
router.get("/profile", getUserProfileController);

export default router;
