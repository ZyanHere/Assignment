"use client";

import { fetcher } from "@/lib/api";
import useSWR from "swr";

import BrandCarousel from "./BrandCarousel";
import Essentials from "./Essentials";
import FestBanner from "./FestBanner";
import FourSec from "./FourSec";
import NearbyStores from "./NearbyStores";
import OffersBanner from "./OffersBanner";


const AllTabContent = () => {
  const { data: featuredData, isLoading: featuredLoading } = useSWR("/lmd/api/v1/retail/products/featured", fetcher);
  const { data: bestSellersData, isLoading: bestSellersLoading } = useSWR("/lmd/api/v1/retail/products/best-sellers", fetcher);

  const featuredProducts = featuredData?.data || [];
  const bestSellerProducts = bestSellersData?.data || [];

  return (
    <main className="space-y-6 md:space-y-8">
      <section className="p-4 md:p-2">
        <h2 className="text-lg md:text-xl font-semibold mb-4 text-black ml-5">
          Few minutes left...
        </h2>
        <FourSec />
      </section>

      <div className="pl-6 w-full mt-5">
        <section>
          <h2 className="text-lg md:text-xl font-semibold mb-3 text-black">
            Top brands last minutes deal
          </h2>
          <BrandCarousel data={featuredProducts} loading={featuredLoading} />
        </section>
      </div>

      <OffersBanner />
      <Essentials />
      <FestBanner />

      <div className="pl-6 w-full mt-5">
        <section>
          <h2 className="text-lg md:text-xl font-semibold mb-3 text-black">
            Products
          </h2>
          <BrandCarousel data={bestSellerProducts} loading={bestSellersLoading} />
        </section>
      </div>

      <NearbyStores />
      {/* <NearbyEvents events={events} /> */}
    </main>
  );
};

export default AllTabContent;
