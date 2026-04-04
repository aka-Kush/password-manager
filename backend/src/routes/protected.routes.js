import express from "express";
const router = express.Router();
import {
  dashboard,
  fetchLogins,
  addLogin,
  deleteLogin,
} from "../controllers/protected.controller.js";

router.get("/", dashboard);
router.get("/logins", fetchLogins);
router.post("/login", addLogin);
router.delete("/delete/:id", deleteLogin);

export default router;
