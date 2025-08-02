"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/home/Header";
import Footer from "@/components/home/footer";
import HotelCard from "@/components/home/foursec/HotelCard";
import RecommendedHotels from "@/components/home/foursec/RecommandedHotel";
import HotelSearchFilters from "@/components/hotel/HotelSearchFilters";
import HotelSortOptions from "@/components/hotel/HotelSortOptions";
import { useHotelsSWR } from "@/lib/hooks/useHotelSWR";
import { Search, Filter, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HotelsPage() {
  const { data, isLoading, isError } = useHotelsSWR({ hotelsOnly: true });
  const [filters, setFilters] = useState({
    searchQuery: '',
    priceRange: [0, 10000],
    starRating: [],
    location: '',
    amenities: []
  });
  const [sortBy, setSortBy] = useState('recommended');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Get all hotels from the adapted data
  const allHotels = useMemo(() => {
    if (!data) return [];
    
    // The data is already filtered by hotel_booking type from the API
    // and adapted by the hotelAdapter
    const hotels = data.allHotels || [];
    
    // Debug logging
    console.log('Hotel page - allHotels:', {
      totalHotels: hotels.length,
      hotels: hotels.map(h => ({ id: h.id, name: h.name, price: h.price, location: h.location }))
    });
    
    return hotels;
  }, [data]);

  // Filter hotels based on search criteria
  const filteredHotels = useMemo(() => {
    if (!allHotels.length) return [];

    return allHotels.filter(hotel => {
      // Search query filter
      if (filters.searchQuery) {
        const searchLower = filters.searchQuery.toLowerCase();
        const hotelName = hotel.name?.toLowerCase() || '';
        const hotelLocation = hotel.location?.toLowerCase() || '';
        const variantName = hotel.variants?.[0]?.variant_name?.toLowerCase() || '';
        
        if (!hotelName.includes(searchLower) && 
            !hotelLocation.includes(searchLower) && 
            !variantName.includes(searchLower)) {
          return false;
        }
      }

      // Location filter
      if (filters.location) {
        const locationLower = filters.location.toLowerCase();
        const hotelLocation = hotel.location?.toLowerCase() || '';
        if (!hotelLocation.includes(locationLower)) {
          return false;
        }
      }

      // Price range filter - use the adapted price field
      const hotelPrice = hotel.price || 0;
      if (hotelPrice < filters.priceRange[0] || hotelPrice > filters.priceRange[1]) {
        return false;
      }

      // Star rating filter
      if (filters.starRating.length > 0) {
        const hotelRating = hotel.rating?.average || 0;
        if (!filters.starRating.some(rating => hotelRating >= rating)) {
          return false;
        }
      }

      return true;
    });
  }, [allHotels, filters]);

  // Sort filtered hotels
  const sortedHotels = useMemo(() => {
    if (!filteredHotels.length) return [];

    return [...filteredHotels].sort((a, b) => {
      const priceA = a.price || 0;
      const priceB = b.price || 0;
      const ratingA = a.rating?.average || 0;
      const ratingB = b.rating?.average || 0;

      switch (sortBy) {
        case 'price_low_high':
          return priceA - priceB;
        case 'price_high_low':
          return priceB - priceA;
        case 'rating_high_low':
          return ratingB - ratingA;
        case 'newest':
          return new Date(b.created_at || 0) - new Date(a.created_at || 0);
        default:
          return 0; // recommended - keep original order
      }
    });
  }, [filteredHotels, sortBy]);

  // Group hotels by sections using the adapted data
  const sectionedHotels = useMemo(() => {
    if (!data) return {};

    return {
      inYourArea: data.inYourArea || [],
      previousChoices: data.previousChoices || [],
      allHotels: sortedHotels
    };
  }, [data, sortedHotels]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSearch = (searchFilters) => {
    setFilters(searchFilters);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
  };

  const handleViewModeChange = (newViewMode) => {
    setViewMode(newViewMode);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 px-4 sm:px-6 lg:px-8 xl:px-14 pb-14 w-full max-w-[1700px] mx-auto">
        {/* Breadcrumb */}
        <nav className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 mt-6 sm:mt-8">
          <Link href="/" className="text-black hover:text-gray-600">Home</Link> &gt;
          <span className="font-semibold text-yellow-500"> Hotels</span>
        </nav>

        {/* Search and Filters Section */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
            {/* Filters Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <HotelSearchFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onSearch={handleSearch}
                isOpen={showFilters}
                onToggle={() => setShowFilters(!showFilters)}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Sort and View Options */}
              <HotelSortOptions
                currentSort={sortBy}
                onSortChange={handleSortChange}
                totalResults={sortedHotels.length}
                viewMode={viewMode}
                onViewModeChange={handleViewModeChange}
              />

              {/* Loading and Error States */}
              {isLoading && (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500" />
                  <span className="ml-2">Loading hotels...</span>
                </div>
              )}

              {isError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  <strong>Error:</strong> Failed to load hotels.
                </div>
              )}

              {/* Search Results */}
              {!isLoading && !isError && (
                <>
                  {/* Search Results Summary */}
                  {filters.searchQuery || filters.location || filters.starRating.length > 0 ? (
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-semibold text-blue-900 mb-2">Search Results</h3>
                      <p className="text-blue-700">
                        Found {sortedHotels.length} hotel{sortedHotels.length !== 1 ? 's' : ''} matching your criteria
                      </p>
                      {filters.searchQuery && (
                        <p className="text-sm text-blue-600 mt-1">
                          Search: "{filters.searchQuery}"
                        </p>
                      )}
                    </div>
                  ) : null}

                                     {/* Hotels in Your Area */}
                   {sectionedHotels.inYourArea.length > 0 && !filters.searchQuery && (
                     <section className="mb-8">
                       <HotelCard 
                         hotels={sectionedHotels.inYourArea} 
                         title="Hotels in Your Area"
                         showSeeAll={false}
                       />
                     </section>
                   )}

                   {/* Previous Choices */}
                   {sectionedHotels.previousChoices.length > 0 && !filters.searchQuery && (
                     <section className="mb-8">
                       <HotelCard 
                         hotels={sectionedHotels.previousChoices} 
                         title="Previous Choices"
                         showSeeAll={false}
                       />
                     </section>
                   )}

                   {/* All Hotels / Search Results */}
                   <section>
                     {sortedHotels.length > 0 ? (
                       viewMode === 'grid' ? (
                         <HotelCard 
                           hotels={sortedHotels} 
                           title={
                             filters.searchQuery || filters.location || filters.starRating.length > 0 
                               ? 'Search Results' 
                               : 'All Hotels'
                           }
                           showSeeAll={false}
                         />
                       ) : (
                         <RecommendedHotels hotels={sortedHotels} />
                       )
                     ) : (
                      <div className="text-center py-12">
                        <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">No hotels found</p>
                        <p className="text-gray-400">Try adjusting your search criteria</p>
                        <Button
                          variant="outline"
                          onClick={() => setFilters({
                            searchQuery: '',
                            priceRange: [0, 10000],
                            starRating: [],
                            location: '',
                            amenities: []
                          })}
                          className="mt-4"
                        >
                          Clear Filters
                        </Button>
                      </div>
                    )}
                  </section>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
