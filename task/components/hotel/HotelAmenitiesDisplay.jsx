'use client';

import React from 'react';
import { 
  Wifi, 
  Car, 
  Coffee, 
  Waves, 
  Dumbbell, 
  Sparkles, 
  Utensils, 
  Wine, 
  Bell, 
  Snowflake,
  Check,
  X
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const HotelAmenitiesDisplay = ({ 
  amenities = [], 
  showAvailableOnly = false,
  maxDisplay = 8,
  showMore = true,
  compact = false 
}) => {
  const amenityIcons = {
    wifi: Wifi,
    parking: Car,
    breakfast: Coffee,
    pool: Waves,
    gym: Dumbbell,
    spa: Sparkles,
    restaurant: Utensils,
    bar: Wine,
    room_service: Bell,
    ac: Snowflake
  };

  const amenityLabels = {
    wifi: 'Free WiFi',
    parking: 'Free Parking',
    breakfast: 'Free Breakfast',
    pool: 'Swimming Pool',
    gym: 'Fitness Center',
    spa: 'Spa',
    restaurant: 'Restaurant',
    bar: 'Bar/Lounge',
    room_service: 'Room Service',
    ac: 'Air Conditioning'
  };

  // Filter amenities if needed
  let displayAmenities = amenities;
  if (showAvailableOnly) {
    displayAmenities = amenities.filter(amenity => amenity.available !== false);
  }

  // Limit display if needed
  const hasMore = showMore && displayAmenities.length > maxDisplay;
  const visibleAmenities = hasMore ? displayAmenities.slice(0, maxDisplay) : displayAmenities;

  if (compact) {
    return (
      <div className="flex flex-wrap gap-1">
        {visibleAmenities.map((amenity) => {
          const IconComponent = amenityIcons[amenity.id] || Check;
          const isAvailable = amenity.available !== false;
          
          return (
            <Badge
              key={amenity.id}
              variant={isAvailable ? "secondary" : "outline"}
              className={`text-xs px-2 py-1 ${
                isAvailable ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'
              }`}
            >
              <IconComponent className="w-3 h-3 mr-1" />
              {amenityLabels[amenity.id] || amenity.name}
            </Badge>
          );
        })}
        {hasMore && (
          <Badge variant="outline" className="text-xs px-2 py-1">
            +{displayAmenities.length - maxDisplay} more
          </Badge>
        )}
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Amenities & Facilities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {visibleAmenities.map((amenity) => {
            const IconComponent = amenityIcons[amenity.id] || Check;
            const isAvailable = amenity.available !== false;
            
            return (
              <div
                key={amenity.id}
                className={`flex items-center gap-3 p-3 rounded-lg border ${
                  isAvailable 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className={`p-2 rounded-full ${
                  isAvailable ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                }`}>
                  {isAvailable ? (
                    <IconComponent className="w-4 h-4" />
                  ) : (
                    <X className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${
                    isAvailable ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {amenityLabels[amenity.id] || amenity.name}
                  </p>
                  {amenity.description && (
                    <p className="text-sm text-gray-600">{amenity.description}</p>
                  )}
                </div>
                {!isAvailable && (
                  <Badge variant="outline" className="text-xs">
                    Not Available
                  </Badge>
                )}
              </div>
            );
          })}
        </div>
        
        {hasMore && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-gray-600 text-center">
              +{displayAmenities.length - maxDisplay} more amenities available
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HotelAmenitiesDisplay; 