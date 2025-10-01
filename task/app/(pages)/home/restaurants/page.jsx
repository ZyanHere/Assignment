"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/home/Header";
import Link from "next/link";
import useSWR from "swr";
import { axiosFetcher } from "@/lib/api/axios";
import { Search, MapPin, Star, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function RestaurantsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("any");
  const [selectedGuests, setSelectedGuests] = useState("any");

  // Fetch restaurants data
  const { data, error, mutate } = useSWR(
    "/lmd/api/v1/restaurants/restaurants",
    axiosFetcher
  );

  if (error) {
    return (
      <div className="flex-1">
        <Header />
        <div className="p-6 w-full max-w-[1700px] mx-auto">
          <div className="text-center py-10">
            <div className="text-red-500 text-xl">Failed to load restaurants</div>
            <Button onClick={() => mutate()} className="mt-4">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex-1">
        <Header />
        <div className="p-6 w-full max-w-[1700px] mx-auto">
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
            <span className="ml-2">Loading restaurants...</span>
          </div>
        </div>
      </div>
    );
  }

  const restaurants = data.data || [];

  // Filter restaurants based on search and filters
  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = !selectedCity || selectedCity === "all" || restaurant.address?.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  // Get unique cities for filter
  const cities = [...new Set(restaurants.map(r => r.address?.city).filter(Boolean))];

  return (
    <div className="flex-1">
      <Header />
      <div className="p-6 w-full max-w-[1700px] mx-auto">
        <div className="px-6 md:px-12">
          {/* Breadcrumb */}
          <nav className="mb-6 text-black text-xl">
            <Link href="/" className="hover:underline font-medium">
              Home
            </Link>
            {" > "}
            <span className="font-medium text-yellow-500">Restaurants</span>
          </nav>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Find Your Perfect Table
            </h1>
            <p className="text-gray-600">
              Discover amazing restaurants and book your table instantly
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search restaurants..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* City Filter */}
              <div>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select City" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    {cities.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date */}
              <div>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  placeholder="Date"
                />
              </div>

              {/* Time */}
              <div>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Time</SelectItem>
                    <SelectItem value="12:00">12:00 PM</SelectItem>
                    <SelectItem value="13:00">1:00 PM</SelectItem>
                    <SelectItem value="14:00">2:00 PM</SelectItem>
                    <SelectItem value="19:00">7:00 PM</SelectItem>
                    <SelectItem value="20:00">8:00 PM</SelectItem>
                    <SelectItem value="21:00">9:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Guests */}
              <div>
                <Select value={selectedGuests} onValueChange={setSelectedGuests}>
                  <SelectTrigger>
                    <SelectValue placeholder="Guests" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Size</SelectItem>
                    <SelectItem value="1">1 Guest</SelectItem>
                    <SelectItem value="2">2 Guests</SelectItem>
                    <SelectItem value="4">4 Guests</SelectItem>
                    <SelectItem value="6">6 Guests</SelectItem>
                    <SelectItem value="8">8+ Guests</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {filteredRestaurants.length} Restaurants Found
            </h2>
          </div>

          {/* Restaurant Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard 
                key={restaurant._id} 
                restaurant={restaurant}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                selectedGuests={selectedGuests}
              />
            ))}
          </div>

          {filteredRestaurants.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-4">
                No restaurants found matching your criteria
              </div>
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCity("all");
                  setSelectedDate("");
                  setSelectedTime("any");
                  setSelectedGuests("any");
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Restaurant Card Component
function RestaurantCard({ restaurant, selectedDate, selectedTime, selectedGuests }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="relative h-48 bg-gray-200">
        {!imageError && restaurant.images && restaurant.images[0] ? (
          <img
            src={restaurant.images[0]}
            alt={restaurant.name}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <div className="text-gray-400 text-4xl">🍽️</div>
          </div>
        )}
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 flex items-center">
          <Star className="h-3 w-3 text-yellow-500 fill-current" />
          <span className="text-xs font-medium ml-1">4.5</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {restaurant.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {restaurant.description}
        </p>

        {/* Location */}
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{restaurant.address?.city}, {restaurant.address?.state}</span>
        </div>

        {/* Amenities */}
        {restaurant.amenities && restaurant.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {restaurant.amenities.slice(0, 3).map((amenity, index) => {
              // Handle different amenity formats
              let amenityText = 'Amenity';
              if (typeof amenity === 'string') {
                amenityText = amenity;
              } else if (amenity && typeof amenity === 'object') {
                amenityText = amenity.name || amenity.description || amenity.icon || 'Amenity';
              }
              
              return (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                >
                  {amenityText}
                </span>
              );
            })}
            {restaurant.amenities.length > 3 && (
              <span className="text-gray-500 text-xs">+{restaurant.amenities.length - 3} more</span>
            )}
          </div>
        )}

        {/* Contact Info */}
        <div className="text-sm text-gray-500 mb-4">
          {restaurant.contactInfo?.phone && (
            <div className="mb-1">📞 {restaurant.contactInfo.phone}</div>
          )}
          {restaurant.contactInfo?.email && (
            <div>✉️ {restaurant.contactInfo.email}</div>
          )}
        </div>

        {/* Book Button */}
        <Link href={`/home/restaurants/${restaurant._id}?date=${selectedDate}&time=${selectedTime}&guests=${selectedGuests}`}>
          <Button className="w-full">
            Book Table
          </Button>
        </Link>
      </div>
    </div>
  );
}
