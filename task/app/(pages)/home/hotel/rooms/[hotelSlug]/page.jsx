// app/home/hotel/rooms/[hotelSlug]/page.jsx
"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/home/Header";
import Footer from "@/components/home/footer";
import { useHotelsSWR } from "@/lib/hooks/useHotelSWR";
import { Star, MapPin, Calendar, Users, Bed, Wifi, Car, Utensils, Heart, Search, Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function HotelRoomsPage() {
  const { hotelSlug } = useParams();
  const { data, isLoading, isError } = useHotelsSWR({ hotelsOnly: true, productsLimit: 200 });
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [sortBy, setSortBy] = useState('price-low');

  // Find the hotel by slug
  const hotel = useMemo(() => {
    if (!data?.allHotels) return null;
    
    // Debug logging
    console.log('Hotel rooms page - searching for hotel:', {
      hotelSlug,
      availableHotels: data.allHotels.map(h => ({ id: h.id, slug: h.slug, name: h.name }))
    });
    
    return (
      data.allHotels.find((h) => h.slug === hotelSlug) ||
      data.allHotels.find((h) => String(h.id) === String(hotelSlug)) ||
      null
    );
  }, [data, hotelSlug]);

  // Convert variants into room objects with enhanced data
  const rooms = useMemo(() => {
    if (!hotel?.variants) return [];
    
    return hotel.variants.map((v) => {
      // Extract amenities from attributes
      const amenities = v.attributes?.filter(attr => 
        ['wifi', 'parking', 'breakfast', 'ac', 'tv', 'balcony'].includes(attr.name.toLowerCase())
      ) || [];
      
      // Extract room details
      const roomDetails = v.attributes?.filter(attr => 
        ['bed type', 'max occupancy', 'area', 'room type'].includes(attr.name.toLowerCase())
      ) || [];

      return {
        id: v._id || v.id,
        name: v.variant_name || "Room",
        description: hotel.description || "Comfortable room with modern amenities",
        price: v.price?.sale_price ?? v.price?.base_price ?? 0,
        basePrice: v.price?.base_price ?? null,
        discountPercentage: v.price?.discount_percentage || null,
        image: v.images?.[0]?.url || hotel.img || "/hotels/placeholder.png",
        ratingAverage: hotel?.rating?.average ?? 0,
        ratingCount: hotel?.rating?.count ?? 0,
        amenities: amenities.map(a => a.value),
        roomDetails: roomDetails,
        stock: v.stock?.quantity || 0,
        isLowStock: v.is_low_stock || false,
        status: v.status || 'active',
        sku: v.sku || '',
        attributes: v.attributes || [],
        raw: v
      };
    });
  }, [hotel]);

  const notFound = !isLoading && !isError && !hotel;

  // Calculate average price
  const averagePrice = useMemo(() => {
    if (!rooms.length) return 0;
    const total = rooms.reduce((sum, room) => sum + room.price, 0);
    return Math.round(total / rooms.length);
  }, [rooms]);

  // Filter and sort rooms
  const filteredRooms = useMemo(() => {
    let filtered = rooms.filter(room => 
      room.price >= priceRange[0] && room.price <= priceRange[1]
    );

    if (selectedAmenities.length > 0) {
      filtered = filtered.filter(room =>
        selectedAmenities.some(amenity => 
          room.amenities.some(roomAmenity => 
            roomAmenity.toLowerCase().includes(amenity.toLowerCase())
          )
        )
      );
    }

    // Sort rooms
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.ratingAverage - a.ratingAverage);
        break;
      default:
        break;
    }

    return filtered;
  }, [rooms, priceRange, selectedAmenities, sortBy]);

  const availableAmenities = useMemo(() => {
    const allAmenities = new Set();
    rooms.forEach(room => {
      room.amenities.forEach(amenity => allAmenities.add(amenity));
    });
    return Array.from(allAmenities);
  }, [rooms]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hotel Header Section - Fixed at top */}
      <div className="bg-white border-b">
        <div className="px-4 sm:px-6 lg:px-8 xl:px-14 w-full max-w-[1700px] mx-auto">
          {/* Breadcrumb */}
          <nav className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 mt-6 sm:mt-8">
            <Link href="/" className="text-black hover:text-gray-600">Home</Link> &gt;{" "}
            <Link href="/home/hotel" className="text-black hover:text-gray-600">Hotels</Link> &gt;{" "}
            <span className="font-semibold text-yellow-500">{hotel?.name || "Hotel"}</span>
          </nav>

          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500" />
              <span className="ml-2">Loading hotel details...</span>
            </div>
          )}

          {isError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <strong>Error:</strong> Failed to load hotel data.
            </div>
          )}

          {notFound && (
            <div className="text-center py-12">
              <div className="text-red-500 text-xl mb-4">Hotel Not Found</div>
              <p className="text-gray-600 mb-4">The hotel you're looking for doesn't exist or has been removed.</p>
              <Button asChild>
                <Link href="/home/hotel">Back to Hotels</Link>
              </Button>
            </div>
          )}

          {!isLoading && !isError && hotel && (
            <>
              {/* Hotel Header */}
              <div className="mb-8">
                <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden mb-6">
                  <Image
                    src={hotel.img || "/hotels/placeholder.png"}
                    alt={hotel.name}
                    fill
                    className="object-cover z-100"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex justify-between items-end">
                      <div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">{hotel.name}</h1>
                        <div className="flex items-center gap-4 text-sm sm:text-base">
                          <div className="flex items-center gap-1">
                            <MapPin size={16} />
                            <span>{hotel.location || "N/A"}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star size={16} className="text-yellow-400 fill-current" />
                            <span>{hotel.rating?.average?.toFixed(1) || "0.0"}</span>
                            <span className="text-gray-300">({hotel.rating?.count || 0})</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                        <Heart size={16} className="mr-2" />
                        Save
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Hotel Info Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={20} className="text-blue-500" />
                        <div>
                          <p className="text-sm text-gray-600">Check-in</p>
                          <p className="font-semibold">2:00 PM</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={20} className="text-red-500" />
                        <div>
                          <p className="text-sm text-gray-600">Check-out</p>
                          <p className="font-semibold">11:00 AM</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <Users size={20} className="text-green-500" />
                        <div>
                          <p className="text-sm text-gray-600">Guests</p>
                          <p className="font-semibold">2 Adults</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <Bed size={20} className="text-purple-500" />
                        <div>
                          <p className="text-sm text-gray-600">Rooms</p>
                          <p className="font-semibold">{rooms.length} Available</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Hotel Description */}
              <div className="mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>About this hotel</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      {hotel.description || "Experience luxury and comfort at this exceptional hotel. Our rooms are designed to provide the perfect blend of style and functionality, ensuring a memorable stay for all our guests."}
                    </p>
                    
                    {/* Hotel Amenities */}
                    <div className="mt-6">
                      <h4 className="font-semibold mb-3">Hotel Amenities</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                        {['Free WiFi', 'Parking', 'Restaurant', 'Room Service', 'Air Conditioning', '24/7 Front Desk'].map((amenity) => (
                          <div key={amenity} className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main Content with Sidebar and Rooms */}
      {!isLoading && !isError && hotel && (
        <div className="flex-1 flex justify-center">
          {/* Sticky Sidebar */}
          <div className="w-72 bg-gray-50 border-r min-h-screen sticky top-0">
            <div className="p-4">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <SlidersHorizontal size={18} />
                  Search & Filter
                </h3>
                
                {/* Search */}
                <div className="mb-6">
                  <Label htmlFor="search" className="text-sm font-medium mb-2 block">Search Rooms</Label>
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Search by room name..."
                      className="pl-10 text-sm"
                    />
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <Label className="text-sm font-medium mb-2 block">Price Range</Label>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>₹{priceRange[0].toLocaleString()}</span>
                      <span>₹{priceRange[1].toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="500"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Amenities Filter */}
                <div className="mb-6">
                  <Label className="text-sm font-medium mb-3 block">Amenities</Label>
                  <div className="space-y-2">
                    {availableAmenities.slice(0, 8).map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox
                          id={amenity}
                          checked={selectedAmenities.includes(amenity)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedAmenities([...selectedAmenities, amenity]);
                            } else {
                              setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
                            }
                          }}
                        />
                        <Label htmlFor={amenity} className="text-sm">{amenity}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sort By */}
                <div className="mb-6">
                  <Label className="text-sm font-medium mb-2 block">Sort By</Label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>

                {/* Results Count */}
                <div className="text-sm text-gray-600">
                  {filteredRooms.length} of {rooms.length} rooms
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Rooms */}
          <div className="flex-1 px-6 py-8 max-w-5xl">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Available Rooms</h2>
                  <p className="text-gray-600">Choose from {filteredRooms.length} room types</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Average price</p>
                  <p className="text-2xl font-bold text-green-600">₹{averagePrice.toLocaleString()}</p>
                </div>
              </div>

              <div className="space-y-4">
                {filteredRooms.map((room) => (
                  <Card key={room.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="flex flex-col lg:flex-row">
                      {/* Room Image */}
                      <div className="lg:w-1/4 relative h-40 lg:h-auto">
                        <Image
                          src={room.image}
                          alt={room.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 25vw"
                        />
                        {room.discountPercentage && (
                          <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs">
                            {room.discountPercentage}% OFF
                          </Badge>
                        )}
                        {room.isLowStock && (
                          <Badge variant="secondary" className="absolute top-2 right-2 bg-orange-500 text-white text-xs">
                            Only {room.stock} left
                          </Badge>
                        )}
                      </div>

                      {/* Room Details */}
                      <div className="lg:w-3/4 p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-1">{room.name}</h3>
                            <p className="text-gray-600 text-sm mb-2 line-clamp-2">{room.description}</p>
                            
                            {/* Room Features */}
                            <div className="flex flex-wrap gap-1 mb-3">
                              {room.amenities.slice(0, 3).map((amenity, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {amenity}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="text-right ml-4">
                            <div className="mb-2">
                              {room.basePrice && room.basePrice > room.price && (
                                <p className="text-xs text-gray-500 line-through">₹{room.basePrice.toLocaleString()}</p>
                              )}
                              <p className="text-xl font-bold text-green-600">₹{room.price.toLocaleString()}</p>
                              <p className="text-xs text-gray-600">per night</p>
                            </div>
                          </div>
                        </div>

                        <Separator className="my-3" />

                        {/* Room Details Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
                          {room.roomDetails.slice(0, 4).map((detail, index) => (
                            <div key={index} className="text-xs">
                              <span className="text-gray-600">{detail.name}:</span>
                              <span className="font-medium ml-1">{detail.value}</span>
                            </div>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="flex-1"
                            asChild
                          >
                            <Link href={`/home/hotel/rooms/${hotelSlug}/${room.id}`}>
                              View Details
                            </Link>
                          </Button>
                          <Button size="sm" className="flex-1">
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* No Rooms Available */}
              {filteredRooms.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-500 text-xl mb-4">No rooms match your filters</div>
                  <p className="text-gray-600 mb-4">Try adjusting your search criteria to find available rooms.</p>
                  <Button 
                    onClick={() => {
                      setPriceRange([0, 10000]);
                      setSelectedAmenities([]);
                      setSortBy('price-low');
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
}
