// app/home/hotel/[slug]/page.jsx
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import Header from "@/components/home/Header";
import Footer from "@/components/home/footer";
import MoreHotels from "@/components/home/foursec/MoreHotels";
import { useHotelsSWR } from "@/lib/hooks/useHotelSWR";

export default function HotelSlugPage() {
  const { slug } = useParams();
  const { data, isLoading, isError, error } = useHotelsSWR({ hotelsOnly: true });

  // Map slugs to sections in the normalized data
  let sectionTitle = "";
  let sectionHotels = [];

  if (slug === "popular") {
    sectionTitle = "Most Popular Hotels";
    sectionHotels = data?.inYourArea || [];
  } else if (slug === "recommended") {
    sectionTitle = "Recommended Hotels";
    sectionHotels = data?.previousChoices || [];
  }

  const isValidSlug = slug === "popular" || slug === "recommended";
  const hotelsCount = sectionHotels?.length ?? 0;

  return (
    <div className="flex-1">
      <Header />

      <div className="pl-14 pr-14 pb-14 w-full max-w-[1700px] mx-auto">
        {/* Breadcrumb */}
        <nav className="text-2xl mb-8 mt-8">
          <Link href="/" className="text-black">Home</Link>{" "}
          &gt;{" "}
          <Link href="/home/hotel" className="text-black">Hotels</Link>{" "}
          &gt;{" "}
          <span className="font-semibold text-yellow-500">
            {sectionTitle || "..."}
          </span>
        </nav>

        {isLoading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500" />
            <span className="ml-2">Loading hotels...</span>
          </div>
        )}

        {isError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>Error:</strong> {error?.message || "Failed to load hotels."}
          </div>
        )}

        {!isLoading && !isError && !isValidSlug && (
          <div className="text-center text-red-500 text-xl p-6">Page Not Found.</div>
        )}

        {!isLoading && !isError && isValidSlug && hotelsCount === 0 && (
          <div className="text-center text-gray-500 text-xl p-6">
            No hotels found in this section.
          </div>
        )}

        {!isLoading && !isError && isValidSlug && hotelsCount > 0 && (
          <MoreHotels hotels={sectionHotels} />
        )}
      </div>

      <Footer />
    </div>
  );
}
