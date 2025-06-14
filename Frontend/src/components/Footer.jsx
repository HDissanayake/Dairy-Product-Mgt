import React from "react";
import { Link } from "react-router-dom";
import footerLogo from "../assets/logo.png";
import { FaFacebook, FaTwitter, FaInstagramSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & About */}
          <div>
            <div className="flex items-center">
              <img 
                src={footerLogo} 
                alt="DairyPro Logo" 
                className="h-12 mr-3"
              />
              <h2 className="text-2xl font-bold">DairyPro</h2>
            </div>
            <p className="mt-4 text-gray-400">
              Your trusted partner for dairy product management.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/" className="hover:text-lime-400">Home</Link></li>
            
              <li><Link to="/about" className="hover:text-lime-400">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-lime-400">Contact Us</Link></li>  {/* ✅ Updated Link */}
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <p className="mt-4 text-gray-400">📍 123 Dairy Street, Naula, Sri Lanka</p>
            <p className="mt-2 text-gray-400">📞 +94 77 123 4567</p>
            <p className="mt-2 text-gray-400">📧 support@dairypro.com</p>
          </div>
          
          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex mt-4 space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <FaFacebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
              <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">
              <FaInstagramSquare />
              </a>
            </div>
          </div>
        
        </div>
        
        {/* Copyright Section */}
        <div className="mt-8 text-center border-t border-gray-700 pt-4">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} DairyPro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
