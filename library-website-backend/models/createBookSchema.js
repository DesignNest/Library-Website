const mongoose = require('mongoose');

const CreateBookSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
  bookTitle: {
    required: true,
    type: String,
  },
  bookDescription: {
    required: true,
    type: String,
  },
  bookPrice: {
    required: true,
    type: Number,
  },
  bookCover: {
    required: true,
    type: String,
  },
  bookPdf: {
    required: true,
    type: String,
  },
  bookId: {
    requried:true,
    type:String
  }
});

module.exports = mongoose.model("CreateBook", CreateBookSchema);
