"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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
        <Link href="/movies/popular-now" className="text-blue-600 font-medium">
          See All
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {movies.map((movie) => (
          <Link key={movie.id} href={`/home/movies/${movie.slug}`} className="relative block">
            <div className="relative bg-white shadow-md rounded-lg overflow-hidden">
              <Image src={movie.image} alt={movie.title} width={500} height={300} className="w-full h-[200px] object-cover" />
              <div className="p-3">
                <h3 className="font-semibold">{movie.title}</h3>
                <p className="text-sm">{movie.date}</p>
                <p className="text-lg">{movie.time}</p>
                <div className="mt-3 flex justify-between items-center">
                  <p className="text-sm text-gray-600">📍 {movie.location}</p>
                  <span className="bg-yellow-400 text-black px-3 py-1 rounded-md">{movie.price} Rs</span>
                </div>
              </div>
            </div>
            {/* Heart Button */}
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
        ))}
      </div>
    </section>
  );
};

export default PopularNow;
