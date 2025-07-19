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

      <div className="flex-1">
        <Header />

        <div className="p-4 sm:p-6 w-full max-w-[1700px] mx-auto">
          <div className="px-2 sm:px-6 md:px-12">
            {/* Breadcrumb */}
            <nav className="mb-4 text-lg sm:text-2xl flex flex-wrap items-center">
              <Link href="/" className="hover:underline font-medium">
                Home
              </Link>
              <span className="mx-2 text-gray-400">&gt;</span>
              <Link href="/home/buffet" className="hover:underline font-medium">
                Restaurants
              </Link>
              <span className="mx-2 text-gray-400">&gt;</span>
              <span className="font-semibold text-yellow-500 truncate max-w-[60vw]">
                {restaurant.name}
              </span>
            </nav>

            {/* Banner Image */}
            <div className="w-full mb-6 rounded-b-3xl overflow-hidden">
              <Image
                src={restaurantData.banner}
                alt={restaurant.name}
                height={400}
                width={1200}
                className="w-full h-40 sm:h-64 md:h-80 lg:h-[400px] object-cover rounded-b-3xl shadow-md"
                priority
              />
            </div>

            <MainDishSection
              restaurantData={restaurantData}
              favorites={favorites}
              restaurantIndex={restaurantData.id} 
              toggleFavorite={toggleFavorite}
            />

            {/* Menu Section */}
            <div className="mt-8">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">Menu</h2>
              <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl aspect-[3/5] relative rounded-lg shadow overflow-hidden mx-auto">
                <Image
                  src={restaurantData.menuImage}
                  alt="Menu"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 60vw, 434px"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default RestaurantDetailPage;
