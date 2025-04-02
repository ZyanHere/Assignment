import React from "react";
import Image from "next/image";

import SecondCarousel from "./secondCarousel";

const GroceryTabContent = () => {
  return (
    <div className="p-4 lg:px-16">

      {/* Hero Banner */ }
      <div>
        <Image 
          src="/home/grocery/grocery-banner.png" 
          alt="Fresh Groceries Banner" 
          width={1098} 
          height={288} 
          className="w-full rounded-sm"
          priority
        />
      </div>

      {/* Vegetables Section */}
      <div className="w-full mt-16">
        <h2 className="text-3xl font-bold text-gray-800 ">Vegetables</h2>
        <section className="bg-white shadow-sm w-full">
          <div className="w-full max-w-[1500px] mx-auto">
            <SecondCarousel category="vegetables" />
          </div>
        </section>
      </div>

      {/* Drinks Section */}
      <div className="w-full mt-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Drinks</h2>
        <section className="bg-white shadow-sm w-full">
          <div className="w-full max-w-[1500px] mx-auto">
            <SecondCarousel category="drinks" />
          </div>
        </section>
      </div>

      <div className="w-full mt-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Fruits</h2>
        <section className="bg-white shadow-sm w-full">
          <div className="w-full max-w-[1500px] mx-auto">
            <SecondCarousel category="fruits" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default GroceryTabContent;
