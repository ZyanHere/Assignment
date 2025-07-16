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
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
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

   
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-6">
        {events.map((event) => {
          const eventSlug = generateSlug(event.title);
          return (
            <Link
              key={event.id}
              href={`/home/event/upcoming-events/${eventSlug}`}
              className="relative block w-full sm:w-[48%] lg:w-[32%]"
            >
              <div className="flex flex-col sm:flex-row border p-3 sm:p-4 rounded-lg shadow-md bg-white h-full">
                {/* Image */}
                <div className="w-full sm:w-[90px] h-[140px] sm:h-[90px] flex-shrink-0">
                  <Image
                    src={event.image}
                    alt={event.title}
                    width={90}
                    height={90}
                    className="rounded-md object-cover w-full h-full"
                  />
                </div>

      
                <div className="mt-3 sm:mt-0 sm:ml-4 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-semibold text-sm">{event.title} - {event.date}</h3>
                    <p className="text-xs mt-1">{event.time}</p>
                    <p className="text-xs flex items-center mt-1">📍 {event.location}</p>
                  </div>
                  <span className="mt-3 inline-block bg-green-100 px-3 py-1 rounded-md text-xs w-fit">
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

export default UpcomingEvents;
