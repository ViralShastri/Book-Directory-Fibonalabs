const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
    name: String,
    author: String,
    hidden: { type: Boolean, default: false },
    dateCreated: { type: Date, default: Date.now },
});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
