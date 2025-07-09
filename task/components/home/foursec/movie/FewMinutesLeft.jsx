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

      {/* Grid layout: 1 on mobile, 2 on tablet, 3 on laptop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {movies.map((movie) => {
          const movieSlug = generateSlug(movie.title);
          return (
            <Link 
              key={movie.id} 
              href={`/home/movie/few-minutes-left/${movieSlug}`}
              className="relative block"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border p-4 rounded-lg shadow-md w-full">
                
                <Image 
                  src={movie.image} 
                  alt={movie.title} 
                  width={100} 
                  height={100} 
                  className="rounded-md w-full md:w-24 h-auto object-" 
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
