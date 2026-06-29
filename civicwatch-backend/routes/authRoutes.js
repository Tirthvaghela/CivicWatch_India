const express = require("express");
const router = express.Router();

const { registerUser, loginUser, getTopContributors, getAllUsers } = require("../controllers/authController");

console.log("TOP FN:", getTopContributors);

router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.get("/users", getAllUsers);
router.get("/top-contributors", getTopContributors);

console.log(getTopContributors);

module.exports = router;