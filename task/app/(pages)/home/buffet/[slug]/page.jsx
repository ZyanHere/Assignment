"use client";

import Header from "@/components/home/Header";
import RestaurantCard from "@/components/home/foursec/RestaurentCard";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useBuffet } from "@/lib/hooks/useBuffet";

// Simple shuffle function (Fisher-Yates algorithm)
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const BuffetSlugPage = () => {
  const { slug } = useParams();

  const {
    fetchBuffetData,
    needsDataFetch,
    getCacheStatus,
    buffetLoading,
    buffetError,
    popular,
    inYourArea,
    previousChoices,
  } = useBuffet();

  // Fetch data if cache expired or missing
  useEffect(() => {
    const cacheStatus = getCacheStatus();

    if (needsDataFetch()) {
      console.log("BuffetSlugPage: Fetching data...");
      console.log("Cache status:", cacheStatus.message);
      fetchBuffetData();
    } else {
      console.log("BuffetSlugPage: Using cached data");
      console.log("Cache status:", cacheStatus.message);
    }
  }, [fetchBuffetData, needsDataFetch, getCacheStatus]);

  // Map slug to dynamic state data
  const sectionMapping = {
    popular: { data: popular, title: "Popular Now" },
    area: { data: inYourArea, title: "In Your Area" },
    choices: { data: previousChoices, title: "Based on Your Previous Choices" },
  };

  const section = sectionMapping[slug];

  // Shuffle the data only when section.data changes
  const shuffledData = useMemo(() => {
    return section?.data ? shuffleArray(section.data) : [];
  }, [section?.data]);

  if (!section) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500 text-2xl">
        Section not found
      </div>
    );
  }

  return (
    <div className="flex-1">
      <Header />

      <div className="p-6 w-full max-w-[1700px] mx-auto">
        <div className="px-6 md:px-12">
          {/* Breadcrumb */}
          <nav className="mb-10 text-2xl">
            <Link href="/" className="hover:underline font-medium">
              Home
            </Link>
            <span className="mx-2 text-gray-400">&gt;</span>
            <Link href="/home/buffet" className="hover:underline font-medium">
              Restaurants
            </Link>
            <span className="mx-2 text-gray-400">&gt;</span>
            <span className="font-semibold text-yellow-500">
              {section.title}
            </span>
          </nav>

          {/* Loading and Error states */}
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

          {/* Show Data */}
          {!buffetLoading && !buffetError && (
            <>
              <h2 className="text-2xl font-bold mb-3">{section.title}</h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {shuffledData.length === 0 ? (
                  <p className="text-gray-500">No restaurants available</p>
                ) : (
                  shuffledData.map((restaurant, index) => (
                    <RestaurantCard key={index} {...restaurant} index={index} />
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuffetSlugPage;
