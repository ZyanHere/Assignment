"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

const FewMinutesLeft = ({ movies = [] }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (movieId) => {
    setFavorites((prev) =>
      prev.includes(movieId) ? prev.filter((id) => id !== movieId) : [...prev, movieId]
    );
  };

  return (
    <section className="pl-12 pr-12 mt-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Few Minutes Left</h2>
        <Link href="/home/movie/section/few-minutes-left" className="text-blue-600 font-medium">
          See All
        </Link>
      </div>

      <Carousel className="mt-4">
        <CarouselContent>
          {movies.map((movie) => (
            <CarouselItem key={movie.id} className="md:basis-1/2 lg:basis-1/3">
              <Link
                href={`/home/movie/${movie.id}`}
                className="relative block h-full w-full"
              >
                <div className="relative flex flex-col md:flex-row items-start md:items-center gap-4 border p-4 rounded-lg shadow-md w-full h-[180px] overflow-hidden bg-white">

                  <button
                    className="absolute top-2 right-2 z-10"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleFavorite(movie.id);
                    }}
                  >
                    <Image
                      src={favorites.includes(movie.id) ? "/home/shops/Heart-red.svg" : "/home/shops/Heart.svg"}
                      alt="Favorite"
                      width={24}
                      height={24}
                    />
                  </button>
                  <Image
                    src={movie.poster}
                    alt={movie.title}
                    width={300}
                    height={180}
                    className="rounded-md w-full h-32 sm:h-40 md:h-32 md:w-32 object-cover flex-shrink-0"
                  />
                  <div className="flex flex-col gap-2 flex-1 overflow-hidden">
                    <h3 className="font-semibold text-sm sm:text-base truncate">
                      {movie.title}
                    </h3>
                    {movie.date && (
                      <p className="text-xs sm:text-sm truncate text-gray-600">
                        {movie.date}
                      </p>
                    )}
                    {movie.time && (
                      <p className="text-xs sm:text-sm truncate text-gray-600">
                        {movie.time}
                      </p>
                    )}
                    <p className="text-xs sm:text-sm truncate text-gray-600">
                      📍 {movie.location}
                    </p>
                    {movie.category && movie.category !== "Entertainment" && (
                      <p className="text-xs sm:text-xs truncate text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {movie.category}
                      </p>
                    )}
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="bg-green-100 text-xs sm:text-sm px-3 py-1 rounded-md whitespace-nowrap">
                      Rs {movie.price?.sale ?? movie.price?.base ?? 0}
                    </span>
                  </div>

                </div>

              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default FewMinutesLeft;
