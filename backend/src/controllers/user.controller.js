import User from "../models/User.js";

export const fetchUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(201).json({ users });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const fetchUserByEmail = async (req, res) => {
  const email = req.params.email;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.json({ user });
    }
    return res.json({ message: "User does not exist!" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
