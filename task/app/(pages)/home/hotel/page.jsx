import Link from "next/link";
import Header from "@/components/home/Header";
import Sidebar from "@/components/home/sidebar";
import HotelCard from "@/components/home/foursec/HotelCard";
import RecommendedHotels from "@/components/home/foursec/RecommandedHotel";

export default function HotelsPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6">
          {/* Breadcrumb */}
          <nav className="text-2xl mb-4">
            <Link href="/" className="text-black">
              Home
            </Link>{" "}
            &gt; <span className="font-semibold text-yellow-500">Hotels</span>
          </nav>

          <HotelCard />
          <RecommendedHotels />
        </div>
      </div>
    </div>
  );
}
