import React from "react";
import { Link } from "react-router-dom";
import bannerImg from "../../assets/dairymilk.png";
import { FaCheckCircle, FaLeaf, FaTruck, FaHeart } from "react-icons/fa";

const Banner = () => {
  return (
    <div>
      {/* Hero Banner Section */}
      <div
        className="h-[60vh] bg-cover bg-center flex justify-center items-center"
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <div className="bg-black bg-opacity-50 p-10 rounded-lg text-center max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Now Get Your Favorite Dairy Products!
          </h1>
          <p className="mb-6">
            At DairyPro, we ensure that every product meets the highest quality standards, delivering farm-fresh milk,
            butter, cheese, yogurt, and dairy-based beverages straight to customer.
          </p>
          <Link to="/about">
            <button className="bg-lime-500 text-white py-3 px-6 rounded-lg font-bold shadow-lg hover:bg-lime-600 transition">
              Discover More
            </button>
          </Link>
        </div>
      </div>

      {/* Feature Boxes Section (taken from About.jsx) */}
      <div className="bg-gray-50 py-16 px-6 lg:px-24">
        <h2 className="text-4xl font-bold text-center text-lime-800 mb-12">Why Choose DairyPro?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <FaCheckCircle className="text-lime-500 text-5xl mx-auto mb-4" />
            <h4 className="text-xl font-semibold">Quality Assurance</h4>
            <p className="text-gray-600 mt-2">We ensure every product meets the highest dairy quality standards.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <FaLeaf className="text-green-500 text-5xl mx-auto mb-4" />
            <h4 className="text-xl font-semibold">Sustainable Farming</h4>
            <p className="text-gray-600 mt-2">Our eco-friendly processes help maintain a green and sustainable dairy farm.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <FaTruck className="text-blue-500 text-5xl mx-auto mb-4" />
            <h4 className="text-xl font-semibold">Fast Delivery</h4>
            <p className="text-gray-600 mt-2">We ensure timely distribution to dairy farm centers across the region.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <FaHeart className="text-red-500 text-5xl mx-auto mb-4" />
            <h4 className="text-xl font-semibold">Dairy Customer Satisfaction</h4>
            <p className="text-gray-600 mt-2">Your satisfaction is our top priority with premium dairy products.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
