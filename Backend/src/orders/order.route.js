const express = require('express');
const {
  createAOrder,
  getOrderByEmail,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} = require('./order.controller');

const verifyAdminToken = require('../middleware/verifyAdminToken');

const router = express.Router();

// Public routes
router.post("/", createAOrder);
router.get("/email/:email", getOrderByEmail);

// Admin-protected routes
router.get("/", verifyAdminToken, getAllOrders);
router.patch("/:id", verifyAdminToken, updateOrderStatus);
router.delete("/:id", verifyAdminToken, deleteOrder);

module.exports = router;
