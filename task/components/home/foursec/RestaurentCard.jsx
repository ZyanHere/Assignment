"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Helper function to generate slug from restaurant name
const getSlug = (name) => name.toLowerCase().replace(/\s+/g, "-");

const RestaurantCard = ({ img, name, rating, time, price, category, index }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = () => {
    setFavorites((prev) => {
      const updatedFavorites = [...prev];
      updatedFavorites[index] = !updatedFavorites[index];
      return updatedFavorites;
    });
  };

  return (
    <Link href={`/home/buffet/restaurant/${getSlug(name)}`} className="block">
      <div className="bg-white rounded-lg shadow-md p-2 sm:p-4 hover:shadow-lg transition duration-300 cursor-pointer">
        <div className="relative">
          <Image
            src={img}
            alt={name}
            width={300}
            height={200}
            className="w-full h-32 sm:h-40 object-cover rounded-lg"
          />
          <div
            className="absolute top-2 right-2 cursor-pointer"
            onClick={(e) => {
              e.preventDefault(); 
              toggleFavorite();
            }}
          >
            <Image
              src={favorites[index] ? "/home/shops/Heart-red.svg" : "/home/shops/Heart.svg"}
              alt="Favorite"
              width={28}
              height={28}
              className="w-6 h-6 sm:w-8 sm:h-8"
            />
          </div>
        </div>

        <div className="mt-2 sm:mt-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-0">
            <h3 className="text-base sm:text-lg font-semibold line-clamp-1">{name}</h3>
            <div className="flex items-center text-xs sm:text-sm text-gray-700">
              <span className="mr-1">⭐</span>
              <span>{rating}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between mt-2 text-gray-700 gap-1 sm:gap-2">
            <span className="text-xs sm:text-sm flex items-center gap-1">
              <Image src="/buffet/clock.svg" alt="Time" width={14} height={14} />
              {time}
            </span>

            <span className="text-xs sm:text-sm flex items-center gap-1">
              <Image src="/buffet/car.svg" alt="Delivery" width={14} height={14} />
              {price}
            </span>

            <span className="text-xs sm:text-sm bg-yellow-400 px-2 py-1 rounded-full font-semibold">
              {category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
