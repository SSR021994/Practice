const express = require("express");
const app = express();
const PORT = 3000;
const BooksRoute = require('./routes/books.routes');
const DBConfig = require("./db");

DBConfig();

app.use(express.json());

app.use('/book', BooksRoute)


app.listen(PORT, console.log("Server running on port", PORT));