"use client";
import Sidebar from "@/app/extra/home/sidebar";
import MoreHotels from "@/components/home/foursec/MoreHotels";
import Header from "@/components/home/Header";
import { hotelsData } from "@/data/hotelsData";
import Link from "next/link";
import { useParams } from "next/navigation";

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
    <div className="flex-1">
      {/* Header */}
      <Header />

      <div className="p-6 w-full max-w-[1700px] mx-auto">
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
          <span className="font-semibold text-yellow-500">{sectionTitle}</span>
        </nav>

        {/* Render MoreHotels with data */}
        <MoreHotels hotels={hotels} />
      </div>
    </div>
  );
};

export default HotelSlugPage;
