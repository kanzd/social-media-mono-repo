const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });


const connection = 'mongodb://mongo:27017/'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(connection, {
      dbName: "hik8",
    });

    console.log(`✅ MongoDB connected: ${connection}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
