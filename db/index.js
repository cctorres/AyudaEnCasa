const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost/aec-backend');
    console.log("Mongodb connected");
  } catch (error) {
    console.error(error);
  }
};

module.exports = { connectDB };