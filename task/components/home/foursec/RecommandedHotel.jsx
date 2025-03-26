import Image from "next/image";
import { hotelsData } from "@/data/hotelsData";
import Link from "next/link";

export default function RecommendedHotels() {
  return (
    <div className="mb-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Recommended for You</h2>
        <Link
          href="/hotels/recommended"
          className="text-blue-500 text-lg font-semibold"
        >
          See All
        </Link>
      </div>

      <div className=" space-y-8">
        {hotelsData.recommended.map((hotel) => (
          <div key={hotel.id} className="flex items-center border-b pb-3 p-10">
            <Image
              src={hotel.image}
              alt={hotel.name}
              width={175}
              height={175}
              className="rounded-lg"
            />

            <div className="ml-5 flex-1">
              <h3 className="font-semibold text-2xl">{hotel.name}</h3>
              <p className="text-gray-500 text-lg flex items-center">
                📍 {hotel.location}
              </p>
              <p className="text-blue-500 font-semibold">
                {hotel.price} Rs /night
              </p>
            </div>

            <div className="flex items-center text-yellow-400 text-2xl">
              ⭐ <span className="ml-1 text-black">{hotel.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
