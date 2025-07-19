// app/(pages)/home/event/[id]/page.jsx
"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/home/Header";
import { useEventsSWR } from "@/lib/hooks/useEventsSWR";

export default function EventDetailPage() {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useEventsSWR({ eventsOnly: true, productsLimit: 120 });

  if (isLoading) return <p className="p-6">Loading event...</p>;
  if (isError || !data) return <p className="p-6 text-red-500">{error?.message || "Failed to load event."}</p>;

  const event = data.all.find((e) => e.id === id);
  if (!event) return <p className="p-6 text-gray-500">Event not found.</p>;

  const variant = event.variants[0];
  const heroImage =
    variant?.primaryImage || event.poster || "/placeholder.jpg";

  return (
    <div className="flex-1">
      <Header />
      <div className="p-6 w-full max-w-[1700px] mx-auto">
        <nav className="text-2xl mb-6">
          <Link href="/" className="text-gray-500">Home</Link> &gt;
          <Link href="/home/event" className="text-gray-500"> Events</Link> &gt;
          <span className="text-yellow-500 font-semibold">{event.title}</span>
        </nav>

        <div className="relative h-[450px] rounded-2xl overflow-hidden bg-gray-50">
          <Image
            src={heroImage}
            alt={event.title}
            fill
            className="object-contain"
          />
        </div>

        <div className="mt-8 max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold uppercase mb-4">{event.title}</h1>

            <div className="bg-gray-100 p-6 rounded-xl mb-8">
            <div className="grid grid-cols-2 gap-4 text-lg">
              <div className="flex items-center gap-2">🗓 <span className="font-semibold">{event.date}</span></div>
              <div className="flex items-center gap-2">⏰ <span className="font-semibold">{event.time}</span></div>
              <div className="flex items-center gap-2">📍 <span className="font-semibold">{event.location || "Location TBA"}</span></div>
              <div className="flex items-center gap-2">💺 <span className="font-semibold">
                {variant?.stock?.available ?? variant?.stock?.quantity ?? 0} seats left
              </span></div>
              <div className="flex items-center gap-2">🔞 <span className="font-semibold">
                Age Limit - {event.raw?.ageLimit || "N/A"}
              </span></div>
            </div>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">ABOUT THE EVENT</h2>
            <p className="leading-relaxed">
              {event.description || "No description provided."}
            </p>
          </section>

          <div className="p-6 shadow-2xl rounded-xl mb-6">
            <h2 className="text-2xl font-bold mb-10">TERMS & CONDITIONS</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Registration is required to attend.</li>
              <li>All fees must be paid in advance (if applicable).</li>
              <li>Tickets are non-refundable unless policy states otherwise.</li>
              <li>Follow all organizer instructions.</li>
            </ul>
          </div>

          <button className="w-full py-4 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-500 transition-colors">
            GRAB DEAL - ₹{event.price.sale ?? event.price.base}
          </button>
        </div>
      </div>
    </div>
  );
}
