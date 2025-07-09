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

      <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row gap-4 mt-4">
        {movies.map((movie) => {
          const movieSlug = generateSlug(movie.title);
          return (
            <Link
              key={movie.id}
              href={`/home/movie/popular-now/${movieSlug}`}
              className="relative block"
            >
              <div className="relative bg-white shadow-md rounded-lg overflow-hidden h-full ">
                <Image
                  src={movie.image}
                  alt={movie.title}
                  width={250}
                  height={300}
                  className=" w-full sm:h-78  md:h-54 lg:h-50  xl:h-65 object-contain rounded-t-md"


                />

                <div className="p-3">
                  <h3 className="font-semibold text-sm sm:text-base truncate">{movie.title}</h3>
                  <p className="text-xs sm:text-sm">{movie.date}</p>
                  <p className="text-xs sm:text-sm">{movie.time}</p>
                  <div className="mt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <p className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">📍 {movie.location}</p>
                    <span className="bg-yellow-400 text-black text-xs sm:text-sm px-3 py-1 rounded-md whitespace-nowrap">
                      Rs {movie.price} 
                    </span>
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
