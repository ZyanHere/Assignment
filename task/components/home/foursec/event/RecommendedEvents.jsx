"use client";
import { eventData } from "@/data/eventData";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const generateSlug = (title) => title.toLowerCase().replace(/\s+/g, "-");

const RecommendedEvents = () => {
  const [favorites, setFavorites] = useState([]);
  const toggleFavorite = (eventId) => {
    setFavorites((prev) =>
      prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]
    );
  };

  const events = eventData.RecommendedEvents.slice(0, 3);

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Recommended Events</h2>
        <Link href="/home/event/recommended-events" className="text-blue-600 font-medium">
          See All
        </Link>
      </div>

      <div className="flex flex-col gap-6 mt-4">
        {events.map((event) => {
          const eventSlug = generateSlug(event.title);
          return (
            <Link
              key={event.id}
              href={`/home/event/recommended-events/${eventSlug}`}
              className="relative block"
            >
              <div className="relative bg-white shadow-md rounded-lg overflow-hidden flex flex-col sm:flex-row p-4 gap-4">
                <div className="w-full sm:w-[160px] h-[200px] sm:h-[160px] flex-shrink-0">
                  <Image
                    src={event.image}
                    alt={event.title}
                    width={160}
                    height={160}
                    className="rounded-lg object-cover w-full h-full"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{event.title}</h3>
                    <p className="text-sm mt-1">{event.date}</p>
                    <p className="text-lg">{event.time}</p>
                    <p className="text-sm flex items-center mt-2">📍 {event.location}</p>
                  </div>

                  <span className="mt-3 inline-block bg-green-100 text-black px-4 py-2 text-sm font-medium rounded-md w-max">
                    {event.price} Rs
                  </span>
                </div>
              </div>

              <button
                className="absolute top-2 right-2"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleFavorite(event.id);
                }}
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
          );
        })}
      </div>
    </section>
  );
};

export default RecommendedEvents;
