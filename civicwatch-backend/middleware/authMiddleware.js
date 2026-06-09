// Middleware will:

// ✔ verify JWT token
// ✔ protect routes
// ✔ identify logged-in users

// so only logged-in users can: create reports, update reports

const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Bearer TOKEN format is expected in the Authorization header to extract the actual token value from the header. The split(" ")[1] part takes the second element of the array resulting from splitting the string by space, which is the token itself.

    const decoded = jwt.verify(token, "secretkey");

    req.user = decoded; // attach user info to request

    next();

  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { protect };