// import Search from "./Search";
// import React from "react";

// function Hero() {
//   return (
//     <div className="flex flex-col items-center p-10 py-20 gap-6 h-[660px] w-full bg-[#eef0fc]">
//       {/* <h2 className="text-lg"> Find Bike for rent near by you</h2> */}
//       <h2 className="text-[60px] font-bold">Find Your Dream Bike </h2>
//       <Search></Search>
//       <img src="/bike3.png" className="mt-0"></img>
//     </div>
//   );
// }

// export default Hero;

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Update this path to your actual hero image
import HeroImage from "../../public/bike3.png";

function Hero() {
  const [emailValue, setEmailValue] = useState("");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const features = [
    "Find the perfect motorcycle for your needs",
    "Sell your bike with confidence",
    "Connect directly with trusted sellers",
    "Exclusive deals and price alerts",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Email submitted:", emailValue);
    setEmailValue("");
    // Show success message or redirect
  };

  return (
    <section className="pt-24 pb-16 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        {/* Left Column - Content */}
        <motion.div
          className="flex flex-col order-2 md:order-1"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.span
            variants={itemVariants}
            className="text-blue-600 font-semibold mb-2 inline-flex items-center"
          >
            <span className="bg-blue-100 p-1 rounded mr-2">
              <Check size={14} className="text-blue-600" />
            </span>
            The #1 Motorcycle Marketplace
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-4"
          >
            Find Your Perfect <span className="text-blue-600">Ride</span> Today
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 mb-6 max-w-lg"
          >
            Discover thousands of motorcycles from trusted sellers across the
            country. Buy, sell, or browse - all in one place.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <Link
              to="/search"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              Explore Bikes <ChevronRight size={18} />
            </Link>
            <Link
              to="/add-listing"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              Sell Your Bike <ArrowRight size={18} />
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="bg-blue-100 rounded-full p-1">
                  <Check size={16} className="text-blue-600" />
                </div>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </motion.div>

          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col sm:flex-row gap-2 max-w-md"
          >
            <input
              type="email"
              placeholder="Enter your email for updates"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              required
            />
            <button
              type="submit"
              className="px-5 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              Get Updates
            </button>
          </motion.form>
        </motion.div>

        {/* Right Column - Image */}
        <motion.div
          className="order-1 md:order-2 flex justify-center md:justify-end"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 opacity-30 blur-lg"></div>
            <img
              src={HeroImage}
              alt="Motorcycle showcase"
              className="relative z-10 rounded-2xl object-cover max-h-[500px] w-full"
            />
            <div className="absolute -bottom-4 -left-4 bg-white px-4 py-3 rounded-lg shadow-lg z-20 flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Check size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-bold">Trusted by</p>
                <p className="text-gray-600 text-sm">10,000+ riders</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;