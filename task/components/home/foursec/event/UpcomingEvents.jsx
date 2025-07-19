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
 * @param {Array} events - Normalized events from useEventsSWR (id, title, poster, price, variants, date, time, location)
 */
const UpcomingEvents = ({ events = [] }) => {
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
        <h2 className="text-xl font-bold">Upcoming Events</h2>
        <Link
          href="/home/event/section/upcoming-events"
          className="text-blue-600 font-medium hover:underline"
        >
          See All
        </Link>
      </div>

      {safeEvents.length === 0 ? (
        <p className="text-gray-500 mt-4">No upcoming events.</p>
      ) : (
        <Carousel className="mt-4">
          <CarouselContent>
            {safeEvents.map((event) => {
              const variant = event.variants?.[0];
              const variantImage =
                variant?.images?.find((img) => img.is_primary)?.url ||
                variant?.images?.[0]?.url;
              const displayImage =
                variantImage || event.poster || "/placeholder.jpg";
              const displayTitle = variant?.name || event.title || "Untitled";
              const price =
                variant?.price?.sale ??
                variant?.price?.base ??
                event.price?.sale ??
                event.price?.base ??
                0;

              return (
                <CarouselItem
                  key={event.id}
                  className="basis-1/3 md:basis-1/4 lg:basis-1/5 min-w-[240px]"
                >
                  <Link
                    href={`/home/event/${event.id}`}
                    className="relative block group"
                  >
                    <div className="flex items-center border p-4 rounded-lg shadow-md bg-white transition hover:shadow-lg">
                      <div className="relative w-[100px] h-[100px] flex-shrink-0 bg-gray-50 rounded-md overflow-hidden">
                        <Image
                          src={displayImage}
                          alt={displayTitle}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="font-semibold text-sm sm:text-base line-clamp-2">
                          {displayTitle}{" "}
                          {event.date && (
                            <span className="text-gray-500 font-normal">
                              – {event.date}
                            </span>
                          )}
                        </h3>
                        <p className="text-xs sm:text-sm mt-1">
                          {event.time || "Time TBA"}
                        </p>
                        <p className="text-xs flex items-center mt-2 text-gray-600">
                          📍 {event.location || "Location TBA"}
                        </p>
                      </div>
                      <span className="ml-2 bg-green-100 text-black px-3 py-1 rounded-md text-xs sm:text-sm font-medium whitespace-nowrap">
                        ₹{price}
                      </span>
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

export default UpcomingEvents;
