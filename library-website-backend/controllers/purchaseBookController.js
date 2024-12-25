const Book = require('../models/createBookSchema');
const UniPoints = require('../models/uniPointsSchema');
const path = require('path');

module.exports.purchaseBook = async (req, res) => {
  const { username, bookId } = req.body;

  try {

    const book = await Book.findOne({ bookId });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    let user = await UniPoints.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.uniPoints < book.bookPrice) {
      return res.status(400).json({ message: "Insufficient unipoints" });
    }

    const author = await UniPoints.findOne({ username: book.username });
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    user.uniPoints -= book.bookPrice;
    author.uniPoints += book.bookPrice;


    await user.save();
    await author.save();


    const bookPdfPath = path.join(__dirname, '../uploads', path.basename(book.bookPdf));
    res.status(200).download(bookPdfPath);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unexpected Error Occurred" });
  }
};
