"use client";

import Link from "next/link";
import Header from "@/components/home/Header";
import Sidebar from "@/components/home/sidebar";
import StoreBanner from "@/components/stores/StoreBanner";
import StoreCarousel from "@/components/stores/StoreCarousel";
import storesData from "@/data/storeData";
import Image from "next/image";

const StoresPage = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <div className="p-6">
          {/* Breadcrumb - Default "Stores" */}
          <nav className="mb-4 text-black text-4xl">
            <Link href="/stores" className="hover:underline font-medium">
              Stores
            </Link>
          </nav>

          <StoreBanner />

          <div className="w-full max-w-[1500px] mx-auto mt-6">
            <Image
              src="/store/store2.png"
              width={1500}
              height={274}
              className="w-full h-auto object-cover rounded-lg"
              alt="Store Image"
            />
          </div>

          <h2 className="text-4xl font-semibold mt-8 mb-4">Stores nearby</h2>

          {/* Store Carousel */}
          {Object.entries(storesData).map(([key, store]) => (
            <StoreCarousel key={key} slug={key} {...store} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoresPage;
