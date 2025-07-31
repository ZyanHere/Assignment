"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Recommended = ({ movies = [] }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (movieId) => {
    setFavorites((prev) =>
      prev.includes(movieId) ? prev.filter((id) => id !== movieId) : [...prev, movieId]
    );
  };

  return (
    <section className="pl-12 pr-12 mt-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Recommended for You</h2>
        <Link href="/home/movie/section/recommended" className="text-blue-600 font-medium">
          See All
        </Link>
      </div>

      <div className="flex flex-col gap-6 mt-4">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            href={`/home/movie/${movie.id}`}
            className="relative block"
          >
            <div className="relative bg-white shadow-md rounded-lg overflow-hidden flex flex-col sm:flex-row p-4 gap-4">
              <Image
                src={movie.poster}
                alt={movie.title}
                width={160}
                height={160}
                className="rounded-lg object-contain w-full sm:w-40 h-auto"
              />

              <div className="sm:ml-4 flex-1">
                <h3 className="font-semibold text-sm sm:text-lg">{movie.title}</h3>
                {movie.date && (
                  <p className="text-xs sm:text-sm mt-2 text-gray-600">
                    {movie.date}
                  </p>
                )}
                {movie.time && (
                  <p className="text-xs sm:text-base text-gray-600">
                    {movie.time}
                  </p>
                )}
                <p className="text-xs sm:text-sm flex items-center mt-4 text-gray-600">
                  📍 {movie.location}
                </p>
                {movie.category && movie.category !== "Entertainment" && (
                  <div className="mt-2">
                    <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {movie.category}
                    </span>
                  </div>
                )}
              </div>

              <span className="bg-green-100 text-black text-xs sm:text-sm px-4 py-2 font-medium rounded-md mt-4 sm:mt-0 self-start sm:self-end whitespace-nowrap">
                Rs {movie.price?.sale ?? movie.price?.base ?? 0}
              </span>
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
                src={
                  favorites.includes(movie.id)
                    ? "/home/shops/Heart-red.svg"
                    : "/home/shops/Heart.svg"
                }
                alt="Favorite"
                width={24}
                height={24}
              />
            </button>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Recommended;
