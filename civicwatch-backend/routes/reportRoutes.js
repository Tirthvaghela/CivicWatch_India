const express = require("express");
const router = express.Router();

const { createReportValidator } = require("../validators/reportValidator");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const {
  createReport,
  getAllReports,
  getSingleReport,
  updateReportStatus,
  deleteReport,
  getMyReports
} = require("../controllers/reportController");

router.post(
  "/reports",
  protect,
  upload.single("image"),
  createReportValidator,
  createReport
);

router.get("/reports", getAllReports);
router.get("/reports/:id", getSingleReport);
router.patch("/reports/:id", protect, updateReportStatus);
router.delete("/reports/:id", protect, deleteReport);
router.get("/my-reports", protect, getMyReports);

module.exports = router;