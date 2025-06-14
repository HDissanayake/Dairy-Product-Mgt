const express = require("express");
const { generateOrderReport } = require("./report.controller");
const router = express.Router();

router.get("/orders", generateOrderReport); // GET /api/reports/orders

module.exports = router;
