// lib/api/cart.js
import { api } from './axios';

function unwrapError(e) {
  if (e.response?.data?.message) throw new Error(e.response.data.message);
  throw e;
}

/** GET /retail/cart/me → returns mapped items[] */
export async function fetchCart() {
  try {
    const { data } = await api.get('/lmd/api/v1/retail/cart/me');
    const items = data.data.items;
    
    // Debug: Log the raw cart data to see the structure
    console.log('🔍 fetchCart: Raw cart items:', items.map(item => ({
      cart_item_id: item.cart_item_id,
      variant_id: item.variant?._id,
      variant_name: item.variant?.variant_name,
      has_booking_details: !!item.booking_details
    })));
    

    
    // Debug: Log the processed cart items
    const processedItems = items.map((i) => ({
      id: i.cart_item_id,
      variantId: i.variant._id,
      name: i.variant.variant_name,
      brand: i.variant.product.vendor_store_id?.store_name || 'Last Minute Deal',
      seller: i.variant.product.vendor_store_id?.store_name || 'Last Minute Deal',
      vendorId: i.variant.product.vendor_store_id?._id || 'default',
      vendorName: i.variant.product.vendor_store_id?.store_name || 'Last Minute Deal',
      price: i.unit_price,
      mrp: i.variant.price.base_price,
      image:
        i.variant.images.find((img) => img.is_primary)?.url ||
        i.variant.product.images[0]?.url,
      weight: i.variant.variant_name,
      quantity: i.quantity,
      category: i.variant.product.category?.name || 'General',
      subcategory: i.variant.product.subcategory?.name || '',
      // Hotel booking specific fields
      selectedDates: i.selectedDates || null,
      booking_details: i.booking_details || null,
      product: i.variant.product || null,
      total_price: i.total_price || null,
      // Additional hotel fields from booking_details
      checkIn: i.booking_details?.checkIn || null,
      checkOut: i.booking_details?.checkOut || null,
      nights: i.booking_details?.nights || null,
      hotelName: i.booking_details?.hotelName || null,
      hotelLocation: i.booking_details?.hotelLocation || null,
      roomType: i.booking_details?.roomType || null,
      checkInTime: i.booking_details?.checkInTime || null,
      checkOutTime: i.booking_details?.checkOutTime || null,
      maxGuests: i.booking_details?.maxGuests || null,
      bedType: i.booking_details?.bedType || null,
      isHotelBooking: i.booking_details?.isHotelBooking || false,
      hotelId: i.booking_details?.hotelId || null,
      bookingVariantId: i.booking_details?.variantId || null,
      availability: i.booking_details?.availability || null,
    }));
    
  
    
    return processedItems;
  } catch (e) {
    unwrapError(e);
  }
}

/** POST /retail/cart/me/items */
export async function addOrUpdateItem(variantId, quantity = 1, bookingDetails = null) {
  try {
    const payload = { variant_id: variantId, quantity }
    
    // Add hotel booking details if provided
    if (bookingDetails) {
      if (bookingDetails.selectedDates) {
        payload.selectedDates = bookingDetails.selectedDates;
      }
      if (bookingDetails.booking_details) {
        payload.booking_details = bookingDetails.booking_details;
      }
      // Also add direct hotel fields for backward compatibility
      if (bookingDetails.booking_details) {
        payload.checkIn = bookingDetails.booking_details.checkIn;
        payload.checkOut = bookingDetails.booking_details.checkOut;
        payload.nights = bookingDetails.booking_details.nights;
        payload.totalPrice = bookingDetails.booking_details.totalPrice;
        payload.hotelName = bookingDetails.booking_details.hotelName;
        payload.hotelLocation = bookingDetails.booking_details.hotelLocation;
        payload.roomType = bookingDetails.booking_details.roomType;
        payload.checkInTime = bookingDetails.booking_details.checkInTime;
        payload.checkOutTime = bookingDetails.booking_details.checkOutTime;
        payload.maxGuests = bookingDetails.booking_details.maxGuests;
        payload.bedType = bookingDetails.booking_details.bedType;
        payload.isHotelBooking = bookingDetails.booking_details.isHotelBooking;
        payload.hotelId = bookingDetails.booking_details.hotelId;
        payload.variantId = bookingDetails.booking_details.variantId;
        payload.availability = bookingDetails.booking_details.availability;
      }
    }
    
    await api.post('/lmd/api/v1/retail/cart/me/items', payload);
  } catch (e) {
    unwrapError(e);
  }
}

/** PUT /retail/cart/me/items/:itemId */
export async function updateCartItem(itemId, quantity, bookingDetails = null) {
  try {
    const payload = { quantity };
    
    // Add hotel booking details if provided
    if (bookingDetails) {
      if (bookingDetails.selectedDates) {
        payload.selectedDates = bookingDetails.selectedDates;
      }
      if (bookingDetails.booking_details) {
        payload.booking_details = bookingDetails.booking_details;
      }
      // Also add direct hotel fields for backward compatibility
      if (bookingDetails.booking_details) {
        payload.checkIn = bookingDetails.booking_details.checkIn;
        payload.checkOut = bookingDetails.booking_details.checkOut;
        payload.nights = bookingDetails.booking_details.nights;
        payload.totalPrice = bookingDetails.booking_details.totalPrice;
        payload.hotelName = bookingDetails.booking_details.hotelName;
        payload.hotelLocation = bookingDetails.booking_details.hotelLocation;
        payload.roomType = bookingDetails.booking_details.roomType;
        payload.checkInTime = bookingDetails.booking_details.checkInTime;
        payload.checkOutTime = bookingDetails.booking_details.checkOutTime;
        payload.maxGuests = bookingDetails.booking_details.maxGuests;
        payload.bedType = bookingDetails.booking_details.bedType;
        payload.isHotelBooking = bookingDetails.booking_details.isHotelBooking;
        payload.hotelId = bookingDetails.booking_details.hotelId;
        payload.variantId = bookingDetails.booking_details.variantId;
        payload.availability = bookingDetails.booking_details.availability;
      }
    }
    
    await api.put(`/lmd/api/v1/retail/cart/me/items/${itemId}`, payload);
  } catch (e) {
    unwrapError(e);
  }
}

/** DELETE /retail/cart/me/items/:variantId */
export async function removeItem(variantId) {
  try {
    await api.delete(`/lmd/api/v1/retail/cart/me/items/${variantId}`);
  } catch (e) {
    unwrapError(e);
  }
}


/** DELETE /retail/cart/me */
export async function clearCart() {
  try {
    await api.delete('/lmd/api/v1/retail/cart/me');
  } catch (e) {
    unwrapError(e);
  }
}
