"use client";
import { useState, useEffect } from "react";
import WishlistItem from "./WishlistItem";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Heart, ShoppingBag, X, Loader2, Trash2 } from "lucide-react";
import { useWishlist } from "@/lib/hooks/useWishlist";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const SavedDeal = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [filter, setFilter] = useState("all");
  const [removingItemId, setRemovingItemId] = useState(null);
  const [updatingItemId, setUpdatingItemId] = useState(null);
  
  const {
    items: wishlistItems,
    loading,
    error,
    summary,
    removeItem,
    updateItem,
    clearAll,
    moveToCart,
    clearErrorState
  } = useWishlist();

  // Handle errors
  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrorState();
    }
  }, [error, clearErrorState]);

  const sortedItems = [...wishlistItems].sort((a, b) => 
    new Date(b.added_at || b.created_at) - new Date(a.added_at || a.created_at)
  );

  const filteredItems = filter === "all" 
    ? sortedItems 
    : sortedItems.filter(item => item.status === filter);

  const isEmpty = filteredItems.length === 0;

  const handleRemoveItem = async (productId) => {
    try {
      setRemovingItemId(productId);
      await removeItem(productId);
      toast.success('Item removed from wishlist');
    } catch (error) {
      toast.error('Failed to remove item from wishlist');
    } finally {
      setRemovingItemId(null);
    }
  };

  const handleUpdateItem = async (wishlistId, updates) => {
    try {
      setUpdatingItemId(wishlistId);
      // Find the item to get the product ID
      const item = wishlistItems.find(item => item._id === wishlistId);
      if (!item) {
        throw new Error('Wishlist item not found');
      }
      const productId = item.product_id?._id || item.product_id?.id;
      await updateItem(productId, updates.notes, updates.priority);
      toast.success('Wishlist item updated successfully');
    } catch (error) {
      toast.error('Failed to update wishlist item');
    } finally {
      setUpdatingItemId(null);
    }
  };

  const handleClearAll = async () => {
    if (window.confirm('Are you sure you want to clear all saved items?')) {
      try {
        await clearAll();
        toast.success('Wishlist cleared successfully');
      } catch (error) {
        toast.error('Failed to clear wishlist');
      }
    }
  };

  const handleMoveToCart = async () => {
    try {
      await moveToCart();
      toast.success('Items moved to cart successfully');
      router.push('/cart');
    } catch (error) {
      toast.error('Failed to move items to cart');
    }
  };

  const handleBuyNow = (productId) => {
    router.push(`/product/${productId}`);
  };

  return (
    <div className="md:p-4 p-1 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with filter options - Skeleton when loading */}
        {loading && !wishlistItems.length ? (
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
              <h1 className="text-2xl font-bold">My Wishlist</h1>
              <span className="bg-red-100 text-red-800 px-2.5 py-0.5 rounded-full text-sm">
                {summary.totalItems} {summary.totalItems === 1 ? 'Item' : 'Items'}
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

        {/* Priority Summary */}
        {!loading && wishlistItems.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4 text-sm">
            {summary.highPriority > 0 && (
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full">
                🔥 {summary.highPriority} High Priority
              </span>
            )}
            {summary.mediumPriority > 0 && (
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                ⭐ {summary.mediumPriority} Medium Priority
              </span>
            )}
            {summary.lowPriority > 0 && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                📝 {summary.lowPriority} Low Priority
              </span>
            )}
          </div>
        )}

        {/* Action buttons for bulk operations */}
        {!loading && wishlistItems.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleMoveToCart}
              disabled={loading}
              className="gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Move All to Cart
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleClearAll}
              disabled={loading}
              className="gap-2 text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </Button>
          </div>
        )}

        {/* Content Area */}
        {loading && !wishlistItems.length ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i}>
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
              </div>
            ))}
          </div>
        ) : isEmpty ? (
          <div className="flex flex-col items-center justify-center py-12 gap-6 text-center">
            <div className="bg-gray-100 p-6 rounded-full">
              <Heart className="w-10 h-10 text-gray-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Your wishlist is empty</h3>
              <p className="text-gray-500 max-w-md">
                Start building your wishlist by saving products you love. Click the heart icon on any product to add it here.
              </p>
            </div>
            <Button 
              className="gap-2"
              onClick={() => router.push('/')}
            >
              <ShoppingBag className="w-4 h-4" />
              Discover Products
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredItems.map((item) => (
              <WishlistItem
                key={item._id}
                item={item}
                onRemove={handleRemoveItem}
                onUpdate={handleUpdateItem}
                onBuyNow={handleBuyNow}
                isRemoving={removingItemId === (item.product_id?._id || item.product_id?.id)}
                isUpdating={updatingItemId === item._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedDeal;