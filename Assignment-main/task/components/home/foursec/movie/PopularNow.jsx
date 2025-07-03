"use client";
import { movieData } from "@/data/movieData";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const generateSlug = (title) => title.toLowerCase().replace(/\s+/g, "-");

const PopularNow = () => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (movieId) => {
    setFavorites((prev) =>
      prev.includes(movieId) ? prev.filter((id) => id !== movieId) : [...prev, movieId]
    );
  };

  const movies = movieData.PopularNow.slice(0, 4);

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Popular Now</h2>
        <Link href="/home/movie/popular-now" className="text-blue-600 font-medium">
          See All
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {movies.map((movie) => {
          const movieSlug = generateSlug(movie.title);
          return (
            <Link
              key={movie.id}
              href={`/home/movie/popular-now/${movieSlug}`}
              className="relative block"
            >
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
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default PopularNow;