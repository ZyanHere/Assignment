"use client";

import Header from "@/components/home/Header";
import FewMinutesLeft from "@/components/home/foursec/movie/FewMinutesLeft";
import PopularNow from "@/components/home/foursec/movie/PopularNow";
import RecommendedMovies from "@/components/home/foursec/movie/RecommandedMovies";
import { useMoviesSWR } from "@/lib/hooks/useMoviesSWR";
import Link from "next/link";

export default function MoviePage() {
  const { data, isLoading, isError, error } = useMoviesSWR({ moviesOnly: true, productsLimit: 60 });

  return (
    <div className="flex-1">
      <Header />
      <div className="p-6">
        <nav className="text-2xl mb-4">
          <Link href="/">Home</Link> &gt;{" "} <span className="font-semibold text-yellow-500">Movies</span>
        </nav>

        {isLoading && <p>Loading movies...</p>}
        {isError && <p className="text-red-500">{error.message}</p>}

        {!isLoading && data && (
          <div className="space-y-12">
            <FewMinutesLeft movies={data.fewMinutesLeft} />
            <PopularNow movies={data.popularNow} />
            <RecommendedMovies movies={data.recommended} />
          </div>
        )}
      </div>
    </div>
  );
}
