import Link from "next/link";
import Header from "@/components/home/Header";
import Sidebar from "@/components/home/sidebar";
import HotelCard from "@/components/home/foursec/HotelCard";

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

          {/* Most Popular Section */}
          <div className="mb-6 p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Most Popular</h2>
              <Link href="/hotels/popular" className="text-blue-500 text-lg font-semibold">
                See All
              </Link>
            </div>
            <HotelCard/>
          </div>
        </div>
      </div>
    </div>
  );
}
