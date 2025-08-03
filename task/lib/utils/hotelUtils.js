import { differenceInDays, addDays, isBefore, isAfter, startOfDay } from 'date-fns';

/**
 * Calculate the number of nights between check-in and check-out dates
 * @param {Date|string} checkInDate - Check-in date
 * @param {Date|string} checkOutDate - Check-out date
 * @returns {number} Number of nights
 */
export const calculateNights = (checkInDate, checkOutDate) => {
  if (!checkInDate || !checkOutDate) return 0;

  const checkIn = typeof checkInDate === 'string' ? new Date(checkInDate) : checkInDate;
  const checkOut = typeof checkOutDate === 'string' ? new Date(checkOutDate) : checkOutDate;

  return differenceInDays(checkOut, checkIn);
};

/**
 * Calculate total price for hotel booking
 * @param {number} pricePerNight - Price per night
 * @param {number} nights - Number of nights
 * @returns {number} Total price
 */
export const calculateTotalPrice = (pricePerNight, nights) => {
  return pricePerNight * nights;
};

/**
 * Generate array of selected dates between check-in and check-out
 * @param {Date|string} checkInDate - Check-in date
 * @param {Date|string} checkOutDate - Check-out date
 * @returns {Date[]} Array of dates
 */
export const generateSelectedDates = (checkInDate, checkOutDate) => {
  if (!checkInDate || !checkOutDate) return [];

  const checkIn = typeof checkInDate === 'string' ? new Date(checkInDate) : checkInDate;
  const checkOut = typeof checkOutDate === 'string' ? new Date(checkOutDate) : checkOutDate;

  const dates = [];
  let currentDate = new Date(checkIn);

  // Handle same-day bookings
  if (differenceInDays(checkOut, checkIn) === 0) {
    dates.push(new Date(checkIn));
    return dates;
  }

  while (isBefore(currentDate, checkOut)) {
    dates.push(new Date(currentDate));
    currentDate = addDays(currentDate, 1);
  }

  return dates;
};

/**
 * Validate hotel booking dates
 * @param {Date|string} checkInDate - Check-in date
 * @param {Date|string} checkOutDate - Check-out date
 * @returns {Object} Validation result with isValid and errors
 */
