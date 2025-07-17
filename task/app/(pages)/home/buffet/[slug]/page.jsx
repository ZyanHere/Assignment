"use client";

import Header from "@/components/home/Header";
import RestaurantCard from "@/components/home/foursec/RestaurentCard";
import Link from "next/link";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/lib/api";

export default function BuffetSlugPage() {
  const { slug } = useParams();

  const { data, error, isLoading } = useSWR(
    `/lmd/api/v1/retail/home/comprehensive?type=BUFFET&productsLimit=20`,
    fetcher
  );

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  if (error || !data?.data?.allProducts) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500 text-xl">
        Failed to load data
      </div>
    );
  }

  const allProducts = data.data.allProducts;

  // Decide which section to display based on slug
  const sectionTitle =
    slug === "popular"
      ? "Popular Now"
      : slug === "area"
      ? "In Your Area"
      : slug === "choices"
      ? "Based on Your Previous Choices"
      : null;

  if (!sectionTitle) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500 text-xl">
        Invalid Section
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
            <span className="font-semibold text-yellow-500">{sectionTitle}</span>
          </nav>

          <h2 className="text-2xl font-bold mb-3">{sectionTitle}</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {allProducts.map((restaurant, index) => (
              <RestaurantCard
                key={restaurant.id}
                id={restaurant.id}
                img={restaurant.images?.[0]?.url}
                name={restaurant.name}
                rating={restaurant.rating}
                time="30 min"
                price="Free Delivery"
                category={restaurant.category}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
