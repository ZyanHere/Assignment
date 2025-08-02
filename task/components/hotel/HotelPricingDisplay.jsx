'use React';

import { useState, useEffect } from 'react';
import { Calendar, Users, Bed, Star, MapPin, Clock } from 'lucide-react';

const HotelPricingDisplay = ({ hotel, onDateSelect }) => {
  const [selectedDates, setSelectedDates] = useState({
    checkIn: null,
    checkOut: null
  });
  const [guests, setGuests] = useState(1);
  const [availability, setAvailability] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkAvailability = async () => {
    if (!selectedDates.checkIn || !selectedDates.checkOut) return;

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/lmd/api/v1/retail/hotels/${hotel._id}?check_in_date=${selectedDates.checkIn}&check_out_date=${selectedDates.checkOut}&guests=${guests}`
      );
      
      if (response.ok) {
        const data = await response.json();
        setAvailability(data.data.availability);
      }
    } catch (error) {
      console.error('Error checking availability:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDates.checkIn && selectedDates.checkOut) {
      checkAvailability();
    }
  }, [selectedDates, guests]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateNights = () => {
    if (!selectedDates.checkIn || !selectedDates.checkOut) return 0;
    const checkIn = new Date(selectedDates.checkIn);
    const checkOut = new Date(selectedDates.checkOut);
    return Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
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
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Hotel Basic Info */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{hotel.name}</h2>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
              <div className="flex items-center gap-1">
                {renderStars(hotel.type_specific.hotel.star_rating)}
                <span className="ml-1">{hotel.type_specific.hotel.star_rating} stars</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{hotel.type_specific.hotel.location.city}, {hotel.type_specific.hotel.location.country}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Check-in: {hotel.type_specific.hotel.check_in_time}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Check-out: {hotel.type_specific.hotel.check_out_time}</span>
              </div>
            </div>
          </div>
          {hotel.images && hotel.images.length > 0 && (
            <img
              src={hotel.images.find(img => img.is_primary)?.url || hotel.images[0].url}
              alt={hotel.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
          )}
        </div>

        {/* Hotel Amenities */}
        {hotel.type_specific.hotel.amenities && hotel.type_specific.hotel.amenities.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Hotel Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {hotel.type_specific.hotel.amenities.slice(0, 6).map((amenity, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                >
                  {amenity}
                </span>
              ))}
              {hotel.type_specific.hotel.amenities.length > 6 && (
                <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full">
                  +{hotel.type_specific.hotel.amenities.length - 6} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Date Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Your Dates</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check-in Date
            </label>
            <input
              type="date"
              value={selectedDates.checkIn || ''}
              onChange={(e) => setSelectedDates(prev => ({ ...prev, checkIn: e.target.value }))}
              min={new Date().toISOString().split('T')[0]}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check-out Date
            </label>
            <input
              type="date"
              value={selectedDates.checkOut || ''}
              onChange={(e) => setSelectedDates(prev => ({ ...prev, checkOut: e.target.value }))}
              min={selectedDates.checkIn || new Date().toISOString().split('T')[0]}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Guests
            </label>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-400" />
              <select
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Availability and Pricing */}
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-2">Checking availability...</p>
        </div>
      )}

      {availability && !loading && (
        <div className="mb-6">
          {availability.is_available ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-green-800">
                  Available for your selected dates!
                </h3>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    ₹{availability.price_per_night}
                  </div>
                  <div className="text-sm text-green-600">per night</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Check-in:</span>
                  <div className="font-medium">{formatDate(availability.check_in_date)}</div>
                </div>
                <div>
                  <span className="text-gray-600">Check-out:</span>
                  <div className="font-medium">{formatDate(availability.check_out_date)}</div>
                </div>
                <div>
                  <span className="text-gray-600">Nights:</span>
                  <div className="font-medium">{availability.nights}</div>
                </div>
                <div>
                  <span className="text-gray-600">Total Price:</span>
                  <div className="font-medium text-lg text-green-600">₹{availability.total_price}</div>
                </div>
              </div>

              {/* Room Variants */}
              {availability.suitable_variants && availability.suitable_variants.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-md font-medium text-gray-700 mb-2">Available Room Types</h4>
                  <div className="space-y-2">
                    {availability.suitable_variants.map((variant, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded border">
                        <div className="flex items-center gap-3">
                          <Bed className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="font-medium text-gray-900">{variant.name}</div>
                            <div className="text-sm text-gray-600">
                              {variant.bed_type} • {variant.max_occupancy} guests • {variant.area_sq_ft} sq ft
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-gray-900">₹{variant.base_price_per_night}</div>
                          <div className="text-sm text-gray-600">per night</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => onDateSelect && onDateSelect(selectedDates, availability)}
                className="w-full mt-4 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Book Now
              </button>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                Not Available
              </h3>
              <p className="text-red-600">{availability.message}</p>
            </div>
          )}
        </div>
      )}

      {/* Hotel Description */}
      {hotel.type_specific.hotel.description && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">About This Hotel</h3>
          <div 
            className="prose prose-sm max-w-none text-gray-600"
            dangerouslySetInnerHTML={{ 
              __html: hotel.type_specific.hotel.description
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/\n/g, '<br>')
            }}
          />
        </div>
      )}

      {/* Policies */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Hotel Policies</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={hotel.type_specific.hotel.pet_friendly}
              disabled
              className="h-4 w-4 text-blue-600"
            />
            <span className={hotel.type_specific.hotel.pet_friendly ? 'text-gray-900' : 'text-gray-400'}>
              Pet Friendly
            </span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={hotel.type_specific.hotel.smoking_allowed}
              disabled
              className="h-4 w-4 text-blue-600"
            />
            <span className={hotel.type_specific.hotel.smoking_allowed ? 'text-gray-900' : 'text-gray-400'}>
              Smoking Allowed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelPricingDisplay; 