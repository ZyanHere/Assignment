import Image from "next/image";
import { hotelsData } from "@/data/hotelsData";
import Link from "next/link";

export default function RecommendedHotels() {
  return (
    <div className="mb-6 p-4 sm:p-6">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h2 className="text-xl font-semibold">Recommended for You</h2>
        <Link
          href="/home/hotel/recommended"
          className="text-blue-500 text-lg font-semibold"
        >
          See All
        </Link>
      </div>

      <div className="space-y-6 mt-4">
        {hotelsData.recommended.map((hotel) => (
          <Link key={hotel.id} href={`/home/hotel/rooms/${hotel.slug}`}>
            <div className="flex flex-col sm:flex-row items-center sm:items-start border-b pb-6 px-4 sm:px-6 gap-4 sm:gap-6">
              
           
              <div className="w-full sm:w-[175px] h-[175px] relative flex-shrink-0">
                <Image
                  src={hotel.image}
                  alt={hotel.name}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-semibold text-xl sm:text-2xl">{hotel.name}</h3>
                <p className="text-gray-500 text-base sm:text-lg flex justify-center sm:justify-start items-center">
                  📍 {hotel.location}
                </p>
                <p className="text-blue-500 font-semibold text-base sm:text-lg">
                  {hotel.price} Rs /night
                </p>
              </div>

         
              <div className="text-yellow-400 text-xl sm:text-2xl flex items-center justify-center sm:justify-end w-full sm:w-auto mt-2 sm:mt-0">
                ⭐ <span className="ml-1 text-black">{hotel.rating}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
