import Sidebar from "@/components/home/sidebar";
import Header from "@/components/home/Header";
import UpcomingEvents from "@/components/home/foursec/event/UpcomingEvents";
import FeaturedEvents from "@/components/home/foursec/event/FeaturedEvents";
import RecommendedEvents from "@/components/home/foursec/event/RecommendedEvents";

const EventPage = () => {
  return (

      <div className="flex-1">
        <Header />
        <div className="p-6 w-full max-w-[1700px] mx-auto">
          <nav className="text-2xl text-gray-600 mb-6">
            Home &gt; <span className="text-yellow-500 font-semibold">Events</span>
          </nav>
          <div className="p-6">
            <UpcomingEvents />
            <FeaturedEvents />
            <RecommendedEvents />
          </div>
        </div>
      </div>
  );
};

export default EventPage;