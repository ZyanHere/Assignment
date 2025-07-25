// app/(pages)/home/event/page.jsx
"use client";
import Header from "@/components/home/Header";
import UpcomingEvents from "@/components/home/foursec/event/UpcomingEvents";
import FeaturedEvents from "@/components/home/foursec/event/FeaturedEvents";
import RecommendedEvents from "@/components/home/foursec/event/RecommendedEvents";
import { useEventsSWR } from "@/lib/hooks/useEventsSWR";
import Link from "next/link";

export default function EventPage() {
  const { data, isLoading, isError, error } = useEventsSWR({ eventsOnly: true, productsLimit: 60 });

  return (
    <div className="flex-1">
      <Header />
      <div className="p-6 w-full max-w-[1700px] mx-auto">
        <nav className="text-2xl mb-4">
          <Link href="/" className="text-black">Home</Link> &gt;{" "}
          <span className="font-semibold text-yellow-500">Events</span>
        </nav>

        {isLoading && <p>Loading events...</p>}
        {isError && <p className="text-red-500">{error.message}</p>}

        {!isLoading && data && (
          <div className="space-y-12 pl-12 pr-12 mt-8">
            <UpcomingEvents events={data.upcomingEvents} />
            <FeaturedEvents events={data.featuredEvents} />
            <RecommendedEvents events={data.recommendedEvents} />
          </div>
        )}
      </div>
    </div>
  );
}
