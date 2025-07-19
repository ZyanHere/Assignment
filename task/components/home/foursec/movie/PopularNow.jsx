"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const PopularNow = ({ movies = [] }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (movieId) => {
    setFavorites((prev) =>
      prev.includes(movieId) ? prev.filter((id) => id !== movieId) : [...prev, movieId]
    );
  };

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Popular Now</h2>
        <Link href="/home/movie/popular-now" className="text-blue-600 font-medium">
          See All
        </Link>
      </div>

      <div className="mt-4">
        <Carousel>
          <CarouselContent>
            {movies.map((movie) => (
              <CarouselItem key={movie.id} className="basis-full md:basis-1/2 lg:basis-1/4 px-2">
                <Link
                  href={`/home/movie/${movie.id}`}
                  className="relative block"
                >
                  <div className="relative bg-white shadow-md rounded-lg overflow-hidden h-full">
                    <Image
                      src={movie.poster}
                      alt={movie.title}
                      width={250}
                      height={300}
                      className="w-full sm:h-78 md:h-54 lg:h-50 xl:h-65 object-contain rounded-t-md"
                    />
                    <div className="p-3">
                      <h3 className="font-semibold text-sm sm:text-base truncate">
                        {movie.title}
                      </h3>
                      <p className="text-xs sm:text-sm">{movie.date ?? "N/A"}</p>
                      <p className="text-xs sm:text-sm">{movie.time ?? "N/A"}</p>
                      <div className="mt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <p className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                          📍 {movie.location ?? "N/A"}
                        </p>
                        <span className="bg-yellow-400 text-black text-xs sm:text-sm px-3 py-1 rounded-md whitespace-nowrap">
                          Rs {movie.price?.sale ?? movie.price?.base ?? 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default PopularNow;
