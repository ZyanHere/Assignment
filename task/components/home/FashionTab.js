"use client";

import React from "react";
import Banner from "@/app/components/CustomComponents/Banner";
import FashionCarousel from "./FashionCarousel";

const FashionTabContent = () => {
  return (
    <div className="p-4 sm:p-5 md:p-6 lg:px-16">
      {/* Most Popular Section */}
      <div className="w-full">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3">Most Popular</h3>
        <section className="w-full">
          <div className="w-full max-w-[1500px] mx-auto">
            <FashionCarousel category="MostPopular" />
          </div>
        </section>
      </div>

      {/* Just For You Section */}
      <div className="w-full mt-8 sm:mt-12 md:mt-16">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3">Just For You</h3>
        <section className="w-full">
          <div className="w-full max-w-[1500px] mx-auto">
            <FashionCarousel category="ForYou" />
          </div>
        </section>
      </div>

      {/* Banner Section */}
      <div className="mt-12 sm:mt-16 md:mt-20 lg:mt-24 px-2 sm:px-3 md:px-4 lg:px-10">
        <Banner />
      </div>
    </div>
  );
};

export default FashionTabContent;