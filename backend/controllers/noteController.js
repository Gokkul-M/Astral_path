
import Note from "../models/Note.js";

export const createNote = async (req, res) => {
  try {
    const { content, createdAt } = req.body;
    const note = await Note.create({ content, createdAt });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: "Failed to create note", error });
  }
};

// Get all notes
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notes", error });
  }
};
