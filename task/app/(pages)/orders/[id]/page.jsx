"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Package, 
  User, 
  MapPin, 
  CreditCard, 
  Calendar, 
  Phone, 
  Mail, 
  Store, 
  Truck, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  RefreshCw,
  ShoppingBag,
  Star,
  FileText,
  DollarSign,
  Tag,
  Eye,
  Bed,
  Building,
  MapPin as MapPinIcon,
  Users,
  Wifi,
  Coffee,
  Shield,
  Clock as ClockIcon
} from "lucide-react";
import Header from "@/components/home/Header";
import { useAuth } from "@/lib/hooks/useAuth";
import { useDispatch } from "react-redux";
import { 
  getOrderDetails, 
  fetchOrderTracking,
  refreshOrderTracking,
  clearOrderTracking 
} from "@/lib/redux/user/userSlice";
import toast from "react-hot-toast";
import OrderTracking from "@/components/profile/OrderTracking";
import { current } from "@reduxjs/toolkit";

const OrderDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id;
  const dispatch = useDispatch();
  
  const { 
    isAuthenticated, 
    session,
    currentOrder,
    orderTracking,
    trackingLoading,
    trackingError
  } = useAuth();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTracking, setShowTracking] = useState(false);

  useEffect(() => {
    if (orderId && isAuthenticated && session?.user?.token) {
      fetchOrderDetails();
    }
  }, [orderId, isAuthenticated, session?.user?.token]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      await dispatch(getOrderDetails({ 
        token: session.user.token, 
        orderId 
      })).unwrap();
      
    } catch (error) {
      console.error('Error fetching order details:', error);
      setError(error || 'Failed to load order details');
      toast.error(error || 'Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  const handleTrackOrder = async () => {
    if (!isAuthenticated || !session?.user?.token) {
      toast.error("Authentication required");
      return;
    }

    setShowTracking(true);

    try {
      await dispatch(fetchOrderTracking({ 
        token: session.user.token, 
        orderId 
      })).unwrap();
    } catch (error) {
      console.error('Error fetching tracking data:', error);
      toast.error(error || 'Failed to load tracking information');
    }
  };

  const handleRefreshTracking = async () => {
    if (!session?.user?.token) return;

    try {
      await dispatch(refreshOrderTracking({ 
        token: session.user.token, 
        orderId 
      })).unwrap();
      
      toast.success('Tracking information updated');
    } catch (error) {
      console.error('Error refreshing tracking data:', error);
      toast.error(error || 'Failed to refresh tracking information');
    }
  };

  const closeTracking = () => {
    setShowTracking(false);
    dispatch(clearOrderTracking(orderId));
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      processing: 'bg-purple-100 text-purple-800',
      shipped: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      refunded: 'bg-gray-100 text-gray-800',
      failed: 'bg-red-100 text-red-800'
    };
    return colors[status] || colors.pending;
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: Clock,
      confirmed: CheckCircle,
      processing: Package,
      shipped: Truck,
      delivered: CheckCircle,
      cancelled: AlertCircle,
      refunded: DollarSign,
      failed: AlertCircle
    };
    return icons[status] || Clock;
  };

  const getPaymentStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      paid: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      refunded: 'bg-gray-100 text-gray-800',
      captured: 'bg-green-100 text-green-800'
    };
    return colors[status] || colors.pending;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount || 0);
  };

  // Helper function to check if order contains hotel bookings
  const isHotelBooking = () => {
    return currentOrder.items?.some(item => 
      item.product_id?.product_type === 'hotel_booking'
    );
  };

  const isMixedOrder = () => {
    const hasHotel = currentOrder.items?.some(item => 
      item.product_id?.product_type === 'hotel_booking'
    );
    const hasRetail = currentOrder.items?.some(item => 
      item.product_id?.product_type === 'retail'
    );
    return hasHotel && hasRetail;
  };

  const getHotelItems = () => {
    return currentOrder.items?.filter(item => 
      item.product_id?.product_type === 'hotel_booking'
    ) || [];
  };

  const getRetailItems = () => {
    return currentOrder.items?.filter(item => 
      item.product_id?.product_type === 'retail'
    ) || [];
  };

  // Helper function to get hotel booking details
  const getHotelBookingDetails = () => {
    const hotelItem = currentOrder?.items?.find(item => 
      item.product_id?.product_type === 'hotel_booking'
    );
    return hotelItem;
  };

  // Helper function to format hotel amenities
  const formatAmenities = (amenities) => {
    if (!amenities || !Array.isArray(amenities)) return [];
    return amenities.slice(0, 6); // Show first 6 amenities
  };

  // Helper function to get hotel booking dates
  const getHotelBookingDates = () => {
    const hotelItem = getHotelBookingDetails();
    if (hotelItem?.booking_details) {
      return {
        checkIn: hotelItem.booking_details.checkIn,
        checkOut: hotelItem.booking_details.checkOut,
        nights: hotelItem.booking_details.nights
      };
    }
    
    // If no booking_details, try to calculate from availability calendar
    if (hotelItem?.variant_id?.type_specific?.hotel?.availability_calendar) {
      const calendar = hotelItem.variant_id.type_specific.hotel.availability_calendar;
      if (calendar.length >= 2) {
        const checkIn = new Date(calendar[0].date);
        const checkOut = new Date(calendar[calendar.length - 1].date);
        // Add one day to checkOut to get the actual checkout date
        checkOut.setDate(checkOut.getDate() + 1);
        const nights = calendar.length;
        
        return {
          checkIn: checkIn.toISOString(),
          checkOut: checkOut.toISOString(),
          nights: nights
        };
      }
    }
    
    return null;
  };

  // Helper function to get hotel attributes
  const getHotelAttributes = (hotelItem) => {
    const attributes = hotelItem?.variant_id?.attributes || [];
    const attributeMap = {};
    attributes.forEach(attr => {
      attributeMap[attr.name] = attr.value;
    });
    return attributeMap;
  };

  // Helper function to calculate total price from availability calendar
  const calculateTotalPriceFromCalendar = (hotelItem) => {
    if (hotelItem?.variant_id?.type_specific?.hotel?.availability_calendar) {
      const calendar = hotelItem.variant_id.type_specific.hotel.availability_calendar;
      return calendar.reduce((total, day) => total + (day.price_per_night || 0), 0);
    }
    return hotelItem?.total_price || 0;
  };

  // Show authentication required state
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center py-12">
            <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Authentication Required</h3>
            <p className="text-gray-500">Please log in to view order details</p>
          </div>
        </div>
      </div>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading order details...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !currentOrder) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1">
          <div className="p-3 sm:p-4 md:p-6 w-full max-w-[1700px] mx-auto">
            <div className="flex items-center space-x-4 mb-6">
              <button
                onClick={() => router.back()}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </button>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-2 text-sm text-red-700">
                    {error || 'Order not found'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1">
        <div className="p-3 sm:p-4 md:p-6 w-full max-w-[1700px] mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
                             <button
                 onClick={() => router.back()}
                 className="flex items-center text-gray-600 hover:text-gray-900"
               >
                 <ArrowLeft className="h-4 w-4 mr-2" />
                 Back to {isHotelBooking() ? 'Bookings' : 'Orders'}
               </button>
                             <div>
                 <h1 className="text-2xl font-bold text-gray-900">
                   {isHotelBooking() ? 'Hotel Booking' : 'Order'} #{currentOrder.order_number || currentOrder.order_id}
                 </h1>
                 <p className="text-gray-600">
                   {isHotelBooking() ? 'Booked' : 'Placed'} on {formatDate(currentOrder.created_at)}
                 </p>
               </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(currentOrder.status)}`}>
                {React.createElement(getStatusIcon(currentOrder.status), { className: "h-4 w-4 mr-1" })}
                <span className="ml-1">{currentOrder.status}</span>
              </span>
              <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(currentOrder.payment_status)}`}>
                {currentOrder.payment_status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Summary */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    {isHotelBooking() ? (
                      <Building className="h-5 w-5 mr-2" />
                    ) : (
                      <Package className="h-5 w-5 mr-2" />
                    )}
                    {isHotelBooking() ? 'Hotel Booking Summary' : 'Order Summary'}
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Order Number</p>
                      <p className="font-medium">{currentOrder.order_number || currentOrder.order_id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Order Date</p>
                      <p className="font-medium">{formatDate(currentOrder.created_at)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Amount</p>
                      <p className="font-medium text-lg">{formatCurrency(currentOrder.total_amount)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Payment Method</p>
                      <p className="font-medium">{currentOrder.payments?.[0]?.payment_method || 'Online Payment'}</p>
                    </div>
                    {isHotelBooking() && getHotelBookingDates() && (
                      <>
                        <div>
                          <p className="text-sm text-gray-600">Check-in Date</p>
                          <p className="font-medium">{formatDate(getHotelBookingDates().checkIn)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Check-out Date</p>
                          <p className="font-medium">{formatDate(getHotelBookingDates().checkOut)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Duration</p>
                          <p className="font-medium">{getHotelBookingDates().nights} night{getHotelBookingDates().nights !== 1 ? 's' : ''}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    {isMixedOrder() ? (
                      <>
                        <ShoppingBag className="h-5 w-5 mr-2" />
                        Order Items ({currentOrder.items?.length || 0})
                      </>
                    ) : isHotelBooking() ? (
                      <>
                        <Building className="h-5 w-5 mr-2" />
                        Hotel Booking Details
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="h-5 w-5 mr-2" />
                        Order Items ({currentOrder.items?.length || 0})
                      </>
                    )}
                  </h2>
                  
                  {/* Mixed Order Notice */}
                  {isMixedOrder() && (
                    <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-blue-800">
                          Mixed Order
                        </span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          {getHotelItems().length} hotel booking{getHotelItems().length !== 1 ? 's' : ''} + {getRetailItems().length} retail item{getRetailItems().length !== 1 ? 's' : ''}
                        </span>
                      </div>
                      <p className="text-xs text-blue-700 mt-1">
                        This order contains both hotel bookings and retail products. Hotel bookings will be handled separately from retail product deliveries.
                      </p>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  {isMixedOrder() ? (
                    // Mixed Order Display
                    <div className="space-y-8">
                      {/* Hotel Bookings Section */}
                      {getHotelItems().length > 0 && (
                        <div>
                          <div className="mb-4 flex items-center gap-2">
                            <Building className="h-5 w-5 text-blue-600" />
                            <h3 className="text-lg font-semibold text-gray-900">Hotel Bookings ({getHotelItems().length})</h3>
                          </div>
                          <div className="space-y-6">
                            {getHotelItems().map((item, index) => {
                              const hotelDetails = item.variant_id?.type_specific?.hotel;
                              const bookingDates = getHotelBookingDates();
                              
                              return (
                                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                                  {/* Hotel Header */}
                                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                          {item.product_id?.images?.[0]?.url ? (
                                            <img 
                                              src={item.product_id.images[0].url} 
                                              alt={item.product_id.name}
                                              className="w-full h-full object-cover rounded-lg"
                                            />
                                          ) : (
                                            <Building className="h-8 w-8 text-blue-600" />
                                          )}
                                        </div>
                                        <div>
                                          <h3 className="text-lg font-semibold text-gray-900">
                                            {item.product_id?.name}
                                          </h3>
                                          <p className="text-sm text-gray-600">
                                            {item.variant_id?.variant_name}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="text-right">
                                        <p className="text-2xl font-bold text-gray-900">
                                          {formatCurrency(item.total_price)}
                                        </p>
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                                          {item.status}
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Hotel Details */}
                                  <div className="p-6">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                      {/* Room Details */}
                                      <div className="space-y-4">
                                        <h4 className="font-semibold text-gray-900 flex items-center">
                                          <Bed className="h-4 w-4 mr-2" />
                                          Room Details
                                        </h4>
                                        <div className="grid grid-cols-2 gap-3">
                                          <div>
                                            <p className="text-sm text-gray-600">Room Type</p>
                                            <p className="font-medium">{hotelDetails?.room_type || 'Standard'}</p>
                                          </div>
                                          <div>
                                            <p className="text-sm text-gray-600">Bed Type</p>
                                            <p className="font-medium capitalize">{hotelDetails?.bed_type || 'Standard'}</p>
                                          </div>
                                          <div>
                                            <p className="text-sm text-gray-600">Max Occupancy</p>
                                            <p className="font-medium">{hotelDetails?.max_occupancy || 2} guests</p>
                                          </div>
                                          <div>
                                            <p className="text-sm text-gray-600">Room Size</p>
                                            <p className="font-medium">{hotelDetails?.area_sq_ft || 'N/A'} sq ft</p>
                                          </div>
                                          {hotelDetails?.room_number && (
                                            <div>
                                              <p className="text-sm text-gray-600">Room Number</p>
                                              <p className="font-medium">{hotelDetails.room_number}</p>
                                            </div>
                                          )}
                                          {hotelDetails?.floor && (
                                            <div>
                                              <p className="text-sm text-gray-600">Floor</p>
                                              <p className="font-medium">{hotelDetails.floor}</p>
                                            </div>
                                          )}
                                          {hotelDetails?.view_type && (
                                            <div>
                                              <p className="text-sm text-gray-600">View Type</p>
                                              <p className="font-medium capitalize">{hotelDetails.view_type.replace('_', ' ')}</p>
                                            </div>
                                          )}
                                        </div>
                                        
                                        {/* Hotel Attributes */}
                                        {item.variant_id?.attributes && item.variant_id.attributes.length > 0 && (
                                          <div className="mt-4 pt-4 border-t border-gray-200">
                                            <h5 className="text-sm font-medium text-gray-900 mb-2">Additional Details</h5>
                                            <div className="grid grid-cols-2 gap-2">
                                              {item.variant_id.attributes.map((attr, idx) => (
                                                <div key={idx}>
                                                  <p className="text-xs text-gray-500">{attr.name}</p>
                                                  <p className="text-sm font-medium">{attr.value}</p>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        )}
                                      </div>

                                      {/* Booking Details */}
                                      <div className="space-y-4">
                                        <h4 className="font-semibold text-gray-900 flex items-center">
                                          <Calendar className="h-4 w-4 mr-2" />
                                          Booking Details
                                        </h4>
                                        {bookingDates && (
                                          <div className="space-y-3">
                                            <div className="flex justify-between">
                                              <span className="text-sm text-gray-600">Check-in</span>
                                              <span className="font-medium">{formatDate(bookingDates.checkIn)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-sm text-gray-600">Check-out</span>
                                              <span className="font-medium">{formatDate(bookingDates.checkOut)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-sm text-gray-600">Duration</span>
                                              <span className="font-medium">{bookingDates.nights} night{bookingDates.nights !== 1 ? 's' : ''}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-sm text-gray-600">Price per night</span>
                                              <span className="font-medium">{formatCurrency(item.total_price / (bookingDates.nights || 1))}</span>
                                            </div>
                                          </div>
                                        )}
                                        
                                        {/* Pricing Information */}
                                        {item.variant_id?.price && (
                                          <div className="mt-4 pt-4 border-t border-gray-200">
                                            <h5 className="text-sm font-medium text-gray-900 mb-2">Pricing</h5>
                                            <div className="space-y-2">
                                              <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Base Price</span>
                                                <span className="font-medium">{formatCurrency(item.variant_id.price.base_price)}</span>
                                              </div>
                                              <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Sale Price</span>
                                                <span className="font-medium text-green-600">{formatCurrency(item.variant_id.price.sale_price)}</span>
                                              </div>
                                              <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Quantity</span>
                                                <span className="font-medium">{item.quantity}</span>
                                              </div>
                                              <div className="flex justify-between text-sm font-semibold border-t pt-2">
                                                <span>Total</span>
                                                <span>{formatCurrency(item.total_price)}</span>
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    {/* Hotel Description */}
                                    {hotelDetails?.description && (
                                      <div className="mt-6 pt-6 border-t border-gray-200">
                                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                          <FileText className="h-4 w-4 mr-2" />
                                          Room Description
                                        </h4>
                                        <div className="bg-gray-50 rounded-lg p-4">
                                          <p className="text-sm text-gray-700 whitespace-pre-line">
                                            {hotelDetails.description}
                                          </p>
                                        </div>
                                      </div>
                                    )}

                                    {/* Amenities */}
                                    {hotelDetails?.room_amenities && hotelDetails.room_amenities.length > 0 && (
                                      <div className="mt-6 pt-6 border-t border-gray-200">
                                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                          <Star className="h-4 w-4 mr-2" />
                                          Room Amenities
                                        </h4>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                          {formatAmenities(hotelDetails.room_amenities).map((amenity, idx) => (
                                            <div key={idx} className="flex items-center text-sm text-gray-600">
                                              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                                              {amenity}
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {/* Daily Pricing Breakdown */}
                                    {item.variant_id?.type_specific?.hotel?.availability_calendar && (
                                      <div className="mt-6 pt-6 border-t border-gray-200">
                                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                          <DollarSign className="h-4 w-4 mr-2" />
                                          Daily Pricing Breakdown
                                        </h4>
                                        <div className="bg-gray-50 rounded-lg p-4">
                                          <div className="space-y-2">
                                            {item.variant_id.type_specific.hotel.availability_calendar.map((day, idx) => (
                                              <div key={idx} className="flex justify-between text-sm">
                                                <span className="text-gray-600">
                                                  {formatDate(day.date).split(',')[0]} {/* Show only date part */}
                                                </span>
                                                <span className="font-medium">{formatCurrency(day.price_per_night)}</span>
                                              </div>
                                            ))}
                                            <div className="border-t pt-2 mt-2">
                                              <div className="flex justify-between font-semibold">
                                                <span>Total</span>
                                                <span>{formatCurrency(item.total_price)}</span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Retail Products Section */}
                      {getRetailItems().length > 0 && (
                        <div>
                          <div className="mb-4 flex items-center gap-2">
                            <ShoppingBag className="h-5 w-5 text-green-600" />
                            <h3 className="text-lg font-semibold text-gray-900">Retail Products ({getRetailItems().length})</h3>
                          </div>
                          <div className="space-y-4">
                            {getRetailItems().map((item, index) => (
                              <div key={index} className="flex items-center space-x-4 p-4 border border-gray-100 rounded-lg">
                                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                  {item.variant_id?.images?.[0]?.url || item.product_id?.images?.[0]?.url ? (
                                    <img 
                                      src={item.variant_id?.images?.[0]?.url || item.product_id?.images?.[0]?.url} 
                                      alt={item.product_id?.name || item.variant_id?.variant_name}
                                      className="w-full h-full object-cover rounded-lg"
                                    />
                                  ) : (
                                    <Package className="h-8 w-8 text-gray-400" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-medium text-gray-900">
                                    {item.product_id?.name || item.variant_id?.variant_name}
                                  </h3>
                                  <p className="text-sm text-gray-500">
                                    SKU: {item.variant_id?.sku || 'N/A'}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    Qty: {item.quantity} × {formatCurrency(item.unit_price)}
                                  </p>
                                  {item.variant_id?.attributes?.map((attr, attrIndex) => (
                                    <p key={attrIndex} className="text-sm text-gray-500">
                                      {attr.name}: {attr.value}
                                    </p>
                                  ))}
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">{formatCurrency(item.total_price)}</p>
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                                    {item.status}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : isHotelBooking() ? (
                    // Hotel Booking Display (existing code)
                    <div className="space-y-6">
                      {currentOrder.items?.map((item, index) => {
                        const hotelDetails = item.variant_id?.type_specific?.hotel;
                        const bookingDates = getHotelBookingDates();
                        
                        return (
                          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                            {/* Hotel Header */}
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                    {item.product_id?.images?.[0]?.url ? (
                                      <img 
                                        src={item.product_id.images[0].url} 
                                        alt={item.product_id.name}
                                        className="w-full h-full object-cover rounded-lg"
                                      />
                                    ) : (
                                      <Building className="h-8 w-8 text-blue-600" />
                                    )}
                                  </div>
                                  <div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                      {item.product_id?.name}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                      {item.variant_id?.variant_name}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-2xl font-bold text-gray-900">
                                    {formatCurrency(item.total_price)}
                                  </p>
                                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                                    {item.status}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Hotel Details */}
                            <div className="p-6">
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Room Details */}
                                <div className="space-y-4">
                                  <h4 className="font-semibold text-gray-900 flex items-center">
                                    <Bed className="h-4 w-4 mr-2" />
                                    Room Details
                                  </h4>
                                  <div className="grid grid-cols-2 gap-3">
                                    <div>
                                      <p className="text-sm text-gray-600">Room Type</p>
                                      <p className="font-medium">{hotelDetails?.room_type || 'Standard'}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-600">Bed Type</p>
                                      <p className="font-medium capitalize">{hotelDetails?.bed_type || 'Standard'}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-600">Max Occupancy</p>
                                      <p className="font-medium">{hotelDetails?.max_occupancy || 2} guests</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-600">Room Size</p>
                                      <p className="font-medium">{hotelDetails?.area_sq_ft || 'N/A'} sq ft</p>
                                    </div>
                                    {hotelDetails?.room_number && (
                                      <div>
                                        <p className="text-sm text-gray-600">Room Number</p>
                                        <p className="font-medium">{hotelDetails.room_number}</p>
                                      </div>
                                    )}
                                    {hotelDetails?.floor && (
                                      <div>
                                        <p className="text-sm text-gray-600">Floor</p>
                                        <p className="font-medium">{hotelDetails.floor}</p>
                                      </div>
                                    )}
                                    {hotelDetails?.view_type && (
                                      <div>
                                        <p className="text-sm text-gray-600">View Type</p>
                                        <p className="font-medium capitalize">{hotelDetails.view_type.replace('_', ' ')}</p>
                                      </div>
                                    )}
                                  </div>
                                  
                                  {/* Hotel Attributes */}
                                  {item.variant_id?.attributes && item.variant_id.attributes.length > 0 && (
                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                      <h5 className="text-sm font-medium text-gray-900 mb-2">Additional Details</h5>
                                      <div className="grid grid-cols-2 gap-2">
                                        {item.variant_id.attributes.map((attr, idx) => (
                                          <div key={idx}>
                                            <p className="text-xs text-gray-500">{attr.name}</p>
                                            <p className="text-sm font-medium">{attr.value}</p>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>

                                {/* Booking Details */}
                                <div className="space-y-4">
                                  <h4 className="font-semibold text-gray-900 flex items-center">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    Booking Details
                                  </h4>
                                  {bookingDates && (
                                    <div className="space-y-3">
                                      <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Check-in</span>
                                        <span className="font-medium">{formatDate(bookingDates.checkIn)}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Check-out</span>
                                        <span className="font-medium">{formatDate(bookingDates.checkOut)}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Duration</span>
                                        <span className="font-medium">{bookingDates.nights} night{bookingDates.nights !== 1 ? 's' : ''}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Price per night</span>
                                        <span className="font-medium">{formatCurrency(item.total_price / (bookingDates.nights || 1))}</span>
                                      </div>
                                    </div>
                                  )}
                                  
                                  {/* Pricing Information */}
                                  {item.variant_id?.price && (
                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                      <h5 className="text-sm font-medium text-gray-900 mb-2">Pricing</h5>
                                      <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                          <span className="text-gray-600">Base Price</span>
                                          <span className="font-medium">{formatCurrency(item.variant_id.price.base_price)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                          <span className="text-gray-600">Sale Price</span>
                                          <span className="font-medium text-green-600">{formatCurrency(item.variant_id.price.sale_price)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                          <span className="text-gray-600">Quantity</span>
                                          <span className="font-medium">{item.quantity}</span>
                                        </div>
                                        <div className="flex justify-between text-sm font-semibold border-t pt-2">
                                          <span>Total</span>
                                          <span>{formatCurrency(item.total_price)}</span>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Hotel Description */}
                              {hotelDetails?.description && (
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                    <FileText className="h-4 w-4 mr-2" />
                                    Room Description
                                  </h4>
                                  <div className="bg-gray-50 rounded-lg p-4">
                                    <p className="text-sm text-gray-700 whitespace-pre-line">
                                      {hotelDetails.description}
                                    </p>
                                  </div>
                                </div>
                              )}

                              {/* Amenities */}
                              {hotelDetails?.room_amenities && hotelDetails.room_amenities.length > 0 && (
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                    <Star className="h-4 w-4 mr-2" />
                                    Room Amenities
                                  </h4>
                                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {formatAmenities(hotelDetails.room_amenities).map((amenity, idx) => (
                                      <div key={idx} className="flex items-center text-sm text-gray-600">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                                        {amenity}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Daily Pricing Breakdown */}
                              {item.variant_id?.type_specific?.hotel?.availability_calendar && (
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                    <DollarSign className="h-4 w-4 mr-2" />
                                    Daily Pricing Breakdown
                                  </h4>
                                  <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="space-y-2">
                                      {item.variant_id.type_specific.hotel.availability_calendar.map((day, idx) => (
                                        <div key={idx} className="flex justify-between text-sm">
                                          <span className="text-gray-600">
                                            {formatDate(day.date).split(',')[0]} {/* Show only date part */}
                                          </span>
                                          <span className="font-medium">{formatCurrency(day.price_per_night)}</span>
                                        </div>
                                      ))}
                                      <div className="border-t pt-2 mt-2">
                                        <div className="flex justify-between font-semibold">
                                          <span>Total</span>
                                          <span>{formatCurrency(item.total_price)}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Time Slot Information */}
                              {item.variant_id?.time_slot && (
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                    <ClockIcon className="h-4 w-4 mr-2" />
                                    Time Slot Information
                                  </h4>
                                  <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Available</span>
                                        <span className={`font-medium ${item.variant_id.time_slot.is_available ? 'text-green-600' : 'text-red-600'}`}>
                                          {item.variant_id.time_slot.is_available ? 'Yes' : 'No'}
                                        </span>
                                      </div>
                                      <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Current Bookings</span>
                                        <span className="font-medium">{item.variant_id.time_slot.current_bookings}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Shipping Information */}
                              {item.variant_id?.shipping && (
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                    <Truck className="h-4 w-4 mr-2" />
                                    Shipping Information
                                  </h4>
                                  <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Free Shipping</span>
                                        <span className={`font-medium ${item.variant_id.shipping.is_free_shipping ? 'text-green-600' : 'text-gray-600'}`}>
                                          {item.variant_id.shipping.is_free_shipping ? 'Yes' : 'No'}
                                        </span>
                                      </div>
                                      <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Shipping Class</span>
                                        <span className="font-medium capitalize">{item.variant_id.shipping.shipping_class}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Stock Information */}
                              {item.variant_id?.stock && (
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                    <Package className="h-4 w-4 mr-2" />
                                    Stock Information
                                  </h4>
                                  <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Available Quantity</span>
                                        <span className="font-medium">{item.variant_id.stock.quantity}</span>
                                      </div>
                                      <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Reserved Quantity</span>
                                        <span className="font-medium">{item.variant_id.stock.reserved_quantity}</span>
                                      </div>
                                      <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Low Stock Threshold</span>
                                        <span className="font-medium">{item.variant_id.stock.low_stock_threshold}</span>
                                      </div>
                                      <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Low Stock Status</span>
                                        <span className={`font-medium ${item.variant_id.is_low_stock ? 'text-red-600' : 'text-green-600'}`}>
                                          {item.variant_id.is_low_stock ? 'Low Stock' : 'In Stock'}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Cancellation Policy */}
                              {item.variant_id?.cancellation_policy && (
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                    <Shield className="h-4 w-4 mr-2" />
                                    Cancellation Policy
                                  </h4>
                                  <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center justify-between text-sm">
                                      <span className="text-gray-600">Cancellation Allowed</span>
                                      <span className={`font-medium ${item.variant_id.cancellation_policy.allowed ? 'text-green-600' : 'text-red-600'}`}>
                                        {item.variant_id.cancellation_policy.allowed ? 'Yes' : 'No'}
                                      </span>
                                    </div>
                                    {item.variant_id.cancellation_policy.allowed && (
                                      <>
                                        <div className="flex items-center justify-between text-sm mt-2">
                                          <span className="text-gray-600">Refund Percentage</span>
                                          <span className="font-medium">{item.variant_id.cancellation_policy.refund_percentage}%</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm mt-2">
                                          <span className="text-gray-600">Cancellation Window</span>
                                          <span className="font-medium">{item.variant_id.cancellation_policy.cancellation_window} hours</span>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    // Regular Product Display (existing code)
                    <div className="space-y-4">
                      {currentOrder.items?.map((item, index) => (
                        <div key={index} className="flex items-center space-x-4 p-4 border border-gray-100 rounded-lg">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                            {item.variant_id?.images?.[0]?.url || item.product_id?.images?.[0]?.url ? (
                              <img 
                                src={item.variant_id?.images?.[0]?.url || item.product_id?.images?.[0]?.url} 
                                alt={item.product_id?.name || item.variant_id?.variant_name}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <Package className="h-8 w-8 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">
                              {item.product_id?.name || item.variant_id?.variant_name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              SKU: {item.variant_id?.sku || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-500">
                              Qty: {item.quantity} × {formatCurrency(item.unit_price)}
                            </p>
                            {item.variant_id?.attributes?.map((attr, attrIndex) => (
                              <p key={attrIndex} className="text-sm text-gray-500">
                                {attr.name}: {attr.value}
                              </p>
                            ))}
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{formatCurrency(item.total_price)}</p>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                              {item.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Order Tracking */}
              {showTracking && (
                <OrderTracking
                  order={currentOrder}
                  trackingData={orderTracking[orderId] || null}
                  onRefresh={handleRefreshTracking}
                  trackingLoading={trackingLoading}
                />
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {isHotelBooking() ? (
                  // Hotel Booking Actions
                  <>
                    <button
                      onClick={() => router.push('/orders')}
                      className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Building className="h-4 w-4 mr-2" />
                      View All Bookings
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Print Booking
                    </button>
                  </>
                ) : (
                  // Regular Order Actions
                  <>
                    {!showTracking ? (
                      <button
                        onClick={handleTrackOrder}
                        className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <Truck className="h-4 w-4 mr-2" />
                        Track Order
                      </button>
                    ) : (
                      <button
                        onClick={closeTracking}
                        className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Hide Tracking
                      </button>
                    )}
                    <button
                      onClick={() => router.push('/orders')}
                      className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View All Orders
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Customer Information */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    {isHotelBooking() ? (
                      <Users className="h-5 w-5 mr-2" />
                    ) : (
                      <User className="h-5 w-5 mr-2" />
                    )}
                    {isHotelBooking() ? 'Guest Information' : 'Customer Information'}
                  </h2>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-medium">{currentOrder.shipping_address?.name || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium">{currentOrder.shipping_address?.email || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium">{currentOrder.shipping_address?.phone || 'N/A'}</p>
                    </div>
                    {isHotelBooking() && getHotelBookingDetails()?.booking_details?.guests && (
                      <>
                        <div>
                          <p className="text-sm text-gray-600">Adults</p>
                          <p className="font-medium">{getHotelBookingDetails().booking_details.guests.adults || 1}</p>
                        </div>
                        {getHotelBookingDetails().booking_details.guests.children > 0 && (
                          <div>
                            <p className="text-sm text-gray-600">Children</p>
                            <p className="font-medium">{getHotelBookingDetails().booking_details.guests.children}</p>
                          </div>
                        )}
                        {getHotelBookingDetails().booking_details.guests.infants > 0 && (
                          <div>
                            <p className="text-sm text-gray-600">Infants</p>
                            <p className="font-medium">{getHotelBookingDetails().booking_details.guests.infants}</p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    {isHotelBooking() ? 'Hotel Location' : 'Shipping Address'}
                  </h2>
                </div>
                <div className="p-6">
                  {isHotelBooking() ? (
                    // Hotel Location Display
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Hotel Name</p>
                        <p className="font-medium">{getHotelBookingDetails()?.product_id?.name || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Room Type</p>
                        <p className="font-medium">{getHotelBookingDetails()?.variant_id?.variant_name || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Guest Name</p>
                        <p className="font-medium">{currentOrder.shipping_address?.name || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Contact Phone</p>
                        <p className="font-medium">{currentOrder.shipping_address?.phone || 'N/A'}</p>
                      </div>
                      {getHotelBookingDetails()?.booking_details?.checkInTime && (
                        <div>
                          <p className="text-sm text-gray-600">Check-in Time</p>
                          <p className="font-medium">{getHotelBookingDetails().booking_details.checkInTime}</p>
                        </div>
                      )}
                      {getHotelBookingDetails()?.booking_details?.checkOutTime && (
                        <div>
                          <p className="text-sm text-gray-600">Check-out Time</p>
                          <p className="font-medium">{getHotelBookingDetails().booking_details.checkOutTime}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    // Regular Shipping Address Display
                    <div className="space-y-2">
                      <p className="font-medium">{currentOrder.shipping_address?.name || 'N/A'}</p>
                      <p className="text-sm text-gray-600">
                        {currentOrder.shipping_address?.address_line1 || 'N/A'}
                      </p>
                      {currentOrder.shipping_address?.address_line2 && (
                        <p className="text-sm text-gray-600">
                          {currentOrder.shipping_address.address_line2}
                        </p>
                      )}
                      <p className="text-sm text-gray-600">
                        {[
                          currentOrder.shipping_address?.city,
                          currentOrder.shipping_address?.state,
                          currentOrder.shipping_address?.postal_code,
                          currentOrder.shipping_address?.country
                        ].filter(Boolean).join(', ')}
                      </p>
                      <p className="text-sm text-gray-600">
                        Phone: {currentOrder.shipping_address?.phone || 'N/A'}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Payment Details
                  </h2>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {currentOrder.payments?.map((payment, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Payment Method</span>
                          <span className="font-medium capitalize">{payment.payment_method}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Amount</span>
                          <span className="font-medium">{formatCurrency(payment.amount)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Status</span>
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(payment.status)}`}>
                            {payment.status}
                          </span>
                        </div>
                        {payment.refunded_amount > 0 && (
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Refunded</span>
                            <span className="font-medium text-green-600">{formatCurrency(payment.refunded_amount)}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Date</span>
                          <span className="font-medium">{formatDate(payment.created_at)}</span>
                        </div>
                      </div>
                    ))}
                    <div className="border-t pt-3">
                      <div className="flex justify-between">
                        <span className="font-medium">Total</span>
                        <span className="font-bold text-lg">{formatCurrency(currentOrder.total_amount)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hotel Booking Policies - Only show for hotel bookings */}
              {isHotelBooking() && getHotelBookingDetails()?.variant_id?.cancellation_policy && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Shield className="h-5 w-5 mr-2" />
                      Booking Policies
                    </h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                          <ClockIcon className="h-4 w-4 mr-2" />
                          Cancellation Policy
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Cancellation Allowed</span>
                            <span className={`font-medium ${getHotelBookingDetails().variant_id.cancellation_policy.allowed ? 'text-green-600' : 'text-red-600'}`}>
                              {getHotelBookingDetails().variant_id.cancellation_policy.allowed ? 'Yes' : 'No'}
                            </span>
                          </div>
                          {getHotelBookingDetails().variant_id.cancellation_policy.allowed && (
                            <>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Refund Percentage</span>
                                <span className="font-medium">{getHotelBookingDetails().variant_id.cancellation_policy.refund_percentage}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Cancellation Window</span>
                                <span className="font-medium">{getHotelBookingDetails().variant_id.cancellation_policy.cancellation_window} hours before check-in</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      
                      {getHotelBookingDetails()?.booking_details?.specialRequests && (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Special Requests</h4>
                          <p className="text-sm text-gray-600">{getHotelBookingDetails().booking_details.specialRequests}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage; 