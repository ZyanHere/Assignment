// components/home/foursec/RecommandedHotel.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

export default function RecommendedHotels({ hotels = [] }) {
  return (
    <div className="mb-6">
      <div className="flex justify-end items-center">
        {/* <h2 className="text-xl font-semibold">Recommended for You</h2> */}
        <Link
          href="/home/hotel/recommended"
          className="text-blue-500 text-lg font-semibold"
        >
          See All
        </Link>
      </div>

      <div className="space-y-8">
        {hotels.map((hotel) => {
          const v = hotel?.variants?.[0];
          const img =
            v?.images?.[0]?.url ||
            hotel?.img ||
            "/hotels/placeholder.png";
          const title = v?.variant_name || hotel?.name || "Untitled";
          const location = v?.location || hotel?.location || "N/A";
          const price =
            v?.price?.base_price ??
            v?.price?.sale_price ??
            hotel?.price ??
            0;
          const ratingCount = hotel?.rating?.count ?? 0;
          const slug = hotel?.slug || hotel?.id;

          return (
            <Link key={slug} href={`/home/hotel/rooms/${slug}`}>
              <div className="flex items-start border-b pb-3 p-4 md:p-10 sm:flex-row flex-col sm:items-start hover:bg-gray-50">
                <Image
                  src={img}
                  alt={title}
                  width={175}
                  height={175}
                  className="rounded-lg object-contain"
                />

                <div className="flex flex-col w-full md:ml-5 md:justify-between md:flex-row md:items-center">
                  <div className="md:ml-5 md:flex-1 space-y-6">
                    <h3 className="font-semibold text-2xl">{title}</h3>
                    <p className="text-gray-500 text-lg flex items-center">
                      📍 {location}
                    </p>
                    <p className="text-lg font-semibold">
                      <span className="text-blue-500">{price} Rs </span>
                      <span className="text-black">/night</span>
                    </p>
                  </div>

                  <div className="sm:flex items-center text-yellow-400 text-2xl md:ml-5">
                    <Star size={25} color="#facc15" fill="#facc15" /> <span className="ml-1 text-black">{ratingCount}</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
