"use client";
import { movieData } from "@/data/movieData";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Recommended = () => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (movieId) => {
    setFavorites((prev) =>
      prev.includes(movieId) ? prev.filter((id) => id !== movieId) : [...prev, movieId]
    );
  };

  const movies = movieData.Recommanded.slice(0, 3);

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Recommended for You</h2>
        <Link href="/home/movie/recommended" className="text-blue-600 font-medium">
          See All
        </Link>
      </div>
      <div className="flex flex-col gap-6 mt-4">
        {movies.map((movie) => (
          <Link key={movie.id} href={`/home/movie/${movie.slug}`} className="relative block">
            <div className="relative bg-white shadow-md rounded-lg overflow-hidden flex p-4">
              <Image src={movie.image} alt={movie.title} width={160} height={160} className="rounded-lg object-cover" />
              <div className="ml-6 flex-1 mt-4">
                <h3 className="font-semibold text-lg">{movie.title}</h3>
                <p className="text-sm mt-2">{movie.date}</p>
                <p className="text-lg">{movie.time}</p>
                <p className="text-sm flex items-center mt-4">📍 {movie.location}</p>
              </div>
              <span className="bg-green-100 text-black px-4 py-2 text-sm font-medium rounded-md self-end">
                {movie.price} Rs
              </span>
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

export default Recommended;
