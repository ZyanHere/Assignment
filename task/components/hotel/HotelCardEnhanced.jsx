'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star, MapPin, Wifi, Car, Coffee, Users, Bed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useProduct } from '@/lib/contexts/productContext';
import HotelAmenitiesDisplay from './HotelAmenitiesDisplay';

const HotelCardEnhanced = ({ 
  hotel, 
  viewMode = 'grid',
  showAmenities = true,
  showRating = true,
  showLocation = true,
  showPrice = true,
  className = ''
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { setSelectedProduct } = useProduct();

  // Get representative variant
  const variant = hotel?.variants?.[0];
  const img = variant?.images?.[0]?.url || hotel?.img || "/hotels/placeholder.png";
  const title = variant?.variant_name || hotel?.name || "Untitled";
  const location = variant?.location || hotel?.location || "N/A";
  const price = variant?.price?.sale_price ?? variant?.price?.base_price ?? hotel?.price ?? 0;
  const basePrice = variant?.price?.base_price;
  const rating = hotel?.rating?.average ?? 0;
  const ratingCount = hotel?.rating?.count ?? 0;
  const slug = hotel?.slug || hotel?.id;

  // Mock amenities for display
  const amenities = [
    { id: 'wifi', name: 'Free WiFi', available: true },
    { id: 'parking', name: 'Free Parking', available: true },
    { id: 'breakfast', name: 'Free Breakfast', available: true }
  ];

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleCardClick = () => {
    setSelectedProduct(hotel);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (viewMode === 'list') {
    return (
      <Link href={`/home/hotel/rooms/${slug}`} onClick={handleCardClick}>
        <Card className={`hover:shadow-lg transition-all duration-200 ${className}`}>
          <CardContent className="p-0">
            <div className="flex">
              {/* Image */}
              <div className="relative w-48 h-32 flex-shrink-0">
                <Image
                  src={img}
                  alt={title}
                  fill
                  className="object-cover rounded-l-lg"
                />
                <button
                  onClick={toggleFavorite}
                  className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-50"
                >
                  <Heart
                    size={16}
                    className={isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}
                  />
                </button>
                {showRating && (
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      {rating.toFixed(1)} ({ratingCount})
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">{title}</h3>
                    {showLocation && (
                      <div className="flex items-center gap-1 text-gray-600 text-sm mb-2">
                        <MapPin className="h-3 w-3" />
                        {location}
                      </div>
                    )}
                    {showAmenities && (
                      <HotelAmenitiesDisplay
                        amenities={amenities}
                        compact={true}
                        maxDisplay={3}
                        showMore={false}
                      />
                    )}
                  </div>
                  <div className="text-right ml-4">
                    {showPrice && (
                      <div className="mb-2">
                        <div className="text-2xl font-bold text-orange-500">
                          ₹{price}
                        </div>
                        {basePrice && basePrice > price && (
                          <div className="text-sm text-gray-500 line-through">
                            ₹{basePrice}
                          </div>
                        )}
                        <div className="text-sm text-gray-600">per night</div>
                      </div>
                    )}
                    <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-white">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  // Grid view (default)
  return (
    <Link href={`/home/hotel/rooms/${slug}`} onClick={handleCardClick}>
      <Card className={`hover:shadow-lg transition-all duration-200 h-full ${className}`}>
        <CardContent className="p-0">
          {/* Image */}
          <div className="relative h-48">
            <Image
              src={img}
              alt={title}
              fill
              className="object-cover rounded-t-lg"
            />
            <button
              onClick={toggleFavorite}
              className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
            >
              <Heart
                size={18}
                className={isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}
              />
            </button>
            {showRating && (
              <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  {rating.toFixed(1)} ({ratingCount})
                </div>
              </div>
            )}
            {basePrice && basePrice > price && (
              <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                {Math.round(((basePrice - price) / basePrice) * 100)}% OFF
              </Badge>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1">{title}</h3>
            
            {showLocation && (
              <div className="flex items-center gap-1 text-gray-600 text-sm mb-3">
                <MapPin className="h-3 w-3" />
                <span className="line-clamp-1">{location}</span>
              </div>
            )}

            {showAmenities && (
              <div className="mb-3">
                <HotelAmenitiesDisplay
                  amenities={amenities}
                  compact={true}
                  maxDisplay={3}
                  showMore={false}
                />
              </div>
            )}

            <div className="flex justify-between items-end">
              {showPrice && (
                <div>
                  <div className="text-xl font-bold text-orange-500">
                    ₹{price}
                  </div>
                  {basePrice && basePrice > price && (
                    <div className="text-sm text-gray-500 line-through">
                      ₹{basePrice}
                    </div>
                  )}
                  <div className="text-sm text-gray-600">per night</div>
                </div>
              )}
              <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-white">
                View Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default HotelCardEnhanced; 