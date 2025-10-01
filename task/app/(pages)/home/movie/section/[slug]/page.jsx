"use client";

import { useState, useMemo } from "react";
import Header from "@/components/home/Header";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useMoviesSWR } from "@/lib/hooks/useMoviesSWR";
// import MovieSearchFilters from "@/components/movie/MovieSearchFilters";
import HotelSortOptions from "@/components/hotel/HotelSortOptions";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import MovieSearchFilters from "@/components/movie/MovieSearchFilters ";

export default function MovieSectionPage() {
  const { slug } = useParams();
  const productsLimit = slug === "all" ? 1000 : 100;
  const { data, isLoading, isError, error } = useMoviesSWR({
    moviesOnly: true,
    productsLimit,
  });

  const sectionMap = {
    all: data?.all ?? [],
    "few-minutes-left": data?.fewMinutesLeft ?? [],
    "popular-now": data?.popularNow ?? [],
    recommended: data?.recommended ?? [],
  };
  const movies = sectionMap[slug] || [];

  // Filters & sorting state
  const [filters, setFilters] = useState({
    searchQuery: "",
    priceRange: [0, 1000],
    starRating: [],
    genre: [],
    language: [],
    showTimes: [],
    amenities: [],
  });
  const [sortBy, setSortBy] = useState("recommended");

  // Filtering logic
  const applyFilters = (moviesList) => {
    if (!moviesList?.length) return [];

    return moviesList.filter((movie) => {
      // Search filter
      if (filters.searchQuery) {
        const searchLower = filters.searchQuery.toLowerCase();
        const name = movie.name?.toLowerCase() || "";
        const title = movie.title?.toLowerCase() || "";
        const variantName = movie.variants?.[0]?.variant_name?.toLowerCase() || "";
        const cast = movie.cast?.join(" ").toLowerCase() || "";
        if (
          !name.includes(searchLower) &&
          !title.includes(searchLower) &&
          !variantName.includes(searchLower) &&
          !cast.includes(searchLower)
        ) {
          return false;
        }
      }

      // Genre filter
      if (filters.genre.length > 0) {
        const movieGenres = movie.genres?.map((g) => g.toLowerCase()) || [];
        if (!filters.genre.some((g) => movieGenres.includes(g.toLowerCase()))) {
          return false;
        }
      }

      // Language filter
      if (filters.language.length > 0) {
        const movieLang = movie.language?.toLowerCase() || "";
        if (!filters.language.some((lang) => lang.toLowerCase() === movieLang)) {
          return false;
        }
      }

      // Show times filter
      if (filters.showTimes.length > 0) {
        const movieShowTimes = movie.showTimes || [];
        if (!filters.showTimes.some((st) => movieShowTimes.includes(st))) {
          return false;
        }
      }

      // Price filter
      const price = movie.price?.sale ?? movie.price ?? null;
      if (price !== null) {
        if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
          return false;
        }
      }

      // Rating filter
      if (filters.starRating.length > 0) {
        const rating = movie.rating?.average || 0;
        if (!filters.starRating.some((r) => rating >= r)) {
          return false;
        }
      }

      // Amenities filter
      if (filters.amenities.length > 0) {
        const movieAmenities = movie.amenities || [];
        if (!filters.amenities.every((a) => movieAmenities.includes(a))) {
          return false;
        }
      }

      return true;
    });
  };

  // Sorting logic
  const applySort = (moviesList) => {
    if (!moviesList?.length) return [];
    return [...moviesList].sort((a, b) => {
      const priceA = a.price?.sale || a.price || 0;
      const priceB = b.price?.sale || b.price || 0;
      const ratingA = a.rating?.average || 0;
      const ratingB = b.rating?.average || 0;

      switch (sortBy) {
        case "price_low_high":
          return priceA - priceB;
        case "price_high_low":
          return priceB - priceA;
        case "rating_high_low":
          return ratingB - ratingA;
        case "newest":
          return new Date(b.releaseDate || 0) - new Date(a.releaseDate || 0);
        default:
          return 0;
      }
    });
  };

  // Filter & sort movies
  const filteredMovies = useMemo(
    () => applySort(applyFilters(movies)),
    [movies, filters, sortBy]
  );

  const handleFiltersChange = (newFilters) => setFilters(newFilters);
  const handleSearch = (searchFilters) => setFilters(searchFilters);
  const handleSortChange = (newSort) => setSortBy(newSort);

  return (
    <div className="flex-1">
      <Header />
      <div className="p-6 max-w-[1700px] mx-auto">
        <nav className="text-2xl mb-6">
          Home &gt;{" "}
          <Link href="/home/movie" className="text-gray-500">
            Movies
          </Link>{" "}
          &gt;{" "}
          <span className="text-yellow-500 capitalize">
            {slug.replace(/-/g, " ")}
          </span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters */}
          <div className="lg:w-80 flex-shrink-0">
            <MovieSearchFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onSearch={handleSearch}
              isOpen={true}
              onToggle={() => {}}
            />
          </div>

          {/* Movies list */}
          <div className="flex-1">
            <HotelSortOptions
              currentSort={sortBy}
              onSortChange={handleSortChange}
              totalResults={filteredMovies.length}
            />

            {isLoading && <p>Loading section...</p>}
            {isError && <p className="text-red-500">{error.message}</p>}

            {!isLoading && !isError && (
              <>
                {filteredMovies.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredMovies.map((movie) => (
                      <Link
                        key={movie.id}
                        href={`/home/movie/${movie.id}`}
                        className="block"
                      >
                        <div className="flex flex-col shadow-md rounded-lg overflow-hidden h-full">
                          <Image
                            src={movie.poster || "/placeholder.jpg"}
                            alt={movie.title}
                            width={300}
                            height={400}
                            className="object-cover w-full h-72"
                          />
                          <div className="p-4 flex-1 flex flex-col justify-between">
                            <div>
                              <h3 className="font-semibold text-lg line-clamp-2">
                                {movie.title}
                              </h3>
                              {movie.language && (
                                <p className="text-sm text-gray-600">
                                  {movie.language}
                                </p>
                              )}
                            </div>
                            {movie.price && (
                              <p className="mt-2 text-yellow-500 font-bold">
                                ₹{movie.price.sale || movie.price}
                              </p>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No movies found</p>
                    <p className="text-gray-400">
                      Try adjusting your search criteria
                    </p>
                    <Button
                      variant="outline"
                      onClick={() =>
                        setFilters({
                          searchQuery: "",
                          priceRange: [0, 1000],
                          starRating: [],
                          genre: [],
                          language: [],
                          showTimes: [],
                          amenities: [],
                        })
                      }
                      className="mt-4"
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
