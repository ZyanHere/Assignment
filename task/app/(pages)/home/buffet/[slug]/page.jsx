"use client";

import Header from "@/components/home/Header";
import RestaurantCard from "@/components/home/foursec/RestaurentCard";
import Link from "next/link";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/lib/api";
import { adaptBuffetSections } from "@/lib/utils/buffetAdapters";

export default function BuffetSlugPage() {
  const { slug } = useParams();
  const { data, error } = useSWR(
    "/lmd/api/v1/retail/home/comprehensive?type=BUFFET",
    fetcher
  );

  if (error)
    return <div className="p-10 text-red-500">Failed to load data</div>;

  if (!data) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  const buffet = adaptBuffetSections(data.data);

  const sectionMapping = {
    popular: { data: buffet.popular, title: "Popular Now" },
    area: { data: buffet.inYourArea, title: "In Your Area" },
    choices: {
      data: buffet.previousChoices,
      title: "Based on Your Previous Choices",
    },
  };

  const section = sectionMapping[slug];

  if (!section) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500 text-2xl">
        Section not found
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-hidden">
      <Header />
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 md:px-12 py-6">

        <nav className="mb-4 text-sm whitespace-nowrap overflow-x-auto sm:text-xs">
          <Link href="/" className="hover:underline font-medium">
            Home
          </Link>
          <span className="mx-2 text-gray-400">&gt;</span>
          <Link href="/home/buffet" className="hover:underline font-medium">
            Restaurants
          </Link>
          <span className="mx-2 text-gray-400">&gt;</span>
          <span className="font-semibold text-yellow-500">{section.title}</span>
        </nav>


        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {section.data.map((restaurant, index) => (
            <RestaurantCard key={index} {...restaurant} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
