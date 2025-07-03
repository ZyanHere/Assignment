"use client";
import { eventData } from "@/data/eventData";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const generateSlug = (title) => title.toLowerCase().replace(/\s+/g, "-");

const FeaturedEvents = () => {
  const [favorites, setFavorites] = useState([]);
  const toggleFavorite = (eventId) => {
    setFavorites((prev) =>
      prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]
    );
  };

  const events = eventData.FeaturedEvents.slice(0, 4);

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Featured Events</h2>
        <Link href="/home/event/featured-events" className="text-blue-600 font-medium">
          See All
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {events.map((event) => {
          const eventSlug = generateSlug(event.title);
          return (
            <Link
              key={event.id}
              href={`/home/event/featured-events/${eventSlug}`}
              className="relative block"
            >
              <div className="relative bg-white shadow-md rounded-lg overflow-hidden">
                <Image 
                  src={event.image} 
                  alt={event.title} 
                  width={500} 
                  height={300} 
                  className="w-full h-[200px] object-cover" 
                />
                <div className="p-3">
                  <h3 className="font-semibold">{event.title}</h3>
                  <p className="text-sm">{event.date}</p>
                  <p className="text-lg">{event.time}</p>
                  <div className="mt-3 flex justify-between items-center">
                    <p className="text-sm text-gray-600">📍 {event.location}</p>
                    <span className="bg-yellow-400 text-black px-3 py-1 rounded-md">
                      {event.price} Rs
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
              >
                <Image
                  src={favorites.includes(event.id) ? "/home/shops/Heart-red.svg" : "/home/shops/Heart.svg"}
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

export default FeaturedEvents;