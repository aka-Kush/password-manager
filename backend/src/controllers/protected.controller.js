import { decrypt, encrypt } from "../helper/encryption.js";
import LoginCard from "../models/LoginCard.js";

export const dashboard = async (req, res) => {
  try {
    return res.json({ user: req.user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const fetchLogins = async (req, res) => {
  try {
    const loginCards = await LoginCard.find({ user: req.user.id });
    const decryptedCards = loginCards.map((card) => ({
      ...card._doc,
      password: decrypt(card.password),
    }));
    return res.json({ decryptedCards });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const addLogin = async (req, res) => {
  try {
    const { id, username, name, password } = req.body;
    const userId = req.user.id;
    const encryptedPassword = encrypt(password);
    if (id !== null) {
      await LoginCard.findByIdAndUpdate(id, {
        user: userId,
        name,
        username,
        password: encryptedPassword,
      });
      const encUpdatedCard = await LoginCard.findById(id);
      const updatedCard = {
        _id: encUpdatedCard._id,
        user: encUpdatedCard.user,
        name: encUpdatedCard.name,
        username: encUpdatedCard.username,
        password: decrypt(encUpdatedCard.password),
      };
      return res.json(updatedCard);
    } else {
      const login = await LoginCard.create({
        user: userId,
        username,
        name,
        password: encryptedPassword,
      });
      return res.json({ login });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const deleteLogin = async (req, res) => {
  try {
    const id = req.params.id;
    await LoginCard.findByIdAndDelete({ _id: id });
    res.json({ message: "Success" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const editLogin = async (req, res) => {
  try {
    const id = req.params.id;
    const { data } = req.body;
    await LoginCard.findByIdAndUpdate({
      _id: id,
      data,
    });
    res.json({ message: "Success" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
