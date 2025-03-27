"use client";
import { useParams } from "next/navigation";
import { hotelsData } from "@/data/hotelsData";
import Link from "next/link";
import Image from "next/image";

const RoomDetailsPage = () => {
  const params = useParams();
  console.log("Params:", params); 
  const { hotelSlug, roomSlug } = params;

  // Find the hotel in any of the arrays
  const hotel =
    hotelsData.mostPopular.find((h) => h.slug === hotelSlug) ||
    hotelsData.recommended.find((h) => h.slug === hotelSlug) ||
    hotelsData.mostPopular2.find((h) => h.slug === hotelSlug) ||
    hotelsData.recommended2.find((h) => h.slug === hotelSlug);

  if (!hotel) {
    return (
      <div className="text-center text-red-500 text-xl p-6">Hotel not found</div>
    );
  }

  // Assume roomSlug is generated from the room name: room.name.toLowerCase().replace(/\s+/g, "-")
  const room = hotel.rooms.find(
    (r) => r.name.toLowerCase().replace(/\s+/g, "-") === roomSlug
  );

  if (!room) {
    return (
      <div className="text-center text-red-500 text-xl p-6">Room not found</div>
    );
  }

  // Extract facilities data from the first facilities object
  const facilitiesData = room.facilities[0];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-black">Home</Link> &gt;{" "}
        <Link href="/home/hotel" className="hover:text-black">Hotels</Link> &gt;{" "}
        <Link href={`/home/hotel/rooms/${hotelSlug}`} className="hover:text-black">
          {hotel.name}
        </Link> &gt;{" "}
        <span className="font-semibold text-yellow-500">{room.name}</span>
      </nav>

      {/* Banner - using the banner from facilities data */}
      <div className="w-full h-64 relative mb-6">
        <Image
          src={facilitiesData.banner}
          alt="Room Banner"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      {/* Room Info */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold">{hotel.name}</h1>
          <p className="text-gray-600">{hotel.location}</p>
        </div>
        <div className="flex items-center">
          {/* Import an icon from public/hotels (e.g., a star icon) */}
          <Image src="/hotels/star.png" alt="Rating" width={24} height={24} />
          <span className="ml-1 text-xl font-semibold">{room.rating}</span>
        </div>
      </div>

      {/* Merged Description & Reviews Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Description & Reviews</h2>
        <p className="text-gray-600 mb-4">{facilitiesData.description}</p>
        <div className="space-y-4">
          {facilitiesData.reviews.map((review) => (
            <div key={review.id} className="border p-4 rounded-md shadow-sm">
              <div className="flex items-center space-x-2">
                <Image src="/hotels/star.png" alt="Star" width={20} height={20} />
                <span className="font-semibold">{review.reviewer}</span>
                <span className="ml-2 text-sm text-gray-500">{review.rating} / 5</span>
              </div>
              <p className="text-gray-700 mt-2">{review.review}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Section */}
      <div className="mb-6 p-4 bg-gray-100 rounded-md flex justify-between items-center">
        <div>
          <span className="text-gray-500">Price</span>
          <p className="text-xl font-semibold">{room.price} Rs/night</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-md shadow">
          Booking Now
        </button>
      </div>

      
    </div>
  );
};

export default RoomDetailsPage;
