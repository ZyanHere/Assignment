"use client";

import BrandCarousel from "./BrandCarousel";
import Essentials from "./Essentials";
import FestBanner from "./FestBanner";
import FourSec from "./FourSec";
import OffersBanner from "./OffersBanner";
import NearbyStores from './NearbyStores';
import Component from "./Trending";




const AllTabContentRedux = ({ products = [], loading = false }) => {
  // For now, we'll use the products passed from Redux
  // In a more complete implementation, you might want to add featured/best-sellers to Redux state
  const featuredProducts = products.slice(0, 10); // First 10 products as featured
  const bestSellerProducts = products.slice(10, 20); // Next 10 products as best sellers

  return (
    <main className="space-y-6 md:space-y-8">
      <section className="p-4 md:p-2">
        <h2 className="text-lg md:text-xl font-semibold mb-4 text-black ml-5">
          Few minutes left...
        </h2>
        <FourSec />
      </section>

      {/* Top Brands/Last Minute Deal section */}
      <div className="px-0 md:pl-6 w-full mt-5">
        <section>
          <h2 className="text-lg md:text-xl font-semibold mb-3 text-black">
            Top brands last minutes deal
          </h2>
          <BrandCarousel data={featuredProducts} loading={loading} />
        </section>
      </div>

      <OffersBanner />
      <Component />
      <Essentials />
      <FestBanner />

      {/* Products section */}
      <div className="px-0 md:pl-6 w-full mt-5">
        <section>
          <h2 className="text-lg md:text-xl font-semibold mb-3 text-black">
            Products
          </h2>
          <BrandCarousel data={bestSellerProducts} loading={loading} />
        </section>
      </div>

      <NearbyStores />
    </main>
  );
};

export default AllTabContentRedux; 