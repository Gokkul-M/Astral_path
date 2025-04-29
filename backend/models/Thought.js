import mongoose from "mongoose";

const thoughtSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    type: {
      type: String,
      enum: ["task", "note", "file"],
      default: "note",
    },
    x: { type: Number, default: 100 },
    y: { type: Number, default: 100 },
    color: { type: String, default: "#f0f0f0" },
    connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Thought" }],
  },
  { timestamps: true }
);

const Thought = mongoose.model("Thought", thoughtSchema);
export default Thought;
