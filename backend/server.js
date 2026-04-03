import express from "express";
import cors from "cors";
import "dotenv/config";
import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import protectedRoutes from "./src/routes/protected.routes.js";
import authMiddleware from "./src/middlewares/auth.js";
import connectdb from "./src/db/db.js";

import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());

connectdb();

app.use("/", authRoutes);
app.use("/users", userRoutes);
app.use("/dashboard", authMiddleware, protectedRoutes);

try {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`NodeJS server running on port ${PORT}`);
  });
} catch (err) {
  console.log(`Error: ${err.message}`);
}
