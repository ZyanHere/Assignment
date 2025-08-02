'use client';

import React, { useState } from 'react';
import { Search, MapPin, Star, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const HotelSearchFilters = ({ 
  onFiltersChange, 
  onSearch,
  filters = {},
  isOpen = false,
  onToggle 
}) => {
  const [localFilters, setLocalFilters] = useState({
    searchQuery: filters.searchQuery || '',
    priceRange: filters.priceRange || [0, 10000],
    starRating: filters.starRating || [],
    location: filters.location || '',
    amenities: filters.amenities || [],
    ...filters
  });

  const amenities = [
    { id: 'wifi', label: 'Free WiFi' },
    { id: 'parking', label: 'Free Parking' },
    { id: 'breakfast', label: 'Free Breakfast' },
    { id: 'pool', label: 'Swimming Pool' },
    { id: 'gym', label: 'Fitness Center' },
    { id: 'spa', label: 'Spa' },
    { id: 'restaurant', label: 'Restaurant' },
    { id: 'bar', label: 'Bar/Lounge' },
    { id: 'room_service', label: 'Room Service' },
    { id: 'ac', label: 'Air Conditioning' }
  ];

  const starRatings = [
    { value: 5, label: '5 Stars' },
    { value: 4, label: '4+ Stars' },
    { value: 3, label: '3+ Stars' },
    { value: 2, label: '2+ Stars' },
    { value: 1, label: '1+ Stars' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handleSearch = () => {
    onSearch?.(localFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      searchQuery: '',
      priceRange: [0, 10000],
      starRating: [],
      location: '',
      amenities: []
    };
    setLocalFilters(clearedFilters);
    onFiltersChange?.(clearedFilters);
  };

  const hasActiveFilters = () => {
    return localFilters.searchQuery || 
           localFilters.location || 
           localFilters.starRating.length > 0 || 
           localFilters.amenities.length > 0 ||
           localFilters.priceRange[0] > 0 || 
           localFilters.priceRange[1] < 10000;
  };

  return (
    <div className="w-full">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={onToggle}
          className="w-full flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <Filter size={16} />
            Filters
          </span>
          {hasActiveFilters() && (
            <Badge variant="secondary" className="ml-2">
              Active
            </Badge>
          )}
        </Button>
      </div>

      {/* Desktop Filters */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block`}>
        <Card className="overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between text-sm sm:text-base">
              <span className="flex items-center gap-2">
                <Filter size={18} className="sm:w-5 sm:h-5" />
                Search & Filters
              </span>
              {hasActiveFilters() && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-red-500 hover:text-red-700 p-1 sm:p-2"
                >
                  <X size={14} className="sm:w-4 sm:h-4" />
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
            {/* Search */}
            <div className="space-y-2">
              <Label htmlFor="search">Search Hotels</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  id="search"
                  placeholder="Hotel name, location, or amenities..."
                  value={localFilters.searchQuery}
                  onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  id="location"
                  placeholder="City, area, or landmark..."
                  value={localFilters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-2">
              <Label>Price Range (per night)</Label>
              <div className="px-2">
                <Slider
                  value={localFilters.priceRange}
                  onValueChange={(value) => handleFilterChange('priceRange', value)}
                  max={10000}
                  min={0}
                  step={100}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>₹{localFilters.priceRange[0]}</span>
                  <span>₹{localFilters.priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Star Rating */}
            <div className="space-y-2">
              <Label>Star Rating</Label>
              <div className="space-y-2">
                {starRatings.map((rating) => (
                  <div key={rating.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`star-${rating.value}`}
                      checked={localFilters.starRating.includes(rating.value)}
                      onCheckedChange={(checked) => {
                        const newRatings = checked
                          ? [...localFilters.starRating, rating.value]
                          : localFilters.starRating.filter(r => r !== rating.value);
                        handleFilterChange('starRating', newRatings);
                      }}
                    />
                    <Label htmlFor={`star-${rating.value}`} className="flex items-center gap-1 cursor-pointer">
                      {Array.from({ length: rating.value }, (_, i) => (
                        <Star key={i} size={14} className="text-yellow-400 fill-current" />
                      ))}
                      <span className="text-sm">{rating.label}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="space-y-2">
              <Label>Amenities</Label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {amenities.map((amenity) => (
                  <div key={amenity.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`amenity-${amenity.id}`}
                      checked={localFilters.amenities.includes(amenity.id)}
                      onCheckedChange={(checked) => {
                        const newAmenities = checked
                          ? [...localFilters.amenities, amenity.id]
                          : localFilters.amenities.filter(a => a !== amenity.id);
                        handleFilterChange('amenities', newAmenities);
                      }}
                    />
                    <Label htmlFor={`amenity-${amenity.id}`} className="text-sm cursor-pointer">
                      {amenity.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Search Button */}
            <Button 
              onClick={handleSearch}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              <Search size={16} className="mr-2" />
              Search Hotels
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HotelSearchFilters; 