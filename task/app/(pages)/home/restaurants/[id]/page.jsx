"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/home/Header";
import Link from "next/link";
import useSWR from "swr";
import { api, axiosFetcher, axiosFetcherWithParams } from "@/lib/api/axios"; 
import { MapPin, Star, Clock, Users, Phone, Mail, Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import MenuDisplay from "@/components/restaurant/MenuDisplay";

export default function RestaurantDetailPage({ params }) {
  const { id } = React.use(params);
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Booking form state
  const [bookingData, setBookingData] = useState({
    date: searchParams.get('date') || '',
    time: searchParams.get('time') || '',
    guests: searchParams.get('guests') || '',
    duration: '2', // Default 2 hours
    specialRequests: ''
  });
  
  const [selectedLayout, setSelectedLayout] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [isBooking, setIsBooking] = useState(false);
  const [tableSelectionError, setTableSelectionError] = useState(null);

  // Fetch restaurant details
  const { data: restaurantData, error: restaurantError } = useSWR(
    `/lmd/api/v1/restaurants/restaurants/${id}`,
    axiosFetcher
  );

  // Fetch restaurant layouts with authentication
  const { data: layoutsData, error: layoutsError } = useSWR(
    restaurantData ? `/lmd/api/v1/restaurants/layouts/restaurant/${id}` : null,
    axiosFetcher
  );

  // Fetch availability only when all booking details are filled
  const { data: availabilityData, error: availabilityError, mutate: refreshAvailability, isLoading: availabilityLoading } = useSWR(
    (bookingData.date && bookingData.time && bookingData.guests && bookingData.duration) ? 
    `/lmd/api/v1/restaurants/reservations/restaurant/${id}/availability` : 
    null,
    () => axiosFetcherWithParams(`/lmd/api/v1/restaurants/reservations/restaurant/${id}/availability`, {
      date: bookingData.date,
      time: bookingData.time,
      duration: bookingData.duration
    })
  );

  if (restaurantError) {
    return (
      <div className="flex-1">
        <Header />
        <div className="p-6 w-full max-w-[1700px] mx-auto">
          <div className="text-center py-10">
            <div className="text-red-500 text-xl">Failed to load restaurant details</div>
          </div>
        </div>
      </div>
    );
  }

  if (!restaurantData) {
    return (
      <div className="flex-1">
        <Header />
        <div className="p-6 w-full max-w-[1700px] mx-auto">
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
            <span className="ml-2">Loading restaurant details...</span>
          </div>
        </div>
      </div>
    );
  }

  const restaurant = restaurantData.data;
  const layouts = layoutsData?.data || [];
  const availability = availabilityData?.data?.availability || {};
  const tablesData = availabilityData?.data?.tables || {};

  const handleBookingChange = (field, value) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
    // Reset selections when booking details change
    setSelectedLayout(null);
    setSelectedTable(null);
    setTableSelectionError(null);
  };

  // Check if all booking details are filled
  const isBookingDetailsComplete = bookingData.date && bookingData.time && bookingData.guests && bookingData.duration;

  const handleTableSelect = (layout, table) => {
    // Clear any previous errors
    setTableSelectionError(null);
    
    // Check if table is actually available
    const tableInfo = tablesData[table.label] || {};
    const isAvailable = availability[table.label] !== false && tableInfo.status === 'available';
    const isSuitableForGuests = table.capacity >= parseInt(bookingData.guests);
    
    if (!isAvailable) {
      let errorMessage = '';
      if (availability[table.label] === false) {
        errorMessage = 'This table is already booked for the selected time. Please choose a different table or time.';
      } else if (tableInfo.status !== 'available') {
        errorMessage = `This table is currently ${tableInfo.status}. Please select a different table.`;
      }
      setTableSelectionError(errorMessage);
      return;
    }
    
    if (!isSuitableForGuests) {
      setTableSelectionError(`This table is too small for ${bookingData.guests} guests. Maximum capacity is ${table.capacity} guests.`);
      return;
    }
    
    // If all checks pass, select the table
    setSelectedLayout(layout);
    setSelectedTable(table);
  };

  const handleBookTable = async () => {
    if (!session?.user?.token) {
      toast.error('Please login to book a table');
      return;
    }

    if (!selectedTable) {
      toast.error('Please select a table');
      return;
    }

    if (!bookingData.date || !bookingData.time || !bookingData.guests) {
      toast.error('Please fill in all booking details');
      return;
    }

    // Check if selected time is in the past
    const selectedDateTime = new Date(`${bookingData.date}T${bookingData.time}`);
    if (selectedDateTime <= new Date()) {
      toast.error('Cannot book for past time');
      return;
    }

    try {
      setIsBooking(true);

      const reservationData = {
        restaurant: id,
        tableLayout: selectedLayout._id,
        tableLabel: selectedTable.label,
        date: bookingData.date,
        time: bookingData.time,
        duration: parseInt(bookingData.duration),
        partySize: parseInt(bookingData.guests),
        specialRequests: bookingData.specialRequests
      };

      const response = await api.post('/lmd/api/v1/restaurants/reservations', reservationData);
      const result = response.data;

      toast.success('Table booked successfully!');
      
      // Redirect to booking confirmation or reservations page
      router.push('/home/reservations');
      
    } catch (error) {
      // Handle specific error cases
      if (error.response?.status === 409) {
        toast.error('Table is no longer available for the selected time. Please choose a different time or table.');
      } else if (error.response?.status === 400) {
        toast.error(error.response?.data?.message || 'Invalid booking request');
      } else if (error.response?.status === 401) {
        toast.error('Please login to book a table');
      } else {
        toast.error(error.response?.data?.message || error.message || 'Failed to book table. Please try again.');
      }
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="flex-1">
      <Header />
      <div className="p-6 w-full max-w-[1700px] mx-auto">
        <div className="px-6 md:px-12">
          {/* Breadcrumb */}
          <nav className="mb-6 text-black text-xl">
            <Link href="/" className="hover:underline font-medium">
              Home
            </Link>
            {" > "}
            <Link href="/home/restaurants" className="hover:underline font-medium">
              Restaurants
            </Link>
            {" > "}
            <span className="font-medium text-yellow-500">{restaurant.name}</span>
          </nav>

          {/* Back Button */}
          <Link href="/home/restaurants" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Restaurants
          </Link>

                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {/* Restaurant Details */}
             <div className="lg:col-span-2">
               {/* Restaurant Header */}
               <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                 <div className="flex items-start justify-between mb-4">
                   <div>
                     <h1 className="text-3xl font-bold text-gray-900 mb-2">
                       {restaurant.name}
                     </h1>
                     <div className="flex items-center text-gray-600 mb-3">
                       <MapPin className="h-4 w-4 mr-1" />
                       <span>{restaurant.address?.street}, {restaurant.address?.city}, {restaurant.address?.state}</span>
                     </div>
                     <div className="flex items-center">
                       <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                       <span className="text-sm font-medium">4.5</span>
                       <span className="text-gray-500 text-sm ml-1">(120 reviews)</span>
                     </div>
                   </div>
                   <div className="text-right">
                     <div className="text-2xl font-bold text-green-600">₹200</div>
                     <div className="text-sm text-gray-500">per person</div>
                   </div>
                 </div>

                 <p className="text-gray-700 mb-4">
                   {restaurant.description}
                 </p>

                 {/* Contact Info */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                   {restaurant.contactInfo?.phone && (
                     <div className="flex items-center text-gray-600">
                       <Phone className="h-4 w-4 mr-2" />
                       <span>{restaurant.contactInfo.phone}</span>
                     </div>
                   )}
                   {restaurant.contactInfo?.email && (
                     <div className="flex items-center text-gray-600">
                       <Mail className="h-4 w-4 mr-2" />
                       <span>{restaurant.contactInfo.email}</span>
                     </div>
                   )}
                 </div>

                 {/* Amenities */}
                 {restaurant.amenities && restaurant.amenities.length > 0 && (
                   <div>
                     <h3 className="font-semibold text-gray-900 mb-2">Amenities</h3>
                     <div className="flex flex-wrap gap-2">
                       {restaurant.amenities.map((amenity, index) => {
                         // Handle different amenity formats
                         let amenityText = 'Amenity';
                         if (typeof amenity === 'string') {
                           amenityText = amenity;
                         } else if (amenity && typeof amenity === 'object') {
                           amenityText = amenity.name || amenity.description || amenity.icon || 'Amenity';
                         }
                         
                         return (
                           <span
                             key={index}
                             className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                           >
                             {amenityText}
                           </span>
                         );
                       })}
                     </div>
                   </div>
                 )}
               </div>

               {/* Menu Section */}
               <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                 <MenuDisplay menuImages={restaurant.menuImages || []} />
               </div>

               {/* Booking Details Prompt */}
               {!isBookingDetailsComplete && (
                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                   <div className="flex items-center mb-4">
                     <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                       <Calendar className="h-4 w-4 text-white" />
                     </div>
                     <h2 className="text-xl font-semibold text-blue-900">
                       Tell us about your booking
                     </h2>
                   </div>
                   <p className="text-blue-800 mb-4">
                     Please fill in your booking details (date, time, guests, and duration) in the form on the right to see available tables.
                   </p>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                     <div className="flex items-center">
                       <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                       <span className="text-blue-700">Select Date</span>
                     </div>
                     <div className="flex items-center">
                       <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                       <span className="text-blue-700">Choose Time</span>
                     </div>
                     <div className="flex items-center">
                       <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                       <span className="text-blue-700">Number of Guests</span>
                     </div>
                     <div className="flex items-center">
                       <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                       <span className="text-blue-700">Duration</span>
                     </div>
                   </div>
                 </div>
               )}

               {/* Table Layouts - Only show when booking details are complete */}
               {isBookingDetailsComplete && layouts.length > 0 && (
                 <div className="bg-white rounded-lg shadow-sm border p-6">
                                        <div className="flex items-center justify-between mb-4">
                       <h2 className="text-xl font-semibold text-gray-900">
                         Available Tables
                       </h2>
                       <div className="text-sm text-gray-500">
                         Showing tables for {bookingData.guests} guests on {new Date(bookingData.date).toLocaleDateString()} at {bookingData.time}
                       </div>
                     </div>
                     
                     {/* Availability Summary */}
                     {!availabilityLoading && !availabilityError && (
                       <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                           <div className="text-center">
                             <div className="text-lg font-bold text-gray-900">
                               {layouts.reduce((total, layout) => 
                                 total + layout.layout.tables.length, 0
                               )}
                             </div>
                             <div className="text-gray-600">Total Tables</div>
                           </div>
                           <div className="text-center">
                             <div className="text-lg font-bold text-green-600">
                               {layouts.reduce((total, layout) => 
                                 total + layout.layout.tables.filter(table => {
                                   const tableInfo = tablesData[table.label] || {};
                                   return availability[table.label] !== false && 
                                          tableInfo.status === 'available' && 
                                          table.capacity >= parseInt(bookingData.guests);
                                 }).length, 0
                               )}
                             </div>
                             <div className="text-gray-600">Available</div>
                           </div>
                           <div className="text-center">
                             <div className="text-lg font-bold text-red-600">
                               {layouts.reduce((total, layout) => 
                                 total + layout.layout.tables.filter(table => {
                                   const tableInfo = tablesData[table.label] || {};
                                   return availability[table.label] === false || 
                                          tableInfo.status !== 'available' || 
                                          table.capacity < parseInt(bookingData.guests);
                                 }).length, 0
                               )}
                             </div>
                             <div className="text-gray-600">Unavailable</div>
                           </div>
                           <div className="text-center">
                             <div className="text-lg font-bold text-blue-600">
                               {layouts.reduce((total, layout) => 
                                 total + layout.layout.tables.filter(table => 
                                   availability[table.label] === false
                                 ).length, 0
                               )}
                             </div>
                             <div className="text-gray-600">Booked</div>
                           </div>
                         </div>
                       </div>
                     )}
                   
                   {availabilityLoading && (
                     <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                       <div className="flex items-center text-blue-800">
                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                         <p className="font-medium">Checking table availability...</p>
                       </div>
                     </div>
                   )}
                   
                   {availabilityError && (
                     <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                       <div className="text-red-800">
                         <p className="font-medium">Unable to check availability</p>
                         <p className="text-sm mb-3">
                           {availabilityError.response?.data?.message || availabilityError.message || 'Please try again or contact the restaurant directly.'}
                         </p>
                         <Button 
                           onClick={() => refreshAvailability()} 
                           variant="outline" 
                           size="sm"
                           className="text-red-600 border-red-600 hover:bg-red-50"
                         >
                           Try Again
                         </Button>
                       </div>
                     </div>
                                        )}
                     
                     {/* No Available Tables Warning */}
                     {!availabilityLoading && !availabilityError && layouts.length > 0 && (
                       (() => {
                         const availableTables = layouts.reduce((total, layout) => 
                           total + layout.layout.tables.filter(table => {
                             const tableInfo = tablesData[table.label] || {};
                             return availability[table.label] !== false && 
                                    tableInfo.status === 'available' && 
                                    table.capacity >= parseInt(bookingData.guests);
                           }).length, 0
                         );
                         
                         if (availableTables === 0) {
                           return (
                             <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                               <div className="text-yellow-800">
                                 <p className="font-medium">No tables available for your criteria</p>
                                 <p className="text-sm mt-1">
                                   Try selecting a different time, date, or party size. Some tables might be booked or too small for your group.
                                 </p>
                               </div>
                             </div>
                           );
                         }
                         return null;
                       })()
                     )}
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {layouts.map((layout) => (
                       <div key={layout._id} className="bg-gray-50 rounded-lg border p-4">
                         <div className="flex items-center justify-between mb-4">
                           <h3 className="text-lg font-medium text-gray-900">
                             {layout.name}
                           </h3>
                           <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded">
                             {layout.layout.tables.length} tables
                           </span>
                         </div>
                         
                         {/* Table Details */}
                         <div className="space-y-2">
                           {layout.layout.tables.map((table) => {
                             const tableInfo = tablesData[table.label] || {};
                             const isAvailable = availability[table.label] !== false && tableInfo.status === 'available';
                             const isSelected = selectedTable?.label === table.label;
                             const isSuitableForGuests = table.capacity >= parseInt(bookingData.guests);
                             const tableStatus = tableInfo.status || 'available';
                             
                             // Determine why table is unavailable
                             let unavailabilityReason = '';
                             if (!isAvailable) {
                               if (availability[table.label] === false) {
                                 unavailabilityReason = 'Booked for this time';
                               } else if (tableStatus !== 'available') {
                                 unavailabilityReason = `Table is ${tableStatus}`;
                               }
                             } else if (!isSuitableForGuests) {
                               unavailabilityReason = 'Too small for party size';
                             }
                             
                             return (
                                                               <div
                                  key={table.label}
                                  className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer ${
                                    isSelected 
                                      ? tableSelectionError 
                                        ? 'bg-red-50 border-red-300 shadow-sm' 
                                        : 'bg-blue-50 border-blue-300 shadow-sm'
                                      : isAvailable && isSuitableForGuests
                                        ? 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300' 
                                        : 'bg-gray-100 border-gray-200 cursor-not-allowed opacity-60'
                                  }`}
                                  onClick={() => handleTableSelect(layout, table)}
                                >
                                 <div className="flex items-center space-x-3">
                                                                       <div className={`w-3 h-3 rounded-full ${
                                      isSelected 
                                        ? tableSelectionError 
                                          ? 'bg-red-500' 
                                          : 'bg-blue-500'
                                        : isAvailable && isSuitableForGuests
                                          ? 'bg-green-500' 
                                          : 'bg-red-500'
                                    }`}></div>
                                   <div>
                                     <div className="font-medium text-gray-900">
                                       Table {table.label}
                                     </div>
                                     <div className="text-sm text-gray-500">
                                       {table.capacity} seats
                                       {unavailabilityReason && (
                                         <span className="text-red-500 ml-1">({unavailabilityReason})</span>
                                       )}
                                     </div>
                                   </div>
                                 </div>
                                 
                                 <div className="text-right">
                                   <div className="font-semibold text-gray-900">
                                     ₹{table.basePrice}
                                   </div>
                                                                                                           <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                                       isSelected 
                                         ? tableSelectionError 
                                           ? 'bg-red-100 text-red-700' 
                                           : 'bg-blue-100 text-blue-700'
                                         : tableStatus === 'available' && isAvailable && isSuitableForGuests
                                           ? 'bg-green-100 text-green-700' 
                                           : tableStatus === 'maintenance'
                                             ? 'bg-orange-100 text-orange-700'
                                             : tableStatus === 'reserved'
                                               ? 'bg-yellow-100 text-yellow-700'
                                               : tableStatus === 'occupied'
                                                 ? 'bg-purple-100 text-purple-700'
                                               : tableStatus === 'closed'
                                                 ? 'bg-red-100 text-red-700'
                                               : !isSuitableForGuests 
                                                 ? 'bg-gray-100 text-gray-700'
                                                 : 'bg-red-100 text-red-700'
                                     }`}>
                                       {isSelected 
                                         ? tableSelectionError 
                                           ? 'Error' 
                                           : 'Selected'
                                         : !isSuitableForGuests 
                                           ? 'Too Small' 
                                           : tableStatus === 'available' && isAvailable
                                             ? 'Available'
                                             : tableStatus.charAt(0).toUpperCase() + tableStatus.slice(1)
                                       }
                                     </div>
                                 </div>
                               </div>
                             );
                           })}
                         </div>
                         
                                                   {/* Layout Summary */}
                          <div className="mt-4 pt-3 border-t border-gray-200">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div className="flex justify-between text-gray-600">
                                <span>Total Tables:</span>
                                <span className="font-medium">{layout.layout.tables.length}</span>
                              </div>
                              <div className="flex justify-between text-gray-600">
                                <span>Total Capacity:</span>
                                <span className="font-medium">
                                  {layout.layout.tables.reduce((sum, table) => sum + table.capacity, 0)} seats
                                </span>
                              </div>
                              <div className="flex justify-between text-green-600">
                                <span>Available:</span>
                                <span className="font-medium">
                                  {layout.layout.tables.filter(table => {
                                    const tableInfo = tablesData[table.label] || {};
                                    return availability[table.label] !== false && 
                                           tableInfo.status === 'available' && 
                                           table.capacity >= parseInt(bookingData.guests);
                                  }).length}
                                </span>
                              </div>
                              <div className="flex justify-between text-red-600">
                                <span>Unavailable:</span>
                                <span className="font-medium">
                                  {layout.layout.tables.filter(table => {
                                    const tableInfo = tablesData[table.label] || {};
                                    return availability[table.label] === false || 
                                           tableInfo.status !== 'available' || 
                                           table.capacity < parseInt(bookingData.guests);
                                  }).length}
                                </span>
                              </div>
                            </div>
                          </div>
                       </div>
                     ))}
                   </div>
                   
                                                            {/* Legend */}
                     <div className="mt-6 pt-4 border-t border-gray-200">
                       <h4 className="text-sm font-medium text-gray-700 mb-3 text-center">Table Status Legend</h4>
                       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                         <div className="flex items-center justify-center">
                           <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                           <span className="text-xs text-gray-600">Available</span>
                         </div>
                         <div className="flex items-center justify-center">
                           <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                           <span className="text-xs text-gray-600">Booked</span>
                         </div>
                         <div className="flex items-center justify-center">
                           <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                           <span className="text-xs text-gray-600">Reserved</span>
                         </div>
                         <div className="flex items-center justify-center">
                           <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                           <span className="text-xs text-gray-600">Maintenance</span>
                         </div>
                         <div className="flex items-center justify-center">
                           <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                           <span className="text-xs text-gray-600">Occupied</span>
                         </div>
                         <div className="flex items-center justify-center">
                           <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                           <span className="text-xs text-gray-600">Selected</span>
                         </div>
                       </div>
                       <div className="mt-3 text-xs text-gray-500 text-center">
                         <p>• <strong>Booked:</strong> Table has a reservation for the selected time</p>
                         <p>• <strong>Too Small:</strong> Table capacity is less than your party size</p>
                         <p>• <strong>Other Statuses:</strong> Table is temporarily unavailable</p>
                       </div>
                     </div>
                   </div>
                
               )}

               {/* Show message if no layouts available */}
               {isBookingDetailsComplete && layouts.length === 0 && !layoutsError && (
                 <div className="bg-white rounded-lg shadow-sm border p-6">
                   <div className="text-center text-gray-500">
                     <p>No table layouts available for this restaurant.</p>
                     <p className="text-sm mt-2">Please contact the restaurant directly for reservations.</p>
                   </div>
                 </div>
               )}

               {/* Show error if layouts failed to load */}
               {layoutsError && (
                 <div className="bg-white rounded-lg shadow-sm border p-6">
                   <div className="text-center text-red-500">
                     <p>Failed to load table layouts.</p>
                     <p className="text-sm mt-2">Please try refreshing the page or contact support.</p>
                   </div>
                 </div>
               )}
             </div>

             {/* Booking Form */}
             <div className="lg:col-span-1">
               <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-6">
                 <h2 className="text-xl font-semibold text-gray-900 mb-4">
                   Book Your Table
                 </h2>

                 <div className="space-y-4">
                   {/* Date */}
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                       Date
                     </label>
                     <Input
                       type="date"
                       value={bookingData.date}
                       onChange={(e) => handleBookingChange('date', e.target.value)}
                       min={new Date().toISOString().split('T')[0]}
                     />
                   </div>

                   {/* Time */}
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                       Time
                     </label>
                     <Select value={bookingData.time} onValueChange={(value) => handleBookingChange('time', value)}>
                       <SelectTrigger>
                         <SelectValue placeholder="Select time" />
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="12:00">12:00 PM</SelectItem>
                         <SelectItem value="13:00">1:00 PM</SelectItem>
                         <SelectItem value="14:00">2:00 PM</SelectItem>
                         <SelectItem value="19:00">7:00 PM</SelectItem>
                         <SelectItem value="20:00">8:00 PM</SelectItem>
                         <SelectItem value="21:00">9:00 PM</SelectItem>
                       </SelectContent>
                     </Select>
                   </div>

                   {/* Guests */}
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                       Number of Guests
                     </label>
                     <Select value={bookingData.guests} onValueChange={(value) => handleBookingChange('guests', value)}>
                       <SelectTrigger>
                         <SelectValue placeholder="Select guests" />
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="1">1 Guest</SelectItem>
                         <SelectItem value="2">2 Guests</SelectItem>
                         <SelectItem value="4">4 Guests</SelectItem>
                         <SelectItem value="6">6 Guests</SelectItem>
                         <SelectItem value="8">8+ Guests</SelectItem>
                       </SelectContent>
                     </Select>
                   </div>

                   {/* Duration */}
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                       Duration (hours)
                     </label>
                     <Select value={bookingData.duration} onValueChange={(value) => handleBookingChange('duration', value)}>
                       <SelectTrigger>
                         <SelectValue />
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="1">1 Hour</SelectItem>
                         <SelectItem value="2">2 Hours</SelectItem>
                         <SelectItem value="3">3 Hours</SelectItem>
                         <SelectItem value="4">4 Hours</SelectItem>
                       </SelectContent>
                     </Select>
                   </div>

                   {/* Special Requests */}
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                       Special Requests
                     </label>
                     <textarea
                       value={bookingData.specialRequests}
                       onChange={(e) => handleBookingChange('specialRequests', e.target.value)}
                       className="w-full border rounded-md px-3 py-2 text-sm resize-none"
                       rows="3"
                       placeholder="Any special requests or dietary requirements..."
                     />
                   </div>

                                       {/* Table Selection Error */}
                    {tableSelectionError && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">Cannot select this table</h3>
                            <div className="mt-1 text-sm text-red-700">
                              {tableSelectionError}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Selected Table Info */}
                    {selectedTable && !tableSelectionError && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h3 className="font-medium text-blue-900 mb-2">Selected Table</h3>
                        <div className="text-sm text-blue-800">
                          <div>Table: {selectedTable.label}</div>
                          <div>Capacity: {selectedTable.capacity} guests</div>
                          <div>Price: ₹{selectedTable.basePrice}</div>
                        </div>
                      </div>
                    )}  

                                       {/* Book Button */}
                    <Button 
                      onClick={handleBookTable}
                      disabled={isBooking || !selectedTable || !isBookingDetailsComplete || tableSelectionError}
                      className="w-full"
                    >
                      {isBooking ? 'Booking...' : 'Book Table'}
                    </Button>

                   {/* Price Estimate */}
                   {selectedTable && (
                     <div className="text-center text-sm text-gray-600">
                       Estimated total: ₹{selectedTable.basePrice}
                     </div>
                   )}
                 </div>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
