const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema({
    book_name : {
        type: String,
        requires : true
    },
    author_name : {
        type : String,
        requires: true,
        validate(value){
            if (value > 2) throw new Error("More then two authors should not be specified");
        },
    },
    book_rating : {
        type : Number,
        min : 1,
        max : 10
    },
    book_review : String,
});

const Book = mongoose.model("Book", booksSchema);

module.exports = Book;

