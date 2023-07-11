const { sendResponse, AppError } = require("../helpers/utils.js");

const express = require("express");
const router = express.Router();

// CAR
const carAPI = require("./car.api.js");
router.use("/car", carAPI);

module.exports = router;
