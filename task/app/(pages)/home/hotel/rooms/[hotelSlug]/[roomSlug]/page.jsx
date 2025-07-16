"use client";
import { useParams } from "next/navigation";
import { hotelsData } from "@/data/hotelsData";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/home/Header";

const RoomDetailsPage = () => {
  const params = useParams();
  const { hotelSlug, roomSlug } = params;

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

  const generateSlug = (name) => name.toLowerCase().replace(/\s+/g, "-");
  const room = hotel.rooms.find((r) => generateSlug(r.name) === roomSlug);

  if (!room) {
    return (
      <div className="text-center text-red-500 text-xl p-6">Room not found</div>
    );
  }

  const facilitiesData = room.facilities[0] || {};

  return (
    <div className="flex-1">
      <Header />
      <div className="relative px-4 sm:px-6 md:px-10 py-6 w-full max-w-[1700px] mx-auto">
       
        <nav className="text-lg sm:text-xl mb-6">
          <Link href="/" className="hover:text-black">Home</Link> &gt;{" "}
          <Link href="/home/hotel" className="hover:text-black">Hotels</Link> &gt;{" "}
          <Link href={`/home/hotel/rooms/${hotelSlug}`} className="hover:text-black">{hotel.name}</Link> &gt;{" "}
          <span className="font-semibold text-yellow-500">{room.name}</span>
        </nav>

       
        <div className="w-full h-[250px] sm:h-[350px] md:h-[450px] relative">
          <Image
            src={facilitiesData.banner}
            alt="Room Banner"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>

        <div className="relative -mt-12 sm:-mt-20 z-10 w-full px-2 sm:px-6">
          <div className="bg-white rounded-t-3xl sm:rounded-t-4xl shadow-lg p-4 sm:p-8 md:p-10">
            {/* Room Info */}
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">{hotel.name}</h1>
                <p className="text-gray-600 text-sm sm:text-base">📍 {hotel.location}</p>
              </div>
              <div className="flex items-center text-lg sm:text-xl">
                ⭐ <span className="ml-1 font-semibold">{room.rating}</span>
              </div>
            </div>

          
            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">Common Facilities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: "/hotels/ac.svg", label: "AC" },
                  { icon: "/hotels/rest.svg", label: "Restaurant" },
                  { icon: "/hotels/pool.svg", label: "Swimming Pool" },
                  { icon: "/hotels/Front-Desk.svg", label: "24-Hours Front Desk" },
                ].map((facility) => (
                  <div key={facility.label} className="flex flex-col items-center">
                    <Image src={facility.icon} alt={facility.label} width={40} height={40} />
                    <p className="text-sm mt-2">{facility.label}</p>
                  </div>
                ))}
              </div>
            </div>

         
            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Description</h2>
              <p className="text-sm sm:text-base">{facilitiesData.description}</p>
            </div>

       
            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Reviews</h2>
              {facilitiesData.reviews && facilitiesData.reviews.length > 0 ? (
                <div className="space-y-4">
                  {facilitiesData.reviews.map((review) => (
                    <div key={review.id} className="border p-4 rounded-md shadow-sm">
                      <div className="flex justify-between items-center space-x-2">
                        <span className="font-semibold">{review.reviewer}</span>
                        <span className="text-sm sm:text-base">⭐ {review.rating} / 5</span>
                      </div>
                      <p className="text-gray-700 mt-2 text-sm sm:text-base">{review.review}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No reviews available.</p>
              )}
            </div>

            
            <div className="mb-6 p-4 rounded-t-md shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-gray-500 text-sm">Price</span>
                <p className="text-lg sm:text-xl font-semibold">{room.price} Rs/night</p>
              </div>
              <button className="bg-gradient-to-b from-blue-200 to-white px-6 py-2 rounded-md shadow-md text-sm sm:text-base">
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
