"use client";
import Sidebar from "@/app/extra/home/sidebar";
import Header from "@/components/home/Header";
import { hotelsData } from "@/data/hotelsData";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const RoomDetailsPage = () => {
  const params = useParams();
  const { hotelSlug, roomSlug } = params;

  // Find the hotel in our data arrays
  const hotel =
    hotelsData.mostPopular.find((h) => h.slug === hotelSlug) ||
    hotelsData.recommended.find((h) => h.slug === hotelSlug) ||
    hotelsData.mostPopular2.find((h) => h.slug === hotelSlug) ||
    hotelsData.recommended2.find((h) => h.slug === hotelSlug);

  if (!hotel) {
    return (
      <div className="text-center text-red-500 text-xl p-6">
        Hotel not found
      </div>
    );
  }

  // Generate room slug from room name for matching
  const generateSlug = (name) => name.toLowerCase().replace(/\s+/g, "-");
  const room = hotel.rooms.find((r) => generateSlug(r.name) === roomSlug);

  if (!room) {
    return (
      <div className="text-center text-red-500 text-xl p-6">Room not found</div>
    );
  }

  // Use the first facilities object for banner, description and reviews
  const facilitiesData = room.facilities[0] || {};

  return (
    <div className="flex-1">
      <Header />
      <div className="relative p-6 w-full max-w-[1700px] mx-auto">
        {/* Breadcrumb */}
        <nav className="text-2xl mb-6">
          <Link href="/" className="hover:text-black">
            Home
          </Link>{" "}
          &gt; <Link href="/home/hotel">Hotels</Link> &gt;{" "}
          <Link
            href={`/home/hotel/rooms/${hotelSlug}`}
            className="hover:text-black"
          >
            {hotel.name}
          </Link>{" "}
          &gt;{" "}
          <span className="font-semibold text-yellow-500">{room.name}</span>
        </nav>
        {/* Banner Section */}
        <div className="w-full h-[450px] relative">
          <Image
            src={facilitiesData.banner}
            alt="Room Banner"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>

        {/* Overlapping Main Content Section */}
        <div className="absolute top-[500px] left-0 w-full px-6 pb-10">
          {/* The content container overlaps the banner by 10% of 450px = 45px */}
          <div className="bg-white rounded-t-4xl shadow-lg p-10">
            {/* Room Info Section */}
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-3xl font-bold">{hotel.name}</h1>
                <p className="text-gray-600">📍 {hotel.location}</p>
              </div>
              <div className="flex items-center">
                ⭐
                <span className="ml-1 text-xl font-semibold">
                  {room.rating}
                </span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Common Facilities</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col items-center">
                  <Image src="/hotels/ac.svg" alt="AC" width={40} height={40} />
                  <p className="text-sm mt-2">AC</p>
                </div>
                <div className="flex flex-col items-center">
                  <Image
                    src="/hotels/rest.svg"
                    alt="Restaurant"
                    width={40}
                    height={40}
                  />
                  <p className="text-sm mt-2">Restaurant</p>
                </div>
                <div className="flex flex-col items-center">
                  <Image
                    src="/hotels/pool.svg"
                    alt="Swimming Pool"
                    width={40}
                    height={40}
                  />
                  <p className="text-sm mt-2">Swimming Pool</p>
                </div>
                <div className="flex flex-col items-center">
                  <Image
                    src="/hotels/Front-Desk.svg"
                    alt="24-Hours Front Desk"
                    width={40}
                    height={40}
                  />
                  <p className="text-sm mt-2">24-Hours Front Desk</p>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Description</h2>
              <p>{facilitiesData.description}</p>
            </div>

            {/* Reviews Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Reviews</h2>
              {facilitiesData.reviews && facilitiesData.reviews.length > 0 ? (
                <div className="space-y-4">
                  {facilitiesData.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border p-4 rounded-md shadow-sm"
                    >
                      <div className="flex justify-between items-center space-x-2">
                        {/* <Image
                            src="/hotels/star.png"
                            alt="Star"
                            width={20}
                            height={20}
                          /> */}
                        <span className="font-semibold">{review.reviewer}</span>
                        <span className="ml-2 text-md">
                          ⭐ {review.rating} / 5
                        </span>
                      </div>
                      <p className="text-gray-700 mt-2">{review.review}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No reviews available.</p>
              )}
            </div>

            {/* Booking Section */}
            <div className="mb-6 p-4  rounded-t-md shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_-2px_4px_-2px_rgba(0,0,0,0.1)] flex justify-between items-center">
              <div>
                <span className="text-gray-500">Price</span>
                <p className="text-xl font-semibold">{room.price} Rs/night</p>
              </div>
              <button className="bg-gradient-to-b from-blue-200 to-white px-6 py-2 rounded-t-md shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_-2px_4px_-2px_rgba(0,0,0,0.1)] cursor-pointer">
                Booking Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsPage;
