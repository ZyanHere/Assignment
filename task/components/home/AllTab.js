"use client";

import { useEffect, useState } from "react";
import FourSec from "@/components/home/FourSec";
import BrandCarousel from "@/components/home/BrandCarousel";
import Essentials from "@/components/home/Essentials";
import NearbyStores from "@/components/home/NearbyStores";
import OffersBanner from "./OffersBanner";
import FestBanner from "./FestBanner";
import NearbyEvents from "./NearbyEvents";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchHomeData } from "@/lib/api/homeApi";

const AllTabContent = () => {
  const [loading, setLoading] = useState(true);
  const [flashDeals, setFlashDeals] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
  async function load() {
    try {
      const { flashDeals, products } = await fetchHomeData();
      console.log("Fetched flashDeals:", flashDeals);
      setFlashDeals(flashDeals);
      setProducts(products);
    } catch (error) {
      console.error("Data fetch failed:", error.message);
    } finally {
      setLoading(false);
    }
  }

  load();
}, []);


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
            <BrandCarousel data={flashDeals} loading={loading} />
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
            <BrandCarousel data={products} loading={loading} />
          </div>
        </section>
      </div>

      <NearbyStores />
      <NearbyEvents />
    </main>
  );
};

export default AllTabContent;
