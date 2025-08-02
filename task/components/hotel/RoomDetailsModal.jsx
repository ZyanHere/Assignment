// components/hotel/RoomDetailsModal.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Star, MapPin, Users, Bed, Wifi, Car, Utensils, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function RoomDetailsModal({ room, isOpen, onClose }) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!isOpen || !room) return null;

  const images = [room.image]; // Add more images if available

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold">{room.name}</h2>
            <p className="text-gray-600">{room.description}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        <div className="p-6">
          {/* Image Gallery */}
          <div className="mb-6">
            <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden mb-4">
              <Image
                src={images[selectedImage]}
                alt={room.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 800px"
              />
              {room.discountPercentage && (
                <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                  {room.discountPercentage}% OFF
                </Badge>
              )}
            </div>
            
            {/* Image Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-16 h-16 rounded overflow-hidden ${
                      selectedImage === index ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${room.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Room Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Price and Booking */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      {room.basePrice && room.basePrice > room.price && (
                        <p className="text-sm text-gray-500 line-through">₹{room.basePrice.toLocaleString()}</p>
                      )}
                      <p className="text-3xl font-bold text-green-600">₹{room.price.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">per night</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-2">
                        <Star size={16} className="text-yellow-400 fill-current" />
                        <span className="font-semibold">{room.ratingAverage.toFixed(1)}</span>
                        <span className="text-gray-500">({room.ratingCount})</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {room.stock} rooms available
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button className="flex-1" size="lg">
                      Book Now
                    </Button>
                    <Button variant="outline" className="flex-1" size="lg">
                      Add to Wishlist
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Room Features */}
              <Card>
                <CardHeader>
                  <CardTitle>Room Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {room.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check size={16} className="text-green-500" />
                        <span className="text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Room Specifications */}
              <Card>
                <CardHeader>
                  <CardTitle>Room Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {room.roomDetails.map((detail, index) => (
                      <div key={index} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">{detail.name}:</span>
                        <span className="font-medium">{detail.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* All Attributes */}
              <Card>
                <CardHeader>
                  <CardTitle>Additional Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {room.attributes.map((attr, index) => (
                      <div key={index} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">{attr.name}:</span>
                        <span className="font-medium">{attr.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Hotel Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Hotel Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-500" />
                    <span className="text-sm">Location details</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-gray-500" />
                    <span className="text-sm">Guest capacity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bed size={16} className="text-gray-500" />
                    <span className="text-sm">Bed configuration</span>
                  </div>
                </CardContent>
              </Card>

              {/* Policies */}
              <Card>
                <CardHeader>
                  <CardTitle>Policies</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-sm">Cancellation</h4>
                    <p className="text-xs text-gray-600">Free cancellation until 24 hours before check-in</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Check-in</h4>
                    <p className="text-xs text-gray-600">2:00 PM - 11:00 PM</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Check-out</h4>
                    <p className="text-xs text-gray-600">Until 11:00 AM</p>
                  </div>
                </CardContent>
              </Card>

              {/* Contact */}
              <Card>
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Contact Hotel
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 