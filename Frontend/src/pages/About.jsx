import React from "react";
import dairyFarmImg from "../assets/dairyfarm3.jpg";
import { FaBullseye, FaLightbulb } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6 lg:px-16">
        {/* Hero Section */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-5xl font-extrabold text-lime-700 mb-6">
              About <span className="text-lime-600">DairyPro</span>
            </h2>
            <p className="text-gray-700 text-lg leading-8">
              Welcome to <span className="font-semibold text-lime-800">DairyPro</span>, your trusted dairy product shop for fresh, quality, and locally sourced dairy goods. 
              From creamy yogurts to premium cheeses, we offer products crafted with care from local farms.
            </p>
            <p className="text-gray-700 text-lg leading-8 mt-4">
              Our platform makes it easy to shop your favorite dairy items online and get them delivered to your doorstep—fresh and fast.
            </p>
          </div>
          <div className="lg:w-1/2">
            <img src={dairyFarmImg} alt="Dairy Farm" className="rounded-lg shadow-lg w-full" />
          </div>
        </div>

        {/* Vision and Mission Section */}
        <div className="mt-20 grid md:grid-cols-2 gap-10">
          {/* Vision */}
          <div className="bg-white p-8 rounded-lg shadow-md text-center border-t-4 border-lime-500">
            <FaLightbulb className="text-5xl text-yellow-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-lime-800 mb-3">Our Vision</h3>
            <p className="text-gray-700 text-lg leading-7">
              To become the most trusted online dairy shop, providing households with easy access to fresh, high-quality, and locally made dairy products every day.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white p-8 rounded-lg shadow-md text-center border-t-4 border-lime-500">
            <FaBullseye className="text-5xl text-red-500 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-lime-800 mb-3">Our Mission</h3>
            <p className="text-gray-700 text-lg leading-7">
              To deliver a convenient and reliable dairy shopping experience by offering a wide variety of farm-fresh products, promoting healthy lifestyles, 
              and supporting sustainable local agriculture.
            </p>
          </div>
        </div>

        {/* Commitment Section */}
        <div className="mt-20 bg-lime-600 text-white py-12 px-8 rounded-lg text-center shadow-lg">
          <h3 className="text-3xl font-bold">Our Commitment</h3>
          <p className="text-lg mt-4 leading-8">
            At DairyPro, we’re committed to quality, freshness, and customer satisfaction. Every product is carefully selected from trusted farms and producers.
          </p>
          <p className="text-lg mt-2">
            Shop with confidence and taste the difference in every drop. DairyPro – where freshness meets your doorstep.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
