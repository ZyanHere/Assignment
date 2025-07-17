"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function RestaurantCard({
  img,
  name,
  rating,
  time,
  price,
  category,
  id,
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

  const ratingValue =
    rating && typeof rating === "object" ? rating.average : rating;

  const categoryValue =
    category && typeof category === "object" ? category.name : category;

  return (
    <Link href={`/home/buffet/restaurant/${id}`} className="block">
      <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300 cursor-pointer">
        <div className="relative">
          {img ? (
            <Image
              src={img}
              alt={name}
              width={300}
              height={200}
              className="w-full h-40 object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-40 bg-gray-200 rounded-lg" />
          )}

          <div
            className="absolute top-2 right-2 cursor-pointer"
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
              width={32}
              height={32}
            />
          </div>
        </div>

        <div className="mt-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{name}</h3>
            <div className="flex items-center text-sm text-gray-700">
              <span className="mr-1">⭐</span>
              <span>{ratingValue}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2 text-gray-700">
            <span className="text-sm flex items-center gap-1">
              <Image src="/buffet/clock.svg" alt="Time" width={14} height={14} />
              {time}
            </span>
            <span className="text-sm flex items-center gap-1">
              <Image src="/buffet/car.svg" alt="Delivery" width={14} height={14} />
              {price}
            </span>
            <span className="text-sm bg-yellow-400 px-2 py-1 rounded-full font-semibold">
              {categoryValue}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
