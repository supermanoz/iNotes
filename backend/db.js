const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/testDB";
const connectToMongo = async () => {
  mongoose.connect(mongoURI, () => {
    console.log("Connected Successfully!");
  });
};

module.exports = connectToMongo;

//password:eYO9zvTQBSJiJT5k
//testpassword
//mongodb+srv://Manoj:testpassword@cluster0.buvvzye.mongodb.net/test
