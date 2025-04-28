import cors from "cors";
import "dotenv/config";
import express from "express";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import bookRoutes from "./routes/book.route.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
