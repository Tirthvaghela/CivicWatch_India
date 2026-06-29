const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Report = require("../models/Report");
const registerUser = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.log("FULL ERROR:", error);
    res.status(500).json({ message: "Registration failed" });
  }
};



const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error fetching users",
    });
  }
};

const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id },
      "secretkey",
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.log("FULL ERROR:", error);
    res.status(500).json({ message: "Login failed" });
  }
};

const getTopContributors = async (req, res) => {
  try {
    const users = await User.find()
      .sort({ credibilityScore: -1 })
      .limit(5);

    const contributors = await Promise.all(
      users.map(async (user) => {
        const reportCount = await Report.countDocuments({
          reportedBy: user._id,
        });

        return {
          _id: user._id,
          name: user.name,
          credibilityScore: user.credibilityScore,
          reportCount,
        };
      })
    );

    res.json(contributors);
  } catch (error) {
    console.log("FULL ERROR:", error);
    res.status(500).json({
      message: "Error fetching contributors",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getTopContributors,
  getAllUsers,
};