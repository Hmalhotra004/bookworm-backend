import cloudinary from "../lib/cloudinary.js";
import Book from "../models/Book.js";

export const addBook = async (req, res) => {
  try {
    const { title, caption, rating, image } = req.body;

    if (!title || !caption || !rating || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(image);
    const imageUrl = uploadResponse.secure_url;

    const newBook = new Book({
      title,
      caption,
      rating,
      image: imageUrl,
      user: req.user._id,
    });

    await newBook.save();

    res.status(200).json(newBook);
  } catch (err) {
    console.log("ERROR_ADD_BOOK " + err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getBooks = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const skip = (page - 1) * limit;

    const books = await Book.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "username profileImage");

    const totalBooks = await Book.countDocuments();

    res.send({
      books,
      currentPage: page,
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
    });
  } catch (err) {
    console.log("ERROR_GET_BOOKS " + err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.user.toString() !== req.user._id.toString())
      return res
        .status(401)
        .json({ message: "You are not authorized to delete this book" });

    if (book.image && book.image.includes("cloudinary")) {
      try {
        const publicId = book.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.log("ERROR_DELETE_CLOUDINARY_IMAGE " + err);
        return res.status(500).json({ message: "Internal server error" });
      }
    }

    await book.deleteOne();

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    console.log("ERROR_DELETE_BOOK " + err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserBooks = async (req, res) => {
  try {
    const books = await Book.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(books);
  } catch (err) {
    console.log("ERROR_GET_USER_BOOKS " + err);
    res.status(500).json({ message: "Internal server error" });
  }
};
