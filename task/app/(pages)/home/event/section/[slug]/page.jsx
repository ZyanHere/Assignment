// app/(pages)/home/event/section/[slug]/page.jsx
"use client";

import Header from "@/components/home/Header";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEventsSWR } from "@/lib/hooks/useEventsSWR";
import { useState } from "react";

export default function EventSectionPage() {
  const { slug } = useParams();
  const { data, isLoading, isError, error } = useEventsSWR({ eventsOnly: true, productsLimit: 120 });

  const [favorites, setFavorites] = useState([]);
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  if (isLoading) return <p className="p-6">Loading events...</p>;
  if (isError || !data)
    return <p className="p-6 text-red-500">{error?.message || "Error loading events."}</p>;

  const sectionMap = {
    "upcoming-events": data.upcomingEvents,
    "featured-events": data.featuredEvents,
    "recommended-events": data.recommendedEvents,
  };

  const events = sectionMap[slug] || [];

  return (
    <div className="flex-1">
      <Header />
      <div className="p-6 w-full max-w-[1700px] mx-auto">
        <nav className="text-2xl mb-6">
          <Link href="/" className="text-gray-500">Home</Link> &gt;
          <Link href="/home/event" className="text-gray-500"> Events</Link> &gt;
          <span className="text-yellow-500 font-semibold">
            {slug.replace(/-/g, " ")}
          </span>
        </nav>

        {events.length > 0 ? (
          <div className="grid grid-cols-2 gap-6">
            {events.map((event) => (
              <Link
                key={event.id}
                href={`/home/event/${event.id}`}
                className="relative block"
              >
                <div className="relative shadow-md rounded-lg overflow-hidden flex p-4 bg-white">
                  <Image
                    src={event.poster || "/placeholder.jpg"}
                    alt={event.title}
                    width={160}
                    height={160}
                    className="rounded-lg object-contain"
                  />
                  <div className="ml-6 flex-1">
                    <h3 className="font-semibold text-lg">{event.title}</h3>
                    <p className="text-sm mt-2">{event.date}</p>
                    <p className="text-sm">{event.time}</p>
                    <p className="text-sm flex items-center mt-4">
                      📍 {event.location || "Location TBA"}
                    </p>
                  </div>
                  <span className="bg-green-100 text-black px-4 py-2 text-sm font-medium rounded-md self-end">
                    ₹{event.price.sale ?? event.price.base}
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
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No events found for this category.
          </p>
        )}
      </div>
    </div>
  );
}
