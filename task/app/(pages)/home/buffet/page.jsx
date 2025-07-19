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
    <div className="flex-1">
      <Header />
      <div className="p-6 w-full max-w-[1700px] mx-auto">
        <div className="px-6 md:px-12">
          <nav className="mb-10 text-black text-4xl">
            <Link href="/" className="hover:underline font-medium">
              Home
            </Link>
            {" > "}
            <span className="font-medium text-yellow-500">Restaurants</span>
          </nav>

          <BuffetCarousel
            title="In Your Area"
            seeAllLink="/home/buffet/area"
            items={buffet.inYourArea}
          />

          <div className="flex justify-between items-center mt-6">
            <h2 className="text-xl font-semibold">
              Based on your previous choices
            </h2>
            <Link
              href="/home/buffet/choices"
              className="text-orange-500 text-sm font-semibold"
            >
              See All
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {buffet.previousChoices.map((restaurant, index) => (
              <RestaurantCard key={restaurant.id} {...restaurant} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
