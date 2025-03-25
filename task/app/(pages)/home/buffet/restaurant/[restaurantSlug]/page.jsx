"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/home/sidebar";
import Header from "@/components/home/Header";
import { buffetData } from "@/data/buffetData";
import Image from "next/image";
import RestaurantBanner from "@/components/home/foursec/RestaurantBanner";
import MainDishSection from "@/components/home/foursec/MainDish";
import { useState } from "react";

// Restaurant-specific data (parking, main dish, menu)
const restaurantData = {
  banner: "/buffet/TopBanner.png",
  address: "Pashan, Pune 411013",
  parking: "Available on-site",
  mainDish: {
    image: "/buffet/bowlers.png",
    name: "Bowlers",
  },
  menuImage: "/buffet/menu2.png",
};

// Helper function to create a URL-friendly slug
const getSlug = (name) => name.toLowerCase().replace(/\s+/g, "-");

const RestaurantDetailPage = () => {
  const { restaurantSlug } = useParams();
  const [favorites, setFavorites] = useState({}); // Store favorite status

  const toggleFavorite = (index) => {
    setFavorites((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle favorite status for the index
    }));
  };

  // Combine all restaurant data from buffetData
  const allRestaurants = [
    ...buffetData.popular,
    ...buffetData.inYourArea,
    ...buffetData.previousChoices,
    ...buffetData.popular2,
    ...buffetData.inYourArea2,
    ...buffetData.previousChoices2,
  ];

  // Find restaurant details from buffetData
  const restaurant = allRestaurants.find(
    (r) => getSlug(r.name) === restaurantSlug
  );

  if (!restaurant) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500 text-2xl">
        Restaurant not found
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        <Header />

        <div className="p-6">
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
              <span className="font-semibold text-yellow-500">
                {restaurant.name}
              </span>
            </nav>

            {/* Banner Image */}
            <div className="w-full mb-6">
              <Image
                src={restaurantData.banner}
                alt={restaurant.name}
                height={1140}
                width={387}
                className="w-full h-auto rounded-b-4xl shadow-md"
              />
            </div>

            <MainDishSection
              restaurantData={restaurantData}
              favorites={favorites}
              restaurantIndex={restaurantData.id} // Ensure this exists
              toggleFavorite={toggleFavorite}
            />

            {/* Menu Section */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Menu</h2>
              <div className="w-[434px] h-[670px] relative rounded-lg shadow overflow-hidden">
                <Image
                  src={restaurantData.menuImage}
                  alt="Menu"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailPage;
