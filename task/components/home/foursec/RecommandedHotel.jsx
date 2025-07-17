import Image from "next/image";
import { hotelsData } from "@/data/hotelsData";
import Link from "next/link";

export default function RecommendedHotels({ hotels }) {
  return (
    <div className="mb-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Recommended for You</h2>
        <Link
          href="/home/hotel/recommended"
          className="text-blue-500 text-lg font-semibold"
        >
          See All
        </Link>
      </div>

      <div className="space-y-8">
        {hotels.map((hotel) => (
          hotel.variants.length &&
          <Link key={hotel.id} href={`/home/hotel/rooms/${hotel.slug}`}>
            <div className="flex items-start border-b pb-3 p-4 md:p-10 sm:flex-row flex-col sm:items-start">
              <Image
                src={hotel.variants[0].images[0].url}
                alt={hotel.variants[0].variant_name}
                width={175}
                height={175}
                className="rounded-lg border border-gray-200"
              />

              <div className="flex flex-col  w-full md:ml-5 md:justify-between md:flex-row md:items-center">
                <div className="md:ml-5 md:flex-1">
                  <h3 className="font-semibold text-2xl">{hotel.variants[0].variant_name}</h3>
                  <p className="text-gray-500 text-lg flex items-center">
                    📍 {hotel.variants[0].location ? hotel.variants[0].location : "N/A"}
                  </p>
                  <p className="text-blue-500 font-semibold">
                    {hotel.variants[0].price.base_price} Rs /night
                  </p>
                </div>

                <div className="sm:flex items-center text-yellow-400 text-2xl md:ml-5">
                  ⭐ <span className="ml-1 text-black ">{hotel.rating.count}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
