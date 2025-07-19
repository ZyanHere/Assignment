"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { useProduct } from "@/lib/contexts/productContext";

const MoreHotels = ({ hotels = [] }) => {

  const [favorites, setFavorites] = useState([]);
  const { selectedVariant, setSelectedProduct, setSelectedVariant } = useProduct();

  const toggleFavorite = (hotelId) => {
    setFavorites((prev) =>
      prev.includes(hotelId)
        ? prev.filter((id) => id !== hotelId)
        : [...prev, hotelId]
    );
  };

  return (
    <div className="flex flex-col gap-6">
      {hotels.map((hotel, index) => {
        const slug = hotel.slug || hotel.id;
        const img =
          hotel?.img && hotel.img.trim() !== ""
            ? hotel.img
            : "/hotels/placeholder.png";

        return (
          <Link key={slug} href={`/home/hotel/rooms/${slug}`}>
            <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition" onClick={() => setSelectedProduct(hotel)}>
              <div className="relative w-full h-[350px] rounded-lg overflow-hidden">
                <Image src={img} alt={hotel.name} fill className="object-contain" />

                <div className="flex gap-2 justify-between absolute top-2 left-2 bg-black/20 text-white text-sm px-4 py-2 rounded-2xl ">
                  <Star size={20} color="#facc15" fill="#facc15" /> {hotel.rating?.average ?? 0} ({hotel.rating?.count ?? 0})
                </div>

                <button
                  className="absolute top-2 right-2  bg-black/10 rounded-full p-2 shadow-md"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFavorite(slug);
                  }}
                >
                  <Heart
                    size={24}
                    stroke={favorites[index] ? "red" : "white"}
                    fill={favorites[index] ? "red" : "none"}
                    strokeWidth={2}
                  />
                </button>
              </div>

              <div className="flex justify-between items-center mt-12">
                <div className="space-y-8">
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
