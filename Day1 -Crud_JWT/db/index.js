const mongoose = require("mongoose");

const MONGO_DB_URL = 
"mongodb+srv://user:1234@cluster0.vxtugmx.mongodb.net/?retryWrites=true&w=majority";
const connectToDB = async () => {
    mongoose.connect(MONGO_DB_URL, (err) => {
        console.log("Connected To Our MongoDB Database");
    });
};

module.exports = connectToDB;