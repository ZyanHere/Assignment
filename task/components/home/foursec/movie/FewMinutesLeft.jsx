"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const FewMinutesLeft = ({ movies }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (movieId) => {
    setFavorites((prev) =>
      prev.includes(movieId) ? prev.filter((id) => id !== movieId) : [...prev, movieId]
    );
  };

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Few Minutes Left</h2>
        <Link href="/home/movie/few-minutes-left" className="text-blue-600 font-medium">
          See All
        </Link>
      </div>

      <Carousel className="mt-4">
        <CarouselContent>
          {movies.map((movie) =>
            movie.variants && (
              <CarouselItem key={movie.id} className="md:basis-1/2 lg:basis-1/3">
                <Link
                  href={`/home/movie/few-minutes-left/${movie.variants[0].variant_name}`}
                  className="relative block max-w-xs w-full mx-auto"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border p-4 rounded-lg shadow-md w-full h-full bg-white">
                    <Image
                      src={movie.variants[0].images[0].url}
                      alt={movie.variants[0].variant_name}
                      width={300}
                      height={180}
                      className="rounded-md w-full h-32 sm:h-40 md:h-32 object-contain"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm sm:text-base truncate w-full">
                        {movie.variants[0].variant_name} - {movie.date ?? "N/A"}
                      </h3>
                      <p className="text-xs sm:text-sm truncate w-full">{movie.time ?? "N/A"}</p>
                      <p className="text-xs sm:text-sm truncate w-full text-gray-600">
                        📍 {movie.location ?? "N/A"}
                      </p>
                    </div>
                    <div className="shrink-0">
                      <span className="bg-green-100 text-xs sm:text-sm px-3 py-1 rounded-md whitespace-nowrap">
                        Rs {movie.variants[0].price.base_price}
                      </span>
                    </div>
                  </div>
                  <button
                    className="absolute top-2 right-2"
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
                </Link>
              </CarouselItem>
            )
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default FewMinutesLeft;
