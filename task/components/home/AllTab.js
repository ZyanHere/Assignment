import React from "react";
import Image from "next/image";
import FourSec from "@/components/home/FourSec";
import BrandCarousel from "@/components/home/BrandCarousel";
import Essentials from "@/components/home/Essentials";
import NearbyStores from "@/components/home/NearbyStores";
import LocationBanner from "./LocationBanner";
import CategoryTabs from "./CategoryTabs";

const AllTabContent = () => {
  return (
    <main className="space-y-6 md:space-y-8"> 
    
      <section className="mx-4 md:mx-6 shadow-sm p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold mb-4 text-black">
          Few minutes left...
        </h2>
        <FourSec />
      </section>

      {/* ✅ Brand Carousel - Fixed Layout Issues ✅ */}
      <div className="pl-6 w-full mt-5">
        <section className="w-full ">
          <h2 className="text-lg font-bold mb-3 text-black">Top brands last minutes deal</h2>
          <div className="w-full max-w-[1500px] mx-auto">
            <BrandCarousel />
          </div>
        </section>
      </div>

      <Essentials />

      <div className="pl-6 w-full">
        <section className=" w-full p-5">
          <h2 className="text-lg font-semibold mb-8 text-black">Let's step out</h2>
          <FourSec />
        </section>
      </div>

      <div className=" mt-15 flex justify-center gap-8 ">
        <Image src="/home/banners/banner1.png" alt="Banner1" width={450} height={200} />
        <Image src="/home/banners/banner2.png" alt="Banner2" width={450} height={200} />
        <Image src="/home/banners/banner3.png" alt="Banner3" width={450} height={200} />
      </div>

      <div className="pl-6 w-full mt-5">
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
