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
      className="block h-full"
    >
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 cursor-pointer flex flex-col h-full p-3 sm:p-4">
        <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] rounded-lg overflow-hidden">
          {img ? (
            <Image
              src={img}
              alt={name}
              fill
              className="object-cover"
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

        <div className="mt-3 flex flex-col justify-between flex-grow">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base sm:text-lg font-semibold truncate">{name}</h3>
            <div className="flex items-center text-sm text-gray-700 whitespace-nowrap">
              <span className="mr-1">⭐</span>
              <span>{rating}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between mt-2 text-gray-700 text-sm gap-y-2">
            <span className="flex items-center gap-1 whitespace-nowrap">
              <Image
                src="/buffet/clock.svg"
                alt="Time"
                width={14}
                height={14}
              />
              {time}
            </span>

            <span className="flex items-center gap-1 whitespace-nowrap">
              <Image
                src="/buffet/car.svg"
                alt="Delivery"
                width={14}
                height={14}
              />
              {price}
            </span>

            <span className="bg-yellow-400 px-2 py-1 rounded-full font-semibold whitespace-nowrap">
              {category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
