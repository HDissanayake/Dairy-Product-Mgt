import React, { useEffect, useState } from "react";
import axios from "axios";
import getBaseUrl from "../../../utils/baseURL"; // adjust the path as needed

const ViewMessages = () => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${getBaseUrl()}/api/messages`);
      if (Array.isArray(res.data)) {
        setMessages(res.data);
      } else {
        console.error("Expected array but got:", res.data);
        setMessages([]);
      }
    } catch (err) {
      console.error("Failed to fetch messages:", err);
      setMessages([]);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // ✅ Handle Delete
  const handleDeletemsg = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this message?");
    if (!confirm) return;

    try {
      await axios.delete(`${getBaseUrl()}/api/messages/${id}`);
      setMessages(messages.filter((msg) => msg._id !== id));
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4 text-lime-700">Customer Messages</h1>
      {messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="bg-lime-100 text-gray-700 uppercase">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Message</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3 text-center">Action</th> {/* ✅ Action column */}
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{msg.name}</td>
                  <td className="px-6 py-4">{msg.email}</td>
                  <td className="px-6 py-4">{msg.message}</td>
                  <td className="px-6 py-4">{new Date(msg.createdAt).toLocaleString()}</td>
                  <td className="px-6 py-4 text-center">
                                           <button
                          onClick={() => handleDeletemsg(msg._id)}
                          className="font-medium bg-red-500 py-1 px-4 rounded-full text-white">
                          Delete
                        </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewMessages;
