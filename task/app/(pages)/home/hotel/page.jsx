"use client";

import Link from "next/link";
import Header from "@/components/home/Header";
import Footer from "@/components/home/footer";
import HotelCard from "@/components/home/foursec/HotelCard";
import RecommendedHotels from "@/components/home/foursec/RecommandedHotel";
import { useHotelsSWR } from "@/lib/hooks/useHotelSWR";

export default function HotelsPage() {
  const { data, isLoading, isError } = useHotelsSWR({ hotelsOnly: true });

  return (
    <div className="flex-1">
      <Header />
      <div className="pl-14 pr-14 pb-14 w-full max-w-[1700px] mx-auto">
        <nav className="text-2xl mb-8 mt-8">
          <Link href="/" className="text-black">Home</Link> &gt;
          <span className="font-semibold text-yellow-500"> Hotels</span>
        </nav>

        {isLoading && <p>Loading hotels...</p>}
        {isError && <p className="text-red-500">Failed to load hotels</p>}

        {!isLoading && !isError && data && (
          <>
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Hotels in Your Area</h2>
              <HotelCard hotels={data.inYourArea || []} />
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Previous Choices</h2>
              <HotelCard hotels={data.previousChoices || []} />
            </section>

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
