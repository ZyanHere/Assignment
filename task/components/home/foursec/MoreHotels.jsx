"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const MoreHotels = ({ hotels }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (hotelId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(hotelId)
        ? prevFavorites.filter((id) => id !== hotelId)
        : [...prevFavorites, hotelId]
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4 sm:px-0">
      {hotels.map((hotel) => (
        <Link key={hotel.id} href={`/home/hotel/rooms/${hotel.slug}`}>
          <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition">
        
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
              <Image
                src={hotel.image}
                alt={hotel.name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />

              <div className="absolute top-2 left-2 bg-gray-900 text-white text-xs px-2 py-1 rounded-lg flex items-center">
                ⭐ {hotel.rating}
              </div>

              <button
                className="absolute top-2 right-2 z-10"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleFavorite(hotel.id);
                }}
              >
                <Image
                  src={
                    favorites.includes(hotel.id)
                      ? "/home/shops/Heart-red.svg"
                      : "/home/shops/Heart.svg"
                  }
                  alt="Favorite"
                  width={24}
                  height={24}
                />
              </button>
            </div>

            
            <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mt-4">
              <div>
                <h3 className="text-base sm:text-lg font-semibold">{hotel.name}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{hotel.location}</p>
              </div>

              <div className="mt-2 sm:mt-0 text-right">
                <span className="text-blue-500 text-lg sm:text-xl font-semibold block">
                  {hotel.price} Rs
                </span>
                <span className="text-gray-500 text-xs sm:text-sm">Per Night</span>
              </div>
            </div>

            
            <div className="flex flex-wrap items-center gap-4 text-gray-700 mt-3 text-sm sm:text-base">
              <div className="flex items-center">🛏 {hotel.bed} bed</div>
              <div className="flex items-center">🛁 {hotel.bathroom} bathroom</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MoreHotels;
