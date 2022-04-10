const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://admin:<password>@cluster0.u67nh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
    console.log("Mongodb connected");
  } catch (error) {
    console.error(error);
  }
};


module.exports = { connectDB };