"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/home/Header";
import { useEventsSWR } from "@/lib/hooks/useEventsSWR";
import MovieVariant from "@/components/home/foursec/movie/movieVariant"; // reuse

// Fallback variants if API gives none
const fallbackSeatVariants = [
  { type: "Standard", price: 200, seatsLeft: 30 },
  { type: "Premium", price: 350, seatsLeft: 15 },
  { type: "Recliner", price: 500, seatsLeft: 8 },
  { type: "Supreme", price: 700, seatsLeft: 4 },
];

export default function EventDetailPage() {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useEventsSWR({ eventsOnly: true, productsLimit: 120 });

  if (isLoading) return <p className="p-6">Loading event...</p>;
  if (isError || !data) return <p className="p-6 text-red-500">{error?.message || "Failed to load event."}</p>;

  const event = data.all.find((e) => e.id === id);
  if (!event) return <p className="p-6 text-gray-500">Event not found.</p>;

  // Map event variants to seatVariants prop shape
  const seatVariants = event.variants.length
    ? event.variants.map(v => ({
        type: v.name || "Variant",
        price: v.price?.sale ?? v.price?.base ?? 0,
        seatsLeft: v.stock?.available ?? v.stock?.quantity ?? 0,
      }))
    : fallbackSeatVariants;

  const primaryVariant = event.variants[0];
  const heroImage =
    primaryVariant?.primaryImage ||
    primaryVariant?.images?.find(img => img.is_primary)?.url ||
    primaryVariant?.images?.[0]?.url ||
    event.poster ||
    "/placeholder.jpg";

  // Simple aggregate seats (optional)
  const totalSeatsLeft = seatVariants.reduce((sum, sv) => sum + (sv.seatsLeft || 0), 0);

  return (
    <div className="flex-1">
      <Header />
      <div className="p-6 w-full max-w-[1700px] mx-auto">
        {/* Breadcrumb */}
        <nav className="text-2xl mb-6">
          <Link href="/" className="text-gray-500">Home</Link> &gt;
          <Link href="/home/event" className="text-gray-500"> Events</Link> &gt;
          <span className="text-yellow-500 font-semibold">{event.title}</span>
        </nav>

        {/* Hero */}
        <div className="relative h-[450px] rounded-2xl overflow-hidden bg-gray-50">
          <Image
            src={heroImage}
            alt={event.title}
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Body */}
        <div className="mt-8 max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold uppercase mb-4">{event.title}</h1>

          {/* Info Grid */}
          <div className="bg-gray-100 p-6 rounded-xl mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base lg:text-lg">
              <Info icon="🗓" label={event.date} />
              <Info icon="⏰" label={event.time} />
              <Info icon="📍" label={event.location || "Location TBA"} />
              <Info icon="💺" label={`${totalSeatsLeft} seats left`} />
              <Info icon="🔞" label={`Age Limit - ${event.raw?.ageLimit || "N/A"}`} />
              {event.price?.sale < event.price?.base && (
                <Info
                  icon="💸"
                  label={`Save ₹${(event.price.base - event.price.sale).toFixed(0)}`}
                />
              )}
            </div>
          </div>

          {/* About */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">ABOUT THE EVENT</h2>
            <p className="leading-relaxed">
              {event.description || "No description provided."}
            </p>
          </section>

          {/* Variants (reusing MovieVariant) */}
          <MovieVariant seatVariants={seatVariants} />

          {/* Terms */}
            <div className="p-6 shadow-2xl rounded-xl mb-6">
            <h2 className="text-2xl font-bold mb-10">TERMS & CONDITIONS</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Registration is required to attend.</li>
              <li>All fees must be paid in advance (if applicable).</li>
              <li>Tickets are non-refundable unless policy states otherwise.</li>
              <li>Follow all organizer instructions.</li>
            </ul>
          </div>

          {/* Action */}
          <button className="w-full py-4 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-500 transition-colors text-lg">
            GRAB DEAL - ₹{event.price?.sale ?? event.price?.base ?? 0}
          </button>
        </div>
      </div>
    </div>
  );
}

// Small helper for info items
function Info({ icon, label }) {
  return (
    <div className="flex items-center gap-2">
      <span>{icon}</span>
      <span className="font-semibold">{label}</span>
    </div>
  );
}
