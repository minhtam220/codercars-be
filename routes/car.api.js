const express = require("express");
const router = express.Router();
const {
  createCar,
  getCars,
  editCar,
  deleteCar,
} = require("../controllers/car.controller.js");

// CREATE
router.post("/", createCar);

// READ
router.get("/", getCars);

// UPDATE
router.put("/:id", editCar);

// // DELETE
router.delete("/:id", deleteCar);

module.exports = router;
