"use client"
import { useState, useEffect } from "react"
import WishlistItem from "./WishlistItem"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, ShoppingBag, Trash2, Sparkles, Filter } from "lucide-react"
import { useWishlist } from "@/lib/hooks/useWishlist"
import { useSession } from "next-auth/react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

const SavedDeal = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [filter, setFilter] = useState("all")
  const [removingItemId, setRemovingItemId] = useState(null)
  const [updatingItemId, setUpdatingItemId] = useState(null)

  const {
    items: wishlistItems,
    loading,
    error,
    summary,
    removeItem,
    updateItem,
    clearAll,
    moveToCart,
    clearErrorState,
  } = useWishlist()

  useEffect(() => {
    if (error) {
      toast.error(error)
      clearErrorState()
    }
  }, [error, clearErrorState])

  const sortedItems = [...wishlistItems].sort(
    (a, b) => new Date(b.added_at || b.created_at) - new Date(a.added_at || a.created_at),
  )

  const filteredItems = filter === "all" ? sortedItems : sortedItems.filter((item) => item.status === filter)

  const isEmpty = filteredItems.length === 0

  const handleRemoveItem = async (productId) => {
    try {
      setRemovingItemId(productId)
      await removeItem(productId)
      toast.success("Item removed from wishlist")
    } catch (error) {
      toast.error("Failed to remove item from wishlist")
    } finally {
      setRemovingItemId(null)
    }
  }

  const handleUpdateItem = async (wishlistId, updates) => {
    try {
      setUpdatingItemId(wishlistId)
      const item = wishlistItems.find((item) => item._id === wishlistId)
      if (!item) {
        throw new Error("Wishlist item not found")
      }
      const productId = item.product_id?._id || item.product_id?.id
      await updateItem(productId, updates.notes, updates.priority)
      toast.success("Wishlist item updated successfully")
    } catch (error) {
      toast.error("Failed to update wishlist item")
    } finally {
      setUpdatingItemId(null)
    }
  }

  const handleClearAll = async () => {
    if (window.confirm("Are you sure you want to clear all saved items?")) {
      try {
        await clearAll()
        toast.success("Wishlist cleared successfully")
      } catch (error) {
        toast.error("Failed to clear wishlist")
      }
    }
  }

  const handleMoveToCart = async () => {
    try {
      await moveToCart()
      toast.success("Items moved to cart successfully")
      router.push("/cart")
    } catch (error) {
      toast.error("Failed to move items to cart")
    }
  }

  const handleBuyNow = (productId) => {
    router.push(`/product/${productId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Enhanced Header */}
        {loading && !wishlistItems.length ? (
          <Card className="mb-8 bg-white/80 backdrop-blur-sm shadow-xl">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <Skeleton className="h-8 w-48 rounded-md" />
                  <Skeleton className="w-16 h-8 rounded-full" />
                </div>
                <div className="flex gap-2">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-10 w-24 rounded-full" />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Card className="mb-8 bg-white/90 backdrop-blur-sm shadow-2xl border-0">
              <CardContent className="p-6 lg:p-8">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl shadow-lg">
                      <Heart className="w-8 h-8 text-white fill-white" />
                    </div>
                    <div>
                      <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                        My Wishlist
                      </h1>
                      <p className="text-gray-600 mt-1">Your saved favorites and dream items</p>
                    </div>
                    <Badge className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-2 text-lg font-bold shadow-lg">
                      {summary.totalItems} {summary.totalItems === 1 ? "Item" : "Items"}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-3">
                    <Filter className="w-5 h-5 text-gray-500" />
                    <div className="flex gap-2">
                      {["all", "active", "expired"].map((status) => (
                        <Button
                          key={status}
                          variant={filter === status ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFilter(status)}
                          className={`rounded-full capitalize font-semibold transition-all ${
                            filter === status
                              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                              : "hover:bg-purple-50 hover:border-purple-300"
                          }`}
                        >
                          {status}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Enhanced Priority Summary */}
        {!loading && wishlistItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-3 mb-6"
          >
            {summary.highPriority > 0 && (
              <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 text-sm font-semibold shadow-lg">
                🔥 {summary.highPriority} High Priority
              </Badge>
            )}
            {summary.mediumPriority > 0 && (
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 text-sm font-semibold shadow-lg">
                ⭐ {summary.mediumPriority} Medium Priority
              </Badge>
            )}
            {summary.lowPriority > 0 && (
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 text-sm font-semibold shadow-lg">
                📝 {summary.lowPriority} Low Priority
              </Badge>
            )}
          </motion.div>
        )}

        {/* Enhanced Action Buttons */}
        {!loading && wishlistItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-3 mb-8"
          >
            <Button
              onClick={handleMoveToCart}
              disabled={loading}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Move All to Cart
            </Button>
            <Button
              variant="outline"
              onClick={handleClearAll}
              disabled={loading}
              className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 hover:border-red-300 shadow-md bg-transparent"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </Button>
          </motion.div>
        )}

        {/* Enhanced Content Area */}
        {loading && !wishlistItems.length ? (
          <div className="grid gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <Skeleton className="h-24 w-24 rounded-xl" />
                    <div className="space-y-3 flex-1">
                      <Skeleton className="h-6 w-3/4 rounded-md" />
                      <Skeleton className="h-4 w-1/2 rounded-md" />
                      <Skeleton className="h-4 w-1/3 rounded-md" />
                      <div className="flex gap-2 pt-2">
                        <Skeleton className="h-8 w-20 rounded-md" />
                        <Skeleton className="h-8 w-24 rounded-md" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : isEmpty ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0">
              <CardContent className="flex flex-col items-center justify-center py-16 gap-8 text-center">
                <div className="p-8 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full shadow-lg">
                  <Heart className="w-16 h-16 text-pink-400" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900">Your wishlist is empty</h3>
                  <p className="text-gray-600 max-w-md text-lg">
                    Start building your wishlist by saving products you love. Click the heart icon on any product to add
                    it here.
                  </p>
                </div>
                <Button
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all gap-2 px-8 py-3 text-lg"
                  onClick={() => router.push("/")}
                >
                  <Sparkles className="w-5 h-5" />
                  Discover Products
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <div className="grid gap-6">
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <WishlistItem
                    item={item}
                    onRemove={handleRemoveItem}
                    onUpdate={handleUpdateItem}
                    onBuyNow={handleBuyNow}
                    isRemoving={removingItemId === (item.product_id?._id || item.product_id?.id)}
                    isUpdating={updatingItemId === item._id}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}

export default SavedDeal
