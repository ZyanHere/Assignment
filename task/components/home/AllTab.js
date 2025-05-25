import React from "react";
import FourSec from "@/components/home/FourSec";
import BrandCarousel from "@/components/home/BrandCarousel";
import Essentials from "@/components/home/Essentials";
import NearbyStores from "@/components/home/NearbyStores";
import OffersBanner from "./OffersBanner";
import FestBanner from "./FestBanner";
import NearbyEvents from "./NearbyEvents";

async function fetchHomeData() {
  try {
    const res = await fetch("http://13.232.240.0:4000/lmd/api/v1/home", {
      cache: "no-store", // ensures fresh data each request
    });

    const json = await res.json();
    const data = json?.data || {};
    return {
      flashDeals: data.flashDeals?.items || [],
      products: data.products?.items || [],
    };
  } catch (error) {
    console.error("Home fetch failed", error);
    return {
      flashDeals: [],
      products: [],
    };
  }
}

const AllTabContent = async () => {
  const { flashDeals, products } = await fetchHomeData();

  return (
    <main className="space-y-6 md:space-y-8">
      <section className="p-4 md:p-2">
        <h2 className="text-lg md:text-xl font-semibold mb-4 text-black ml-5">
          Few minutes left...
        </h2>
        <FourSec />
      </section>

      {/* Flash Deals */}
      <div className="pl-6 w-full mt-5">
        <section className="w-full">
          <h2 className="text-lg md:text-xl font-semibold mb-3 text-black">
            Top brands last minutes deal
          </h2>
          <div className="w-full max-w-[1600px] mx-auto">
            <BrandCarousel data={flashDeals} loading={false} />
          </div>
        </section>
      </div>

      <OffersBanner />
      <Essentials />
      <FestBanner />

      {/* Regular Products */}
      <div className="pl-6 w-full mt-5">
        <section className="w-full">
          <h2 className="text-lg md:text-xl font-semibold mb-3 text-black">
            Products
          </h2>
          <div className="w-full max-w-[1600px] mx-auto">
            <BrandCarousel data={products} loading={false} />
          </div>
        </section>
      </div>

      <NearbyStores />
      <NearbyEvents />
    </main>
  );
};

export default AllTabContent;
