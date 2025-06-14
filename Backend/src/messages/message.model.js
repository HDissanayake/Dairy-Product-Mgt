const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    reply: {
  type: String,
  default: "",
},
 // ✅ Added field for admin reply
  },
  {
    timestamps: true, // createdAt and updatedAt
  }
);

module.exports = mongoose.model("Message", messageSchema);
