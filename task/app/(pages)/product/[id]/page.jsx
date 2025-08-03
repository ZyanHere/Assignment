"use client"

import Header from "@/components/home/Header"
import { useProduct } from "@/lib/contexts/productContext"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/contexts/cart-context"
import {
  Star,
  Heart,
  Loader2,
  ShoppingCart,
  Zap,
  Shield,
  Truck,
  RotateCcw,
  Award,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Eye,
  Share2,
  Plus,
  Minus,
  Check,
} from "lucide-react"
import { useSelectedItems } from "@/lib/contexts/selected-items-context"
import toast from "react-hot-toast"
import { Toaster } from "react-hot-toast"
import { useWishlist } from "@/lib/hooks/useWishlist"
import { useSession } from "next-auth/react"
import { use } from "react"

export default function ProductDetailsPage({ params }) {
  const unwrappedParams = use(params)
  const productId = unwrappedParams.id

  const { selectedProduct, selectedVariant, setSelectedProduct, setSelectedVariant } = useProduct()
  const router = useRouter()
  const { addToCart, clearCart } = useCart()
  const [activeTab, setActiveTab] = useState("keyinfo")
  const [selectedImage, setSelectedImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [grabLoading, setGrabLoading] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [imageIndex, setImageIndex] = useState(0)
  const [isImageZoomed, setIsImageZoomed] = useState(false)
  const { setSingleItem, setSelectedItems } = useSelectedItems()
  const { data: session } = useSession()

  const { addItem, removeItem, isInWishlist, isProductLoading } = useWishlist()

  // Fetch product data if not available in context
  const fetchProduct = useCallback(
    async (productId) => {
      try {
        setLoading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lmd/api/v1/retail/products/${productId}`)

        if (!response.ok) {
          throw new Error("Product not found")
        }

        const data = await response.json()
        const product = data.data || data

        setSelectedProduct(product)

        if (product.variants && product.variants.length > 0) {
          setSelectedVariant(product.variants[0])
        }
      } catch (error) {
        console.error("Error fetching product:", error)
        toast.error("Product not found")
        router.push("/")
      } finally {
        setLoading(false)
      }
    },
    [setSelectedProduct, setSelectedVariant, router],
  )

  useEffect(() => {
    if (!selectedProduct || (selectedProduct._id !== productId && selectedProduct.id !== productId)) {
      fetchProduct(productId)
    } else {
      window.scrollTo(0, 0)
    }
  }, [productId, selectedProduct, fetchProduct])

  useEffect(() => {
    if (selectedVariant) {
      setSelectedImage(selectedVariant.images[0].url)
      setImageIndex(0)
    }
  }, [selectedVariant])

  // Show loading state
  if (loading || !selectedProduct || !selectedVariant || !selectedImage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <Header />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center min-h-[60vh]"
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Product</h2>
            <p className="text-gray-600">Please wait while we fetch the product details...</p>
          </div>
        </motion.div>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (selectedVariant) {
      addToCart({
        id: selectedVariant._id,
        variant: selectedVariant,
        selectedVariant,
        price: selectedVariant.base_price,
        sale_price: selectedVariant.price.sale_price,
        stock: selectedVariant.stock.quantity,
        sku: selectedVariant.sku,
        quantity,
      })
      toast.success("Added to Cart successfully")
    }
  }

  const handleGrab = async () => {
    if (!session?.user?.token) {
      toast.error("Please login to grab this item")
      return
    }

    if (selectedVariant) {
      try {
        setGrabLoading(true)
        await clearCart()
        await addToCart({
          id: selectedVariant._id,
          variant: selectedVariant,
          selectedVariant,
          price: selectedVariant.base_price,
          sale_price: selectedVariant.price.sale_price,
          stock: selectedVariant.stock.quantity,
          sku: selectedVariant.sku,
          quantity,
        })

        const cartItemData = [
          {
            id: selectedVariant._id,
            variantId: selectedVariant._id,
            name: selectedVariant.variant_name,
            brand: selectedProduct?.brand || "Last Minute Deal",
            seller: selectedProduct.vendor_store_id?.store_name || "Last Minute Deal",
            vendorId: selectedProduct.vendor_store_id?._id || "default",
            vendorName: selectedProduct.vendor_store_id?.store_name || "Last Minute Deal",
            price: selectedVariant.price.sale_price,
            mrp: selectedVariant.price.base_price,
            image: selectedVariant.images.find((img) => img.is_primary)?.url || selectedProduct.images[0]?.url,
            weight: selectedVariant.variant_name,
            quantity,
          },
        ]

        setSelectedItems(cartItemData)
        setSingleItem(false)
        await new Promise((resolve) => setTimeout(resolve, 500))
        toast.success("Item grabbed successfully!")
        router.push("/buy-now")
      } catch (error) {
        console.error("Error grabbing item:", error)
        toast.error("Failed to grab item. Please try again.")
      } finally {
        setGrabLoading(false)
      }
    }
  }

  const handleWishlistToggle = async () => {
    if (!session?.user?.token) {
      toast.error("Please login to save items to wishlist")
      return
    }

    const productId = selectedProduct._id || selectedProduct.id

    try {
      if (isInWishlist(productId)) {
        await removeItem(productId)
        toast.success("Removed from wishlist")
      } else {
        await addItem(productId)
        toast.success("Added to wishlist")
      }
    } catch (error) {
      toast.error(error.message || "Failed to update wishlist")
    }
  }

  const nextImage = () => {
    if (selectedVariant.images.length > 1) {
      const nextIndex = (imageIndex + 1) % selectedVariant.images.length
      setImageIndex(nextIndex)
      setSelectedImage(selectedVariant.images[nextIndex].url)
    }
  }

  const prevImage = () => {
    if (selectedVariant.images.length > 1) {
      const prevIndex = imageIndex === 0 ? selectedVariant.images.length - 1 : imageIndex - 1
      setImageIndex(prevIndex)
      setSelectedImage(selectedVariant.images[prevIndex].url)
    }
  }

  const productIdForWishlist = selectedProduct._id || selectedProduct.id
  const wishlistLoading = isProductLoading(productIdForWishlist)
  const discountPercentage = Math.round(
    ((selectedVariant.price.base_price - selectedVariant.price.sale_price) / selectedVariant.price.base_price) * 100,
  )

  const handleShare = async () => {
    const shareData = {
      title: selectedVariant.variant_name,
      text: `Check out this amazing product: ${selectedVariant.variant_name}`,
      url: window.location.href,
    }

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData)
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href)
        toast.success("Product link copied to clipboard!")
      }
    } catch (error) {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href)
        toast.success("Product link copied to clipboard!")
      } catch (clipboardError) {
        toast.error("Unable to share product")
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />
      <Toaster />

      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Breadcrumb Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 sm:px-6 lg:px-8 mt-6"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20">
            <Breadcrumb>
              <BreadcrumbList className="text-sm sm:text-base text-gray-700">
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="hover:text-blue-600 transition-colors flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={`/categories/${selectedProduct.category.slug}`}
                    className="hover:text-purple-600 transition-colors"
                  >
                    {selectedProduct.category.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-blue-600 font-medium truncate">{selectedProduct.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </motion.div>

        {/* Main Product Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="px-4 sm:px-6 lg:px-8 py-8"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Product Images Section */}
              <div className="lg:w-1/2 p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Thumbnail Images */}
                  <div className="flex sm:flex-col gap-2 order-2 sm:order-1">
                    <AnimatePresence>
                      {selectedVariant.images.map((img, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`h-16 w-16 sm:h-20 sm:w-20 relative border-2 cursor-pointer transition-all duration-300 rounded-xl overflow-hidden ${
                            selectedImage === img.url
                              ? "border-blue-500 shadow-lg ring-2 ring-blue-200"
                              : "border-gray-200 hover:border-blue-300"
                          }`}
                          onClick={() => {
                            setSelectedImage(img.url)
                            setImageIndex(idx)
                          }}
                        >
                          <Image
                            src={img.url || "/placeholder.svg"}
                            alt={`${selectedVariant.variant_name} - ${idx}`}
                            fill
                            className="object-cover"
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Main Product Image */}
                  <div className="relative flex-1 order-1 sm:order-2">
                    <motion.div
                      className="aspect-square w-full max-w-md mx-auto bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 relative overflow-hidden group"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setIsImageZoomed(!isImageZoomed)}
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={selectedImage}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: isImageZoomed ? 1.5 : 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.3 }}
                          className="w-full h-full cursor-zoom-in flex items-center justify-center"
                        >
                          <Image
                            src={selectedImage || "/placeholder.svg"}
                            alt={selectedVariant.variant_name}
                            width={400}
                            height={400}
                            className="object-contain max-w-full max-h-full p-4"
                          />
                        </motion.div>
                      </AnimatePresence>

                      {/* Image Navigation */}
                      {selectedVariant.images.length > 1 && (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation()
                              prevImage()
                            }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <ChevronLeft className="w-5 h-5 text-gray-700" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation()
                              nextImage()
                            }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <ChevronRight className="w-5 h-5 text-gray-700" />
                          </motion.button>
                        </>
                      )}

                      {/* Discount Badge */}
                      {discountPercentage > 0 && (
                        <motion.div
                          initial={{ scale: 0, rotate: -12 }}
                          animate={{ scale: 1, rotate: -12 }}
                          className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg"
                        >
                          -{discountPercentage}% OFF
                        </motion.div>
                      )}

                      {/* Quick Actions */}
                      <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={handleShare}
                          className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-white/20 flex items-center justify-center"
                        >
                          <Share2 className="w-5 h-5 text-gray-700" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-white/20 flex items-center justify-center"
                        >
                          <Eye className="w-5 h-5 text-gray-700" />
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Product Details Section */}
              <div className="lg:w-1/2 p-6 lg:p-8 bg-gradient-to-br from-white/50 to-blue-50/30">
                <div className="space-y-6">
                  {/* Product Title */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                      {selectedVariant.variant_name}
                    </h1>
                    <p className="text-gray-600 mt-2">by {selectedProduct.brand || "Last Minute Deal"}</p>
                  </motion.div>

                  {/* Rating Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-4"
                  >
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                        >
                          <Star
                            className={`w-5 h-5 ${
                              i < Math.floor(selectedProduct.rating?.average || 0)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        </motion.div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-semibold">{selectedProduct.rating?.average || "0"}</span>
                      <span className="text-gray-500">({selectedProduct.rating?.count || 0} Reviews)</span>
                    </div>
                  </motion.div>

                  {/* Price Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200"
                  >
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="text-sm text-gray-500 line-through">
                          MRP ₹{selectedVariant.price.base_price}
                        </div>
                        <div className="text-3xl font-bold text-green-600">₹{selectedVariant.price.sale_price}</div>
                      </div>
                      {discountPercentage > 0 && (
                        <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          Save {discountPercentage}%
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* Description */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <p className="text-gray-600 leading-relaxed">
                      {selectedProduct.description ||
                        `Experience the quality of ${selectedProduct.name} by ${
                          selectedProduct.brand || "Last Minute Deal"
                        }. This premium product offers excellent value and is available in the ${
                          selectedProduct.category?.name || "selected"
                        } category.`}
                    </p>
                  </motion.div>

                  {/* Quantity Selector */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-semibold text-gray-900">Quantity:</span>
                      <div className="flex items-center gap-3">
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                        >
                          <Minus className="w-4 h-4" />
                        </motion.button>
                        <motion.div
                          key={quantity}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          className="w-12 text-center font-semibold text-lg"
                        >
                          {quantity}
                        </motion.div>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                        >
                          <Plus className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <div className="bg-gradient-to-r from-gray-50 to-purple-50 rounded-2xl p-6 border border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-gray-600 text-sm">Total Amount</p>
                          <p className="text-2xl font-bold text-gray-900">
                            ₹{(selectedVariant.price.sale_price * quantity).toLocaleString()}
                          </p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={handleWishlistToggle}
                          disabled={wishlistLoading}
                          className="w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:shadow-xl transition-all duration-300"
                        >
                          {wishlistLoading ? (
                            <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
                          ) : (
                            <Heart
                              className={`w-6 h-6 transition-colors ${
                                isInWishlist(productIdForWishlist)
                                  ? "fill-red-500 text-red-500"
                                  : "text-gray-500 hover:text-red-500"
                              }`}
                            />
                          )}
                        </motion.button>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <motion.div whileTap={{ scale: 0.98 }} className="flex-1">
                          <Button
                            onClick={handleAddToCart}
                            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl text-lg font-semibold py-4 shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            <ShoppingCart className="w-5 h-5 mr-2" />
                            Add to Cart
                          </Button>
                        </motion.div>
                        <motion.div whileTap={{ scale: 0.98 }} className="flex-1">
                          <Button
                            onClick={handleGrab}
                            disabled={grabLoading}
                            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl text-lg font-semibold py-4 shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            {grabLoading ? (
                              <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Grabbing...
                              </>
                            ) : (
                              <>
                                <Zap className="w-5 h-5 mr-2" />
                                Grab Now
                              </>
                            )}
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Trust Badges */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {[
                        { icon: Shield, text: "Secure Payment", color: "text-green-600" },
                        { icon: Truck, text: "Free Delivery", color: "text-blue-600" },
                        { icon: RotateCcw, text: "Easy Returns", color: "text-purple-600" },
                        { icon: Award, text: "Quality Assured", color: "text-orange-600" },
                      ].map((badge, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.8 + index * 0.1 }}
                          className="flex flex-col items-center text-center p-3 bg-white/50 rounded-xl border border-gray-100"
                        >
                          <badge.icon className={`w-6 h-6 ${badge.color} mb-2`} />
                          <span className="text-xs font-medium text-gray-700">{badge.text}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Product Variants Section */}
        {selectedProduct.variants.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="px-4 sm:px-6 lg:px-8 mb-8"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Product Variants</h2>
                  <p className="text-gray-600">Choose your preferred variant</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <AnimatePresence>
                  {selectedProduct.variants.map((variant, index) => (
                    <motion.div
                      key={variant._id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedVariant(variant)
                        setSelectedImage(variant.images[0].url)
                        setImageIndex(0)
                        setQuantity(1) // Reset quantity when changing variants
                      }}
                      className={`relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 ${
                        selectedVariant._id === variant._id
                          ? "ring-2 ring-blue-500 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50"
                          : "bg-white hover:shadow-md border border-gray-200"
                      }`}
                    >
                      <div className="aspect-square relative">
                        <Image
                          src={variant.images[0].url || "/placeholder.svg"}
                          alt={variant.variant_name}
                          fill
                          className="object-cover"
                        />
                        {selectedVariant._id === variant._id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                          >
                            <Check className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-medium text-gray-900 text-center truncate">{variant.variant_name}</p>
                        <p className="text-xs text-gray-500 text-center mt-1">₹{variant.price.sale_price}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}

        {/* Product Information Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="px-4 sm:px-6 lg:px-8 mb-8"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
            {/* Tab Buttons */}
            <div className="flex flex-wrap gap-1 p-2 bg-gradient-to-r from-gray-50 to-purple-50 border-b border-gray-200">
              {[
                { id: "keyinfo", label: "Key Info", icon: Award },
                { id: "attributes", label: "Attributes", icon: Sparkles },
                { id: "specifications", label: "Specifications", icon: Shield },
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-white shadow-md text-blue-600 border border-blue-200"
                      : "text-gray-700 hover:bg-white/50"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </motion.button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6 lg:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === "keyinfo" && (
                    <div className="space-y-4">
                      {[
                        { label: "Type", value: selectedProduct.category.name },
                        {
                          label: "Description",
                          value:
                            selectedProduct.description ||
                            `Experience the quality of ${selectedProduct.name} by ${
                              selectedProduct.brand || "Last Minute Deal"
                            }.`,
                        },
                        { label: "Brand", value: selectedProduct.brand },
                        ...(selectedProduct.warranty ? [{ label: "Warranty", value: selectedProduct.warranty }] : []),
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex flex-col sm:flex-row sm:items-start gap-2 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100"
                        >
                          <span className="font-semibold text-gray-900 min-w-[120px]">{item.label}:</span>
                          <span className="text-gray-700">{item.value}</span>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {activeTab === "attributes" && (
                    <div className="space-y-4">
                      {selectedVariant.attributes?.length > 0 ? (
                        selectedVariant.attributes.map((attr, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col sm:flex-row sm:items-start gap-2 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100"
                          >
                            <span className="font-semibold text-gray-900 min-w-[120px]">{attr.name}:</span>
                            <span className="text-gray-700">{attr.value}</span>
                          </motion.div>
                        ))
                      ) : (
                        <div className="text-center py-12">
                          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                            <Sparkles className="w-8 h-8 text-gray-400" />
                          </div>
                          <p className="text-gray-500">No attributes available for this product</p>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === "specifications" && (
                    <div className="space-y-4">
                      {selectedProduct.specifications?.length > 0 ? (
                        selectedProduct.specifications.map((spec, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col sm:flex-row sm:items-start gap-2 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100"
                          >
                            <span className="font-semibold text-gray-900 min-w-[120px]">{spec.name}:</span>
                            <span className="text-gray-700">{spec.value}</span>
                          </motion.div>
                        ))
                      ) : (
                        <div className="text-center py-12">
                          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                            <Shield className="w-8 h-8 text-gray-400" />
                          </div>
                          <p className="text-gray-500">No specifications available for this product</p>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
