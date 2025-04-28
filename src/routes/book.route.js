import express from "express";
import {
  addBook,
  deleteBook,
  getBooks,
  getUserBooks,
} from "../controllers/book.controller.js";
import protectRoute from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/add", protectRoute, addBook);
router.get("/", protectRoute, getBooks);
router.delete("/:id", protectRoute, deleteBook);
router.get("/user", protectRoute, getUserBooks);

export default router;
