"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/home/Header";
import { useEventsSWR } from "@/lib/hooks/useEventsSWR";
import MovieVariant from "@/components/home/foursec/movie/movieVariant"; // reuse
import { useProduct } from "@/lib/contexts/productContext";
import { useState } from "react";
import { useSelectedItems } from "@/lib/contexts/selected-items-context";
import { useSession } from "next-auth/react";
import { useCart } from "@/lib/contexts/cart-context";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

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
  const { selectedVariant, setSelectedProduct, setSelectedVariant } = useProduct();
  const { addToCart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [grabLoading, setGrabLoading] = useState(false);
  const { setSingleItem, setSelectedItems } = useSelectedItems();
  const { data: session } = useSession();
  const router = useRouter();

  if (isLoading) return <p className="p-6">Loading event...</p>;
  if (isError || !data) return <p className="p-6 text-red-500">{error?.message || "Failed to load event."}</p>;

  const event = data.all.find((e) => e.id === id);
  if (!event) return <p className="p-6 text-gray-500">Event not found.</p>;

  // using this for proper functioning of Grab Now page
  const selectedProduct = event;
  const variantData = event.variants;

  console.log('Event Data', event);

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

  const handleGrab = async () => {
    if (!session?.user?.token) {
      toast.error('Please login to grab this item');
      return;
    }

    if (selectedVariant) {
      try {
        setGrabLoading(true);

        // Clear existing cart first
        await clearCart();

        // Add only this product to cart
        await addToCart({
          id: selectedVariant.id,
          variant: selectedVariant,
          selectedVariant,
          price: selectedVariant.price.base,
          sale_price: selectedVariant.price.sale,
          stock: selectedVariant.stock.qty,
          sku: selectedVariant.sku || 'N/A',
        });

        // Also populate selectedItems context for buy-now page
        const cartItemData = [{
          id: selectedVariant.id,
          variantId: selectedVariant.id,
          name: selectedVariant.name,
          brand: selectedProduct.raw?.brand || 'Last Minute Deal',
          seller: selectedProduct.raw.vendor_store_id?.store_name || 'Last Minute Deal',
          vendorId: selectedProduct.raw.vendor_store_id?._id || 'default',
          vendorName: selectedProduct.raw.vendor_store_id?.store_name || 'Last Minute Deal',
          price: selectedVariant.price.sale,
          mrp: selectedVariant.price.base,
          image: selectedProduct.raw.images[0].url,
          weight: selectedVariant.name,
          quantity: 1,
        }];

        setSelectedItems(cartItemData);
        setSingleItem(false); // This is from cart, not single item

        // Add a small delay to ensure cart is updated
        await new Promise(resolve => setTimeout(resolve, 500));

        toast.success('Item grabbed successfully!');

        // Navigate to buy-now page
        router.push('/buy-now');
      } catch (error) {
        console.error('Error grabbing item:', error);
        toast.error('Failed to grab item. Please try again.');
      } finally {
        setGrabLoading(false);
      }
    } else {
      toast.error('No variant selected');
    }
  }


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
          <MovieVariant seatVariants={variantData} />

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
          <Button className="w-full h-12 py-3 sm:py-4 bg-yellow-400 text-black font-bold rounded-lg sm:rounded-xl hover:bg-yellow-500 transition-colors text-sm sm:text-base lg:text-lg"
            onClick={handleGrab}
            disabled={grabLoading}
          >
            {grabLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin text-white" />
                <span>Grabbing...</span>
              </div>
            ) : (
              `GRAB DEAL${selectedVariant ? ` - ₹${selectedVariant.price?.sale ?? 0}` : ''}`

            )}

          </Button>
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
