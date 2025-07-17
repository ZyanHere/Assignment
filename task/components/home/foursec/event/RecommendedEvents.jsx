"use client";
import { eventData } from "@/data/eventData";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const generateSlug = (title) => title.toLowerCase().replace(/\s+/g, "-");

const RecommendedEvents = ({ events }) => {
  const [favorites, setFavorites] = useState([]);
  const toggleFavorite = (eventId) => {
    setFavorites((prev) =>
      prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]
    );
  };

  //const events = eventData.RecommendedEvents.slice(0, 3);

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Recommended Events</h2>
        <Link href="/home/event/recommended-events" className="text-blue-600 font-medium">
          See All
        </Link>
      </div>
      <div className="flex flex-col gap-6 mt-4">
        {events.map((event) => (
          // const eventSlug = generateSlug(event.title);
          event.variants &&
          <Link
            key={event.variants[0]._id}
            href={`/home/event/recommended-events/${event.variants[0].variant_name}`}
            className="relative block"
          >
            <div className="relative bg-white shadow-md rounded-lg overflow-hidden flex p-4">
              <Image
                src={event.variants[0].images[0].url}
                alt={event.variants[0].variant_name}
                width={160}
                height={160}
                className="rounded-lg object-contain"
              />
              <div className="ml-6 flex-1 mt-4">
                <h3 className="font-semibold text-lg">{event.variants[0].variant_name}</h3>
                <p className="text-sm mt-2">{event.date ?? "N/A"}</p>
                <p className="text-lg">{event.time ?? "N/A"}</p>
                <p className="text-sm flex items-center mt-4">
                  📍 {event.location ?? "N/A"}
                </p>
              </div>
              <span className="bg-green-100 text-black px-4 py-2 text-sm font-medium rounded-md self-end">
                {event.variants[0].price.base_price} Rs
              </span>
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
                src={favorites.includes(event.id) ? "/home/shops/Heart-red.svg" : "/home/shops/Heart.svg"}
                alt="Favorite"
                width={24}
                height={24}
              />
            </button>
          </Link>

        ))}
      </div>
    </section>
  );
};

export default RecommendedEvents;