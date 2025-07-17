"use client";

import Header from "@/components/home/Header";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRestaurantDetails } from "@/lib/hooks/useBuffetSWR";

export default function RestaurantDetailPage() {
  const params = useParams();
  const id = params?.id;

  const { data: restaurant, isLoading, error } = useRestaurantDetails(id);

  if (isLoading) {
    return <div className="p-6 text-center">Loading restaurant details...</div>;
  }

  if (error || !restaurant) {
    return <div className="p-6 text-center text-red-500">Restaurant not found</div>;
  }

  return (
    <div className="flex-1">
      <Header />

      <div className="p-6 w-full max-w-[1700px] mx-auto">
        <div className="px-6 md:px-12">
          {/* Breadcrumb */}
          <nav className="mb-4 text-2xl">
            <Link href="/" className="hover:underline font-medium">
              Home
            </Link>
            <span className="mx-2 text-gray-400">&gt;</span>
            <Link href="/home/buffet" className="hover:underline font-medium">
              Restaurants
            </Link>
            <span className="mx-2 text-gray-400">&gt;</span>
            <span className="font-semibold text-yellow-500">{restaurant.name}</span>
          </nav>

          {/* Banner */}
          <div className="w-full mb-6">
            <Image
              src={restaurant.banner}
              alt={restaurant.name}
              width={1200}
              height={400}
              className="w-full h-auto rounded-b-4xl shadow-md"
            />
          </div>

          {/* Menu Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Menu</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {restaurant.variants.map((variant) => (
                <div
                  key={variant.id}
                  className="border rounded-lg shadow hover:shadow-lg p-4 bg-white"
                >
                  <Image
                    src={variant.image}
                    alt={variant.name}
                    width={200}
                    height={150}
                    className="w-full h-40 object-cover rounded"
                  />
                  <h3 className="text-lg font-semibold mt-2">{variant.name}</h3>
                  <p className="text-gray-600 text-sm">{variant.attributes}</p>
                  <p className="text-yellow-600 font-bold mt-2">
                    ₹{variant.price}{" "}
                    <span className="line-through text-gray-400 ml-2 text-sm">
                      ₹{variant.basePrice}
                    </span>
                  </p>
                  <button className="w-full mt-3 bg-yellow-500 text-white py-2 rounded">
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
