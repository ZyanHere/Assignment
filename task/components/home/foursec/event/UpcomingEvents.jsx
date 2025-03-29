"use client";
import { eventData } from "@/data/eventData";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const generateSlug = (title) => title.toLowerCase().replace(/\s+/g, "-");

const UpcomingEvents = () => {
  const [favorites, setFavorites] = useState([]);
  const toggleFavorite = (eventId) => {
    setFavorites((prev) =>
      prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]
    );
  };

  const events = eventData.UpcomingEvents.slice(0, 3);

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Upcoming Events</h2>
        <Link href="/home/event/upcoming-events" className="text-blue-600 font-medium">
          See All
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {events.map((event) => {
          const eventSlug = generateSlug(event.title);
          return (
            <Link 
              key={event.id} 
              href={`/home/event/upcoming-events/${eventSlug}`}
              className="relative block"
            >
              <div className="flex items-center border p-4 rounded-lg shadow-md">
                <Image 
                  src={event.image} 
                  alt={event.title} 
                  width={100} 
                  height={100} 
                  className="rounded-md" 
                />
                <div className="ml-4 flex-1">
                  <h3 className="font-semibold">{event.title} - {event.date}</h3>
                  <p className="text-lg">{event.time}</p>
                  <p className="text-sm flex items-center">📍 {event.location}</p>
                </div>
                <span className="bg-green-100 px-3 py-1 rounded-md">{event.price} Rs</span>
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

export default UpcomingEvents;