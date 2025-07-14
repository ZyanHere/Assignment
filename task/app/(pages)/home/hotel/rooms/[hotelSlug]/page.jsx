"use client";
import Sidebar from "@/app/extra/home/sidebar";
import RoomList from "@/components/home/foursec/RoomList";
import Header from "@/components/home/Header";
import { hotelsData } from "@/data/hotelsData";
import Link from "next/link";
import { useParams } from "next/navigation";

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

      <div className="p-6 w-full max-w-[1700px] mx-auto">
        {/* Breadcrumb */}
        <nav className="text-2xl mb-8">
          <Link href="/" className="text-black">
            Home
          </Link>{" "}
          &gt;{" "}
          <Link href="/home/hotel" className="text-black">
            Hotels
          </Link>{" "}
          &gt;{" "}
          <span className="font-semibold text-yellow-500">{hotel.name}</span>
        </nav>

        <div>
          <h1 className="text-3xl font-bold">{hotel.name}</h1>
          <p className="text-gray-600 text-lg">📍 {hotel.location}</p>
        </div>

        <RoomList hotelSlug={hotelSlug} rooms={hotel.rooms} />
      </div>
    </div>
  );
};

export default HotelRoomPage;
