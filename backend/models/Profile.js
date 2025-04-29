import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  name: String,
  email: String,
  school: String,
  major: String,
});

export default mongoose.model("Profile", ProfileSchema);
