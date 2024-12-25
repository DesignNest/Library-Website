const fs = require('fs');
const path = require('path');
const Book = require('../models/createBookSchema');
const { v4: uuidv4 } = require('uuid');

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

module.exports.createBook = async (req, res) => {
  try {
    const { bookTitle, bookDescription, bookPrice, bookCover, bookPdf, username } = req.body;

    // Save cover image
    const coverBase64Data = bookCover.replace(/^data:image\/\w+;base64,/, '');
    const coverBuffer = Buffer.from(coverBase64Data, 'base64');
    const coverPath = path.join(uploadDir, `${Date.now()}_cover.jpg`);
    fs.writeFileSync(coverPath, coverBuffer);

    // Save PDF file
    const pdfBase64Data = bookPdf.replace(/^data:application\/pdf;base64,/, '');
    const pdfBuffer = Buffer.from(pdfBase64Data, 'base64');
    const pdfPath = path.join(uploadDir, `${Date.now()}_book.pdf`);
    fs.writeFileSync(pdfPath, pdfBuffer);

    const bookId = uuidv4();

    const newBook = new Book({
      bookId,
      bookTitle,
      bookDescription,
      bookPrice,
      bookCover: coverPath,
      bookPdf: pdfPath,
      username,
    });

    await newBook.save();
    res.status(201).json({ message: "Book created successfully", bookId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unexpected Error Occurred" });
  }
};


module.exports.showBook = async (req, res) => {
  try {
    const books = await Book.find({}, 'bookId bookTitle bookCover bookPrice bookPdf');
    const updatedBooks = books.map(book => ({
      ...book._doc,
      bookCover: `http://localhost:5000/uploads/${path.basename(book.bookCover)}`
    }));
    res.status(200).json(updatedBooks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch books" });
  }
};

module.exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findOne({ bookId: id });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const updatedBook = {
      ...book._doc,
      bookCover: `http://localhost:5000/uploads/${path.basename(book.bookCover)}`,
      bookPdf: `http://localhost:5000/uploads/${path.basename(book.bookPdf)}`
    };

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch book" });
  }
};
