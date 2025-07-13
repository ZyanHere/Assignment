"use client";

import { useEffect } from "react";
import BuffetCarousel from "@/components/home/foursec/BuffetCarousel";
import RestaurantCard from "@/components/home/foursec/RestaurentCard";
import Header from "@/components/home/Header";
import Sidebar from "@/components/home/sidebar";
import Link from "next/link";
import { useBuffet } from "@/lib/hooks/useBuffet";

const BuffetPage = () => {
  const { 
    fetchBuffetData,
    needsDataFetch,
    getCacheStatus,
    popular,
    inYourArea,
    previousChoices,
    buffetLoading,
    buffetError
  } = useBuffet();

  // Fetch buffet data only when needed (no data or cache expired)
  useEffect(() => {
    const cacheStatus = getCacheStatus();
    
    if (needsDataFetch()) {
      console.log('BuffetPage: Data fetch needed, calling buffet API');
      console.log('Cache status:', cacheStatus.message);
      fetchBuffetData();
    } else {
      console.log('BuffetPage: Using cached data, skipping API call');
      console.log('Cache status:', cacheStatus.message);
    }
  }, [fetchBuffetData, needsDataFetch, getCacheStatus]);

  return (
    <div className="flex-1">
      <Header />
      <div className="p-6 w-full max-w-[1700px] mx-auto">
        <div className="px-6 md:px-12">
          
          {/* Breadcrumb */}
          <nav className="mb-10 text-black text-4xl">
            <Link href="/" className="hover:underline font-medium">
              Home
            </Link>
            {" > "}
            <Link href="/home/buffet" className="hover:underline font-medium text-yellow-500">
              Restaurants
            </Link>
          </nav>

          {buffetLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
              <span className="ml-2">Loading restaurants...</span>
            </div>
          )}

          {buffetError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <strong>Error:</strong> {buffetError}
            </div>
          )}

          {!buffetLoading && !buffetError && (
            <>
              <BuffetCarousel title="Popular Now" seeAllLink="/home/buffet/popular" items={popular} />
              <BuffetCarousel title="In Your Area" seeAllLink="/home/buffet/area" items={inYourArea} />
              
              <div className="flex justify-between items-center mt-6">
                <h2 className="text-xl font-semibold">Based on your previous choices</h2>
                <Link href="/home/buffet/choices" className="text-orange-500 text-sm font-semibold">
                  See All
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {previousChoices.map((restaurant, index) => (
                  <RestaurantCard key={index} {...restaurant} index={index} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuffetPage;

