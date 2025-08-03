"use client";

import BrandCarousel from "./BrandCarousel";
import Essentials from "./Essentials";
import FestBanner from "./FestBanner";
import FourSec from "./FourSec";
import GroceryPromoSection from "./groceryPromoSection";
import NearbyStores from './NearbyStores';
import OffersBanner from "./OffersBanner";
import Component from "./trending/Trending";
import WomanWithGroceries from "./womanWithGroceries";


const musicImages = [
  "/home/music/music1.png",
  "/home/music/music2.png",
  "/home/music/music3.png",
  "/home/music/music4.png",
  "/home/music/music5.png",
  "/home/music/music6.png",
];


const offerImages = [
  "/home/offers/offer1.png",
  "/home/offers/offer2.png",
  "/home/offers/offer3.png",
  "/home/offers/offer4.png",
];


const AllTabContentRedux = ({ products = [], loading = false }) => {
  const featuredProducts = products.slice(0, 10);
  const bestSellerProducts = products.slice(10, 20);

  return (
    <main className="space-y-6 md:space-y-8">
      <section className="p-4 md:p-2">
        <h2 className="text-lg md:text-xl font-semibold mb-4 text-black ml-5">
          Few minutes left...
        </h2>
        <FourSec />
      </section>

      {/* Woman with Groceries Section - placed above Top Brands */}
      <WomanWithGroceries />

      {/* Top Brands/Last Minute Deal section */}
      <div className="px-0 md:pl-6 w-full mt-5">
        <section>
          <h2 className="text-lg md:text-xl font-semibold mb-3 text-black">
            Top brands last minutes deal
          </h2>
          <BrandCarousel data={featuredProducts} loading={loading} />
        </section>
      </div>

      <FestBanner images={offerImages} />;
      <Component />
      <Essentials />

      {/* Grocery Promotional Section */}
      <GroceryPromoSection products={featuredProducts} />

      <FestBanner images={musicImages} />;

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
