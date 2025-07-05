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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {hotels.map((hotel) => (
        <Link key={hotel.id} href={`/home/hotel/rooms/${hotel.slug}`}>
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
              <Image
                src={hotel.image}
                alt={hotel.name}
                layout="fill"
                objectFit="cover"
              />

              <div className="absolute top-2 left-2 bg-gray-900 text-white text-sm px-2 py-1 rounded-lg flex items-center">
                ⭐ {hotel.rating}
              </div>

              <button
                className="absolute top-2 right-2"
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

            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold mt-4">{hotel.name}</h3>
                <p className="text-gray-600">{hotel.location}</p>
              </div>

              <div className="flex flex-col mt-2">
                <span className="text-blue-500 text-xl font-semibold">
                  {hotel.price} Rs
                </span>
                <span className="text-gray-500 text-sm">Per Night</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-gray-700 mt-2">
              <div className="flex items-center">🛏 {hotel.bed} bed</div>
              <div className="flex items-center">
                🛁 {hotel.bathroom} bathroom
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MoreHotels;
