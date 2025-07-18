"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const MoreHotels = ({ hotels = [] }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (hotelId) => {
    setFavorites((prev) =>
      prev.includes(hotelId)
        ? prev.filter((id) => id !== hotelId)
        : [...prev, hotelId]
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {hotels.map((hotel) => {
        const slug = hotel.slug || hotel.id;
        const img =
          hotel?.img && hotel.img.trim() !== ""
            ? hotel.img
            : "/hotels/placeholder.png";

        return (
          <Link key={slug} href={`/home/hotel/rooms/${slug}`}>
            <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition">
              <div className="relative w-full h-48 rounded-lg overflow-hidden">
                <Image src={img} alt={hotel.name} fill style={{ objectFit: "cover" }} />

                <div className="absolute top-2 left-2 bg-gray-900 text-white text-sm px-2 py-1 rounded-lg">
                  ⭐ {hotel.rating?.average ?? 0} ({hotel.rating?.count ?? 0})
                </div>

                <button
                  className="absolute top-2 right-2"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFavorite(slug);
                  }}
                >
                  <Image
                    src={
                      favorites.includes(slug)
                        ? "/home/shops/Heart-red.svg"
                        : "/buffet/newHeart.svg"
                    }
                    alt="Favorite"
                    width={24}
                    height={24}
                  />
                </button>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div>
                  <h3 className="text-lg font-semibold">{hotel.name}</h3>
                  <p className="text-gray-600">{hotel.location}</p>
                </div>
                <div>
                  <span className="text-blue-500 text-xl font-semibold">
                    ₹{hotel.price}
                  </span>
                  <span className="text-gray-500 text-sm"> / night</span>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default MoreHotels;
