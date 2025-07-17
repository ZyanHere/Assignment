"use client";

import Header from "@/components/home/Header";
import MainDishSection from "@/components/home/foursec/MainDish";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useMemo } from "react";
import { buffetData } from "@/data/buffetData";

// Static fallback UI
const restaurantDataFallback = {
  banner: "/buffet/TopBanner.png",
  address: "Pashan, Pune 411013",
  parking: "Available on-site",
  mainDish: {
    image: "/buffet/bowlers.png",
    name: "Bowlers",
  },
  menuImage: "/buffet/menu2.png",
};

const RestaurantDetailPage = () => {
  const { id } = useParams(); // Dynamic param from /home/buffet/restaurant/[id]
  const restaurantId = Array.isArray(id) ? id[0] : id;

  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (rid) => {
    setFavorites((prev) => ({
      ...prev,
      [rid]: !prev[rid],
    }));
  };

  // Combine all restaurant arrays from buffetData
  const allRestaurants = useMemo(() => {
    return [
      ...buffetData.popular,
      ...buffetData.inYourArea,
      ...buffetData.previousChoices,
      ...buffetData.popular2,
      ...buffetData.inYourArea2,
      ...buffetData.previousChoices2,
    ];
  }, []);

  // Find restaurant by ID
  const restaurant = allRestaurants.find((r) => String(r.id) === String(restaurantId));

  if (!restaurant) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500 text-2xl">
        Restaurant not found
      </div>
    );
  }

  const uiData = {
    banner: restaurant.banner || restaurantDataFallback.banner,
    address: restaurant.address || restaurantDataFallback.address,
    parking: restaurant.parking || restaurantDataFallback.parking,
    mainDish: {
      image: restaurant.image || restaurantDataFallback.mainDish.image,
      name: restaurant.name,
    },
    menuImage: restaurant.menuImage || restaurantDataFallback.menuImage,
  };

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
            <span className="font-semibold text-yellow-500">
              {restaurant.name}
            </span>
          </nav>

          {/* Banner Image */}
          <div className="w-full mb-6">
            <Image
              src={uiData.banner}
              alt={restaurant.name}
              height={1140}
              width={387}
              className="w-full h-auto rounded-b-4xl shadow-md"
            />
          </div>

          {/* Main Dish + Favorite */}
          <MainDishSection
            restaurantData={uiData}
            favorites={favorites}
            restaurantIndex={restaurantId}
            toggleFavorite={toggleFavorite}
          />

          {/* Menu Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Menu</h2>
            <div className="w-[434px] h-[670px] relative rounded-lg shadow overflow-hidden">
              <Image
                src={uiData.menuImage}
                alt={`${restaurant.name} menu`}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>

          {/* Address / Parking */}
          <div className="mt-8 text-lg space-y-1">
            <p>
              <strong>Address:</strong> {uiData.address}
            </p>
            <p>
              <strong>Parking:</strong> {uiData.parking}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailPage;
