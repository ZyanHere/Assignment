"use client";


import FewMinutesLeft from "@/components/home/foursec/movie/FewMinutesLeft";
import PopularNow from "@/components/home/foursec/movie/PopularNow";
import Recommended from "@/components/home/foursec/movie/RecommandedMovies";
import Header from "@/components/home/Header";
import { useMovies } from "@/lib/hooks/useMovies";
import { useEffect } from "react";

const MoviePage = () => {
  const {
    fetchMoviesData,
    needsDataFetch,
    getCacheStatus,
    fewMinutesLeft,
    popularNow,
    recommended,
    moviesLoading,
    moviesError,
  } = useMovies();

  // Fetch movies data only when needed (no data or cache expired)
  useEffect(() => {
    const cacheStatus = getCacheStatus();

    if (needsDataFetch()) {
      console.log("MoviePage: Data fetch needed, calling movies API");
      console.log("Cache status:", cacheStatus.message);
      fetchMoviesData();
    } else {
      console.log("MoviePage: Using cached data, skipping API call");
      console.log("Cache status:", cacheStatus.message);
    }
  }, [fetchMoviesData, needsDataFetch, getCacheStatus]);

  return (
    <div className="flex-1">
      <Header />
      <div className="p-6">
        <nav className="text-2xl text-gray-600 mb-6">
          Home &gt;{" "}
          <span className="text-yellow-500 font-semibold">Movies</span>
        </nav>

        {moviesLoading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
            <span className="ml-2">Loading movies...</span>
          </div>
        )}

        {moviesError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>Error:</strong> {moviesError}
          </div>
        )}

        {!moviesLoading && !moviesError && (
          <div className="p-6">
            <FewMinutesLeft movies={fewMinutesLeft} />
            <PopularNow movies={popularNow} />
            <Recommended movies={recommended} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviePage;
