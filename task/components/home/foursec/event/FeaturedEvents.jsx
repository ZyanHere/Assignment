"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

/**
 * @param {Array} events - Normalized events from adapter (id, title, poster, price, variants, date, time, location)
 */
const FeaturedEvents = ({ events = [] }) => {
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
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Featured Events</h2>
        <Link
          href="/home/event/section/featured-events"
            className="text-blue-600 font-medium hover:underline"
        >
          See All
        </Link>
      </div>

      {safeEvents.length === 0 ? (
        <p className="text-gray-500 mt-4">No featured events available.</p>
      ) : (
        <Carousel className="mt-4">
          <CarouselContent>
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
                <CarouselItem key={event.id} className="basis-1/4 min-w-[220px]">
                  <Link
                    href={`/home/event/${event.id}`}
                    className="relative block group"
                  >
                    <div className="relative bg-white shadow-md rounded-lg overflow-hidden transition hover:shadow-lg">
                      <div className="relative w-full h-[200px] bg-gray-50">
                        <Image
                          src={displayImage}
                          alt={displayTitle}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="font-semibold line-clamp-2 min-h-[44px]">
                          {displayTitle}
                        </h3>
                        <p className="text-sm mt-2">
                          {event.date || "Date TBA"}
                        </p>
                        <p className="text-sm">{event.time || "Time TBA"}</p>
                        <div className="mt-3 flex justify-between items-center">
                          <p className="text-xs sm:text-sm text-gray-600 truncate max-w-[60%]">
                            📍 {event.location || "Location TBA"}
                          </p>
                          <span className="bg-yellow-400 text-black px-3 py-1 rounded-md text-sm font-semibold">
                            ₹{price}
                          </span>
                        </div>
                      </div>
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
                        width={24}
                        height={24}
                      />
                    </button>
                  </Link>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </section>
  );
};

export default FeaturedEvents;
