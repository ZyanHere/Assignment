"use client";

import React from "react";
import Header from "@/components/home/Header";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "@/lib/api";
import { adaptRestaurantDetails } from "@/lib/utils/buffetAdapters";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/contexts/cart-context";
import { useProduct } from "@/lib/contexts/productContext";
import { useSelectedItems } from "@/lib/contexts/selected-items-context";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function RestaurantDetailPage({ params }) {

  const { id } = React.use(params);
  const { data: session } = useSession();
  const { addToCart, clearCart } = useCart();
  const { selectedProduct, selectedVariant, setSelectedProduct, setSelectedVariant } = useProduct();
  const [grabLoading, setGrabLoading] = useState(false);
  const { setSingleItem, setSelectedItems } = useSelectedItems();
  const router = useRouter();

  const { data, error } = useSWR(
    "/lmd/api/v1/retail/home/comprehensive?type=BUFFET",
    fetcher
  );

  if (error) return <div className="p-10 text-red-500">Failed to load details</div>;
  if (!data)
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
        <span className="ml-2">Loading details...</span>
      </div>
    );

  const restaurant = adaptRestaurantDetails(data.data, id);

  if (!restaurant) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500 text-2xl">
        Restaurant not found
      </div>
    );
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
          brand: selectedProduct?.brand || 'Last Minute Deal',
          seller: selectedProduct.vendor_store_id?.store_name || 'Last Minute Deal',
          vendorId: selectedProduct.vendor_store_id?._id || 'default',
          vendorName: selectedProduct.vendor_store_id?.store_name || 'Last Minute Deal',
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

  console.log('Restaurant Variants: ', restaurant.variants);
  console.log('Restaurant data: ', restaurant);
  console.log('Original Data: ', data.data);

  return (
    <div className="flex-1">
      <Header />
      <div className="p-6 w-full max-w-[1700px] mx-auto">
        <div className="px-6 md:px-12">
          <nav className="mb-4 text-2xl">
            <Link href="/" className="hover:underline font-medium">
              Home
            </Link>
            <span className="mx-2 text-gray-400">&gt;</span>
            <Link href="/home/buffet" className="hover:underline font-medium">
              Restaurants
            </Link>
            <span className="mx-2 text-gray-400">&gt;</span>
            <span className="font-semibold text-yellow-500">
              {restaurant.name}
            </span>
          </nav>

          <div className="w-full mb-6">
            <Image
              src={restaurant.banner}
              alt={`${restaurant.name} Banner`}
              height={400}
              width={1200}
              className="w-full h-auto rounded-b-4xl shadow-md"
            />
          </div>

          <h2 className="text-2xl font-semibold mb-4">Menu</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {restaurant.variants.map((variant) => (
              <div
                key={variant.id}
                className={`bg-white p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer min-h-[260px] border-2 ${selectedVariant && selectedVariant.id === variant.id
                  ? "ring-2 ring-yellow-500 border-yellow-500"
                  : "border-transparent"
                  }`}
                style={{ boxSizing: "border-box" }}
                onClick={() => {
                  setSelectedVariant(variant)
                  setSelectedProduct(restaurant);
                }}
              >
                <Image
                  src={variant.images[0].url}
                  alt={variant.variant_name}
                  width={300}
                  height={200}
                  className="rounded-lg mb-3"
                />
                <h3 className="text-lg font-semibold">{variant.variant_name}</h3>
                {/* <p className="text-gray-600">{variant.attributes}</p> */}
                <p className="mt-2 font-bold text-orange-500">
                  ₹{variant.price.base_price}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center">
            <Button
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl text-base sm:text-lg font-semibold py-3 sm:py-4 shadow-lg transition-all duration-200"
              style={{ minWidth: '160px' }}
              onClick={handleGrab}
              disabled={grabLoading}
            >
              {grabLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin text-white" />
                  <span>Grabbing...</span>
                </div>
              ) : (
                "GRAB IT NOW"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
