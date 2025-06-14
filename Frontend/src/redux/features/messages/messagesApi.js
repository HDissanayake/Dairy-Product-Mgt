// src/services/messagesApi.js
import axios from "axios";

const API_URL = "/api/messages";

// Send new message
export const sendMessage = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Message sending failed.";
  }
};

// Get all messages (for admin)
export const getMessages = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Fetching messages failed.";
  }
};
