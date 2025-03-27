"use client";
import { useParams } from "next/navigation";
import { hotelsData } from "@/data/hotelsData";
import Header from "@/components/home/Header";
import Sidebar from "@/components/home/sidebar";
import Link from "next/link";
import Image from "next/image";

const HotelRoomPage = () => {
  const params = useParams();
  const { hotelSlug } = params;

  // Find the hotel based on the slug
  const hotel = hotelsData.mostPopular.find((h) => h.slug === hotelSlug) || 
                hotelsData.recommended.find((h) => h.slug === hotelSlug) ||
                hotelsData.mostPopular2.find((h) => h.slug === hotelSlug) || 
                hotelsData.recommended2.find((h) => h.slug === hotelSlug);

  if (!hotel) {
    return (
      <div className="text-center text-red-500 text-xl p-6">Page Not Found</div>
    );
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1">
        {/* Header */}
        <Header />

        <div className="p-6">
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

       
          {/* Hotel Information */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold">{hotel.name}</h1>
            <p className="text-gray-600 text-lg">📍 {hotel.location}</p>
            <p className="text-blue-500 font-semibold text-xl mt-2">
              {hotel.price} Rs /night
            </p>
          </div>

          {/* Room Listings */}
          <div className="grid grid-cols-4 gap-6">
            {hotel.rooms.map((room, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-4">
                <div className="relative w-full h-48 rounded-lg overflow-hidden">
                  <Image
                    src={room.image}
                    alt={room.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>

                <div className="mt-4">
                  <h3 className="text-xl font-semibold">{room.name}</h3>
                  <p className="text-gray-600">{room.description}</p>
                  <p className="text-blue-500 font-semibold mt-2">
                    {room.price} Rs /night
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelRoomPage;
