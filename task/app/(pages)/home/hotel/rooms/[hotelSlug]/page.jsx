"use client";
import { useParams } from "next/navigation";
import { hotelsData } from "@/data/hotelsData";
import Header from "@/components/home/Header";
import Sidebar from "@/components/home/sidebar";
import Link from "next/link";
import RoomList from "@/components/home/foursec/RoomList";

const HotelRoomPage = () => {
  const params = useParams();
  const { hotelSlug } = params;

  const hotel =
    hotelsData.mostPopular.find((h) => h.slug === hotelSlug) ||
    hotelsData.recommended.find((h) => h.slug === hotelSlug) ||
    hotelsData.mostPopular2.find((h) => h.slug === hotelSlug) ||
    hotelsData.recommended2.find((h) => h.slug === hotelSlug);

  if (!hotel) {
    return (
      <div className="text-center text-red-500 text-xl p-6">Page Not Found</div>
    );
  }

  return (
    <div className="flex-1">
      <Header />

      <div className="px-4 sm:px-6 py-6 w-full max-w-[1700px] mx-auto">
        {/* Breadcrumb */}
        <nav className="text-lg sm:text-2xl mb-6">
          <Link href="/" className="text-black hover:underline">Home</Link> &gt;{" "}
          <Link href="/home/hotel" className="text-black hover:underline">Hotels</Link> &gt;{" "}
          <span className="font-semibold text-yellow-500">{hotel.name}</span>
        </nav>

        {/* Hotel Info */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">{hotel.name}</h1>
          <p className="text-gray-600 text-base sm:text-lg">📍 {hotel.location}</p>
        </div>

        {/* Room Cards */}
        <RoomList hotelSlug={hotelSlug} rooms={hotel.rooms} />
      </div>
    </div>
  );
};

export default HotelRoomPage;
