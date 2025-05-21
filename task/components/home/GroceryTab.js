"use client";

import React from "react";
import Image from "next/image";
import SecondCarousel from "./secondCarousel";

const GroceryTabContent = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8 lg:px-16">
      {/* Vegetables Section */}
      <div className="w-full">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4">Vegetables</h2>
        <section className="w-full">
          <div className="w-full max-w-[1500px] mx-auto">
            <SecondCarousel category="vegetables" />
          </div>
        </section>
      </div>

      {/* Drinks Section */}
      <div className="w-full mt-8 sm:mt-12 md:mt-16">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4">Drinks</h2>
        <section className="w-full">
          <div className="w-full max-w-[1500px] mx-auto">
            <SecondCarousel category="drinks" />
          </div>
        </section>
      </div>

      {/* Fruits Section */}
      <div className="w-full mt-8 sm:mt-12 md:mt-16">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4">Fruits</h2>
        <section className="w-full">
          <div className="w-full max-w-[1500px] mx-auto">
            <SecondCarousel category="fruits" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default GroceryTabContent;