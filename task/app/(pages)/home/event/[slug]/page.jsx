"use client";
import Sidebar from "@/app/extra/home/sidebar";
import Header from "@/components/home/Header";
import { eventData } from "@/data/eventData";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const generateSlug = (title) => title.toLowerCase().replace(/\s+/g, "-");

const EventSectionPage = () => {
  const params = useParams();
  const slug = params?.slug;
  const [favorites, setFavorites] = useState([]);

  const sectionMap = {
    "upcoming-events": eventData.UpcomingEvents,
    "featured-events": eventData.FeaturedEvents,
    "recommended-events": eventData.RecommendedEvents,
  };

  const events = sectionMap[slug] || [];

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex-1">
      <Header />
      <div className="p-6 w-full max-w-[1700px] mx-auto">
        <nav className="text-2xl mb-6">
          <Link href="/" className="text-gray-500">
            Home
          </Link>{" "}
          &gt;
          <Link href="/home/event" className="text-gray-500">
            {" "}
            Events{" "}
          </Link>{" "}
          &gt;
          <span className="text-yellow-500 font-semibold capitalize">
            {slug ? slug.replace(/-/g, " ") : "Loading..."}
          </span>
        </nav>

        {events.length > 0 ? (
          <div className="grid grid-cols-2 gap-6">
            {events.map((event) => {
              const eventSlug = generateSlug(event.title);
              return (
                <Link
                  key={event.id}
                  href={`/home/event/${slug}/${eventSlug}`}
                  className="relative block h-full"
                >
                  <div className="relative shadow-md rounded-lg overflow-hidden flex p-4">
                    <Image
                      src={event.image}
                      alt={event.title}
                      width={160}
                      height={160}
                      className="rounded-lg object-cover"
                    />
                    <div className="ml-6 flex-1">
                      <h3 className="font-semibold text-lg">{event.title}</h3>
                      <p className="text-sm mt-2">{event.date}</p>
                      <p className="text-lg">{event.time}</p>
                      <p className="text-sm flex items-center mt-4">
                        📍 {event.location}
                      </p>
                    </div>
                    <span className="bg-green-100 text-black px-4 py-2 text-sm font-medium rounded-md self-end">
                      {event.price} Rs
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
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            {slug ? "No events found." : "Loading..."}
          </p>
        )}
      </div>
    </div>
  );
};

export default EventSectionPage;
