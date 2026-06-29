//Api endpoints for handling report-related operations

const User = require("../models/User");   

const Report = require("../models/Report");      // Importing the Report model to interact with the reports collection in the MongoDB database
const { validationResult } = require("express-validator");  // Importing the validationResult function from the express-validator library to handle validation of incoming request data for report-related API endpoints. This allows us to check for any validation errors and return appropriate responses to the client if the input data does not meet the specified criteria.


//CREATE A NEW REPORT
const createReport = async (req, res) => {

  console.log("USER ID:", req.user.userId);

  // Validate incoming request data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { issueType, description } = req.body;

    // ✅ SAFE location parsing
    let location = {};
    if (req.body.location) {
      try {
        location = JSON.parse(req.body.location);
      } catch (err) {
        console.log("Location parse error:", err);
      }
    }

    // ✅ SAFE image handling
    const imageUrl = req.file ? req.file.path : "";

    const newReport = new Report({
      issueType,
      imageUrl,
      description,
      location,
      reportedBy: req.user.userId
    });

    const savedReport = await newReport.save();

    await User.findByIdAndUpdate(req.user.userId, {
      $inc: { credibilityScore: 1 }
    });

    console.log("SAVED:", savedReport);

   


    res.status(201).json(savedReport);

  } catch (error) {
    console.log("🔥 FULL ERROR:", error);
    res.status(500).json({
      message: "Error creating report",
      error: error.message   // 👈 ADD THIS
    });
  }
};

//GET ALL REPORTS
const getAllReports = async (req, res) => {
  try {

    const reports = await Report.find()
      .populate("reportedBy", "name email");

    res.status(200).json(reports);

  } catch (error) {
    res.status(500).json({ message: "Error fetching reports" });
  }
};

//GET SINGLE REPORT BY ID
const getSingleReport = async (req, res) => {
  try {

    const report = await Report.findById(req.params.id)
      .populate("reportedBy", "name email");

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json(report);

  } catch (error) {
    res.status(500).json({ message: "Error fetching report" });
  }
};

//UPDATE REPORT STATUS
const updateReportStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updatedReport = await Report.findByIdAndUpdate(     //this function find report, updates its status field with the new value provided in the request body, and returns the updated report document. The { new: true } option ensures that the function returns the updated document rather than the original one before the update.
      req.params.id,
      { status },
      { new: true }      //it means return updated document
    );

    if (!updatedReport) {
      return res.status(404).json({ message: "Report not found" });   //this 404 number represents the HTTP status code for "Not Found". It indicates that the requested resource (in this case, the report with the specified ID) could not be found in the database. By returning this status code along with a message, we inform the client that the report they are trying to update does not exist, allowing them to handle this scenario appropriately on their end.
    }

    res.status(200).json(updatedReport);

  } catch (error) {
    console.log("FULL ERROR:", error);
    console.error(error);
    res.status(500).json({
      message: "Error updating report",
      error: error.message
    });
  }
};

//DELETE A REPORT
const deleteReport = async (req, res) => {
  try {
    const deletedReport = await Report.findByIdAndDelete(req.params.id);

    if (!deletedReport) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json({ message: "Report deleted successfully" });

  } catch (error) {
    console.log("FULL ERROR:", error);
    res.status(500).json({ message: "Error deleting report" });
  }
};

//GET REPORTS CREATED BY LOGGED-IN USER
const getMyReports = async (req, res) => {
  try {

    const reports = await Report.find({
      reportedBy: req.user.userId
    }).populate("reportedBy", "name email");

    res.status(200).json(reports);

  } catch (error) {
    console.log("FULL ERROR:", error);
    res.status(500).json({ message: "Error fetching user reports" });
  }
};





module.exports = {
  createReport,
  getAllReports,
  getSingleReport,
  updateReportStatus,
  deleteReport,
  getMyReports
};