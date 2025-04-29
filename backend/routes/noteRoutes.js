
import express from "express";
import { createNote, getAllNotes } from "../controllers/noteController.js";

const router = express.Router();

router.post("/notes", createNote);
router.get("/notes", getAllNotes);

export default router;
