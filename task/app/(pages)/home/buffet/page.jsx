"use client";

import Header from "@/components/home/Header";
import BuffetCarousel from "@/components/home/foursec/BuffetCarousel";
import RestaurantCard from "@/components/home/foursec/RestaurentCard";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "@/lib/api";
import { adaptBuffetSections } from "@/lib/utils/buffetAdapters";
import { usePathname } from "next/navigation";

export default function BuffetPage() {
  const pathname = usePathname();

  const isChoicesPage = pathname === "/home/buffet/choices";

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
          <nav className="mb-4 text-black text-xl">
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

          <div className="flex justify-between items-start mt-6">
            <h2 className="text-xl font-semibold leading-tight">
              Based on your <br /> previous choices
            </h2>

            {!isChoicesPage && (
              <Link
                href="/home/buffet/choices"
                className="text-orange-500 text-sm font-semibold whitespace-nowrap"
              >
                See All
              </Link>
            )}
          </div>

          
          <div className="grid grid-cols-1 sm:grid-cols- md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {buffet.previousChoices.map((restaurant, index) => (
              <RestaurantCard key={restaurant.id} {...restaurant} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
