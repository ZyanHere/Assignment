"use client";

import Header from "@/components/home/Header";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "@/lib/api";
import { adaptRestaurantDetails } from "@/lib/utils/buffetAdapters";


export default function RestaurantDetailPage({ params }) {
  const id = params.id;

  const { data, error } = useSWR(
    "/lmd/api/v1/retail/home/comprehensive?type=BUFFET",
    fetcher
  );

  if (error) return <div className="p-10 text-red-500">Failed to load details</div>;
  if (!data)
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
        <span className="ml-2">Loading details...</span>
      </div>
    );

  const restaurant = adaptRestaurantDetails(data.data, id);

  if (!restaurant) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500 text-2xl">
        Restaurant not found
      </div>
    );
  }

  return (
    <div className="flex-1">
      <Header />
      <div className="p-6 w-full max-w-[1700px] mx-auto">
        <div className="px-6 md:px-12">
          <nav className="mb-4 text-2xl">
            <Link href="/" className="hover:underline font-medium">
              Home
            </Link>
            <span className="mx-2 text-gray-400">&gt;</span>
            <Link href="/home/buffet" className="hover:underline font-medium">
              Restaurants
            </Link>
            <span className="mx-2 text-gray-400">&gt;</span>
            <span className="font-semibold text-yellow-500">
              {restaurant.name}
            </span>
          </nav>

          <div className="w-full mb-6">
            <Image
              src={restaurant.banner}
              alt={`${restaurant.name} Banner`}
              height={400}
              width={1200}
              className="w-full h-auto rounded-b-4xl shadow-md"
            />
          </div>

          <h2 className="text-2xl font-semibold mb-4">Menu</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {restaurant.variants.map((variant) => (
              <div
                key={variant.id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
              >
                <Image
                  src={variant.image}
                  alt={variant.name}
                  width={300}
                  height={200}
                  className="rounded-lg mb-3"
                />
                <h3 className="text-lg font-semibold">{variant.name}</h3>
                <p className="text-gray-600">{variant.attributes}</p>
                <p className="mt-2 font-bold text-orange-500">
                  ₹{variant.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
