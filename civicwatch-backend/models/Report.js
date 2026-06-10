//Report model definition using Mongoose, representing the structure of a report document in the MongoDB database

const mongoose = require("mongoose");   // Importing Mongoose library to define the schema and model for reports

const reportSchema = new mongoose.Schema(    // Defining the schema for a report, which includes fields for issue type, image URL, description, location, status, reporter, and credibility score
  {
    issueType: {
      type: String,
      enum: ["spitting", "garbage", "animal_feeding"],        //enum to restrict the issueType to specific values
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      trim: true,
    },

    location: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
      
      
    },

    status: {
      type: String,
      enum: ["PENDING", "IN_PROGRESS", "RESOLVED"],
      default: "PENDING",
    },

    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,  // Storing the reference to the User who reported the issue, allowing us to link reports to specific users
      ref: "User",          // Referencing the User model to establish a relationship between reports and users
      default: null,
    },

    credibilityScore: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }           // Adding timestamps to automatically track when each report is created and last updated
);

module.exports = mongoose.model("Report", reportSchema);  // Exporting the Report model based on the defined schema, allowing it to be used in other parts of the application for creating, reading, updating, and deleting reports