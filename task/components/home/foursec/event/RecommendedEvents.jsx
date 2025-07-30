"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const RecommendedEvents = ({ events = [] }) => {
  const [favorites, setFavorites] = useState([]);
  if (!Array.isArray(events)) events = [];

  const toggleFavorite = (eventId) => {
    setFavorites((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  };

  const safeEvents = events.filter(Boolean);

  return (
    <section className="mb-10">
      <div className="flex justify-between gap-4 items-start sm:items-center">
        <h2 className="text-xl font-bold leading-tight sm:leading-normal">
          Recommended <br className="sm:hidden" /> Events
        </h2>
        <Link
          href="/home/event/section/upcoming-events"
          className="text-blue-600 font-medium hover:underline whitespace-nowrap"
        >
          See All
        </Link>
      </div>

      {safeEvents.length === 0 ? (
        <p className="text-gray-500 mt-4">No upcoming events.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-4">
          {safeEvents.map((event) => {
            const variant = event.variants?.[0];
            const variantImage =
              variant?.images?.find((img) => img.is_primary)?.url ||
              variant?.images?.[0]?.url;
            const displayImage = variantImage || event.poster || "/placeholder.jpg";
            const displayTitle = variant?.name || event.title || "Untitled";
            const price =
              variant?.price?.sale ??
              variant?.price?.base ??
              event.price?.sale ??
              event.price?.base ??
              0;

            return (
              <Link
                key={event.id}
                href={`/home/event/${event.id}`}
                className="relative block bg-white rounded-lg shadow hover:shadow-lg overflow-hidden transition"
              >
                
                <div className="relative w-full h-40 sm:h-48 bg-gray-50">
                  <Image
                    src={displayImage}
                    alt={displayTitle}
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="p-3">
                  <h3 className="font-semibold text-sm line-clamp-2 min-h-[40px]">
                    {displayTitle}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">
                    {event.date || "Date TBA"} • {event.time || "Time TBA"}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    📍 {event.location || "Location TBA"}
                  </p>
                  <p className="text-yellow-500 font-bold mt-2">₹{price}</p>
                </div>

                <button
                  className="absolute top-2 right-2"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFavorite(event.id);
                  }}
                  aria-label="Toggle favorite"
                >
                  <Image
                    src={
                      favorites.includes(event.id)
                        ? "/home/shops/Heart-red.svg"
                        : "/home/shops/Heart.svg"
                    }
                    alt="Favorite"
                    width={22}
                    height={22}
                  />
                </button>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default RecommendedEvents;