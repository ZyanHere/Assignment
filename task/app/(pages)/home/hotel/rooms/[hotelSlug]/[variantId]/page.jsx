"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/home/Header";
import Footer from "@/components/home/footer";
import Image from "next/image";
import { useHotelsSWR } from "@/lib/hooks/useHotelSWR";
import { MapPin, Star, Calendar, Users, Bed, Wifi, Car, Coffee, Clock, CreditCard, Shield } from 'lucide-react';
import { Button } from "@/components/ui/button";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useSelectedItems } from "@/lib/contexts/selected-items-context";
import { useSession } from "next-auth/react";
import { useCart } from "@/lib/contexts/cart-context";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import HotelAmenitiesDisplay from "@/components/hotel/HotelAmenitiesDisplay";
import HotelReviews from "@/components/hotel/HotelReviews";
import HotelAvailabilityCalendar from "@/components/hotel/HotelAvailabilityCalendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { differenceInDays, addDays, format, isBefore, isSameDay } from "date-fns";
import { api } from "@/lib/api/axios";

export default function RoomDetailsPage() {
  const { hotelSlug, variantId } = useParams();
  const { data, isLoading, isError } = useHotelsSWR({ hotelsOnly: true, productsLimit: 200 });

  const { addToCart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [grabLoading, setGrabLoading] = useState(false);
  const [selectedDates, setSelectedDates] = useState({ checkIn: null, checkOut: null });
  const [availability, setAvailability] = useState({});
  const [variantData, setVariantData] = useState(null);
  const [variantLoading, setVariantLoading] = useState(true);
  const [hasFetchedVariant, setHasFetchedVariant] = useState(false);
  const [hasFetchedAvailability, setHasFetchedAvailability] = useState(false);
  const { setSingleItem, setSelectedItems } = useSelectedItems();
  const { data: session } = useSession();
  const router = useRouter();

  // Reset fetch flags when parameters change
  useEffect(() => {
    setHasFetchedVariant(false);
    setHasFetchedAvailability(false);
    setVariantData(null);
    setAvailability({});
  }, [hotelSlug, variantId]);

  // Memoize hotel data to prevent unnecessary re-renders
  const memoizedHotel = useMemo(() => {
    if (!data?.allHotels || !hotelSlug) return null;
    return data.allHotels.find(
      (h) => h.slug === hotelSlug || String(h.id) === String(hotelSlug)
    );
  }, [data?.allHotels, hotelSlug]);

  // Memoize variant data to prevent unnecessary re-renders
  const memoizedVariant = useMemo(() => {
    if (!memoizedHotel?.variants || !variantId) return null;
    return memoizedHotel.variants.find((v) => String(v.id) === String(variantId));
  }, [memoizedHotel?.variants, variantId]);

  // Fetch variant data from API
  const fetchVariantData = useCallback(async () => {
    if (!hotelSlug || !variantId || !memoizedHotel || hasFetchedVariant) return;
    
    try {
      setVariantLoading(true);
      setHasFetchedVariant(true);

      // Fetch variant data from API using axios client
      try {
        const variantResponse = await api.get(
          `/lmd/api/v1/retail/products/${memoizedHotel.id}/variants/${variantId}`
        );
        
        if (variantResponse.data?.data) {
          setVariantData(variantResponse.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch variant data:', error.response?.status, error.response?.statusText);
        // If unauthorized, we can still show the variant from hotel data
        if (error.response?.status === 401) {
          console.warn('Unauthorized access to variant API, using fallback data');
        }
      }
    } catch (error) {
      console.error('Error fetching variant data:', error);
    } finally {
      setVariantLoading(false);
    }
  }, [hotelSlug, variantId, memoizedHotel, hasFetchedVariant]);

  useEffect(() => {
    if (data && !isLoading && memoizedHotel && !hasFetchedVariant) {
      fetchVariantData();
    }
  }, [data, isLoading, memoizedHotel, hasFetchedVariant]);

  // Fetch availability data with pricing
  const fetchAvailability = useCallback(async () => {
    if (!hotelSlug || !variantId || !memoizedHotel || hasFetchedAvailability) return;
    
    try {
      setLoading(true);
      setHasFetchedAvailability(true);

      // Fetch availability data from API using axios client
      try {
        const availabilityResponse = await api.get(
          `/lmd/api/v1/retail/hotels/${memoizedHotel.id}/availability-calendar?variant_id=${variantId}`
        );
        
        if (availabilityResponse.data?.data?.availability) {
          // Transform the availability data to match the expected format
          const availabilityData = availabilityResponse.data.data.availability;
          const transformedAvailability = {};
          
          availabilityData.forEach(entry => {
            const dateKey = format(new Date(entry.date), 'yyyy-MM-dd');
            transformedAvailability[dateKey] = {
              available: entry.is_available,
              roomsLeft: entry.available_rooms,
              price: entry.price_per_night
            };
          });
          
          setAvailability(transformedAvailability);
        }
      } catch (error) {
        console.warn('Using fallback availability data due to API error:', error.response?.status);
        // Fallback to mock data if API fails
        const mockAvailability = {};
        const today = new Date();
        for (let i = 0; i < 90; i++) {
          const date = addDays(today, i);
          const dateKey = format(date, 'yyyy-MM-dd');
          
          mockAvailability[dateKey] = {
            available: Math.random() > 0.2,
            roomsLeft: Math.floor(Math.random() * 5) + 1,
            price: Math.floor(Math.random() * 2000) + 1500 // Random price between 1500-3500
          };
        }
        setAvailability(mockAvailability);
      }
    } catch (error) {
      console.error('Error fetching availability:', error);
      // Fallback to mock data
      const mockAvailability = {};
      const today = new Date();
      for (let i = 0; i < 90; i++) {
        const date = addDays(today, i);
        const dateKey = format(date, 'yyyy-MM-dd');
        
        mockAvailability[dateKey] = {
          available: Math.random() > 0.2,
          roomsLeft: Math.floor(Math.random() * 5) + 1,
          price: Math.floor(Math.random() * 2000) + 1500
        };
      }
      setAvailability(mockAvailability);
    } finally {
      setLoading(false);
    }
  }, [hotelSlug, variantId, memoizedHotel, hasFetchedAvailability]);

  useEffect(() => {
    if (data && !isLoading && variantData && memoizedHotel && !hasFetchedAvailability) {
      fetchAvailability();
    }
  }, [data, isLoading, variantData, memoizedHotel, hasFetchedAvailability]);

  if (isLoading || variantLoading) return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading room details...</p>
        </div>
      </div>
    </div>
  );
  
  if (isError) return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">Failed to load room data</p>
          <Button asChild>
            <Link href="/home/hotel">Back to Hotels</Link>
          </Button>
        </div>
      </div>
    </div>
  );

  if (!memoizedHotel) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 text-lg mb-4">Hotel not found</p>
            <Button asChild>
              <Link href="/home/hotel">Back to Hotels</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Use API variant data if available, otherwise fallback to hotel data
  const selectedVariant = variantData || memoizedVariant;

  if (!selectedVariant) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 text-lg mb-4">Room not found</p>
            <Button asChild>
              <Link href={`/home/hotel/rooms/${hotelSlug}`}>Back to Hotel Rooms</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Get room images with fallbacks
  const getRoomImages = () => {
    const images = [];
    
    // Add variant images first
    if (selectedVariant.images && selectedVariant.images.length > 0) {
      images.push(...selectedVariant.images);
    }
    
    // Add hotel images as fallback
    if (memoizedHotel.images && memoizedHotel.images.length > 0) {
      images.push(...memoizedHotel.images);
    }
    
    // Add placeholder if no images
    if (images.length === 0) {
      images.push({ url: "/hotels/placeholder.png", is_primary: true });
    }
    
    return images;
  };

  const roomImages = getRoomImages();
  const primaryImage = roomImages.find(img => img.is_primary) || roomImages[0];

  // Mock amenities data - in real app this would come from API
  const roomAmenities = [
    { id: 'wifi', name: 'Free WiFi', available: true },
    { id: 'ac', name: 'Air Conditioning', available: true },
    { id: 'tv', name: 'Flat-screen TV', available: true },
    { id: 'minibar', name: 'Mini Bar', available: true },
    { id: 'room_service', name: 'Room Service', available: true },
    { id: 'safe', name: 'In-room Safe', available: true },
    { id: 'balcony', name: 'Private Balcony', available: selectedVariant.attributes?.some(attr => attr.name === 'balcony') },
    { id: 'ocean_view', name: 'Ocean View', available: selectedVariant.attributes?.some(attr => attr.name === 'ocean_view') }
  ];

  // Mock reviews data - in real app this would come from API
  const mockReviews = [
    {
      id: 1,
      user: { name: 'John D.', avatar: null },
      rating: 5,
      comment: 'Excellent room with amazing views. The service was impeccable and the amenities were top-notch.',
      date: '2024-01-15',
      helpful: 12
    },
    {
      id: 2,
      user: { name: 'Sarah M.', avatar: null },
      rating: 4,
      comment: 'Great room, very clean and comfortable. The location is perfect for exploring the city.',
      date: '2024-01-10',
      helpful: 8
    },
    {
      id: 3,
      user: { name: 'Mike R.', avatar: null },
      rating: 5,
      comment: 'Absolutely loved our stay here. The room was spacious and the staff was very friendly.',
      date: '2024-01-05',
      helpful: 15
    }
  ];

  // Calculate total price with support for one-day bookings
  const calculateTotalPrice = () => {
    if (!selectedDates.checkIn || !selectedDates.checkOut) {
      return selectedVariant.price?.sale_price ?? selectedVariant.price?.base_price;
    }
    
    const nights = getTotalNights();
    // For one-day bookings, use the price for that specific date
    if (nights === 0) {
      const dateKey = format(selectedDates.checkIn, 'yyyy-MM-dd');
      return availability[dateKey]?.price ?? selectedVariant.price?.sale_price ?? selectedVariant.price?.base_price;
    }
    
    // For multi-day bookings, calculate sum of actual availability prices
    let totalPrice = 0;
    let currentDate = selectedDates.checkIn;
    
    while (isBefore(currentDate, selectedDates.checkOut) || isSameDay(currentDate, selectedDates.checkOut)) {
      const dateKey = format(currentDate, 'yyyy-MM-dd');
      const dateAvailability = availability[dateKey];
      
      if (dateAvailability?.available && dateAvailability?.price) {
        totalPrice += dateAvailability.price;
      } else {
        // Fallback to variant price if availability data is missing
        totalPrice += selectedVariant.price?.sale_price ?? selectedVariant.price?.base_price;
      }
      
      currentDate = addDays(currentDate, 1);
    }
    
    return totalPrice;
  };

  // Get average price per night for selected dates
  const getAveragePricePerNight = () => {
    if (selectedDates.checkIn && selectedDates.checkOut) {
      const nights = getTotalNights();
      if (nights === 0) {
        // One-day booking
        const dateKey = format(selectedDates.checkIn, 'yyyy-MM-dd');
        return availability[dateKey]?.price ?? selectedVariant.price?.sale_price ?? selectedVariant.price?.base_price;
      }
      
      // For multi-day bookings, calculate average from actual availability prices
      const totalPrice = calculateTotalPrice();
      return Math.round(totalPrice / nights);
    }
    
    // If no dates selected, show the base price
    return selectedVariant.price?.sale_price ?? selectedVariant.price?.base_price;
  };

  // Get availability breakdown for selected dates
  const getAvailabilityBreakdown = () => {
    if (!selectedDates.checkIn || !selectedDates.checkOut) {
      return [];
    }
    
    const breakdown = [];
    let currentDate = selectedDates.checkIn;
    
    while (isBefore(currentDate, selectedDates.checkOut) || isSameDay(currentDate, selectedDates.checkOut)) {
      const dateKey = format(currentDate, 'yyyy-MM-dd');
      const dateAvailability = availability[dateKey];
      
      breakdown.push({
        date: currentDate,
        dateFormatted: format(currentDate, 'MMM dd, yyyy'),
        available: dateAvailability?.available || false,
        roomsLeft: dateAvailability?.roomsLeft || 0,
        price: dateAvailability?.price || selectedVariant.price?.sale_price || selectedVariant.price?.base_price
      });
      
      currentDate = addDays(currentDate, 1);
    }
    
    return breakdown;
  };

  const getTotalNights = () => {
    if (!selectedDates.checkIn || !selectedDates.checkOut) {
      return 1;
    }
    const nights = differenceInDays(selectedDates.checkOut, selectedDates.checkIn);
    // Support for one-day bookings (same day check-in and check-out)
    return Math.max(0, nights);
  };

  const getRoomDetails = () => {
    const maxGuests = selectedVariant.attributes?.find(attr => 
      attr.name?.toLowerCase().includes('guest') || 
      attr.name?.toLowerCase().includes('capacity')
    )?.value || '2 Adults';
    
    const bedType = selectedVariant.attributes?.find(attr => 
      attr.name?.toLowerCase().includes('bed')
    )?.value || 'King Bed';
    
    return { maxGuests, bedType };
  };

  const handleDateSelect = (dates) => {
    setSelectedDates(dates);
  };

  const handleGrab = async () => {
    if (!session?.user?.token) {
      toast.error('Please login to grab this item');
      return;
    }

    if (!selectedDates.checkIn || !selectedDates.checkOut) {
      toast.error('Please select check-in and check-out dates');
      return;
    }

    if (selectedVariant) {
      try {
        setGrabLoading(true);

        // Clear existing cart first
        await clearCart();

                         // Add only this product to cart
        await addToCart({
          id: selectedVariant._id || selectedVariant.id,
          variant: selectedVariant,
          selectedVariant,
          price: calculateTotalPrice(), // Use total stay price for hotel bookings
          sale_price: calculateTotalPrice(), // Use total stay price for hotel bookings
          stock: selectedVariant.stock?.quantity || 1,
          sku: selectedVariant.sku,
          image: primaryImage?.url || "/hotels/placeholder.png",
        }, {
          // Hotel booking details
          selectedDates: {
            checkIn: selectedDates.checkIn,
            checkOut: selectedDates.checkOut
          },
          booking_details: {
            checkIn: selectedDates.checkIn,
            checkOut: selectedDates.checkOut,
            nights: getTotalNights(),
            totalPrice: calculateTotalPrice(),
            // Hotel-specific fields
            hotelName: memoizedHotel.name,
            hotelLocation: memoizedHotel.location,
            roomType: selectedVariant.variant_name || selectedVariant.name,
            checkInTime: "3:00 PM",
            checkOutTime: "11:00 AM",
            maxGuests: getRoomDetails().maxGuests,
            bedType: getRoomDetails().bedType,
            isHotelBooking: true,
            // Additional hotel data
            hotelId: memoizedHotel.id,
            variantId: selectedVariant.id,
            availability: getAvailabilityBreakdown()
          }
        });

                 // Also populate selectedItems context for buy-now page
         const cartItemData = [{
           id: selectedVariant._id || selectedVariant.id,
           variantId: selectedVariant._id || selectedVariant.id,
           name: selectedVariant.variant_name || selectedVariant.name,
           brand: memoizedHotel.name || 'Last Minute Deal',
           seller: memoizedHotel.name || 'Last Minute Deal',
           vendorId: memoizedHotel.id || 'default',
           vendorName: memoizedHotel.name || 'Last Minute Deal',
           price: calculateTotalPrice(), // Use total stay price for hotel bookings
           mrp: calculateTotalPrice(), // Use total stay price for hotel bookings
           image: primaryImage?.url || "/hotels/placeholder.png",
           weight: selectedVariant.variant_name || selectedVariant.name,
           quantity: 1,
           checkIn: selectedDates.checkIn,
           checkOut: selectedDates.checkOut,
           nights: getTotalNights(),
           totalPrice: calculateTotalPrice(),
           // Hotel-specific fields
           hotelName: memoizedHotel.name,
           hotelLocation: memoizedHotel.location,
           roomType: selectedVariant.variant_name || selectedVariant.name,
           checkInTime: "3:00 PM",
           checkOutTime: "11:00 AM",
           maxGuests: getRoomDetails().maxGuests,
           bedType: getRoomDetails().bedType,
           isHotelBooking: true,
         }];

        setSelectedItems(cartItemData);
        setSingleItem(false); // This is from cart, not single item

        // Add a small delay to ensure cart is updated
        await new Promise(resolve => setTimeout(resolve, 500));

        toast.success('Item grabbed successfully!');

        // Navigate to buy-now page
        router.push('/buy-now');
      } catch (error) {
        console.error('Error grabbing item:', error);
        toast.error('Failed to grab item. Please try again.');
      } finally {
        setGrabLoading(false);
      }
    } else {
      toast.error('No variant selected');
    }
  }



  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 px-4 sm:px-6 lg:px-8 xl:px-14 pb-14 w-full max-w-[1700px] mx-auto">
        {/* Breadcrumb */}
        <nav className="text-lg sm:text-xl lg:text-2xl mb-6 mt-8">
          <Link href="/" className="text-black hover:text-gray-600">Home</Link> &gt;{" "}
          <Link href="/home/hotel" className="text-black hover:text-gray-600">Hotels</Link> &gt;{" "}
          <Link href={`/home/hotel/rooms/${memoizedHotel.slug}`} className="text-black hover:text-gray-600">{memoizedHotel.name}</Link> &gt;{" "}
          <span className="font-semibold text-yellow-500">{selectedVariant.variant_name || selectedVariant.name}</span>
        </nav>

        {/* Room Banner */}
        <div className="w-full h-[400px] relative mb-8 rounded-xl overflow-hidden">
          <Image
            src={primaryImage?.url || "/hotels/placeholder.png"}
            alt={selectedVariant.variant_name || selectedVariant.name}
            fill
            className="object-cover z-100"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
            priority
          />

          
          {/* Image Gallery Badge */}
          {roomImages.length > 1 && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-white/90 text-black hover:bg-white">
                {roomImages.length} Photos
              </Badge>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Room Info */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-4">{selectedVariant.variant_name || selectedVariant.name}</h1>

              <div className="flex flex-wrap gap-4 items-center mb-6">
                <div className="flex gap-2 items-center">
                  <MapPin className="text-blue-600" size={20} />
                  <p className="text-gray-600 text-lg">{memoizedHotel.location || "N/A"}</p>
                </div>

                <div className="flex gap-2 items-center">
                  <Star size={20} className="text-yellow-400 fill-current" />
                  <p className="text-gray-600">
                    {memoizedHotel.rating?.average?.toFixed(1) || "0.0"} ({memoizedHotel.rating?.count || 0} reviews)
                  </p>
                </div>

                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Available
                </Badge>
              </div>

              {/* Quick Info Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Users className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                    <p className="text-sm text-gray-600">Max Guests</p>
                    <p className="font-semibold">{getRoomDetails().maxGuests}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Bed className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                    <p className="text-sm text-gray-600">Bed Type</p>
                    <p className="font-semibold">{getRoomDetails().bedType}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Clock className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                    <p className="text-sm text-gray-600">Check-in</p>
                    <p className="font-semibold">3:00 PM</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Clock className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                    <p className="text-sm text-gray-600">Check-out</p>
                    <p className="font-semibold">11:00 AM</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Room Amenities */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Room Amenities</h2>
              <HotelAmenitiesDisplay 
                amenities={roomAmenities}
                showAvailableOnly={false}
                maxDisplay={8}
                showMore={true}
                compact={false}
              />
            </div>

            {/* Availability Calendar */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Select Your Dates</h2>
              <Card>
                <CardContent className="p-6">
                                     <HotelAvailabilityCalendar
                     hotelId={memoizedHotel.id}
                     variantId={selectedVariant.id}
                     onDateSelect={handleDateSelect}
                     selectedDates={selectedDates}
                     minStay={0} // Allow one-day bookings
                     maxStay={30}
                     disabledDates={[]}
                     className="w-full"
                     availability={availability}
                   />
                </CardContent>
              </Card>
            </div>

            {/* Attributes */}
            {selectedVariant.attributes?.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Room Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedVariant.attributes.map((attr) => (
                    <div key={attr.id} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-medium">{attr.name}:</span>
                      <span className="text-gray-600">{attr.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Description</h2>
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-600 leading-relaxed">
                    {memoizedHotel.description || "Experience luxury and comfort in this beautifully appointed room. Featuring modern amenities, elegant furnishings, and stunning views, this room provides the perfect setting for a memorable stay. Whether you're traveling for business or leisure, you'll find everything you need for a comfortable and enjoyable experience."}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Reviews */}
            <div className="mb-8">
                           <HotelReviews
               reviews={mockReviews}
               averageRating={memoizedHotel.rating?.average || 4.5}
               totalReviews={memoizedHotel.rating?.count || 127}
               showAll={false}
               maxDisplay={3}
             />
            </div>

            {/* Hotel Policies */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Hotel Policies</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Shield size={20} className="text-blue-600" />
                      Cancellation Policy
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Free cancellation up to 24 hours before check-in. Late cancellations may incur a fee.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CreditCard size={20} className="text-green-600" />
                      Payment Policy
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Secure payment processing. No charges until booking is confirmed.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Price Card */}
          <div className="lg:w-96">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-xl">Room Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Price per night</span>
                  <span className="text-2xl font-bold text-orange-500">
                    ₹{getAveragePricePerNight()?.toLocaleString()}
                  </span>
                </div>
                {selectedVariant.price?.base_price > selectedVariant.price?.sale_price && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 line-through">Original price</span>
                    <span className="text-gray-500 line-through">
                      ₹{selectedVariant.price?.base_price?.toLocaleString()}
                    </span>
                  </div>
                )}
                {selectedDates.checkIn && selectedDates.checkOut && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Duration</span>
                    <span className="text-gray-600">
                      {getTotalNights() === 0 ? 'Same day' : `${getTotalNights()} nights`}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Taxes & fees</span>
                  <span className="text-gray-600">Included</span>
                </div>
                
                {/* Availability Breakdown */}
                {selectedDates.checkIn && selectedDates.checkOut && getAvailabilityBreakdown().length > 0 && (
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <div className="text-sm text-gray-800 font-medium mb-2">Availability Breakdown:</div>
                    <div className="text-xs text-gray-600 space-y-1 max-h-24 overflow-y-auto">
                      {getAvailabilityBreakdown().map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span>{item.dateFormatted}:</span>
                          <div className="flex items-center gap-2">
                            <span className={item.available ? 'text-green-600' : 'text-red-600'}>
                              {item.available ? '✓ Available' : '✗ Not Available'}
                            </span>
                            {item.available && item.roomsLeft <= 3 && (
                              <Badge variant="outline" className="text-xs">
                                {item.roomsLeft} left
                              </Badge>
                            )}
                            {item.available && item.price && (
                              <span className="text-xs font-medium text-blue-600">
                                ₹{item.price.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Selected Dates Summary */}
                {selectedDates.checkIn && selectedDates.checkOut && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="text-sm text-blue-800 font-medium mb-2">Selected Dates:</div>
                    <div className="text-xs text-blue-600 space-y-1">
                      <div>Check-in: {format(selectedDates.checkIn, 'MMM dd, yyyy')}</div>
                      <div>Check-out: {format(selectedDates.checkOut, 'MMM dd, yyyy')}</div>
                      <div>Duration: {getTotalNights() === 0 ? 'Same day' : `${getTotalNights()} nights`}</div>
                    </div>
                  </div>
                )}
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">
                      {selectedDates.checkIn && selectedDates.checkOut ? 'Total for stay' : 'Total per night'}
                    </span>
                    <span className="text-xl font-bold text-orange-500">
                      ₹{calculateTotalPrice()?.toLocaleString()}
                    </span>
                  </div>
                </div>
                <Button
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-lg font-bold py-4 shadow-md transition-all duration-200"
                  onClick={handleGrab}
                  disabled={grabLoading || !selectedDates.checkIn || !selectedDates.checkOut}
                >
                  {grabLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin text-white" />
                      <span>Grabbing...</span>
                    </div>
                  ) : !selectedDates.checkIn || !selectedDates.checkOut ? (
                    "SELECT DATES"
                  ) : (
                    "BOOK NOW"
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
