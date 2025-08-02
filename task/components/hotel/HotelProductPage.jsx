'use client';

import React, { useState } from 'react';
import { Calendar, Users, Bed, MapPin, Clock, Star, Building, Wifi, Parking, Pool, Restaurant } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HotelBookingForm from './HotelBookingForm';
import { useCart } from '@/lib/contexts/cart-context';
import { useAuth } from '@/lib/hooks/useAuth';
import toast from 'react-hot-toast';

const HotelProductPage = ({ hotel, variant }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getAmenities = () => {
    const amenities = hotel.type_specific?.hotel?.amenities || [];
    const iconMap = {
      wifi: Wifi,
      parking: Parking,
      pool: Pool,
      restaurant: Restaurant,
    };

    return amenities.map((amenity, index) => {
      const Icon = iconMap[amenity.toLowerCase()] || Building;
      return (
        <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
          <Icon className="h-4 w-4" />
          <span className="capitalize">{amenity}</span>
        </div>
      );
    });
  };

  const handleAddToCart = (bookingData) => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }

    const cartItem = {
      id: variant._id,
      name: hotel.name,
      price: bookingData.unit_price,
      image: hotel.images?.[0]?.url || '/placeholder-hotel.jpg',
      brand: hotel.vendor_store_id?.store_name || 'Last Minute Deal',
      vendorId: hotel.vendor_store_id?._id || 'default',
      vendorName: hotel.vendor_store_id?.store_name || 'Last Minute Deal',
      category: 'Hotel',
      subcategory: 'Accommodation',
      quantity: 1,
      ...bookingData
    };

    addToCart(cartItem, bookingData);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Hotel Images and Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hotel Images */}
          <div className="grid grid-cols-2 gap-4">
            {hotel.images && hotel.images.length > 0 ? (
              <>
                <div className="col-span-2">
                  <img
                    src={hotel.images[0].url}
                    alt={hotel.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                {hotel.images.slice(1, 5).map((image, index) => (
                  <div key={index}>
                    <img
                      src={image.url}
                      alt={`${hotel.name} ${index + 2}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                ))}
              </>
            ) : (
              <div className="col-span-2 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">No images available</span>
              </div>
            )}
          </div>

          {/* Hotel Basic Info */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                    {hotel.name}
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    {hotel.type_specific?.hotel?.star_rating && (
                      <div className="flex items-center gap-1">
                        {renderStars(hotel.type_specific.hotel.star_rating)}
                        <span className="ml-1">{hotel.type_specific.hotel.star_rating} stars</span>
                      </div>
                    )}
                    {hotel.type_specific?.hotel?.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>
                          {hotel.type_specific.hotel.location.city}, {hotel.type_specific.hotel.location.country}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>Check-in: {hotel.type_specific?.hotel?.check_in_time || '2:00 PM'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>Check-out: {hotel.type_specific?.hotel?.check_out_time || '11:00 AM'}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">₹{variant.price}</div>
                  <div className="text-sm text-gray-500">per night</div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Hotel Details Tabs */}
          <Card>
            <CardHeader>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="amenities">Amenities</TabsTrigger>
                  <TabsTrigger value="policies">Policies</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                      <p className="text-gray-600 leading-relaxed">
                        {hotel.description || 'Experience luxury and comfort at this exceptional hotel. Our dedicated staff ensures your stay is memorable with world-class amenities and personalized service.'}
                      </p>
                    </div>
                    
                    {hotel.type_specific?.hotel?.highlights && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Highlights</h3>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          {hotel.type_specific.hotel.highlights.map((highlight, index) => (
                            <li key={index}>{highlight}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="amenities" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getAmenities()}
                  </div>
                </TabsContent>

                <TabsContent value="policies" className="mt-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Cancellation Policy</h3>
                      <p className="text-gray-600">
                        {hotel.type_specific?.hotel?.cancellation_policy || 'Free cancellation up to 24 hours before check-in. Late cancellations may incur charges.'}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Check-in Requirements</h3>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>Valid government-issued photo ID required</li>
                        <li>Credit card for incidental charges</li>
                        <li>Minimum age to check-in: 18 years</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardHeader>
          </Card>
        </div>

        {/* Booking Form */}
        <div className="lg:col-span-1">
          <div className="sticky top-4">
            <HotelBookingForm
              hotel={hotel}
              variant={variant}
              onBookingSubmit={handleAddToCart}
              isAddingToCart={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelProductPage; 