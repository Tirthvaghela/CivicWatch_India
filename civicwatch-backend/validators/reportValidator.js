const { body } = require("express-validator");

const createReportValidator = [

  body("issueType")
    .exists({ checkFalsy: true })
    .withMessage("Issue type is required")
    .isIn(["spitting", "garbage", "animal_feeding"])
    .withMessage("Invalid issue type"),

  body("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),

  body("location")
    .exists({ checkFalsy: true })
    .withMessage("Location is required")

];

module.exports = { createReportValidator };