export const validateBookingDates = (checkInDate, checkOutDate) => {
  const errors = [];

  if (!checkInDate) {
    errors.push('Check-in date is required');
  }

  if (!checkOutDate) {
    errors.push('Check-out date is required');
  }

  if (checkInDate && checkOutDate) {
    const checkIn = typeof checkInDate === 'string' ? new Date(checkInDate) : checkInDate;
    const checkOut = typeof checkOutDate === 'string' ? new Date(checkOutDate) : checkOutDate;
    const today = startOfDay(new Date());

    if (isBefore(checkIn, today)) {
      errors.push('Check-in date cannot be in the past');
    }

    if (isBefore(checkOut, checkIn)) {
      errors.push('Check-out date cannot be before check-in date');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validate guest information
 * @param {Object} guests - Guest information
 * @returns {Object} Validation result with isValid and errors
 */
export const validateGuests = (guests) => {
  const errors = [];

  if (!guests) {
    errors.push('Guest information is required');
    return { isValid: false, errors };
  }

  if (!guests.adults || guests.adults < 1) {
    errors.push('At least 1 adult is required');
  }

  if (guests.children < 0) {
    errors.push('Children cannot be negative');
  }

  if (guests.infants < 0) {
    errors.push('Infants cannot be negative');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Format guest summary for display
 * @param {Object} guests - Guest information
 * @returns {string} Formatted guest summary
 */
export const formatGuestSummary = (guests) => {
  if (!guests) return '';

  const parts = [];

  if (guests.adults > 0) {
    parts.push(`${guests.adults} adult${guests.adults !== 1 ? 's' : ''}`);
  }
  if (guests.children > 0) {
    parts.push(`${guests.children} child${guests.children !== 1 ? 'ren' : ''}`);
  }
  if (guests.infants > 0) {
    parts.push(`${guests.infants} infant${guests.infants !== 1 ? 's' : ''}`);
  }

  return parts.join(', ');
};

/**
 * Format room preferences for display
 * @param {Object} preferences - Room preferences
 * @returns {string} Formatted preferences
 */
export const formatRoomPreferences = (preferences) => {
  if (!preferences) return 'Standard preferences';

  const parts = [];

  if (preferences.bed_type && preferences.bed_type !== 'any') {
    parts.push(preferences.bed_type.charAt(0).toUpperCase() + preferences.bed_type.slice(1));
  }
  if (preferences.view_preference && preferences.view_preference !== 'any') {
    parts.push(`${preferences.view_preference} view`);
  }
  if (preferences.floor_preference && preferences.floor_preference !== 'any') {
    parts.push(`${preferences.floor_preference} floor`);
  }

  return parts.length > 0 ? parts.join(', ') : 'Standard preferences';
};

/**
 * Check if an item is a hotel booking
 * @param {Object} item - Cart or order item
 * @returns {boolean} True if item is a hotel booking
 */
export const isHotelBooking = (item) => {
  // Check for explicit hotel booking flags
  if (item.isHotelBooking) return true;

  // // Check for hotel booking specific data
  // if (item.booking_details || item.selectedDates || item.checkIn || item.hotelName) return true;

  // // Check product type
  // const productType = item.product?.product_type || item.variant?.product?.product_type;
  // if (productType === 'hotel_booking' || productType === 'hotel') return true;

  // // Check category type
  // const categoryType = item.product?.category?.type || item.variant?.product?.category?.type;
  // if (categoryType === 'hotel') return true;

  // // Check category names (case insensitive)
  // const categoryName = (item.product?.category?.name || item.variant?.product?.category?.name || '').toLowerCase();
  // const hotelCategories = [
  //   'business hotels', 'hotels', 'hotel', 'accommodation', 'lodging', 
  //   'resort', 'motel', 'inn', 'guesthouse', 'bed and breakfast'
  // ];
  // if (hotelCategories.some(cat => categoryName.includes(cat))) return true;

  // // Check if the item name contains hotel-related keywords
  // const itemName = (item.name || item.variant?.variant_name || item.product?.name || '').toLowerCase();
  // const hotelKeywords = ['hotel', 'room', 'suite', 'accommodation', 'booking', 'stay'];
  // if (hotelKeywords.some(keyword => itemName.includes(keyword))) return true;

  return false;
};

/**
 * Get hotel booking details from item
 * @param {Object} item - Cart or order item
 * @returns {Object} Hotel booking details
 */
export const getHotelBookingDetails = (item) => {
  if (!isHotelBooking(item)) return null;

  const bookingDetails = item.booking_details || {};
  const selectedDates = item.selectedDates || [];

  // Try to get check-in/check-out from multiple sources
  const checkIn = item.checkIn ||
    bookingDetails.check_in_date ||
    bookingDetails.checkIn ||
    (selectedDates.length > 0 ? selectedDates[0] : null);

  const checkOut = item.checkOut ||
    bookingDetails.check_out_date ||
    bookingDetails.checkOut ||
    (selectedDates.length > 1 ? selectedDates[selectedDates.length - 1] : null);

  // Calculate nights
  const nights = item.nights ||
    bookingDetails.nights ||
    (checkIn && checkOut ?
      Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)) : 0);

  return {
    bookingDetails,
    selectedDates,
    checkIn,
    checkOut,
    nights,
    product: item.product || null,
    totalPrice: item.total_price || item.totalPrice || null,
    guests: bookingDetails.guests || null,
    preferences: bookingDetails.preferences || null
  };
};

/**
 * Calculate total price for hotel items in cart/order
 * @param {Array} items - Array of cart or order items
 * @returns {number} Total price for hotel bookings
 */
export const calculateHotelBookingsTotal = (items) => {
  return items
    .filter(isHotelBooking)
    .reduce((total, item) => {
      const bookingDetails = item.booking_details || {};
      const nights = calculateNights(bookingDetails.check_in_date, bookingDetails.check_out_date);
      const itemTotal = item.total_price || (item.price * nights);
      return total + itemTotal;
    }, 0);
};

/**
 * Filter hotel booking items from array
 * @param {Array} items - Array of cart or order items
 * @returns {Array} Array of hotel booking items only
 */
export const filterHotelBookings = (items) => {
  return items.filter(isHotelBooking);
};

/**
 * Filter non-hotel items from array
 * @param {Array} items - Array of cart or order items
 * @returns {Array} Array of non-hotel items only
 */
export const filterNonHotelItems = (items) => {
  return items.filter(item => !isHotelBooking(item));
}; 