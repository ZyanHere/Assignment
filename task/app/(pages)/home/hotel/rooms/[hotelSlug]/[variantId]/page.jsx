"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/home/Header";
import Footer from "@/components/home/footer";
import Image from "next/image";
import { useHotelsSWR } from "@/lib/hooks/useHotelSWR";

export default function RoomDetailsPage() {
  const { hotelSlug, variantId } = useParams();
  const { data, isLoading, isError } = useHotelsSWR({ hotelsOnly: true, productsLimit: 200 });

  if (isLoading) return <p className="p-6">Loading room details...</p>;
  if (isError) return <p className="text-red-500 p-6">Failed to load room data</p>;

  const hotel = data?.allHotels?.find(
    (h) => h.slug === hotelSlug || String(h.id) === String(hotelSlug)
  );

  if (!hotel) {
    return <p className="text-red-500 p-6">Hotel not found</p>;
  }

  const variant = hotel.variants?.find((v) => String(v.id) === String(variantId));

  if (!variant) {
    return <p className="text-red-500 p-6">Room not found</p>;
  }

  return (
    <div className="flex-1">
      <Header />
      <div className="p-6 w-full max-w-[1700px] mx-auto">
        {/* Breadcrumb */}
        <nav className="text-2xl mb-6">
          <Link href="/">Home</Link> &gt;{" "}
          <Link href="/home/hotel">Hotels</Link> &gt;{" "}
          <Link href={`/home/hotel/rooms/${hotel.slug}`}>{hotel.name}</Link> &gt;{" "}
          <span className="font-semibold text-yellow-500">{variant.variant_name}</span>
        </nav>

        {/* Room Banner */}
        <div className="w-full h-[400px] relative mb-8">
          <Image
            src={variant.images?.[0]?.url || hotel.images?.[0]?.url || "/hotels/placeholder.png"}
            alt={variant.variant_name}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-lg"
          />
        </div>

        {/* Room Info */}
        <h1 className="text-3xl font-bold mb-2">{variant.variant_name}</h1>
        <p className="text-gray-600 mb-4">{hotel.description}</p>
        <p className="text-xl font-semibold text-orange-600">
          ₹{variant.price?.sale_price ?? variant.price?.base_price} / night
        </p>
        <p className="text-gray-500 mt-2">
          ⭐ {hotel.rating?.average ?? 0} ({hotel.rating?.count ?? 0} reviews)
        </p>

        {/* Attributes */}
        {variant.attributes?.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Room Details</h2>
            <ul className="list-disc ml-6">
              {variant.attributes.map((attr) => (
                <li key={attr.id}>
                  {attr.name}: {attr.value}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Booking Button */}
        <div className="mt-8">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Book Now
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
