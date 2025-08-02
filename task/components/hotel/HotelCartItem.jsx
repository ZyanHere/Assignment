'use client';

import React from 'react';
import { Calendar, Users, Bed, MapPin, Clock, Star, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import { 
  calculateNights, 
  formatGuestSummary, 
  formatRoomPreferences 
} from '@/lib/utils/hotelUtils';

const HotelCartItem = ({ 
  item, 
  onQuantityChange, 
  onRemove, 
  isSelected = false,
  onToggleSelect 
}) => {
  // Check if this is a hotel booking using the utility function
  const isHotelBooking = item.isHotelBooking || 
                        item.booking_details || 
                        item.selectedDates || 
                        item.checkIn || 
                        item.hotelName ||
                        item.product?.product_type === 'hotel_booking' ||
                        item.variant?.product?.product_type === 'hotel_booking' ||
                        item.product?.category?.type === 'hotel' ||
                        item.variant?.product?.category?.type === 'hotel';
  
  if (!isHotelBooking) {
    return null; // This component is only for hotel bookings
  }

  // Handle different data structures
  const bookingDetails = item.booking_details || {};
  const selectedDates = item.selectedDates || [];
  
  // Use our new structure first, fallback to old structure
  const checkInDate = item.checkIn ? new Date(item.checkIn) : 
                     bookingDetails.check_in_date ? new Date(bookingDetails.check_in_date) : null;
  const checkOutDate = item.checkOut ? new Date(item.checkOut) : 
                      bookingDetails.check_out_date ? new Date(bookingDetails.check_out_date) : null;
  
  const nights = item.nights || calculateNights(bookingDetails.check_in_date, bookingDetails.check_out_date);
  const totalPrice = item.totalPrice || item.total_price || (item.unit_price || item.price) * (nights || 1);

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

  const getGuestSummary = () => {
    return formatGuestSummary(bookingDetails.guests);
  };

  const getRoomPreferences = () => {
    return formatRoomPreferences(bookingDetails.room_preferences);
  };

  return (
    <Card className={`${isSelected ? 'ring-2 ring-blue-500' : ''} transition-all duration-200`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {/* Selection Checkbox */}
          {onToggleSelect && (
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onToggleSelect(item.cart_item_id || item.id)}
              className="mt-2 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
          )}

          {/* Hotel Image */}
          <div className="flex-shrink-0">
            <img
              src={item.variant?.images?.[0]?.url || 
                   item.product?.images?.[0]?.url || 
                   item.image || 
                   '/placeholder-hotel.jpg'}
              alt={item.variant?.variant_name || item.product?.name || item.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
          </div>

          {/* Hotel Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">
                  {item.variant?.variant_name || item.product?.name || item.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {item.variant?.product?.vendor_store_id?.store_name || 
                   item.product?.vendor_store_id?.store_name || 
                   'Hotel'}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                  {item.variant?.product?.vendor_store_id?.city && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">
                        {item.variant.product.vendor_store_id.city}
                      </span>
                    </div>
                  )}
                  {item.variant?.product?.vendor_store_id?.store_description && (
                    <div className="text-xs text-gray-500 truncate">
                      {item.variant.product.vendor_store_id.store_description}
                    </div>
                  )}
                </div>
              </div>
              
                             {/* Price */}
               <div className="text-right ml-4">
                 <div className="font-semibold text-gray-900">₹{totalPrice}</div>
                 <div className="text-sm text-gray-500">
                   ₹{item.unit_price || item.price}/night
                 </div>
               </div>
            </div>

            {/* Booking Details */}
            <div className="space-y-2 mt-3">
              {/* Dates */}
              {checkInDate && checkOutDate && (
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>
                    {format(checkInDate, 'MMM dd')} - {format(checkOutDate, 'MMM dd, yyyy')}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {nights} night{nights !== 1 ? 's' : ''}
                  </Badge>
                </div>
              )}

              {/* Guests */}
              {bookingDetails.guests && (
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span>{getGuestSummary()}</span>
                </div>
              )}

              {/* Room Preferences */}
              {bookingDetails.room_preferences && (
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Bed className="h-4 w-4 text-gray-500" />
                  <span>{getRoomPreferences()}</span>
                </div>
              )}

                             {/* Check-in/Check-out Times */}
               <div className="flex items-center gap-4 text-sm text-gray-600">
                 <div className="flex items-center gap-1">
                   <Clock className="h-3 w-3" />
                   <span>Check-in: 3:00 PM</span>
                 </div>
                 <div className="flex items-center gap-1">
                   <Clock className="h-3 w-3" />
                   <span>Check-out: 11:00 AM</span>
                 </div>
               </div>

              {/* Special Requests */}
              {bookingDetails.special_requests && (
                <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                  <span className="font-medium">Special Requests:</span> {bookingDetails.special_requests}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onQuantityChange(item.variantId, -1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onQuantityChange(item.variantId, 1)}
                >
                  +
                </Button>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(item.variantId)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HotelCartItem; 