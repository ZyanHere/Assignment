'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Users, Bed, MapPin, Clock, Star, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { format, addDays, isAfter, isBefore, startOfDay } from 'date-fns';
import { 
  calculateNights, 
  calculateTotalPrice, 
  generateSelectedDates, 
  validateBookingDates, 
  validateGuests 
} from '@/lib/utils/hotelUtils';

const HotelBookingForm = ({ 
  hotel, 
  variant, 
  onBookingSubmit, 
  onAvailabilityCheck,
  isAddingToCart = false 
}) => {
  const [selectedDates, setSelectedDates] = useState({
    checkIn: null,
    checkOut: null
  });
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    infants: 0
  });
  const [roomPreferences, setRoomPreferences] = useState({
    bed_type: 'any',
    floor_preference: 'any',
    view_preference: 'any'
  });
  const [specialRequests, setSpecialRequests] = useState('');
  const [availability, setAvailability] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Minimum check-in date (today)
  const minCheckInDate = startOfDay(new Date());

  const checkAvailability = async () => {
    if (!selectedDates.checkIn || !selectedDates.checkOut) return;

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/lmd/api/v1/retail/hotel-orders/availability/${variant._id}?start_date=${selectedDates.checkIn.toISOString()}&end_date=${selectedDates.checkOut.toISOString()}`
      );
      
      if (response.ok) {
        const data = await response.json();
        setAvailability(data.data);
        
        if (onAvailabilityCheck) {
          onAvailabilityCheck(data.data);
        }
      } else {
        const errorData = await response.json();
        setErrors({ availability: errorData.message || 'Failed to check availability' });
      }
    } catch (error) {
      console.error('Error checking availability:', error);
      setErrors({ availability: 'Failed to check availability' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDates.checkIn && selectedDates.checkOut) {
      checkAvailability();
    }
  }, [selectedDates, guests]);

  const handleDateChange = (type, date) => {
    const newDates = { ...selectedDates };
    
    if (type === 'checkIn') {
      newDates.checkIn = date;
      // If check-out is before new check-in, reset it
      if (newDates.checkOut && isBefore(newDates.checkOut, date)) {
        newDates.checkOut = null;
      }
    } else {
      newDates.checkOut = date;
    }
    
    setSelectedDates(newDates);
  };

  const getNights = () => {
    if (!selectedDates.checkIn || !selectedDates.checkOut) return 0;
    return calculateNights(selectedDates.checkIn, selectedDates.checkOut);
  };

  const getTotalPrice = () => {
    if (!availability || !selectedDates.checkIn || !selectedDates.checkOut) return 0;
    const nights = getNights();
    return calculateTotalPrice(availability.price_per_night, nights);
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate dates
    const dateValidation = validateBookingDates(selectedDates.checkIn, selectedDates.checkOut);
    if (!dateValidation.isValid) {
      dateValidation.errors.forEach(error => {
        if (error.includes('Check-in')) {
          newErrors.checkIn = error;
        } else if (error.includes('Check-out')) {
          newErrors.checkOut = error;
        }
      });
    }

    // Validate guests
    const guestValidation = validateGuests(guests);
    if (!guestValidation.isValid) {
      guestValidation.errors.forEach(error => {
        if (error.includes('adult')) {
          newErrors.adults = error;
        } else if (error.includes('child')) {
          newErrors.children = error;
        } else if (error.includes('infant')) {
          newErrors.infants = error;
        }
      });
    }

    if (specialRequests.length > 1000) {
      newErrors.specialRequests = 'Special requests cannot exceed 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const bookingData = {
      variant_id: variant._id,
      quantity: 1,
      unit_price: availability?.price_per_night || variant.price,
      total_price: getTotalPrice(),
      selectedDates: getSelectedDates(),
      booking_details: {
        check_in_date: selectedDates.checkIn.toISOString(),
        check_out_date: selectedDates.checkOut.toISOString(),
        guests,
        special_requests: specialRequests,
        room_preferences: roomPreferences
      }
    };

    if (onBookingSubmit) {
      onBookingSubmit(bookingData);
    }
  };

  const getSelectedDates = () => {
    if (!selectedDates.checkIn || !selectedDates.checkOut) return [];
    return generateSelectedDates(selectedDates.checkIn, selectedDates.checkOut);
  };

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

  return (
    <div className="space-y-6">
      {/* Hotel Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            {hotel.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-1">
              {renderStars(hotel.type_specific?.hotel?.star_rating || 0)}
              <span className="ml-1">{hotel.type_specific?.hotel?.star_rating || 0} stars</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{hotel.type_specific?.hotel?.location?.city}, {hotel.type_specific?.hotel?.location?.country}</span>
            </div>
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
        </CardContent>
      </Card>

      {/* Date Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Select Dates
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="checkIn">Check-in Date</Label>
              <Input
                id="checkIn"
                type="date"
                min={format(minCheckInDate, 'yyyy-MM-dd')}
                value={selectedDates.checkIn ? format(selectedDates.checkIn, 'yyyy-MM-dd') : ''}
                onChange={(e) => handleDateChange('checkIn', new Date(e.target.value))}
                className={errors.checkIn ? 'border-red-500' : ''}
              />
              {errors.checkIn && (
                <p className="text-sm text-red-500 mt-1">{errors.checkIn}</p>
              )}
            </div>
            <div>
              <Label htmlFor="checkOut">Check-out Date</Label>
              <Input
                id="checkOut"
                type="date"
                min={selectedDates.checkIn ? format(addDays(selectedDates.checkIn, 1), 'yyyy-MM-dd') : format(addDays(minCheckInDate, 1), 'yyyy-MM-dd')}
                value={selectedDates.checkOut ? format(selectedDates.checkOut, 'yyyy-MM-dd') : ''}
                onChange={(e) => handleDateChange('checkOut', new Date(e.target.value))}
                className={errors.checkOut ? 'border-red-500' : ''}
              />
              {errors.checkOut && (
                <p className="text-sm text-red-500 mt-1">{errors.checkOut}</p>
              )}
            </div>
          </div>
          
          {selectedDates.checkIn && selectedDates.checkOut && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>{getNights()} night{getNights() !== 1 ? 's' : ''}</span>
              <span>•</span>
              <span>{format(selectedDates.checkIn, 'MMM dd')} - {format(selectedDates.checkOut, 'MMM dd, yyyy')}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Guest Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Guest Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="adults">Adults</Label>
              <Input
                id="adults"
                type="number"
                min="1"
                max="10"
                value={guests.adults}
                onChange={(e) => setGuests(prev => ({ ...prev, adults: parseInt(e.target.value) || 1 }))}
                className={errors.adults ? 'border-red-500' : ''}
              />
              {errors.adults && (
                <p className="text-sm text-red-500 mt-1">{errors.adults}</p>
              )}
            </div>
            <div>
              <Label htmlFor="children">Children</Label>
              <Input
                id="children"
                type="number"
                min="0"
                max="10"
                value={guests.children}
                onChange={(e) => setGuests(prev => ({ ...prev, children: parseInt(e.target.value) || 0 }))}
                className={errors.children ? 'border-red-500' : ''}
              />
              {errors.children && (
                <p className="text-sm text-red-500 mt-1">{errors.children}</p>
              )}
            </div>
            <div>
              <Label htmlFor="infants">Infants</Label>
              <Input
                id="infants"
                type="number"
                min="0"
                max="5"
                value={guests.infants}
                onChange={(e) => setGuests(prev => ({ ...prev, infants: parseInt(e.target.value) || 0 }))}
                className={errors.infants ? 'border-red-500' : ''}
              />
              {errors.infants && (
                <p className="text-sm text-red-500 mt-1">{errors.infants}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Room Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bed className="h-5 w-5" />
            Room Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="bedType">Bed Type</Label>
              <Select value={roomPreferences.bed_type} onValueChange={(value) => setRoomPreferences(prev => ({ ...prev, bed_type: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="double">Double</SelectItem>
                  <SelectItem value="queen">Queen</SelectItem>
                  <SelectItem value="king">King</SelectItem>
                  <SelectItem value="twin">Twin</SelectItem>
                  <SelectItem value="suite">Suite</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="floorPreference">Floor Preference</Label>
              <Select value={roomPreferences.floor_preference} onValueChange={(value) => setRoomPreferences(prev => ({ ...prev, floor_preference: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="low">Low Floor</SelectItem>
                  <SelectItem value="high">High Floor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="viewPreference">View Preference</Label>
              <Select value={roomPreferences.view_preference} onValueChange={(value) => setRoomPreferences(prev => ({ ...prev, view_preference: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="city">City View</SelectItem>
                  <SelectItem value="garden">Garden View</SelectItem>
                  <SelectItem value="pool">Pool View</SelectItem>
                  <SelectItem value="ocean">Ocean View</SelectItem>
                  <SelectItem value="mountain">Mountain View</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Special Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Special Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Any special requests or preferences..."
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            maxLength={1000}
            className={errors.specialRequests ? 'border-red-500' : ''}
          />
          {errors.specialRequests && (
            <p className="text-sm text-red-500 mt-1">{errors.specialRequests}</p>
          )}
          <p className="text-sm text-gray-500 mt-1">
            {specialRequests.length}/1000 characters
          </p>
        </CardContent>
      </Card>

      {/* Availability and Pricing */}
      {loading && (
        <Card>
          <CardContent className="flex items-center justify-center py-8">
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span>Checking availability...</span>
            </div>
          </CardContent>
        </Card>
      )}

      {availability && !loading && (
        <Card>
          <CardHeader>
            <CardTitle>Booking Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Price per night:</span>
              <span className="font-semibold">₹{availability.price_per_night}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Number of nights:</span>
              <span>{getNights()}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total Price:</span>
              <span>₹{getTotalPrice()}</span>
            </div>
            
            {availability.available_rooms > 0 ? (
              <Badge variant="default" className="bg-green-100 text-green-800">
                {availability.available_rooms} room{availability.available_rooms !== 1 ? 's' : ''} available
              </Badge>
            ) : (
              <Badge variant="destructive">
                No rooms available for selected dates
              </Badge>
            )}
          </CardContent>
        </Card>
      )}

      {errors.availability && (
        <Card>
          <CardContent className="flex items-center gap-2 py-4 text-red-600">
            <AlertCircle className="h-4 w-4" />
            <span>{errors.availability}</span>
          </CardContent>
        </Card>
      )}

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={loading || !availability || availability.available_rooms === 0}
        className="w-full"
        size="lg"
      >
        {isAddingToCart ? 'Add to Cart' : 'Book Now'}
      </Button>
    </div>
  );
};

export default HotelBookingForm; 