"use client";

import Header from "@/components/home/Header";
import BuffetCarousel from "@/components/home/foursec/BuffetCarousel";
import RestaurantCard from "@/components/home/foursec/RestaurentCard";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "@/lib/api";
import { adaptBuffetSections } from "@/lib/utils/buffetAdapters";

export default function BuffetPage() {
  const { data, error } = useSWR(
    "/lmd/api/v1/retail/home/comprehensive?type=BUFFET",
    fetcher
  );

  if (error)
    return <div className="p-10 text-red-500">Failed to load buffet data</div>;
  if (!data)
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
        <span className="ml-2">Loading restaurants...</span>
      </div>
    );

  const buffet = adaptBuffetSections(data.data);

  return (
    <div className="flex-1 min-h-screen bg-gray-50">
      <Header />
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Responsive Breadcrumb Navigation */}
        <nav className="mb-6 sm:mb-8 lg:mb-10">
          <div className="flex flex-wrap items-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl gap-2">
            <Link href="/" className="hover:underline font-medium text-gray-800 hover:text-yellow-600 transition-colors">
              Home
            </Link>
            <span className="text-gray-400">&gt;</span>
            <span className="font-semibold text-yellow-500">Restaurants</span>
          </div>
        </nav>

        {/* In Your Area Section */}
        <div className="mb-8 sm:mb-10 lg:mb-12">
          <BuffetCarousel
            title="In Your Area"
            seeAllLink="/home/buffet/area"
            items={buffet.inYourArea}
          />
        </div>

        {/* Previous Choices Section */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
              Based on your previous choices
            </h2>
            <Link
              href="/home/buffet/choices"
              className="text-orange-500 text-sm sm:text-base font-semibold hover:text-orange-600 transition-colors self-start sm:self-auto"
            >
              See All
            </Link>
          </div>

          {/* Responsive Grid for Restaurant Cards */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
            {buffet.previousChoices.map((restaurant, index) => (
              <div key={restaurant.id} className="w-full">
                <RestaurantCard {...restaurant} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
