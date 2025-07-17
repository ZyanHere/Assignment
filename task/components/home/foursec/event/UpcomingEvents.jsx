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

const UpcomingEvents = ({ events }) => {
  const [favorites, setFavorites] = useState([]);
  const toggleFavorite = (eventId) => {
    setFavorites((prev) =>
      prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]
    );
  };

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Upcoming Events</h2>
        <Link href="/home/event/upcoming-events" className="text-blue-600 font-medium">
          See All
        </Link>
      </div>
      <Carousel className="mt-4">
        <CarouselContent>
          {events.map(
            (event) =>
              event.variants && (
                <CarouselItem key={event.variants[0]._id} className="basis-1/3">
                  <Link
                    href={`/home/event/upcoming-events/${event.variants[0].variant_name}`}
                    className="relative block"
                  >
                    <div className="flex items-center border p-4 rounded-lg shadow-md bg-white">
                      <Image
                        src={event.variants[0].images[0].url}
                        alt={event.variants[0].variant_name}
                        width={100}
                        height={100}
                        className="rounded-md"
                      />
                      <div className="ml-4 flex-1">
                        <h3 className="font-semibold">
                          {event.variants[0].variant_name} - {event.date ?? "Date N/A"}
                        </h3>
                        <p className="text-lg">{event.time ?? "N/A"}</p>
                        <p className="text-sm flex items-center">
                          📍 {event.location ?? "N/A"}
                        </p>
                      </div>
                      <span className="bg-green-100 px-3 py-1 rounded-md">
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
              )
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default UpcomingEvents;