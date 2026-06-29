//Database connection setup using Mongoose with express, loading environment variables from .env file, and defining the connection logic to MongoDB. This module exports a function that can be called to establish the database connection when the server starts.

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;