"use client";

import { useEffect } from "react";
import Sidebar from "@/components/home/sidebar";
import Header from "@/components/home/Header";
import UpcomingEvents from "@/components/home/foursec/event/UpcomingEvents";
import FeaturedEvents from "@/components/home/foursec/event/FeaturedEvents";
import RecommendedEvents from "@/components/home/foursec/event/RecommendedEvents";
import { useEvents } from "@/lib/hooks/useEvents";

const EventPage = () => {
  const { 
    fetchEventsData,
    needsDataFetch,
    getCacheStatus,
    upcomingEvents,
    featuredEvents,
    recommendedEvents,
    eventsLoading,
    eventsError
  } = useEvents();

  // Fetch events data only when needed (no data or cache expired)
  useEffect(() => {
    const cacheStatus = getCacheStatus();
    
    if (needsDataFetch()) {
      console.log('EventPage: Data fetch needed, calling events API');
      console.log('Cache status:', cacheStatus.message);
      fetchEventsData();
    } else {
      console.log('EventPage: Using cached data, skipping API call');
      console.log('Cache status:', cacheStatus.message);
    }
  }, [fetchEventsData, needsDataFetch, getCacheStatus]);

  return (
    <div className="flex-1">
      <Header />
      <div className="p-6 w-full max-w-[1700px] mx-auto">
        <nav className="text-2xl text-gray-600 mb-6">
          Home &gt; <span className="text-yellow-500 font-semibold">Events</span>
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
            <UpcomingEvents events={upcomingEvents} />
            <FeaturedEvents events={featuredEvents} />
            <RecommendedEvents events={recommendedEvents} />
          </div>
        )}
      </div>
    </div>
  );
};

export default EventPage;