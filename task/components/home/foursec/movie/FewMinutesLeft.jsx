"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const FewMinutesLeft = ({ movies = [] }) => {
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
        <Link href="/movies/few-minutes-left" className="text-blue-600 font-medium">
          See All
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {movies.map((movie) => (
          <Link key={movie.id} href={`/home/movies/${movie.slug}`} className="relative block">
            <div className="flex items-center border p-4 rounded-lg shadow-md">
              <Image src={movie.image} alt={movie.title} width={100} height={100} className="rounded-md" />
              <div className="ml-4 flex-1">
                <h3 className="font-semibold">{movie.title} - {movie.date}</h3>
                <p className="text-lg">{movie.time}</p>
                <p className="text-sm flex items-center">📍 {movie.location}</p>
              </div>
              <span className="bg-green-100 px-3 py-1 rounded-md">{movie.price} Rs</span>
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

export default FewMinutesLeft;
