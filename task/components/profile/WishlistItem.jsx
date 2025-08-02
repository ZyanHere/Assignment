"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Heart, ShoppingBag, X, Loader2, Eye, Edit3, Calendar, Tag, Sparkles } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

const WishlistItem = ({ item, onRemove, onUpdate, onBuyNow, isRemoving = false, isUpdating = false }) => {
  const router = useRouter()
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [notes, setNotes] = useState(item.notes || "")
  const [priority, setPriority] = useState(item.priority || "medium")

  const productData = item.product_id || item.product_snapshot
  const productName = productData?.name || "Product"
  const productImage =
    productData?.images?.[0]?.url || productData?.primary_image || "/placeholder.svg?height=120&width=120"
  const productBrand = productData?.brand || "Brand"
  const productPrice =
    productData?.variants?.[0]?.price?.sale_price?.toString() || productData?.price?.$numberDecimal || "0"
  const originalPrice =
    productData?.variants?.[0]?.price?.base_price?.toString() || productData?.price?.$numberDecimal || "0"
  const productId = productData?._id || productData?.id

  const discountPercentage =
    originalPrice !== "0" && productPrice !== "0"
      ? Math.round(
          ((Number.parseFloat(originalPrice) - Number.parseFloat(productPrice)) / Number.parseFloat(originalPrice)) *
            100,
        )
      : 0

  const priorityConfig = {
    high: {
      label: "High",
      color: "bg-gradient-to-r from-red-500 to-pink-500 text-white border-red-300",
      icon: "🔥",
    },
    medium: {
      label: "Medium",
      color: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-yellow-300",
      icon: "⭐",
    },
    low: {
      label: "Low",
      color: "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-green-300",
      icon: "📝",
    },
  }

  const handleUpdate = async () => {
    if (onUpdate) {
      await onUpdate(item._id, { notes, priority })
      setIsEditOpen(false)
    }
  }

  const handleViewProduct = () => {
    router.push(`/product/${productId}`)
  }

  const handleBuyNow = () => {
    if (onBuyNow) {
      onBuyNow(productId)
    }
  }

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card className="bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-gray-50 via-white to-gray-50 border-b border-gray-100">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl shadow-lg">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Added {new Date(item.added_at || item.created_at).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={`${priorityConfig[priority]?.color} px-3 py-1 font-semibold shadow-md`}>
                {priorityConfig[priority]?.icon} {priorityConfig[priority]?.label}
              </Badge>
              <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-blue-50 rounded-xl">
                    <Edit3 className="w-4 h-4 text-blue-600" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white/95 backdrop-blur-sm">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-gray-900">Edit Wishlist Item</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">Notes</label>
                      <Textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Add notes about this item..."
                        className="border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">Priority</label>
                      <Select value={priority} onValueChange={setPriority}>
                        <SelectTrigger className="border-gray-200 focus:border-purple-400 focus:ring-purple-400">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">📝 Low Priority</SelectItem>
                          <SelectItem value="medium">⭐ Medium Priority</SelectItem>
                          <SelectItem value="high">🔥 High Priority</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        onClick={handleUpdate}
                        disabled={isUpdating}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
                      >
                        {isUpdating ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            Updating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 mr-2" />
                            Update
                          </>
                        )}
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditOpen(false)} className="hover:bg-gray-50">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="flex gap-6">
            {/* Enhanced Product Image */}
            <div className="relative w-32 h-32 flex-shrink-0">
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-gray-100 to-gray-200">
                <Image
                  src={productImage || "/placeholder.svg"}
                  alt={productName}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                />
                {discountPercentage > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 shadow-lg">
                    {discountPercentage}% OFF
                  </Badge>
                )}
              </div>
            </div>

            {/* Enhanced Product Details */}
            <div className="flex-1 min-w-0 space-y-4">
              <div>
                <h3 className="font-bold text-xl text-gray-900 line-clamp-2 mb-2">{productName}</h3>
                <p className="text-gray-600 font-medium">{productBrand}</p>
                {productData?.category?.name && (
                  <div className="flex items-center gap-2 mt-2">
                    <Tag className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {productData.category.name}
                    </span>
                  </div>
                )}
              </div>

              {/* Enhanced Price Information */}
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-green-600">₹{productPrice}</span>
                {originalPrice !== productPrice && (
                  <span className="text-lg text-gray-500 line-through">₹{originalPrice}</span>
                )}
              </div>

              {/* Enhanced Notes Display */}
              {item.notes && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-100">
                  <p className="text-sm text-gray-700 italic">"{item.notes}"</p>
                </div>
              )}

              {/* Enhanced Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleViewProduct}
                  className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300 transition-colors bg-transparent"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </Button>
                <Button
                  size="sm"
                  onClick={handleBuyNow}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Buy Now
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onRemove(productId)}
                  disabled={isRemoving}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 hover:border-red-300 transition-colors"
                >
                  {isRemoving ? <Loader2 className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default WishlistItem
