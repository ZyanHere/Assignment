"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/home/Header";
import MovieVariant from "@/components/home/foursec/movie/movieVariant";
import { useMoviesSWR } from "@/lib/hooks/useMoviesSWR";
import { useProduct } from "@/lib/contexts/productContext";
import { useState } from "react";
import { useSelectedItems } from "@/lib/contexts/selected-items-context";
import { useSession } from "next-auth/react";
import { useCart } from "@/lib/contexts/cart-context";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const fallbackSeatVariants = [
  { type: "Standard", price: 200, seatsLeft: 30 },
  { type: "Premium", price: 350, seatsLeft: 15 },
  { type: "Recliner", price: 500, seatsLeft: 8 },
  { type: "Supreme", price: 700, seatsLeft: 4 },
];

export default function MovieDetailPage() {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useMoviesSWR({ moviesOnly: true, productsLimit: 100 });
  const { selectedVariant, setSelectedProduct, setSelectedVariant } = useProduct();
  const { addToCart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [grabLoading, setGrabLoading] = useState(false);
  const { setSingleItem, setSelectedItems } = useSelectedItems();
  const { data: session } = useSession();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mx-auto"></div>
        <p>Loading movie details...</p>
      </div>
    );
  }
  if (isError || !data) {
    return (
      <div className="p-6 text-red-500">
        {error?.message || "Failed to load movie details."}
      </div>
    );
  }

  const movie = data.all.find((m) => m.id === id);
  if (!movie) {
    return <div className="p-6 text-gray-500">Movie not found.</div>;
  }

  const selectedProduct = movie;

  console.log('Selected Product', movie);
  // Prepare variants
  const seatVariants = movie.variants.length
    ? movie.variants.map((v) => ({
      type: v.name,
      price: v.price.sale,
      seatsLeft: v.stock.available,
    }))
    : fallbackSeatVariants;

  // original design used movie.desc[0] for details; we'll use raw fields if present
  const details = movie.raw?.desc?.[0] || {
    image: movie.poster,
    duration: movie.raw?.duration || "N/A",
    location: movie.location || "N/A",
    seatsLeft: seatVariants.reduce((sum, s) => sum + s.seatsLeft, 0),
    ageLimit: movie.raw?.ageLimit || "N/A",
    description: movie.description,
  };

  const variantData = movie?.variants ?? fallbackSeatVariants;

  // console.log('Variant Data', variantData);

  console.log('Movie variants', movie.variants);
  console.log("Selected Variant", selectedVariant);

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
    <div className="flex-1 bg-white">
      <Header />
      <div className="p-4 sm:p-6 max-w-[95%] lg:max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm sm:text-lg lg:text-2xl mb-1 sm:mb-2 mt-2 sm:mt-4">
          <Link href="/" className="text-gray-500">Home</Link> &gt;{" "}
          <Link href="/home/movie" className="text-gray-500">Movies</Link> &gt;{" "}
          <span className="text-yellow-500 font-semibold">{movie.title}</span>
        </nav>

        {/* Banner Image */}
        <div className="relative w-full h-[180px] sm:h-[260px] md:h-[340px] lg:h-[420px] xl:h-[480px] rounded-lg sm:rounded-2xl overflow-hidden mb-2 sm:mb-3">
          <Image
            src={details.image}
            alt={movie.title}
            fill
            className="object-contain bg-white"
            priority
          />
        </div>

        {/* Movie Details */}
        <div>
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase mb-3 sm:mb-4 mt-1 sm:mt-2">
            {movie.title}
          </h1>

          {/* Info Grid */}
          <div className="bg-gray-100 p-4 sm:p-6 rounded-lg sm:rounded-xl mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base lg:text-lg">
              <div className="flex items-center gap-2">
                <span>🗓</span>
                <span className="font-semibold">{movie.date || "TBA"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>⏰</span>
                <span className="font-semibold">Duration - {details.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span className="font-semibold">{details.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>⏰</span>
                <span className="font-semibold">Show Time - {movie.time || "TBA"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>💺</span>
                <span className="font-semibold">{details.seatsLeft} seats left</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🔞</span>
                <span className="font-semibold">Age Limit - {details.ageLimit}</span>
              </div>
            </div>
          </div>

          {/* About Section */}
          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
              ABOUT THE MOVIE
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              {details.description}
            </p>
          </section>

          {/* Variant Options */}
          {/* <MovieVariant seatVariants={seatVariants} /> */}
          <MovieVariant seatVariants={variantData} />

          {/* Terms & Conditions */}
          <div className="p-4 sm:p-6 shadow-lg sm:shadow-2xl rounded-lg sm:rounded-xl mb-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-8">
              TERMS & CONDITIONS
            </h2>
            <ul className="list-disc pl-4 sm:pl-6 space-y-2 text-sm sm:text-base">
              <li>Registration is required to attend the Movie</li>
              <li>All fees (if applicable) must be paid in full before the event date</li>
              <li>Tickets are non-refundable, except as stated in our refund policy</li>
              <li>Participants must follow all Event rules, schedules, and instructions</li>
            </ul>
          </div>

          {/* Grab Deal Button */}
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
              `GRAB DEAL - ₹${movie.price.sale}`
            )}

          </Button>

        </div>
      </div>
    </div>
  );
}
