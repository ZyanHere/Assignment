"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/api";

import BrandCarousel from "./BrandCarousel";
import FourSec from "./FourSec";
import Essentials from "./Essentials";
import NearbyStores from "./NearbyStores";
import OffersBanner from "./OffersBanner";
import FestBanner from "./FestBanner";
import NearbyEvents from "./NearbyEvents";

const AllTabContent = () => {
  const { data, error, isLoading } = useSWR("/api/home", fetcher);

  const flashDeals = data?.data?.flashDeals?.items || [];
  const products = data?.data?.products?.items || [];
  const stores = data?.data?.stores?.items || [];
  const events = data?.data?.events?.items || [];

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
          <BrandCarousel data={flashDeals} loading={isLoading} />
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
          <BrandCarousel data={products} loading={isLoading} />
        </section>
      </div>

      <NearbyStores stores={stores} />
      <NearbyEvents events={events}/>
    </main>
  );
};

export default AllTabContent;
