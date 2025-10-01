"use client";

import React, { useState } from "react";
import Header from "@/components/home/Header";
import Link from "next/link";
import useSWR from "swr";
import { api, axiosFetcher } from "@/lib/api/axios";
import { Calendar, Clock, Users, MapPin, Phone, Mail, ArrowLeft, CheckCircle, XCircle, Clock as ClockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function ReservationsPage() {
  const { data: session } = useSession();
  const [cancellingId, setCancellingId] = useState(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [reservationToCancel, setReservationToCancel] = useState(null);

  // Fetch user's reservations
  const { data, error, mutate } = useSWR(
    session?.user?.token ? "/lmd/api/v1/restaurants/reservations/me" : null,
    axiosFetcher
  );

  if (!session) {
    return (
      <div className="flex-1">
        <Header />
        <div className="p-6 w-full max-w-[1700px] mx-auto">
          <div className="text-center py-10">
            <div className="text-gray-500 text-xl mb-4">Please login to view your reservations</div>
            <Link href="/auth/signin">
              <Button>Sign In</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1">
        <Header />
        <div className="p-6 w-full max-w-[1700px] mx-auto">
          <div className="text-center py-10">
            <div className="text-red-500 text-xl">Failed to load reservations</div>
            <Button onClick={() => mutate()} className="mt-4">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex-1">
        <Header />
        <div className="p-6 w-full max-w-[1700px] mx-auto">
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
            <span className="ml-2">Loading reservations...</span>
          </div>
        </div>
      </div>
    );
  }

  const reservations = data.data || [];

  const handleCancelClick = (reservation) => {
    setReservationToCancel(reservation);
    setShowCancelConfirm(true);
  };

  const handleCancelConfirm = async () => {
    if (!reservationToCancel) return;
    
    try {
      setCancellingId(reservationToCancel._id);
      
      const response = await api.post(`/lmd/api/v1/restaurants/reservations/${reservationToCancel._id}/cancel`);
      const result = response.data;

      toast.success('Reservation cancelled successfully');
      mutate(); // Refresh the data
      
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Failed to cancel reservation');
    } finally {
      setCancellingId(null);
      setShowCancelConfirm(false);
      setReservationToCancel(null);
    }
  };

  const handleCancelCancel = () => {
    setShowCancelConfirm(false);
    setReservationToCancel(null);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      case 'completed':
        return 'text-blue-600 bg-blue-100';
      case 'no_show':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      case 'pending':
        return <ClockIcon className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'no_show':
        return <XCircle className="h-4 w-4" />;
      default:
        return <ClockIcon className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return 'N/A';
    
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDuration = (startTime, endTime) => {
    if (!startTime || !endTime) return 'N/A';
    
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diffMs = end - start;
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));
    
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''}`;
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
            <span className="font-medium text-yellow-500">My Reservations</span>
          </nav>

          {/* Back Button */}
          <Link href="/home/restaurants" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Restaurants
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              My Reservations
            </h1>
            <p className="text-gray-600">
              Manage your restaurant table bookings
            </p>
          </div>

          {/* Reservations List */}
          {reservations.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-4">
                You don't have any reservations yet
              </div>
              <Link href="/home/restaurants">
                <Button>Browse Restaurants</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {reservations.map((reservation) => (
                <div key={reservation._id} className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                                                 <h3 className="text-xl font-semibold text-gray-900">
                           {reservation.restaurant?.name || 'Restaurant Reservation'}
                         </h3>
                        <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(reservation.status)}`}>
                          {getStatusIcon(reservation.status)}
                          <span className="ml-1">{reservation.status?.charAt(0).toUpperCase() + reservation.status?.slice(1) || 'Unknown'}</span>
                        </div>
                      </div>
                      
                                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-sm text-gray-600">
                         <div className="flex items-center">
                           <Calendar className="h-4 w-4 mr-2" />
                           <span>{formatDate(reservation.startTime)}</span>
                         </div>
                         <div className="flex items-center">
                           <Clock className="h-4 w-4 mr-2" />
                           <span>{formatTime(reservation.startTime)} - {formatTime(reservation.endTime)} ({formatDuration(reservation.startTime, reservation.endTime)})</span>
                         </div>
                         <div className="flex items-center">
                           <Users className="h-4 w-4 mr-2" />
                           <span>{reservation.partySize || 'N/A'} guests</span>
                         </div>
                         <div className="flex items-center">
                           <span className="font-medium">Table: {reservation.tableLabel || 'N/A'}</span>
                         </div>
                         <div className="flex items-center">
                           <span className={`px-2 py-1 rounded text-xs font-medium ${
                             reservation.paymentStatus === 'paid' 
                               ? 'bg-green-100 text-green-700' 
                               : 'bg-yellow-100 text-yellow-700'
                           }`}>
                             Payment: {reservation.paymentStatus?.charAt(0).toUpperCase() + reservation.paymentStatus?.slice(1) || 'Unknown'}
                           </span>
                         </div>
                       </div>
                    </div>
                  </div>

                                     {/* Restaurant Details */}
                   {reservation.restaurant && (
                     <div className="border-t pt-4 mb-4">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                         <div className="flex items-center text-gray-600">
                           <MapPin className="h-4 w-4 mr-2" />
                           <span>
                             {reservation.restaurant.address?.street}, {reservation.restaurant.address?.city}, {reservation.restaurant.address?.state}
                           </span>
                         </div>
                         {reservation.restaurant.contactInfo?.phone && (
                           <div className="flex items-center text-gray-600">
                             <Phone className="h-4 w-4 mr-2" />
                             <span>{reservation.restaurant.contactInfo.phone}</span>
                           </div>
                         )}
                         {reservation.tableLayout && (
                           <div className="flex items-center text-gray-600">
                             <span>Layout: {reservation.tableLayout.name}</span>
                           </div>
                         )}
                       </div>
                     </div>
                   )}

                  {/* Special Requests */}
                  {reservation.notes && (
                    <div className="border-t pt-4 mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                      <p className="text-gray-600 text-sm">{reservation.notes}</p>
                    </div>
                  )}

                  {/* Booking Details */}
                  <div className="border-t pt-4">
                                         <div className="flex items-center justify-between">
                       <div className="text-sm text-gray-600">
                         <div>Booking ID: {reservation._id || 'N/A'}</div>
                         <div>Booked on: {formatDate(reservation.createdAt)}</div>
                       </div>
                      
                      <div className="flex items-center gap-3">
                        {reservation.status === 'confirmed' && (
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-600">₹{reservation.pricing?.amount || 0}</div>
                            <div className="text-xs text-gray-500">Total Amount</div>
                          </div>
                        )}
                        
                                                 {(reservation.status === 'pending' || reservation.status === 'confirmed') && (
                           <Button
                             onClick={() => handleCancelClick(reservation)}
                             disabled={cancellingId === reservation._id}
                             variant="outline"
                             size="sm"
                             className="text-red-600 border-red-600 hover:bg-red-50"
                           >
                             {cancellingId === reservation._id ? 'Cancelling...' : 'Cancel'}
                           </Button>
                         )}
                         
                         {reservation.status === 'cancelled' && (
                           <div className="text-sm text-red-600 font-medium">
                             ✗ Cancelled
                           </div>
                         )}
                         
                         {reservation.status === 'completed' && (
                           <div className="text-sm text-blue-600 font-medium">
                             ✓ Completed
                           </div>
                         )}
                         
                         {reservation.status === 'no_show' && (
                           <div className="text-sm text-orange-600 font-medium">
                             ⚠ No Show
                           </div>
                         )}
                        
                        {reservation.status === 'confirmed' && (
                          <div className="text-sm text-green-600 font-medium">
                            ✓ Confirmed
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
                     )}
         </div>
       </div>

       {/* Cancel Confirmation Modal */}
       {showCancelConfirm && reservationToCancel && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
           <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
             <h3 className="text-lg font-semibold text-gray-900 mb-4">
               Cancel Reservation
             </h3>
             <p className="text-gray-600 mb-6">
               Are you sure you want to cancel your reservation at{' '}
               <span className="font-medium">{reservationToCancel.restaurant?.name || 'this restaurant'}</span>?
               <br />
               <span className="text-sm text-gray-500">
                 Date: {formatDate(reservationToCancel.startTime)} at {formatTime(reservationToCancel.startTime)}
               </span>
             </p>
             <div className="flex gap-3 justify-end">
               <Button
                 onClick={handleCancelCancel}
                 variant="outline"
                 disabled={cancellingId === reservationToCancel._id}
               >
                 Keep Reservation
               </Button>
               <Button
                 onClick={handleCancelConfirm}
                 variant="destructive"
                 disabled={cancellingId === reservationToCancel._id}
               >
                 {cancellingId === reservationToCancel._id ? 'Cancelling...' : 'Yes, Cancel'}
               </Button>
             </div>
           </div>
         </div>
       )}
     </div>
   );
 }
