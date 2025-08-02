'use client';

import React from 'react';
import { ArrowUpDown, Star, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

const HotelSortOptions = ({ 
  currentSort, 
  onSortChange, 
  totalResults = 0,
  viewMode = 'grid',
  onViewModeChange 
}) => {
  const sortOptions = [
    {
      value: 'recommended',
      label: 'Recommended',
      icon: Star,
      description: 'Best matches for you'
    },
    {
      value: 'price_low_high',
      label: 'Price: Low to High',
      icon: ArrowUpDown,
      description: 'Cheapest first'
    },
    {
      value: 'price_high_low',
      label: 'Price: High to Low',
      icon: ArrowUpDown,
      description: 'Most expensive first'
    },
    {
      value: 'rating_high_low',
      label: 'Rating: High to Low',
      icon: Star,
      description: 'Highest rated first'
    },
    {
      value: 'distance',
      label: 'Distance',
      icon: MapPin,
      description: 'Nearest first'
    },
    {
      value: 'newest',
      label: 'Newest',
      icon: Clock,
      description: 'Recently added'
    }
  ];

  const currentSortOption = sortOptions.find(option => option.value === currentSort) || sortOptions[0];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 bg-white border-b">
      {/* Results Count */}
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-xs sm:text-sm text-gray-600 truncate">
          {totalResults} hotel{totalResults !== 1 ? 's' : ''} found
        </span>
        {currentSort !== 'recommended' && (
          <Badge variant="secondary" className="text-xs flex-shrink-0">
            Sorted by {currentSortOption.label}
          </Badge>
        )}
      </div>

      {/* Sort and View Controls */}
      <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
        {/* View Mode Toggle */}
        <div className="flex items-center border rounded-lg overflow-hidden">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('grid')}
            className="rounded-none border-0 h-8 px-3"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('list')}
            className="rounded-none border-0 h-8 px-3"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </Button>
        </div>

        {/* Sort Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 text-xs sm:text-sm">
              <ArrowUpDown className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Sort by: </span>
              <span className="truncate">{currentSortOption.label}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {sortOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => onSortChange(option.value)}
                  className={`flex items-start gap-3 p-3 ${
                    currentSort === option.value ? 'bg-blue-50 text-blue-700' : ''
                  }`}
                >
                  <IconComponent className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-medium">{option.label}</span>
                    <span className="text-xs text-gray-500">{option.description}</span>
                  </div>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default HotelSortOptions; 