import React from "react";
import Image from "next/image";
import FourSec from "@/components/home/FourSec";
import BrandCarousel from "@/components/home/BrandCarousel";
import Essentials from "@/components/home/Essentials";
import NearbyStores from "@/components/home/NearbyStores";
import OffersBanner from "./OffersBanner";
import FestBanner from "./FestBanner";


const AllTabContent = () => {
  return (
    <main className="space-y-6 md:space-y-8"> 
    
      <section className="p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold mb-4 text-black">
          Few minutes left...
        </h2>
        <FourSec />
      </section>

      <div className="pl-6 w-full mt-5">
        <section className="w-full ">
          <h2 className="text-lg font-bold mb-3 text-black">Top brands last minutes deal</h2>
          <div className="w-full max-w-[1500px] mx-auto">
            <BrandCarousel />
          </div>
        </section>
      </div>
      
      <OffersBanner/>
      <Essentials />

      <div className="pl-6 w-full">
        <section className=" w-full p-5">
          <h2 className="text-lg font-semibold mb-8 text-black">Let's step out</h2>
          <FourSec />
        </section>
      </div>

      
      <FestBanner/>

      <div className="pl-6 w-full mt-16">
        <section className=" w-full ">
          <h2 className="text-lg font-bold mb-3 text-black">Few minutes left ...</h2>
          <div className="w-full max-w-[1500px] mx-auto">
            <BrandCarousel />
          </div>
        </section>
      </div>

      <NearbyStores />
    </main>
  );
};

export default AllTabContent;
