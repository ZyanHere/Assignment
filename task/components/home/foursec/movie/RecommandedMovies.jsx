"use client";
import { movieData } from "@/data/movieData";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const generateSlug = (title) => title.toLowerCase().replace(/\s+/g, "-");

const Recommended = ({ movies }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (movieId) => {
    setFavorites((prev) =>
      prev.includes(movieId) ? prev.filter((id) => id !== movieId) : [...prev, movieId]
    );
  };

  //const movies = movieData.Recommanded.slice(0, 3);

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Recommended for You</h2>
        <Link href="/home/movie/recommended" className="text-blue-600 font-medium">
          See All
        </Link>
      </div>

      {/* EDIT 1: responsive spacing and stacking */}
      <div className="flex flex-col gap-6 mt-4">
        {movies.map((movie) => {
          //const movieSlug = generateSlug(movie.title);
          return (
            movie.variants &&
            <Link
              key={movie.id}
              href={`/home/movie/recommended/${movie.variants[0].variant_name}`}
              className="relative block"
            >

              {/*  EDIT 2: responsive layout to flex card */}
              <div className="relative bg-white shadow-md rounded-lg overflow-hidden flex flex-col sm:flex-row p-4 gap-4">

                {/*  EDIT 3: image responsive on small screens */}
                <Image
                  src={movie.variants[0].images[0].url}
                  alt={movie.variants[0].variant_name}
                  width={160}
                  height={160}
                  className="rounded-lg object-contain w-full sm:w-40 h-auto"
                />

                <div className="sm:ml-4 flex-1">
                  {/*  EDIT 4: Responsive text sizing */}
                  <h3 className="font-semibold text-sm sm:text-lg">{movie.variants[0].variant_name}</h3>
                  <p className="text-xs sm:text-sm mt-2">{movie.date ?? "N/A"}</p>
                  <p className="text-xs sm:text-base">{movie.time ?? "N/A"}</p>
                  <p className="text-xs sm:text-sm flex items-center mt-4 text-gray-600">
                    📍 {movie.location ?? "N/A"}
                  </p>
                </div>

                {/*  EDIT 5:  price badge fits  on all screens */}
                <span className="bg-green-100 text-black text-xs sm:text-sm px-4 py-2 font-medium rounded-md mt-4 sm:mt-0 self-start sm:self-end whitespace-nowrap">
                  Rs {movie.variants[0].price.base_price}
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
          );
        })}
      </div>
    </section>
  );
};

export default Recommended;
