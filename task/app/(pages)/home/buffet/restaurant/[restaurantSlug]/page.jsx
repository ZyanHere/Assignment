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

const getSlug = (name) => name.toLowerCase().replace(/\s+/g, "-");

const RestaurantDetailPage = () => {
  const { restaurantSlug } = useParams();
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (index) => {
    setFavorites((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const allRestaurants = [
    ...buffetData.popular,
    ...buffetData.inYourArea,
    ...buffetData.previousChoices,
    ...buffetData.popular2,
    ...buffetData.inYourArea2,
    ...buffetData.previousChoices2,
  ];

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
        <div className="px-4 sm:px-6 md:px-12">

          <nav className="mb-4 text-base sm:text-lg md:text-2xl flex flex-wrap items-center gap-1">
            <Link href="/" className="hover:underline font-medium">
              Home
            </Link>
            <span className="text-gray-400">&gt;</span>
            <Link href="/home/buffet" className="hover:underline font-medium">
              Restaurants
            </Link>
            <span className="text-gray-400">&gt;</span>
            <span className="font-semibold text-yellow-500 break-words">
              {restaurant.name}
            </span>
          </nav>

     
          <div className="w-full mb-6">
            <Image
              src={restaurantData.banner}
              alt={restaurant.name}
              width={1600}
              height={400}
              className="w-full h-auto max-h-[400px] rounded-b-4xl shadow-md object-cover"
              priority
            />
          </div>

          <MainDishSection
            restaurantData={restaurantData}
            favorites={favorites}
            restaurantIndex={restaurantData.id}
            toggleFavorite={toggleFavorite}
          />

 
          <div className="mt-8">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 break-words">
              Menu
            </h2>
            <div className="relative w-full max-w-full sm:max-w-md md:max-w-lg aspect-[3/5] rounded-lg shadow overflow-hidden">
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
  );
};

export default RestaurantDetailPage;
