'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isBefore, isAfter, addDays, differenceInDays, startOfWeek, endOfWeek } from 'date-fns';

const HotelAvailabilityCalendar = ({
  hotelId,
  variantId,
  onDateSelect,
  selectedDates = { checkIn: null, checkOut: null },
  minStay = 1,
  maxStay = 30,
  disabledDates = [],
  className = '',
  availability = {} // Accept availability as prop
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [hoveredDate, setHoveredDate] = useState(null);

  // Generate calendar days including padding days
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd
  });

  // Use availability data from props instead of generating mock data
  useEffect(() => {
    // If no availability data is provided, we could fetch it here
    // For now, we'll use the data passed as props
    if (Object.keys(availability).length === 0 && hotelId && variantId) {
      setLoading(true);
      // Simulate loading if no data provided
      setTimeout(() => setLoading(false), 500);
    }
  }, [availability, hotelId, variantId]);

  const isDateAvailable = (date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    return availability[dateKey]?.available && !disabledDates.some(d => isSameDay(d, date));
  };

  const isDateSelected = (date) => {
    return (selectedDates.checkIn && isSameDay(date, selectedDates.checkIn)) ||
           (selectedDates.checkOut && isSameDay(date, selectedDates.checkOut));
  };

  const isDateInRange = (date) => {
    if (!selectedDates.checkIn || !selectedDates.checkOut) return false;
    // Support same-day bookings (check-in and check-out on same day)
    if (isSameDay(selectedDates.checkIn, selectedDates.checkOut)) {
      return isSameDay(date, selectedDates.checkIn);
    }
    return isAfter(date, selectedDates.checkIn) && isBefore(date, selectedDates.checkOut);
  };

  const isDateDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return isBefore(date, today) || !isDateAvailable(date);
  };

  const handleDateClick = (date) => {
    if (isDateDisabled(date)) return;

    if (!selectedDates.checkIn || (selectedDates.checkIn && selectedDates.checkOut)) {
      // Start new selection
      onDateSelect({ checkIn: date, checkOut: null });
    } else {
      // Complete selection - support one-day bookings (same day)
      if (isBefore(date, selectedDates.checkIn)) {
        onDateSelect({ checkIn: date, checkOut: selectedDates.checkIn });
      } else {
        const nights = differenceInDays(date, selectedDates.checkIn);
        // Allow same-day bookings (nights = 0) and respect min/max stay
        if (nights >= minStay && nights <= maxStay) {
          onDateSelect({ checkIn: selectedDates.checkIn, checkOut: date });
        }
      }
    }
  };

  const getDateStatus = (date) => {
    if (isDateDisabled(date)) return 'disabled';
    if (isDateSelected(date)) return 'selected';
    if (isDateInRange(date)) return 'inRange';
    if (hoveredDate && selectedDates.checkIn && !selectedDates.checkOut) {
      const nights = differenceInDays(hoveredDate, selectedDates.checkIn);
      if (nights >= minStay && nights <= maxStay && 
          (isAfter(hoveredDate, selectedDates.checkIn) || isSameDay(hoveredDate, selectedDates.checkIn)) && 
          isDateInRange(date)) {
        return 'hoverRange';
      }
    }
    return 'available';
  };

  const getDateRoomsLeft = (date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    return availability[dateKey]?.roomsLeft;
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => direction === 'next' ? addMonths(prev, 1) : subMonths(prev, 1));
  };

  const getDateClassName = (date) => {
    const status = getDateStatus(date);
    const isCurrentMonth = isSameMonth(date, currentMonth);
    const baseClasses = 'min-h-[80px] p-2 flex flex-col items-center justify-start rounded-lg text-sm font-medium transition-all duration-200 border';
    
    if (!isCurrentMonth) {
      return `${baseClasses} text-gray-300 bg-gray-50 border-gray-100 cursor-default`;
    }
    
    switch (status) {
      case 'disabled':
        return `${baseClasses} text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed`;
      case 'selected':
        return `${baseClasses} bg-yellow-500 text-white border-yellow-500 hover:bg-yellow-600 cursor-pointer`;
      case 'inRange':
        return `${baseClasses} bg-yellow-100 text-yellow-800 border-yellow-200 cursor-pointer`;
      case 'hoverRange':
        return `${baseClasses} bg-yellow-50 text-yellow-700 border-yellow-100 cursor-pointer`;
      default:
        return `${baseClasses} hover:bg-gray-50 text-gray-700 border-gray-200 cursor-pointer`;
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Availability Calendar
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500" />
            <span className="ml-2">Loading availability...</span>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Calendar Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth('prev')}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h3 className="text-lg font-semibold">
                {format(currentMonth, 'MMMM yyyy')}
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth('next')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Calendar Grid */}
            <div className="space-y-2">
              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((date, index) => {
                  const isCurrentMonth = isSameMonth(date, currentMonth);
                  const status = getDateStatus(date);
                  const roomsLeft = getDateRoomsLeft(date);

                  return (
                    <div
                      key={index}
                      className={getDateClassName(date)}
                      onClick={() => handleDateClick(date)}
                      onMouseEnter={() => setHoveredDate(date)}
                      onMouseLeave={() => setHoveredDate(null)}
                    >
                      {/* Date Number */}
                      <div className="text-sm font-semibold mb-1">
                        {format(date, 'd')}
                      </div>
                      
                      {/* Availability Status */}
                      {isCurrentMonth && (
                        <div className="text-xs text-gray-600 mb-1">
                          {isDateAvailable(date) ? 'Available' : 'Not Available'}
                        </div>
                      )}
                      
                      {/* Price Display */}
                      {isCurrentMonth && isDateAvailable(date) && (
                        <div className="text-xs font-medium text-green-600 mb-1">
                          ₹{availability[format(date, 'yyyy-MM-dd')]?.price?.toLocaleString() || 'N/A'}
                        </div>
                      )}
                      
                      {/* Availability Badge */}
                      {isCurrentMonth && roomsLeft && roomsLeft <= 3 && isDateAvailable(date) && (
                        <div className="text-xs">
                          <Badge 
                            variant="outline" 
                            className={`text-xs px-1 py-0.5 ${
                              status === 'selected' ? 'bg-white/20 text-white border-white/30' : ''
                            }`}
                          >
                            {roomsLeft} left
                          </Badge>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 text-sm border-t pt-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded border"></div>
                <span>Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-100 rounded border border-yellow-200"></div>
                <span>In Range</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-white rounded border border-gray-200"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-100 rounded border border-gray-200"></div>
                <span>Unavailable</span>
              </div>
            </div>

            {/* Selected Dates Summary */}
            {selectedDates.checkIn && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium mb-3 text-blue-800">Selected Dates:</h4>
                <div className="flex flex-wrap items-center gap-6">
                  <div>
                    <span className="text-sm text-blue-600">Check-in:</span>
                    <div className="font-medium text-blue-800">
                      {format(selectedDates.checkIn, 'MMM dd, yyyy')}
                    </div>
                  </div>
                  {selectedDates.checkOut && (
                    <>
                      <div className="text-blue-400 text-lg">→</div>
                      <div>
                        <span className="text-sm text-blue-600">Check-out:</span>
                        <div className="font-medium text-blue-800">
                          {format(selectedDates.checkOut, 'MMM dd, yyyy')}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-blue-600">Duration:</span>
                        <div className="font-medium text-blue-800">
                          {differenceInDays(selectedDates.checkOut, selectedDates.checkIn) === 0 
                            ? 'Same day' 
                            : `${differenceInDays(selectedDates.checkOut, selectedDates.checkIn)} nights`}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HotelAvailabilityCalendar; 