import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    subject: { type: String, required: true },
    dueDate: { type: Date, required: true },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    energy: { type: Number, min: 1, max: 5, required: true },
    timeRequired: { type: Number, required: true },
    completed: { type: Boolean, default: false },
    tags: [String],
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
