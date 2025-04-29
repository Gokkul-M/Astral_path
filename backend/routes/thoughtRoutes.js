import express from "express";
import {
  getThoughts,
  createThought,
  updateThought,
  deleteThought,
} from "../controllers/thoughtController.js";

const router = express.Router();

router.get("/", getThoughts);
router.post("/", createThought);
router.put("/:id", updateThought);
router.delete("/:id", deleteThought);

export default router;
