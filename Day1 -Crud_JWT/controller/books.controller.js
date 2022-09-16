const BooksModel = require("../model/books.model");

// export and create function
//post
exports.createBook = async function (req, res) {
    if (!req.body.book_name && !req.body.book_author) {
        res.send({
            message: 'This filed is mandatory',
        });
    }

    const NewBook = new BooksModel(req.body);
    try {
        await NewBook.save();
        res.send({
            message: "Books Detail Saved Successfully",
            book_description : NewBook
        })
    } catch (error) {
        res.send({
            message: error.message
        });
    }
};

// Update

exports.updateBook = async function(req, res){
    try{
        await BooksModel.findByIdAndUpdate(req.params.id, req.body)
        res.send("Data Updated!");
    } catch (error){
        res.send(error.message);
    }
};

// get 

exports.getBook = async function (req, res){
    const book = await BooksModel.find({});

    try{
        res.send(book);
    } catch (error) {
        res.send(error);
    }
};