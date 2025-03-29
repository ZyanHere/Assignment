"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { movieData } from "@/data/movieData";
import { useState, useEffect } from "react";
import Header from "@/components/home/Header";
import Sidebar from "@/components/home/sidebar";

const generateSlug = (title) => title.toLowerCase().replace(/\s+/g, "-");

const MovieSectionPage = () => {
  const params = useParams();
  const slug = params?.slug;

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!slug) console.error("Movie slug is undefined");
  }, [slug]);

  const sectionMap = {
    "few-minutes-left": movieData.FewMinutesLeft,
    "popular-now": movieData.PopularNow,
    "recommended": movieData.Recommanded,
  };

  const movies = sectionMap[slug] || [];

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
          <nav className="text-2xl mb-6">
            <Link href="/" className="text-gray-500">Home</Link> &gt;
            <Link href="/home/movie" className="text-gray-500"> Movies </Link> &gt;
            <span className="text-yellow-500 font-semibold capitalize">
              {slug ? slug.replace(/-/g, " ") : "Loading..."}
            </span>
          </nav>

          {movies.length > 0 ? (
            <div className="grid grid-cols-2 gap-6">
              {movies.map((movie) => {
                const movieSlug = generateSlug(movie.title);
                return (
                  <Link
                    key={movie.id}
                    href={`/home/movie/${slug}/${movieSlug}`}
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
          ) : (
            <p className="text-center text-gray-500">
              {slug ? "No movies found." : "Loading..."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieSectionPage;