import express from "express";
const router = express.Router();
import {
  fetchUsers,
  fetchUserByEmail,
} from "../controllers/user.controller.js";

router.get("/", fetchUsers);
router.get("/:email", fetchUserByEmail);

export default router;
