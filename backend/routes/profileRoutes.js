import express from "express";
import { getProfile, saveProfile } from "../controllers/profileController.js";

const router = express.Router();

router.get("/profile", getProfile);
router.post("/profile", saveProfile);

export default router;
