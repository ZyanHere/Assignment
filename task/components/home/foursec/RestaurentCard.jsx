"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function RestaurantCard({
  id,
  img,
  name,
  rating,
  time,
  price,
  category,
  index,
}) {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = () => {
    setFavorites((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  return (
    <Link
      href={`/home/buffet/restaurant/${id}`}
      key={id}
      className="block w-full"
    >
      <div className="bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 h-full">
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-t-lg sm:rounded-t-xl">
          {img ? (
            <Image
              src={img}
              alt={name}
              width={300}
              height={200}
              className="w-full h-32 sm:h-36 md:h-40 lg:h-44 object-cover transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="w-full h-32 sm:h-36 md:h-40 lg:h-44 bg-gray-200 rounded-t-lg sm:rounded-t-xl" />
          )}

          {/* Favorite Button */}
          <div
            className="absolute top-2 right-2 p-1 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite();
            }}
          >
            <Image
              src={
                favorites[index]
                  ? "/home/shops/Heart-red.svg"
                  : "/home/shops/Heart.svg"
              }
              alt="Favorite"
              width={24}
              height={24}
              className="sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
            />
          </div>
        </div>

        {/* Content Container */}
        <div className="p-3 sm:p-4 flex flex-col justify-between flex-1">
          {/* Header with Name and Rating */}
          <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 line-clamp-2 flex-1">
              {name}
            </h3>
            <div className="flex items-center text-xs sm:text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full flex-shrink-0">
              <span className="mr-1">⭐</span>
              <span className="font-medium">{rating}</span>
            </div>
          </div>

          {/* Info Row */}
          <div className="flex flex-col sm:flex-col sm:items-normal sm:justify-between gap-2 text-xs sm:text-sm text-gray-600">
            {/* Time and Delivery Info */}
            <div className="flex items-center justify-between sm:justify-start sm:gap-3 flex-1">
              <span className="flex items-center gap-1">
                <Image
                  src="/buffet/clock.svg"
                  alt="Time"
                  width={12}
                  height={12}
                  className="sm:w-3 sm:h-3 md:w-4 md:h-4"
                />
                <span className="truncate">{time}</span>
              </span>
              <span className="flex items-center gap-1">
                <Image
                  src="/buffet/car.svg"
                  alt="Delivery"
                  width={12}
                  height={12}
                  className="sm:w-3 sm:h-3 md:w-4 md:h-4"
                />
                <span className="truncate">{price}</span>
              </span>
            </div>
            
            {/* Category Badge */}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2 sm:px-3 py-1 rounded-full font-semibold text-xs sm:text-sm self-start sm:self-auto whitespace-nowrap">
              {category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
