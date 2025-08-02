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
import { useProduct } from "@/lib/contexts/productContext";
import { Badge } from "@/components/ui/badge";

const HotelCard = ({ hotels = [], title = "Popular Hotels", showSeeAll = true }) => {
  // Track favorites per hotel
  const [favorites, setFavorites] = useState(() => Array(hotels.length).fill(false));
  const { selectedProduct, setSelectedProduct } = useProduct();
  
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
    <div className="mb-6 sm:mb-8">
      {/* Section Header */}
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
          {title}
        </h2>
        {showSeeAll && (
          <Link
            href="/home/hotel/popular"
            className="text-blue-600 hover:text-blue-700 text-sm sm:text-base font-medium transition-colors"
          >
            See All
          </Link>
        )}
      </div>

      {/* Hotel Carousel */}
      <Carousel 
        opts={{ 
          align: "start", 
          loop: false,
          slidesToScroll: 1
        }} 
        className="w-full"
      >
        <CarouselContent className="-ml-2 sm:-ml-4">
          {hotels.map((hotel, index) => {
            // Representative variant
            const v = hotel?.variants?.[0];
            const img =
              v?.images?.[0]?.url ||
              hotel?.images?.[0]?.url ||
              hotel?.img ||
              "/hotels/placeholder.png";
            const title = v?.variant_name || hotel?.name || "Untitled";
            const location = v?.location || hotel?.location || hotel?.address || "N/A";
            const price =
              v?.price?.sale_price ??
              v?.price?.base_price ??
              hotel?.price ??
              0;
            const rating = hotel?.rating?.average || 0;
            const ratingCount = hotel?.rating?.count || 0;
            const slug = hotel?.slug || hotel?.id;
            const isGuestFavorite = hotel?.isGuestFavorite || Math.random() > 0.7; // Random for demo

            return (
              <CarouselItem
                key={slug}
                className="pl-2 sm:pl-4 basis-[85%] sm:basis-[60%] md:basis-[45%] lg:basis-[35%] xl:basis-[28%] 2xl:basis-[22%] shrink-0"
              >
                <Link href={`/home/hotel/rooms/${hotel.slug || hotel.id}`}>
                  <div 
                    className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer"
                    onClick={() => setSelectedProduct(hotel)}
                  >
                    {/* Image Container */}
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <Image
                        src={img}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 85vw, (max-width: 768px) 60vw, (max-width: 1024px) 45vw, (max-width: 1280px) 35vw, (max-width: 1536px) 28vw, 22vw"
                      />
                      
                      {/* Guest Favorite Badge */}
                      {isGuestFavorite && (
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-white text-gray-800 text-xs font-medium px-2 py-1 shadow-sm">
                            Guest favourite
                          </Badge>
                        </div>
                      )}

                      {/* Heart Button */}
                      <button
                        type="button"
                        aria-label="Toggle Favorite"
                        className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors z-10"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleFavorite(index);
                        }}
                      >
                        <Heart
                          size={18}
                          className={`transition-colors ${
                            favorites[index] 
                              ? "fill-red-500 stroke-red-500" 
                              : "stroke-gray-600 hover:stroke-red-500"
                          }`}
                          strokeWidth={2}
                        />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-3 sm:p-4">
                      {/* Title and Location */}
                      <div className="mb-2">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-1">
                          {title}
                        </h3>
                        <p className="text-gray-600 text-xs sm:text-sm line-clamp-1">
                          {location}
                        </p>
                      </div>

                      {/* Price and Rating */}
                      <div className="flex justify-between items-end">
                        <div className="flex-1">
                          <p className="text-gray-900 font-semibold text-sm sm:text-base">
                            ₹{price.toLocaleString()} for 2 nights
                          </p>
                        </div>
                        <div className="flex items-center gap-1 ml-2">
                          <Star 
                            size={14} 
                            className="text-yellow-400 fill-current flex-shrink-0" 
                          />
                          <span className="text-gray-700 text-xs sm:text-sm font-medium">
                            {rating.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        
        {/* Navigation Arrows */}
        <CarouselPrevious className="left-2 sm:left-4 h-8 w-8 sm:h-10 sm:w-10" />
        <CarouselNext className="right-2 sm:right-4 h-8 w-8 sm:h-10 sm:w-10" />
      </Carousel>
    </div>
  );
};

export default HotelCard;
