import React from "react";
import Image from "next/image";
import CategoryTabs from "./CategoryTabs"; 

const LocationBanner = ({ selectedTab, setSelectedTab }) => {
  return (
    <div className="w-full px-4 md:px-8 pt-4">
      {/* Location */}
      <div className="flex items-center gap-2 text-base font-semibold mb-4">
        <span className="text-black">ST Joseph Indian Composite</span>
        <Image
          src="/home/assets/Down.svg"
          alt="Down Arrow"
          width={20}
          height={20}
          className="object-contain"
        />
      </div>

      {/* Promo Banner */}
      <div className="w-full bg-green-600 rounded-3xl relative overflow-hidden p-6 flex items-center justify-between text-white"
                     style={{ backgroundImage: "url('/home/assets/home-bg.png')" }}>
        <div className="ml-[77px]">
          <h2 className="text-2xl md:text-3xl font-bold mb-1 max-w-[420px]">
            Grab our amazing daily deals before they're gone!
          </h2>
          <p className="text-sm md:text-base mt-5">
            Save up to 60% off on your first order
          </p>
        </div>
        <Image
          src="/home/assets/veggies.png"
          alt="Banner Right Veggies"
          width={180}
          height={180}
          className="hidden md:block object-contain mr-[75px]"
        />
      </div>

      <CategoryTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
    </div>
  );
};

export default LocationBanner;
