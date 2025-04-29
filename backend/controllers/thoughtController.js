import Thought from "../models/Thought.js";

export const getThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.status(200).json(thoughts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch thoughts." });
  }
};

export const createThought = async (req, res) => {
  try {
    const newThought = new Thought(req.body);
    await newThought.save();
    res.status(201).json(newThought);
  } catch (error) {
    res.status(400).json({ error: "Failed to create thought." });
  }
};

export const updateThought = async (req, res) => {
  try {
    const updated = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: "Failed to update thought." });
  }
};

export const deleteThought = async (req, res) => {
  try {
    await Thought.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Thought deleted." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete thought." });
  }
};
