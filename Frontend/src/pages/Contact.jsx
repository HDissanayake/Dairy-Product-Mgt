import React, { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import axios from "axios";
import getBaseUrl from "../utils/baseURL";

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.name && formData.email && formData.message) {
      try {
        await axios.post(`${getBaseUrl()}/api/messages`, formData);
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
        setStatus("success");
      } catch (error) {
        console.error("Error sending message:", error);
        alert("Failed to send message. Please try again.");
        setStatus("error");
      }
    } else {
      alert("Please fill in all fields.");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div
        className="relative h-64 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "url('https://source.unsplash.com/1600x900/?farm,dairy')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            Contact <span className="text-lime-400">Us</span>
          </h1>
          <p className="text-gray-300 mt-2 text-sm md:text-base">
            We’re here to help you with all your dairy management needs.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-lime-700 mb-4">Get in Touch</h2>
            <p className="text-gray-600 mb-6">
              Have questions? Reach out to us for any inquiries or support related to DairyPro.
            </p>
            <div className="space-y-4">
              <div className="flex items-center text-gray-700">
                <FaMapMarkerAlt className="text-lime-600 text-2xl mr-3" />
                <p>📍 Elahara Road, Naula, Srilanka</p>
              </div>
              <div className="flex items-center text-gray-700">
                <FaPhone className="text-lime-600 text-2xl mr-3" />
                <p>📞 +94 742760850</p>
              </div>
              <div className="flex items-center text-gray-700">
                <FaEnvelope className="text-lime-600 text-2xl mr-3" />
                <p>📧 support@dairypro.com</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-lime-700 mb-4">Send a Message</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded mb-4 focus:ring-lime-500 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded mb-4 focus:ring-lime-500 focus:outline-none"
              />
              <textarea
                rows="4"
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded mb-4 focus:ring-lime-500 focus:outline-none"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-lime-600 text-white py-3 rounded hover:bg-lime-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Follow Us</h3>
          <div className="flex justify-center space-x-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-3xl hover:text-blue-800">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 text-3xl hover:text-blue-600">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 text-3xl hover:text-pink-700">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Google Maps */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">Find Us on Google Maps</h3>
          <iframe
            width="1000"
            height="400"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=Elahara%20Road,Naula%20dairy%20farm,Srilanka+(Naula%20Dairy%20farm)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
