const express = require("express");
const router = express.Router();
const {
  createDestination,
  getAllDestinations,
  getDestinationById,
  deleteDestination,
} = require("../controller/destinations.controller");

// post new destination
router.post("/", createDestination);
router.get("/", getAllDestinations);
router.get("/:id", getDestinationById);
router.delete("/:id", deleteDestination);

module.exports = router;
