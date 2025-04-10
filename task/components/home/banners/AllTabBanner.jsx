import Image from "next/image";
import React from "react";
import { BannerHeader } from "./BannerHeader";


export const AllTabBanner = () => {
  return (
    <div className="banner-container">
      <BannerHeader />
      
      <div className="banner-content h-[180px] md:h-[200px]">
      <div
        className="w-full bg-green-600 rounded-3xl relative overflow-hidden p-6 flex items-center justify-between text-white"
        style={{ backgroundImage: "url('/home/assets/home-bg.png')" }}
      >
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
      </div>
    </div>
  );
};