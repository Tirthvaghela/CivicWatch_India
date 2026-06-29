const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");

const reportRoutes = require("./routes/reportRoutes");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", reportRoutes);
app.use("/api", authRoutes);

// Connect DB
connectDB();

// Test Route
app.get("/", (req, res) => {
  res.send("CivicWatch India API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

console.log("ENV CHECK:", process.env.CLOUDINARY_KEY);