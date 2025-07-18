"use client";

import Header from "@/components/home/Header";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useMoviesSWR } from "@/lib/hooks/useMoviesSWR";

export default function MovieSectionPage() {
  const { slug } = useParams();
  const { data, isLoading, isError, error } = useMoviesSWR({ moviesOnly: true, productsLimit: 100 });

  const sectionMap = {
    "few-minutes-left": data?.fewMinutesLeft ?? [],
    "popular-now": data?.popularNow ?? [],
    recommended: data?.recommended ?? [],
  };
  const movies = sectionMap[slug] || [];

  return (
    <div className="flex-1">
      <Header />
      <div className="p-6">
        <nav className="text-2xl mb-6">
          Home &gt; <Link href="/home/movie" className="text-gray-500">Movies</Link> &gt;{" "}
          <span className="text-yellow-500 capitalize">{slug.replace(/-/g, " ")}</span>
        </nav>

        {isLoading && <p>Loading section...</p>}
        {isError && <p className="text-red-500">{error.message}</p>}

        {movies.length > 0 ? (
          <div className="grid grid-cols-2 gap-6">
            {movies.map((movie) => (
              <Link key={movie.id} href={`/home/movie/${movie.id}`} className="block">
                <div className="flex shadow-md rounded-lg overflow-hidden">
                  <Image
                    src={movie.poster || "/placeholder.jpg"}
                    alt={movie.title}
                    width={160}
                    height={160}
                    className="object-cover"
                  />
                  <div className="p-4 flex-1">
                    <h3 className="font-semibold text-lg">{movie.title}</h3>
                    <p className="text-sm text-gray-600">{movie.location}</p>
                    <p className="mt-2 text-yellow-500 font-bold">₹{movie.price.sale}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No movies found.</p>
        )}
      </div>
    </div>
  );
}
