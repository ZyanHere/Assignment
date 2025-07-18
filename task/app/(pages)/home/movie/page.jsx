// app/home/movie/page.jsx
"use client";

import Header from "@/components/home/Header";
import FewMinutesLeft from "@/components/home/foursec/movie/FewMinutesLeft";
import PopularNow from "@/components/home/foursec/movie/PopularNow";
import Recommended from "@/components/home/foursec/movie/RecommandedMovies";
import { useMoviesSWR } from "@/lib/hooks/useMoviesSWR";

export default function MoviePage() {
  const { data, isLoading, isError, error } = useMoviesSWR({
    moviesOnly: true,      // pass false if backend not yet filtering
    productsLimit: 60,     // grab enough to fill all 3 sections
  });

  const fewMinutesLeft = data?.fewMinutesLeft ?? [];
  const popularNow = data?.popularNow ?? [];
  const recommended = data?.recommended ?? [];

  // debug
  if (typeof window !== "undefined") {
    console.log("MoviePage fewMinutesLeft", fewMinutesLeft);
    console.log("MoviePage popularNow", popularNow);
    console.log("MoviePage recommended", recommended);
  }

  return (
    <div className="flex-1">
      <Header />
      <div className="p-6">
        {/* Breadcrumb */}
        <nav className="text-2xl mb-4">
          <a href="/" className="text-black">Home</a> &gt;{" "}
          <span className="font-semibold text-yellow-500">Movies</span>
        </nav>

        {isLoading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500" />
            <span className="ml-2">Loading movies...</span>
          </div>
        )}

        {isError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>Error:</strong> {error?.message || "Failed to load movies"}
          </div>
        )}

        {!isLoading && !isError && (
          <div className="p-6">
            <FewMinutesLeft movies={fewMinutesLeft} />
            <PopularNow movies={popularNow} />
            <Recommended movies={recommended} />
          </div>
        )}
      </div>
    </div>
  );
}
