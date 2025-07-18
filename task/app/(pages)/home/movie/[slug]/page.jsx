// app/home/movie/[slug]/page.jsx
"use client";

import Header from "@/components/home/Header";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useMoviesSWR } from "@/lib/hooks/useMoviesSWR";

function humanize(section) {
  return section.replace(/-/g, " ");
}

export default function MovieSectionPage() {
  const { slug } = useParams();
  const [favorites, setFavorites] = useState([]);

  const { data, isLoading, isError, error } = useMoviesSWR({
    moviesOnly: true,
    productsLimit: 100,
  });

  const sectionMovies = (() => {
    if (!data) return [];
    switch (slug) {
      case "few-minutes-left":
        return data.fewMinutesLeft;
      case "popular-now":
        return data.popularNow;
      case "recommended":
        return data.recommended;
      default:
        return data.all;
    }
  })();

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex-1">
      <Header />
      <div className="p-6">
        <nav className="text-2xl mb-6">
          <Link href="/" className="text-gray-500">Home</Link> &gt;
          <Link href="/home/movie" className="text-gray-500"> Movies </Link> &gt;
          <span className="text-yellow-500 font-semibold capitalize">
            {slug ? humanize(slug) : "Loading..."}
          </span>
        </nav>

        {isLoading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500" />
            <span className="ml-2">Loading movies...</span>
          </div>
        )}

        {isError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>Error:</strong> {error?.message || "Failed to load movies."}
          </div>
        )}

        {!isLoading && !isError && (
          <>
            {sectionMovies.length > 0 ? (
              <div className="grid grid-cols-2 gap-6">
                {sectionMovies.map((movie) => (
                  <Link
                    key={movie.id}
                    href={`/home/movie/${movie.slug}`}
                    className="relative block"
                  >
                    <div className="relative shadow-md rounded-lg overflow-hidden flex p-4 bg-white">
                      <Image
                        src={movie.poster}
                        alt={movie.title}
                        width={160}
                        height={160}
                        className="rounded-lg object-contain"
                      />
                      <div className="ml-6 flex-1">
                        <h3 className="font-semibold text-lg truncate">{movie.title}</h3>
                        <p className="text-sm mt-2">{movie.date ?? "N/A"}</p>
                        <p className="text-lg">{movie.time ?? "N/A"}</p>
                        <p className="text-sm flex items-center mt-4">
                          📍 {movie.location || "N/A"}
                        </p>
                      </div>
                      <span className="bg-green-100 text-black px-4 py-2 text-sm font-medium rounded-md self-end whitespace-nowrap">
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
            ) : (
              <p className="text-center text-gray-500">
                {slug ? "No movies found." : "Loading..."}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
