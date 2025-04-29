import Task from "../models/Task.js";

// Get top 3 priority tasks (you can sort by energy or dueDate)
export const getTopTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ dueDate: 1 }).limit(3);
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ dueDate: 1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch all tasks" });
  }
};

export const createTask = async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const saved = await newTask.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: "Error creating task" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: "Error updating task" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: "Error deleting task" });
  }
};
