"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/home/Header";
import Footer from "@/components/home/footer";
import Image from "next/image";
import { useHotelsSWR } from "@/lib/hooks/useHotelSWR";
import { MapPin, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useProduct } from "@/lib/contexts/productContext";
import { useState } from "react";
import { useSelectedItems } from "@/lib/contexts/selected-items-context";
import { useSession } from "next-auth/react";
import { useCart } from "@/lib/contexts/cart-context";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RoomDetailsPage() {
  const { hotelSlug, variantId } = useParams();
  const { data, isLoading, isError } = useHotelsSWR({ hotelsOnly: true, productsLimit: 200 });
  const { selectedProduct } = useProduct();
  const { addToCart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [grabLoading, setGrabLoading] = useState(false);
  const { setSingleItem, setSelectedItems } = useSelectedItems();
  const { data: session } = useSession();
  const router = useRouter();

  if (isLoading) return <p className="p-6">Loading room details...</p>;
  if (isError) return <p className="text-red-500 p-6">Failed to load room data</p>;

  const hotel = data?.allHotels?.find(
    (h) => h.slug === hotelSlug || String(h.id) === String(hotelSlug)
  );

  if (!hotel) {
    return <p className="text-red-500 p-6">Hotel not found</p>;
  }

  const variant = hotel.variants?.find((v) => String(v.id) === String(variantId));
  const selectedVariant = variant;

  if (!variant) {
    return <p className="text-red-500 p-6">Room not found</p>;
  }

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
          id: selectedVariant._id,
          variant: selectedVariant,
          selectedVariant,
          price: selectedVariant.base_price,
          sale_price: selectedVariant.price.sale_price,
          stock: selectedVariant.stock.quantity,
          sku: selectedVariant.sku,
        });

        // Also populate selectedItems context for buy-now page
        const cartItemData = [{
          id: selectedVariant._id,
          variantId: selectedVariant._id,
          name: selectedVariant.variant_name,
          brand: selectedProduct.raw?.brand || 'Last Minute Deal',
          seller: selectedProduct.raw.vendor_store_id?.store_name || 'Last Minute Deal',
          vendorId: selectedProduct.raw.vendor_store_id?._id || 'default',
          vendorName: selectedProduct.raw.vendor_store_id?.store_name || 'Last Minute Deal',
          price: selectedVariant.price.sale_price,
          mrp: selectedVariant.price.base_price,
          image:
            selectedVariant.images.find((img) => img.is_primary)?.url ||
            selectedProduct.images[0]?.url,
          weight: selectedVariant.variant_name,
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

  console.log('Room Details', variant);

  return (
    <div className="flex-1">
      <Header />
      <div className="pl-14 pr-14 pb-14 w-full max-w-[1700px] mx-auto">
        {/* Breadcrumb */}
        <nav className="text-2xl mb-6 mt-8">
          <Link href="/">Home</Link> &gt;{" "}
          <Link href="/home/hotel">Hotels</Link> &gt;{" "}
          <Link href={`/home/hotel/rooms/${hotel.slug}`}>{hotel.name}</Link> &gt;{" "}
          <span className="font-semibold text-yellow-500">{variant.variant_name}</span>
        </nav>

        {/* Room Banner */}
        <div className="w-full h-[320px] relative mb-0">
          <Image
            src={variant.images?.[0]?.url || hotel.images?.[0]?.url || "/hotels/placeholder.png"}
            alt={variant.variant_name}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-lg"
          />
        </div>

        <div className="-mt-6 border-t rounded-t-4xl shadow pl-14 pr-14 pt-14">
          {/* Room Info */}
          <h1 className="text-3xl font-bold mb-6">{variant.variant_name}</h1>

          <div className="flex gap-8 items-center mb-8">
            <div className="flex gap-2 items-center">
              <MapPin className="text-blue-600" />
              <p className="text-gray-600 text-lg">{hotel.location || "N/A"}</p>
            </div>

            <div className="flex gap-2 items-center">
              <Star size={20} color="#facc15" fill="#facc15" />
              <p className="text-gray-500">
                {hotel.rating?.average ?? 0} ({hotel.rating?.count ?? 0} reviews)
              </p>
            </div>
          </div>

          {/* Attributes */}
          {variant.attributes?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Common Facilities</h2>
              <ul className="list-disc ml-6 text-lg">
                {variant.attributes.map((attr) => (
                  <li key={attr.id}>
                    {attr.name}: {attr.value}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <h2 className="text-2xl font-semibold mb-4">Description</h2>
          <p className="text-gray-600 mb-4">{hotel.description ?? "N/A"}</p>

          <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
          {/* review data is not available in the api */}
          <p className="text-gray-600 mb-4">Currently unavailable</p>


          {/* Booking Button */}
          <div className="mt-14 border-t rounded-t-4xl p-8 flex justify-between items-center gap-6 shadow-[0_-5px_20px_rgba(0,0,0,0.1)]">
            <div className="flex flex-col">
              <span className="text-xl text-gray-400 mb-1">Price</span>
              <p className="text-2xl font-semibold text-orange-500 whitespace-nowrap">
                ₹{variant.price?.sale_price ?? variant.price?.base_price} / night
              </p>
            </div>
            <Button
              className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-2xl text-base sm:text-lg font-bold px-18 h-14  sm:py-4 shadow-md transition-all duration-200"
              onClick={handleGrab}
              disabled={grabLoading}
            >
              {grabLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin text-white" />
                  <span>Grabbing...</span>
                </div>
              ) : (
                "BOOK NOW"
              )}
            </Button>
          </div>

        </div>

      </div>
      <Footer />
    </div>
  );
}
