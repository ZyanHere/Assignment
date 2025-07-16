"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
    <Link href={`/home/buffet/restaurant/${getSlug(name)}`} className="block h-full">
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 cursor-pointer flex flex-col h-full p-4">
        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
          <Image
            src={img}
            alt={name}
            fill
            className="object-cover"
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
              width={32}
              height={32}
            />
          </div>
        </div>

        <div className="mt-3 flex flex-col justify-between flex-grow">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold truncate">{name}</h3>
            <div className="flex items-center text-sm text-gray-700">
              <span className="mr-1">⭐</span>
              <span>{rating}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2 text-gray-700">
            <span className="text-sm flex items-center gap-1 whitespace-nowrap">
              <Image src="/buffet/clock.svg" alt="Time" width={14} height={14} />
              {time}
            </span>

            <span className="text-sm whitespace-nowrap">
              {price}
            </span>
          </div>

          <div className="mt-2">
            <span className="text-sm bg-yellow-400 px-2 py-1 rounded-full font-semibold whitespace-nowrap">
              {category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;