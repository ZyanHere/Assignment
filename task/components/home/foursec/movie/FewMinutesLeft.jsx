"use client";
import { movieData } from "@/data/movieData";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const generateSlug = (title) => title.toLowerCase().replace(/\s+/g, "-");

const FewMinutesLeft = () => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (movieId) => {
    setFavorites((prev) =>
      prev.includes(movieId) ? prev.filter((id) => id !== movieId) : [...prev, movieId]
    );
  };

  const movies = movieData.FewMinutesLeft.slice(0, 3);

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Few Minutes Left</h2>
        <Link href="/home/movie/few-minutes-left" className="text-blue-600 font-medium">
          See All
        </Link>
      </div>

      {/* Horizontal scroll on mobile, grid on md+ */}
      <div className="flex gap-4 mt-4 overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 md:overflow-x-visible">
        {movies.map((movie) => {
          const movieSlug = generateSlug(movie.title);
          return (
            <Link 
              key={movie.id} 
              href={`/home/movie/few-minutes-left/${movieSlug}`}
              className="relative block min-w-[80vw] max-w-xs snap-center md:min-w-0 md:max-w-full md:w-full"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border p-4 rounded-lg shadow-md w-full h-full bg-white">
                
                <Image 
                  src={movie.image} 
                  alt={movie.title} 
                  width={300} 
                  height={180} 
                  className="rounded-md w-full h-32 sm:h-40 md:h-32 object-cover" 
                />
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm sm:text-base truncate w-full">
                    {movie.title} - {movie.date}
                  </h3>
                  <p className="text-xs sm:text-sm truncate w-full">{movie.time}</p>
                  <p className="text-xs sm:text-sm truncate w-full text-gray-600">
                    📍 {movie.location}
                  </p>
                </div>

                {/* Price badge wrapper to prevent wrap/overflow */}
                <div className="shrink-0">
                  <span className="bg-green-100 text-xs sm:text-sm px-3 py-1 rounded-md whitespace-nowrap">
                  Rs {movie.price} 
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
          );
        })}
      </div>
    </section>
  );
};

export default FewMinutesLeft;
