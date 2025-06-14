const express = require("express");
const router = express.Router();
const {
  createMessage,
  getMessages,
  deleteMessage,
  replyToMessage
} = require("./message.controller");

// Routes
router.post("/", createMessage);             // Create new message
router.get("/", getMessages);                // Get all messages
router.delete("/:id", deleteMessage);        // Delete message by ID
router.put("/reply/:id", replyToMessage);    // ✅ Admin reply with message ID

module.exports = router;
