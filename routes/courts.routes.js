const express = require("express");
const router = express.Router();
const courtsController = require("../controllers/courts.controller");

router.get("/", courtsController.getCourts);

module.exports = router;