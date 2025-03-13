import React from "react";
import Image from "next/image";
import ProCard from "./SecProductCard";

const GroceryTabContent = () => {
  return (
    <div className="p-6">

      {/* Hero Banner */}
      <div>
        <Image src="/grocery/grocery-banner.png" alt="Hero Banner" width={1098} height={288} className="w-full " />
      </div>

      {/* Vegetables Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Vegetables</h3>
        <div className="grid grid-cols-5 gap-4">
          {/* Sample Product Cards */}
          <div className="flex gap-4 overflow-x-auto">
            <ProCard imageSrc="/grocery/broccoli.png" name="Broccoli" price="100" stockStatus="Few stock left" />
            {/* Repeat for more products */}
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">Carrots</div>
          <div className="bg-white p-4 shadow-md rounded-lg">Capsicum</div>
          <div className="bg-white p-4 shadow-md rounded-lg">Eggplant</div>
          <div className="bg-white p-4 shadow-md rounded-lg">Broccoli</div>
        </div>
      </div>

      {/* Drinks Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Drinks</h3>
        <div className="grid grid-cols-5 gap-4">
          <div className="bg-white p-4 shadow-md rounded-lg">Fritz-kola</div>
          <div className="bg-white p-4 shadow-md rounded-lg">Coca-cola</div>
          <div className="bg-white p-4 shadow-md rounded-lg">Bravo</div>
          <div className="bg-white p-4 shadow-md rounded-lg">Fanta</div>
          <div className="bg-white p-4 shadow-md rounded-lg">Fritz-kola</div>
        </div>
      </div>
    </div>
  );
};

export default GroceryTabContent;
