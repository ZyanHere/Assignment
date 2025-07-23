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
    <div className="flex-1 min-h-screen bg-gray-50">
      <Header />
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Breadcrumb Navigation */}
        <nav className="mb-4 sm:mb-6">
          <div className="flex flex-wrap items-center text-sm sm:text-base lg:text-lg gap-1 sm:gap-2">
            <Link href="/" className="hover:underline font-medium text-gray-700 hover:text-yellow-600 transition-colors">
              Home
            </Link>
            <span className="text-gray-400">&gt;</span>
            <Link href="/home/buffet" className="hover:underline font-medium text-gray-700 hover:text-yellow-600 transition-colors">
              Restaurants
            </Link>
            <span className="text-gray-400">&gt;</span>
            <span className="font-semibold text-yellow-600 truncate">
              {restaurant.name}
            </span>
          </div>
        </nav>

        {/* Restaurant Banner */}
        <div className="w-full mb-6 sm:mb-8">
          <div className="relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg">
            <Image
              src={restaurant.banner}
              alt={`${restaurant.name} Banner`}
              height={400}
              width={1200}
              className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>

        {/* Menu Section */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">
            Menu
          </h2>
          
          {/* Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {restaurant.variants.map((variant) => (
              <div
                key={variant.id}
                className={`bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border-2 ${
                  selectedVariant && selectedVariant.id === variant.id
                    ? "ring-2 ring-yellow-500 border-yellow-500 shadow-yellow-200"
                    : "border-transparent hover:border-gray-200"
                }`}
                onClick={() => {
                  setSelectedVariant(variant);
                  setSelectedProduct(restaurant);
                }}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-t-lg sm:rounded-t-xl">
                  <Image
                    src={variant.images[0].url}
                    alt={variant.variant_name}
                    width={300}
                    height={200}
                    className="w-full h-40 sm:h-48 object-cover transition-transform duration-300 hover:scale-105"
                  />
                  {selectedVariant && selectedVariant.id === variant.id && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Selected
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="p-3 sm:p-4">
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    {variant.variant_name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-lg sm:text-xl font-bold text-orange-500">
                      ₹{variant.price.base_price}
                    </p>
                    {variant.price.sale_price && variant.price.sale_price < variant.price.base_price && (
                      <span className="text-xs sm:text-sm bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
                        Sale
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="sticky bottom-4 sm:bottom-6 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border">
          <Button
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-xl text-sm sm:text-base lg:text-lg font-bold py-3 sm:py-4 lg:py-5 shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            onClick={handleGrab}
            disabled={grabLoading || !selectedVariant}
          >
            {grabLoading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 animate-spin" />
                <span>Grabbing...</span>
              </div>
            ) : !selectedVariant ? (
              "Select a Menu Item"
            ) : (
              "GRAB IT NOW"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
