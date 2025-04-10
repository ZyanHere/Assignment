import React from "react";
import Image from "next/image";

import SecondCarousel from "./secondCarousel";

const GroceryTabContent = () => {
  return (
    <div className="p-4 lg:px-16">

      

      {/* Vegetables Section */}
      <div className="w-full ">
        <h2 className="text-3xl font-bold  ">Vegetables</h2>
        <section className=" w-full">
          <div className="w-full max-w-[1500px] mx-auto">
            <SecondCarousel category="vegetables" />
          </div>
        </section>
      </div>

      {/* Drinks Section */}
      <div className="w-full mt-16">
        <h2 className="text-3xl font-bold  mb-4">Drinks</h2>
        <section className=" w-full">
          <div className="w-full max-w-[1500px] mx-auto">
            <SecondCarousel category="drinks" />
          </div>
        </section>
      </div>

      <div className="w-full mt-16">
        <h2 className="text-3xl font-bold  mb-4">Fruits</h2>
        <section className=" w-full">
          <div className="w-full max-w-[1500px] mx-auto">
            <SecondCarousel category="fruits" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default GroceryTabContent;
