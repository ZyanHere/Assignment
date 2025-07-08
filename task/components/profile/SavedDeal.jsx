"use client";
import { useState, useEffect } from "react";
import OrderCard from "./OrderCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Heart, ShoppingBag, X, Loader2 } from "lucide-react";
import { fetchUserWishlist } from "@/lib/api/profile";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const SavedDeal = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [savedDeals, setSavedDeals] = useState([]);
  const [isRemoving, setIsRemoving] = useState(false);

  // Fetch wishlist data
  useEffect(() => {
    const loadWishlist = async () => {
      if (session?.user?.token) {
        try {
          const wishlistData = await fetchUserWishlist();
          // Transform wishlist data to match OrderCard format
          const transformedDeals = wishlistData.map((item, index) => ({
            id: item._id || index + 1,
            storeName: item.vendor?.name || "Store",
            status: "saved",
            items: [{
              product: item.product?.name || "Product",
              productImage: item.product?.images?.[0] || "/products/default.jpg",
              brand: item.product?.brand || "Brand",
              quantity: 1,
              date: item.createdAt || new Date().toISOString(),
              displayDate: new Date(item.createdAt || new Date()).toLocaleDateString(),
              price: item.product?.price?.toString() || "0",
              originalPrice: item.product?.originalPrice?.toString() || item.product?.price?.toString() || "0",
              status: "Saved",
              actionLabel: "View",
              productId: item.product?._id,
              wishlistId: item._id
            }]
          }));
          setSavedDeals(transformedDeals);
        } catch (error) {
          console.error('Failed to fetch wishlist:', error);
          toast.error('Failed to load saved items');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    loadWishlist();
  }, [session]);

  const sortedDeals = [...savedDeals].sort((a, b) => 
    new Date(b.items[0].date) - new Date(a.items[0].date)
  );

  const filteredDeals = filter === "all" 
    ? sortedDeals 
    : sortedDeals.filter(deal => deal.status === filter);

  const isEmpty = filteredDeals.length === 0;

  return (
    <div className="p-4 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header with filter options - Skeleton when loading */}
        {loading ? (
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex items-center gap-4">
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="h-6 w-40 rounded-md" />
              <Skeleton className="w-10 h-6 rounded-full" />
            </div>
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-20 rounded-full" />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6 text-red-500 fill-red-500" />
              <h1 className="text-2xl font-bold">Saved Deals</h1>
              <span className="bg-red-100 text-red-800 px-2.5 py-0.5 rounded-full text-sm">
                {savedDeals.length} Items
              </span>
            </div>
            
            <div className="flex gap-2">
              {["all", "active", "expired"].map((status) => (
                <Button
                  key={status}
                  variant={filter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(status)}
                  className="rounded-full capitalize"
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Content Area */}
        {loading ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between">
                    <Skeleton className="h-5 w-40 rounded-md" />
                    <Skeleton className="h-5 w-24 rounded-full" />
                  </div>
                  <div className="flex gap-4">
                    <Skeleton className="h-20 w-20 rounded-md" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-3/4 rounded-md" />
                      <Skeleton className="h-3 w-1/2 rounded-md" />
                      <Skeleton className="h-3 w-1/3 rounded-md" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Skeleton className="h-8 w-24 rounded-md" />
                    <Skeleton className="h-8 w-24 rounded-md" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : isEmpty ? (
          <motion.div
            className="flex flex-col items-center justify-center py-12 gap-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="bg-gray-100 p-6 rounded-full">
              <Heart className="w-10 h-10 text-gray-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-medium">No saved deals yet</h3>
              <p className="text-gray-500 max-w-md">
                Save your favorite items to purchase them later. Click the heart icon on any product.
              </p>
            </div>
            <Button className="gap-2">
              <ShoppingBag className="w-4 h-4" />
              Browse Products
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {filteredDeals.map((deal) => (
              <motion.div
                key={deal.id}
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <OrderCard 
                  order={deal}
                  customButtons={
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <X className="w-4 h-4" />
                        Remove
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Buy Now
                      </Button>
                    </div>
                  }
                />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SavedDeal;