// app/home/hotel/rooms/[hotelSlug]/page.jsx
"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/home/Header";
import Footer from "@/components/home/footer";
import RoomList from "@/components/home/foursec/RoomList";
import { useHotelsSWR } from "@/lib/hooks/useHotelSWR";

export default function HotelRoomsPage() {
  const { hotelSlug } = useParams();
  const { data, isLoading, isError } = useHotelsSWR({ hotelsOnly: true, productsLimit: 200 });

  // Find the hotel by slug
  const hotel = useMemo(() => {
    if (!data?.allHotels) return null;
    return (
      data.allHotels.find((h) => h.slug === hotelSlug) ||
      data.allHotels.find((h) => String(h.id) === String(hotelSlug)) ||
      null
    );
  }, [data, hotelSlug]);

  // Convert variants into room objects
  const rooms = useMemo(() => {
    if (!hotel?.variants) return [];
    return hotel.variants.map((v) => ({
      id: v.id,
      name: v.variant_name || "Room",
      description:
        v.attributes?.length > 0
          ? v.attributes.map((a) => `${a.name}: ${a.value}`).join(", ")
          : "No extra details",
      price: v.price?.sale_price ?? v.price?.base_price ?? 0,
      basePrice: v.price?.base_price ?? null,
      image: v.images?.[0]?.url || hotel.img || "/hotels/placeholder.png",
      ratingAverage: hotel?.rating?.average ?? 0,
      ratingCount: hotel?.rating?.count ?? 0,
    }));
  }, [hotel]);

  const notFound = !isLoading && !isError && !hotel;

  return (
    <div className="flex-1">
      <Header />
      <div className="pl-14 pr-14 pb-14 w-full max-w-[1700px] mx-auto">
        {/* Breadcrumb */}
        <nav className="text-2xl mb-8 mt-8">
          <Link href="/" className="text-black">Home</Link> &gt;{" "}
          <Link href="/home/hotel" className="text-black">Hotels</Link> &gt;{" "}
          <span className="font-semibold text-yellow-500">{hotel?.name || "Hotel"}</span>
        </nav>

        {isLoading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
            <span className="ml-2">Loading hotel details...</span>
          </div>
        )}

        {isError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>Error:</strong> Failed to load data.
          </div>
        )}

        {notFound && (
          <div className="text-center text-red-500 text-xl p-6">Hotel Not Found</div>
        )}

        {!isLoading && !isError && hotel && (
          <>
            {/* Hotel Info */}
            <div className="mb-4 space-y-4 pl-14 pr-14">
              <h1 className="text-3xl font-bold">{hotel.name}</h1>
              <p className="text-gray-600 text-lg">📍 {hotel.location || "N/A"}</p>
              <p className="text-gray-600 text-lg">
                ⭐ {hotel.rating?.average ?? 0}{" "}
                <span className="text-sm text-gray-500">
                  ({hotel.rating?.count ?? 0} reviews)
                </span>
              </p>
            </div>

            {/* Rooms */}
            <RoomList hotelSlug={hotel.slug} rooms={rooms} />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
