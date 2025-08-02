'use client';

import React from 'react';
import { Calendar, Users, Bed, MapPin, Clock, Star, Building } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { 
  calculateNights, 
  formatGuestSummary, 
  formatRoomPreferences,
  filterHotelBookings 
} from '@/lib/utils/hotelUtils';

const HotelOrderSummary = ({ items, className = '' }) => {
  // Filter only hotel booking items
  const hotelItems = filterHotelBookings(items);

  if (hotelItems.length === 0) {
    return null;
  }

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

  const getGuestSummary = (guests) => {
    return formatGuestSummary(guests);
  };

  const getRoomPreferences = (preferences) => {
    return formatRoomPreferences(preferences);
  };

  const getNights = (checkIn, checkOut) => {
    return calculateNights(checkIn, checkOut);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Hotel Bookings Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {hotelItems.map((item, index) => {
            const bookingDetails = item.booking_details || {};
            const checkInDate = bookingDetails.check_in_date ? new Date(bookingDetails.check_in_date) : null;
            const checkOutDate = bookingDetails.check_out_date ? new Date(bookingDetails.check_out_date) : null;
            const nights = getNights(bookingDetails.check_in_date, bookingDetails.check_out_date);
            const totalPrice = item.total_price || (item.price * nights);

            return (
              <div key={item.id || index} className="border rounded-lg p-4">
                {/* Hotel Basic Info */}
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={item.product?.images?.[0]?.url || item.image || '/placeholder-hotel.jpg'}
                    alt={item.product?.name || item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 truncate">
                      {item.product?.name || item.name}
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      {item.product?.type_specific?.hotel?.star_rating && (
                        <div className="flex items-center gap-1">
                          {renderStars(item.product.type_specific.hotel.star_rating)}
                          <span>{item.product.type_specific.hotel.star_rating}</span>
                        </div>
                      )}
                      {item.product?.type_specific?.hotel?.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate">
                            {item.product.type_specific.hotel.location.city}, {item.product.type_specific.hotel.location.country}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">₹{totalPrice}</div>
                    <div className="text-sm text-gray-500">₹{item.price}/night</div>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="space-y-2 text-sm">
                  {/* Dates */}
                  {checkInDate && checkOutDate && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>
                        {format(checkInDate, 'MMM dd, yyyy')} - {format(checkOutDate, 'MMM dd, yyyy')}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {nights} night{nights !== 1 ? 's' : ''}
                      </Badge>
                    </div>
                  )}

                  {/* Guests */}
                  {bookingDetails.guests && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span>{getGuestSummary(bookingDetails.guests)}</span>
                    </div>
                  )}

                  {/* Room Preferences */}
                  {bookingDetails.room_preferences && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <Bed className="h-4 w-4 text-gray-500" />
                      <span>{getRoomPreferences(bookingDetails.room_preferences)}</span>
                    </div>
                  )}

                  {/* Check-in/Check-out Times */}
                  {item.product?.type_specific?.hotel && (
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>Check-in: {item.product.type_specific.hotel.check_in_time || '2:00 PM'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>Check-out: {item.product.type_specific.hotel.check_out_time || '11:00 AM'}</span>
                      </div>
                    </div>
                  )}

                  {/* Special Requests */}
                  {bookingDetails.special_requests && (
                    <div className="text-gray-600 bg-gray-50 p-2 rounded">
                      <span className="font-medium">Special Requests:</span> {bookingDetails.special_requests}
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <Separator className="my-3" />
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Price per night:</span>
                    <span>₹{item.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Number of nights:</span>
                    <span>{nights}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total for this booking:</span>
                    <span>₹{totalPrice}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Total for all hotel bookings */}
          <Separator />
          <div className="flex justify-between items-center font-semibold">
            <span>Total Hotel Bookings:</span>
            <span>
              ₹{hotelItems.reduce((sum, item) => {
                const bookingDetails = item.booking_details || {};
                const nights = getNights(bookingDetails.check_in_date, bookingDetails.check_out_date);
                const totalPrice = item.total_price || (item.price * nights);
                return sum + totalPrice;
              }, 0)}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HotelOrderSummary; 