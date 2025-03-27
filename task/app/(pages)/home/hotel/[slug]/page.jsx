"use client";
import { useParams } from "next/navigation";
import { hotelsData } from "@/data/hotelsData";
import Header from "@/components/home/Header";
import Sidebar from "@/components/home/sidebar";
import Link from "next/link";
import MoreHotels from "@/components/home/foursec/MoreHotels";

const HotelSlugPage = () => {
  const params = useParams();
  const slug = params.slug;

  // Determine which dataset to use
  let sectionTitle, hotels;
  if (slug === "popular") {
    sectionTitle = "Most Popular Hotels";
    hotels = hotelsData.mostPopular2;
  } else if (slug === "recommended") {
    sectionTitle = "Recommended Hotels";
    hotels = hotelsData.recommended2;
  } else {
    return (
      <div className="text-center text-red-500 text-xl p-6">Page Not Found</div>
    );
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1">
        {/* Header */}
        <Header />

        <div className="p-6">
          {/* Breadcrumb */}
          <nav className="text-2xl mb-12">
            <Link href="/" className="text-black">
              Home
            </Link>{" "}
            &gt;{" "}
            <Link href="/home/hotel" className="text-black">
              Hotels
            </Link>{" "}
            &gt;{" "}
            <span className="font-semibold text-yellow-500">
              {sectionTitle}
            </span>
          </nav>

          {/* Render MoreHotels with data */}
          <MoreHotels hotels={hotels} />
        </div>
      </div>
    </div>
  );
};

export default HotelSlugPage;
