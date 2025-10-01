"use client";

import React, { useState } from "react";
import { Search, Filter, X, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const MovieSearchFilters = ({
  onFiltersChange,
  onSearch,
  filters = {},
  isOpen = false,
  onToggle,
}) => {
  const [localFilters, setLocalFilters] = useState({
    searchQuery: filters.searchQuery || "",
    priceRange: filters.priceRange || [0, 1000],
    starRating: filters.starRating || [],
    genre: filters.genre || [],
    language: filters.language || [],
    showTimes: filters.showTimes || [],
    amenities: filters.amenities || [],
  });

  const genres = [
    "Action",
    "Comedy",
    "Drama",
    "Sci-Fi",
    "Horror",
    "Romance",
    "Thriller",
    "Animation",
  ];

  const languages = [
    "English",
    "Hindi",
    "Tamil",
    "Telugu",
    "Kannada",
    "Malayalam",
    "Bengali",
  ];

  const showTimes = [
    { id: "morning", label: "Morning (8 AM - 12 PM)" },
    { id: "afternoon", label: "Afternoon (12 PM - 4 PM)" },
    { id: "evening", label: "Evening (4 PM - 8 PM)" },
    { id: "night", label: "Night (8 PM - Midnight)" },
  ];

  const cinemaAmenities = [
    { id: "recliner", label: "Recliner Seats" },
    { id: "3d", label: "3D" },
    { id: "imax", label: "IMAX" },
    { id: "dolby", label: "Dolby Atmos" },
    { id: "food", label: "Food Court" },
  ];

  const starRatings = [
    { value: 5, label: "5 Stars" },
    { value: 4, label: "4+ Stars" },
    { value: 3, label: "3+ Stars" },
    { value: 2, label: "2+ Stars" },
    { value: 1, label: "1+ Stars" },
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
      searchQuery: "",
      priceRange: [0, 1000],
      starRating: [],
      genre: [],
      language: [],
      showTimes: [],
      amenities: [],
    };
    setLocalFilters(clearedFilters);
    onFiltersChange?.(clearedFilters);
  };

  const hasActiveFilters = () => {
    return (
      localFilters.searchQuery ||
      localFilters.genre.length > 0 ||
      localFilters.language.length > 0 ||
      localFilters.showTimes.length > 0 ||
      localFilters.amenities.length > 0 ||
      localFilters.starRating.length > 0 ||
      localFilters.priceRange[0] > 0 ||
      localFilters.priceRange[1] < 1000
    );
  };

  // Helper for multi-select dropdown
  const toggleMultiSelectValue = (key, value) => {
    const current = localFilters[key];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    handleFilterChange(key, updated);
  };

  return (
    <div className="w-full">
      {/* Mobile Toggle */}
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

      <div className={`${isOpen ? "block" : "hidden"} lg:block`}>
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span className="flex items-center gap-2">
                <Filter size={18} />
                Movie Filters
              </span>
              {hasActiveFilters() && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <X size={14} />
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Search */}
            <div>
              <Label>Search Movies</Label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  placeholder="Movie name, cast, or genre..."
                  value={localFilters.searchQuery}
                  onChange={(e) =>
                    handleFilterChange("searchQuery", e.target.value)
                  }
                  className="pl-10"
                />
              </div>
            </div>

            {/* Genre Multi-Select */}
            <div>
              <Label>Genre</Label>
              <Select onValueChange={(value) => toggleMultiSelectValue("genre", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select genre(s)" />
                </SelectTrigger>
                <SelectContent>
                  {genres.map((g) => (
                    <SelectItem key={g} value={g}>
                      {g} {localFilters.genre.includes(g) ? "✓" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {localFilters.genre.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {localFilters.genre.map((g) => (
                    <Badge key={g} variant="secondary">{g}</Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Language Multi-Select */}
            <div>
              <Label>Language</Label>
              <Select onValueChange={(value) => toggleMultiSelectValue("language", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language(s)" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang} {localFilters.language.includes(lang) ? "✓" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {localFilters.language.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {localFilters.language.map((lang) => (
                    <Badge key={lang} variant="secondary">{lang}</Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Show Times Multi-Select */}
            <div>
              <Label>Show Times</Label>
              <Select onValueChange={(value) => toggleMultiSelectValue("showTimes", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select show time(s)" />
                </SelectTrigger>
                <SelectContent>
                  {showTimes.map((time) => (
                    <SelectItem key={time.id} value={time.id}>
                      {time.label} {localFilters.showTimes.includes(time.id) ? "✓" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {localFilters.showTimes.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {localFilters.showTimes.map((st) => {
                    const label = showTimes.find((t) => t.id === st)?.label || st;
                    return <Badge key={st} variant="secondary">{label}</Badge>;
                  })}
                </div>
              )}
            </div>

            {/* Price Range */}
            <div>
              <Label>Ticket Price Range</Label>
              <div className="px-2">
                <Slider
                  value={localFilters.priceRange}
                  onValueChange={(value) =>
                    handleFilterChange("priceRange", value)
                  }
                  max={1000}
                  min={0}
                  step={50}
                />
                <div className="flex justify-between text-sm mt-2">
                  <span>₹{localFilters.priceRange[0]}</span>
                  <span>₹{localFilters.priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div>
              <Label>Rating</Label>
              <div className="space-y-2 mt-1">
                {starRatings.map((rating) => (
                  <div key={rating.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`star-${rating.value}`}
                      checked={localFilters.starRating.includes(rating.value)}
                      onCheckedChange={(checked) => {
                        const newRatings = checked
                          ? [...localFilters.starRating, rating.value]
                          : localFilters.starRating.filter((r) => r !== rating.value);
                        handleFilterChange("starRating", newRatings);
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

            {/* Cinema Amenities */}
            <div>
              <Label>Cinema Amenities</Label>
              <div className="space-y-2 max-h-48 overflow-y-auto mt-1">
                {cinemaAmenities.map((amenity) => (
                  <div key={amenity.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`amenity-${amenity.id}`}
                      checked={localFilters.amenities.includes(amenity.id)}
                      onCheckedChange={(checked) => {
                        const newAmenities = checked
                          ? [...localFilters.amenities, amenity.id]
                          : localFilters.amenities.filter((a) => a !== amenity.id);
                        handleFilterChange("amenities", newAmenities);
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
              Search Movies
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MovieSearchFilters;
