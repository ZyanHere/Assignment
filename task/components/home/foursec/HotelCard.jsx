"use client";
import { hotelsData } from "@/data/hotelsData";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const HotelCard = ({ hotels }) => {
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

  console.log('Hotel Card', hotels);

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

      <Carousel
        opts={{ align: "start", loop: false }}
        className="w-full"
      >

        <CarouselContent>
          {hotels.map((hotel, index) => (
            hotel.variants && (
              <CarouselItem
                key={hotel.variants[0]._id}
                className="basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 pr-4"
              >
                <Link key={hotel.variants[0]._id} href={`/home/hotel/rooms/${hotel.slug}`}>
                  <div className="relative bg-white rounded-lg shadow-md overflow-hidden">
                    <Image
                      src={hotel.variants[0].images[0].url}
                      alt={hotel.variants[0].variant_name}
                      width={300}
                      height={200}
                      className="w-full h-100 object-contain"
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
                        <h3 className="font-semibold text-lg">{hotel.variants[0].variant_name}</h3>
                        <p className="text-sm">{hotel.variants[0].location ? hotel.variants[0].location : "N/A"}</p>
                        <p className="text-sm font-semibold">{hotel.variants[0].price.base_price} Rs/night</p>
                      </div>

                      <div className="flex items-center text-yellow-400 text-lg mt-1">
                        {"⭐"}
                        <span className="ml-1">{hotel.rating.count}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            )
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>

  );
};

export default HotelCard;
