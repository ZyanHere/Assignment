// components/home/foursec/HotelCard.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Heart, Star } from "lucide-react";

const HotelCard = ({ hotels = [] }) => {
  // Track favorites per hotel
  const [favorites, setFavorites] = useState(() => Array(hotels.length).fill(false));

  // Adjust favorites if hotels length changes
  useMemo(() => {
    setFavorites((prev) => {
      if (prev.length === hotels.length) return prev;
      return Array(hotels.length).fill(false);
    });
  }, [hotels.length]);

  const toggleFavorite = (index) => {
    setFavorites((prevFavorites) => {
      const newFavorites = [...prevFavorites];
      newFavorites[index] = !newFavorites[index];
      return newFavorites;
    });
  };

  return (
    <div className="mb-6 p-6">
      <div className="flex justify-end items-center">
        {/* <h2 className="text-xl font-semibold">Most Popular</h2> */}
        <Link
          href="/home/hotel/popular"
          className="text-blue-500 text-lg font-semibold"
        >
          See All
        </Link>
      </div>

      <Carousel opts={{ align: "start", loop: false }} className="w-full">
        <CarouselContent>
          {hotels.map((hotel, index) => {
            // Representative variant
            const v = hotel?.variants?.[0];
            const img =
              v?.images?.[0]?.url ||
              hotel?.img ||
              "/hotels/placeholder.png";
            const title = v?.variant_name || hotel?.name || "Untitled";
            const location = v?.location || hotel?.location || "N/A";
            const price =
              v?.price?.base_price ??
              v?.price?.sale_price ??
              hotel?.price ??
              0;
            const ratingCount = hotel?.rating?.count ?? 0;
            const slug = hotel?.slug || hotel?.id;

            return (
              <CarouselItem
                key={slug}
                className="basis-[80%] sm:basis-[55%] md:basis-[40%] lg:basis-[22%] shrink-0 pr-4"
              >
                <Link href={`/home/hotel/rooms/${hotel.slug || hotel.id}`}>
                  <div className="relative bg-white rounded-lg shadow-md overflow-hidden">
                    <Image
                      src={img}
                      alt={title}
                      width={300}
                      height={200}
                      className="w-full h-100 object-contain"
                    />

                    <button
                      type="button"
                      aria-label="Toggle Favorite"
                      className="absolute top-3 right-3 cursor-pointer bg-white rounded-full p-2 shadow-md"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(index);
                      }}
                    >
                      <Heart
                        size={24}
                        stroke={favorites[index] ? "red" : "black"}
                        fill={favorites[index] ? "red" : "none"}
                        strokeWidth={2}
                      />
                    </button>

                    <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black to-transparent text-white flex justify-between items-end">
                      <div className="flex flex-col gap-6">
                        <h3 className="font-semibold text-lg">{title}</h3>
                        <p className="text-sm">{location}</p>
                        <p className="text-lg font-semibold">{price} Rs/night</p>
                      </div>
                      <div className="flex items-center text-yellow-400 text-lg ml-6 mb-1">
                        <Star size={20} color="#facc15" fill="#facc15" />
                        <span className="ml-2">{ratingCount}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default HotelCard;
