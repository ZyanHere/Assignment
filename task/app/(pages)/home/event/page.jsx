"use client";

import Sidebar from "@/app/extra/home/sidebar";
import Header from "@/components/home/Header";
import FeaturedEvents from "@/components/home/foursec/event/FeaturedEvents";
import RecommendedEvents from "@/components/home/foursec/event/RecommendedEvents";
import UpcomingEvents from "@/components/home/foursec/event/UpcomingEvents";
import { useEvents } from "@/lib/hooks/useEvents";
import { useEffect } from "react";
import Link from "next/link";

const EventPage = () => {
  const {
    fetchEventsData,
    needsDataFetch,
    getCacheStatus,
    upcomingEvents,
    featuredEvents,
    recommendedEvents,
    eventsLoading,
    eventsError,
  } = useEvents();

  // console.log('Upcoming events', upcomingEvents); // no data since the response doesnt have a timing field 
  // console.log('Featured Events', featuredEvents); // no data since the response doesnt have a is_featured field
  // console.log('Recommended Events', recommendedEvents); // only this has data for now

  // Fetch events data only when needed (no data or cache expired)
  useEffect(() => {
    const cacheStatus = getCacheStatus();

    if (needsDataFetch()) {
      console.log("EventPage: Data fetch needed, calling events API");
      console.log("Cache status:", cacheStatus.message);
      fetchEventsData();
    } else {
      console.log("EventPage: Using cached data, skipping API call");
      console.log("Cache status:", cacheStatus.message);
    }
  }, [fetchEventsData, needsDataFetch, getCacheStatus]);

  return (
    <div className="flex-1">
      <Header />
      <div className="p-6 w-full max-w-[1700px] mx-auto">
        {/* Breadcrumb */}
        <nav className="text-2xl mb-4">
          <Link href="/" className="text-black">
            Home
          </Link>{" "}
          &gt; <span className="font-semibold text-yellow-500">Events</span>
        </nav>

        {eventsLoading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
            <span className="ml-2">Loading events...</span>
          </div>
        )}

        {eventsError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>Error:</strong> {eventsError}
          </div>
        )}

        {!eventsLoading && !eventsError && (
          <div className="p-6">
            {/* using recommended events becoz the only that data is available right now */}
            <UpcomingEvents events={recommendedEvents} />
            <FeaturedEvents events={recommendedEvents} />
            <RecommendedEvents events={recommendedEvents} />
          </div>
        )}
      </div>
    </div>
  );
};

export default EventPage;
