import Link from "next/link";
import Header from "@/components/home/Header";
import Sidebar from "@/components/home/sidebar";
import HotelCard from "@/components/home/foursec/HotelCard";
import RecommendedHotels from "@/components/home/foursec/RecommandedHotel";
import Footer from "@/components/home/footer";

export default function HotelsPage() {
  return (
      <div className="flex-1 ">
        <Header />
        <div className="p-6 w-full max-w-[1700px] mx-auto">
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
        <Footer />
      </div>
  );
}
