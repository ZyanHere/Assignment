"use client";

import Sidebar from "@/app/extra/home/sidebar";
import Footer from "@/components/home/footer";
import HotelCard from "@/components/home/foursec/HotelCard";
import RecommendedHotels from "@/components/home/foursec/RecommandedHotel";
import Header from "@/components/home/Header";
import { useHotels } from "@/lib/hooks/useHotels";
import Link from "next/link";
import { useEffect } from "react";

export default function HotelsPage() {
  const {
    fetchHotelsData,
    needsDataFetch,
    getCacheStatus,
    hotels,
    mostPopular,
    recommended,
    hotelsLoading,
    hotelsError,
  } = useHotels();

  // Fetch hotels data only when needed (no data or cache expired)
  useEffect(() => {
    const cacheStatus = getCacheStatus();

    if (needsDataFetch()) {
      console.log("HotelsPage: Data fetch needed, calling hotels API");
      console.log("Cache status:", cacheStatus.message);
      fetchHotelsData();
    } else {
      console.log("HotelsPage: Using cached data, skipping API call");
      console.log("Cache status:", cacheStatus.message);
    }
  }, [fetchHotelsData, needsDataFetch, getCacheStatus]);

  return (
    <div className="flex-1">
      <Header />
      <div className="p-6 w-full max-w-[1700px] mx-auto">
        {/* Breadcrumb */}
        <nav className="text-2xl mb-4">
          <Link href="/" className="text-black">
            Home
          </Link>{" "}
          &gt; <span className="font-semibold text-yellow-500">Hotels</span>
        </nav>

        {hotelsLoading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
            <span className="ml-2">Loading hotels...</span>
          </div>
        )}

        {hotelsError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>Error:</strong> {hotelsError}
          </div>
        )}

        {!hotelsLoading && !hotelsError && (
          <>
            <HotelCard hotels={mostPopular} />
            <RecommendedHotels hotels={recommended} />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
