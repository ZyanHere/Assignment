"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { movieData } from "@/data/movieData";
import { useState } from "react";
import Header from "@/components/home/Header";
import Sidebar from "@/components/home/sidebar";

const MovieSectionPage = () => {
  const { slug } = useParams();
  const [favorites, setFavorites] = useState([]);

  // Map slug to the correct data section
  const sectionMap = {
    "few-minutes-left": movieData.FewMinutesLeft,
    "popular-now": movieData.PopularNow,
    recommended: movieData.Recommanded,
  };

  // Get movies based on slug
  const movies = sectionMap[slug] || [];

  // Toggle favorite function
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6">
          {/* Breadcrumb */}
          <nav className="text-2xl mb-6">
            Home &gt; Movies &gt;{" "}
            <span className="text-yellow-500 font-semibold">
              {slug.replace(/-/g, " ")}
            </span>
          </nav>

          {/* Movies Grid */}
          <div className="grid grid-cols-2 gap-6">
            {movies.slice(0, 6).map((movie) => (
              <Link
                key={movie.id}
                href={`/home/movies/${movie.slug}`}
                className="relative block"
              >
                <div className="relative shadow-md rounded-lg overflow-hidden flex p-4">
                  <Image
                    src={movie.image}
                    alt={movie.title}
                    width={160}
                    height={160}
                    className="rounded-lg object-cover"
                  />
                  <div className="ml-6 flex-1">
                    <h3 className="font-semibold text-lg">{movie.title}</h3>
                    <p className="text-sm mt-2">{movie.date}</p>
                    <p className="text-lg">{movie.time}</p>
                    <p className="text-sm flex items-center mt-4">
                      📍 {movie.location}
                    </p>
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
        </div>
      </div>
    </div>
  );
};

export default MovieSectionPage;
