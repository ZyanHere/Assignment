"use client";
import { hotelsData } from "@/data/hotelsData";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const HotelCard = () => {
  const [favorites, setFavorites] = useState(
    Array(hotelsData.mostPopular.length).fill(false)
  );

  const toggleFavorite = (index) => {
    setFavorites((prevFavorites) => {
      const newFavorites = [...prevFavorites];
      newFavorites[index] = !newFavorites[index];
      return newFavorites;
    });
  };

  return (
    <div className="mb-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Most Popular</h2>
        <Link
          href="/home/hotel/popular"
          className="text-blue-500 text-lg font-semibold"
        >
          See All
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-7 mt-4 sm:grid-cols-2 lg:grid-cols-4">
        {hotelsData.mostPopular.map((hotel, index) => (
          <Link key={hotel.id} href={`/home/hotel/rooms/${hotel.slug}`}>
            <div className="relative bg-white rounded-lg shadow-md overflow-hidden">
              <Image
                src={hotel.image}
                alt={hotel.name}
                width={300}
                height={200}
                className="w-full h-100 object-cover"
              />

              <div
                className="absolute top-3 right-3 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault(); // Prevents navigation when clicking the heart icon
                  toggleFavorite(index);
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

              <div className="flex justify-between absolute bottom-0 w-full p-4 bg-gradient-to-t from-black to-transparent text-white">
                <div>
                  <h3 className="font-semibold text-lg">{hotel.name}</h3>
                  <p className="text-sm">{hotel.location}</p>
                  <p className="text-sm font-semibold">{hotel.price} Rs/night</p>
                </div>

                <div className="flex items-center text-yellow-400 text-lg mt-1">
                  {"⭐"}
                  <span className="ml-1">{hotel.rating}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HotelCard;
