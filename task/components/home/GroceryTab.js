import React from "react";
import Image from "next/image";

import SecondCarousel from "./secondCarousel";

const GroceryTabContent = () => {
  return (
    <div className="p-4">

      {/* Hero Banner */ }
       <div>
        <Image src="/grocery/grocery-banner.png" alt="Hero Banner" width={1098} height={288} className="w-full rounded-sm" />
      </div>

      {/* Vegetables Section */}
      <div className=" w-full mt-5">
        <h3 className="text-3xl font-bold text-gray-800 mb-3">Vegetables</h3>
        <section className="bg-white shadow-sm w-full ">
          <div className="w-full max-w-[1500px] mx-auto">
            <SecondCarousel />
          </div>
        </section>
      </div>

      {/* Drinks Section */}
      <div className=" w-full mt-15">
        <h3 className="text-3xl font-bold text-gray-800 mb-3">Drinks</h3>
        <section className="bg-white shadow-sm w-full ">
          <div className="w-full max-w-[1500px] mx-auto">
            <SecondCarousel />
          </div>
        </section>
      </div>

      <div className=" w-full mt-15">
        <h3 className="text-3xl font-bold text-gray-800 mb-3">Fruits</h3>
        <section className="bg-white shadow-sm w-full ">
          <div className="w-full max-w-[1500px] mx-auto">
            <SecondCarousel />
          </div>
        </section>
      </div>
    </div>
  );
};

export default GroceryTabContent;
