"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/home/Header";
import Footer from "@/components/home/footer";
import FewMinutesLeft from "@/components/home/foursec/movie/FewMinutesLeft";
import PopularNow from "@/components/home/foursec/movie/PopularNow";
import RecommendedMovies from "@/components/home/foursec/movie/RecommandedMovies";
import { useMoviesSWR } from "@/lib/hooks/useMoviesSWR";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import MovieSearchFilters from "@/components/movie/MovieSearchFilters ";
// import MovieSearchFilters from "@/components/movie/movieSearchFilters";

export default function MoviePage() {
  const { data, isLoading, isError, error } = useMoviesSWR({ moviesOnly: true, productsLimit: 60 });
  
  const [filters, setFilters] = useState({
    searchQuery: "",
    genre: [],
    ratingRange: [0, 10]
  });
  const [showFilters, setShowFilters] = useState(false);

  // Combine all movie sections into one array for searching/filtering
  const allMovies = useMemo(() => {
    if (!data) return [];
    return [
      ...(data.fewMinutesLeft || []),
      ...(data.popularNow || []),
      ...(data.recommended || [])
    ];
  }, [data]);

  // Apply search and filters
  const filteredMovies = useMemo(() => {
    return allMovies.filter(movie => {
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        if (!movie.title?.toLowerCase().includes(query)) return false;
      }

      if (filters.genre.length > 0 && !filters.genre.includes(movie.genre)) {
        return false;
      }

      if (movie.rating < filters.ratingRange[0] || movie.rating > filters.ratingRange[1]) {
        return false;
      }

      return true;
    });
  }, [allMovies, filters]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 px-4 sm:px-6 lg:px-8 xl:px-14 pb-14 w-full mx-auto">
        
        {/* Breadcrumb */}
        <nav className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 mt-6 sm:mt-8">
          <Link href="/" className="hover:text-gray-600">Home</Link> &gt;
          <span className="font-semibold text-[#50AEB5]"> Movies</span>
        </nav>

        {/* Filters + Results */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          
          {/* Sidebar Filters */}
          <div className="lg:w-80 flex-shrink-0">
            <MovieSearchFilters
              filters={filters}
              onFiltersChange={setFilters}
              isOpen={showFilters}
              onToggle={() => setShowFilters(!showFilters)}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {isLoading && (
              <div className="flex justify-center items-center py-12">
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
                {filters.searchQuery || filters.genre.length || filters.ratingRange[0] > 0 ? (
                  filteredMovies.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {filteredMovies.map((movie) => (
                        <div key={movie.id} className="bg-white shadow rounded overflow-hidden">
                          <img src={movie.image} alt={movie.title} className="w-full h-48 object-cover" />
                          <div className="p-3">
                            <h3 className="text-sm font-semibold">{movie.title}</h3>
                            <p className="text-xs text-gray-500">⭐ {movie.rating}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">No movies found</p>
                      <Button
                        variant="outline"
                        onClick={() =>
                          setFilters({ searchQuery: "", genre: [], ratingRange: [0, 10] })
                        }
                        className="mt-4"
                      >
                        Clear Filters
                      </Button>
                    </div>
                  )
                ) : (
                  <>
                    <FewMinutesLeft movies={data?.fewMinutesLeft} />
                    <PopularNow movies={data?.popularNow} />
                    <RecommendedMovies movies={data?.recommended} />
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
