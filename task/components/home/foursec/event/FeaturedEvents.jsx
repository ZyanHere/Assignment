"use client";
import { eventData } from "@/data/eventData";
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

const FeaturedEvents = ({ events }) => {
  const [favorites, setFavorites] = useState([]);
  const toggleFavorite = (eventId) => {
    setFavorites((prev) =>
      prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]
    );
  };

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Featured Events</h2>
        <Link href="/home/event/featured-events" className="text-blue-600 font-medium">
          See All
        </Link>
      </div>
      <Carousel className="mt-4">
        <CarouselContent>
          {events.map((event) =>
            event.variants && (
              <CarouselItem key={event.variants[0]._id} className="basis-1/4">
                <Link
                  href={`/home/event/featured-events/${event.variants[0].variant_name}`}
                  className="relative block"
                >
                  <div className="relative bg-white shadow-md rounded-lg overflow-hidden">
                    <Image
                      src={event.variants[0].images[0].url}
                      alt={event.variants[0].variant_name}
                      width={500}
                      height={300}
                      className="w-full h-[200px] object-contain"
                    />
                    <div className="p-3">
                      <h3 className="font-semibold">{event.variants[0].variant_name}</h3>
                      <p className="text-sm">{event.date ?? "N/A"}</p>
                      <p className="text-lg">{event.time ?? "N/A"}</p>
                      <div className="mt-3 flex justify-between items-center">
                        <p className="text-sm text-gray-600">📍 {event.location ?? "N/A"}</p>
                        <span className="bg-yellow-400 text-black px-3 py-1 rounded-md">
                          {event.variants[0].price.base_price} Rs
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

export default FeaturedEvents;