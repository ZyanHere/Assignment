// app/home/hotel/page.jsx
"use client";

import Link from "next/link";
import Header from "@/components/home/Header";
import Footer from "@/components/home/footer";
import HotelCard from "@/components/home/foursec/HotelCard";
import RecommendedHotels from "@/components/home/foursec/RecommandedHotel";
import { useHotelsSWR } from "@/lib/hooks/useHotelSWR";

export default function HotelsPage() {
  const { data, isLoading, isError } = useHotelsSWR({ hotelsOnly: true, productsLimit: 50 });

  return (
    <div className="flex-1">
      <Header />
      <div className="p-6 w-full max-w-[1700px] mx-auto">
        {/* Breadcrumb */}
        <nav className="text-2xl mb-4">
          <Link href="/" className="text-black">
            Home
          </Link>{" "}
          &gt; <span className="font-semibold text-yellow-500">Hotels</span>
        </nav>

        {isLoading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500" />
            <span className="ml-2">Loading hotels...</span>
          </div>
        )}

        {isError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>Error:</strong> Failed to load hotels.
          </div>
        )}

        {!isLoading && !isError && data && (
          <>
            {/* In Your Area Section (maps to "popular") */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Hotels in Your Area</h2>
              <HotelCard hotels={data.inYourArea || []} />
            </section>

            {/* Previous Choices (maps to "recommended") */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Based on Your Previous Choices</h2>
              <HotelCard hotels={data.previousChoices || []} />
            </section>

            {/* All Hotels */}
            <section>
              <h2 className="text-2xl font-bold mb-4">All Hotels</h2>
              <RecommendedHotels hotels={data.allHotels || []} />
            </section>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
