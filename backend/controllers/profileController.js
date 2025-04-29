import Profile from "../models/Profile.js";

export const saveProfile = async (req, res) => {
  try {
    const existing = await Profile.findOne();
    if (existing) {
      await Profile.updateOne({}, req.body);
    } else {
      await Profile.create(req.body);
    }
    res.status(200).json({ message: "Profile saved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to save profile", err });
  }
};

export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.status(200).json(profile || {});
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile", err });
  }
};
