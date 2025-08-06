"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const ExploreSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
    >
      <div className="bg-gradient-to-br from-pink-100 via-rose-50 to-white rounded-3xl overflow-hidden shadow-md border border-rose-100">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-6 lg:gap-0 min-h-[220px] lg:min-h-[380px]">
          {/* Left Content Section */}
          <div className="flex-1 p-6 sm:p-10 order-2 lg:order-1 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
              There’s more to explore
            </h2>
            <p className="text-gray-700 mb-6 text-sm sm:text-base max-w-full sm:max-w-lg mx-auto lg:mx-0">
              Discover hidden gems across categories — from daily essentials to premium delights.
            </p>
            <button className="bg-white hover:bg-gray-100 text-gray-900 px-6 py-2.5 rounded-full border border-gray-300 shadow-sm transition-all duration-300 ease-in-out flex items-center gap-2 mx-auto lg:mx-0">
              View more products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Right Image Section */}
          <div className="w-full lg:w-[500px] h-[220px] sm:h-[300px] lg:h-[380px] relative p-4 sm:p-6 order-1 lg:order-2">
            <div className="relative w-full h-full rounded-2xl overflow-hidden  transform transition-transform duration-300 hover:scale-105">
              <Image
                src="/home/women.png"
                alt="Woman with groceries"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ExploreSection;
