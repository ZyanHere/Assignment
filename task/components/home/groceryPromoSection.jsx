"use client"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchComprehensiveHomeData, fetchProductsByCategory } from "@/lib/redux/home/homeSlice" // Update this path
import { useCart } from "@/lib/contexts/cart-context" // Assuming this context exists
import Image from "next/image"
import { Button } from "../ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Check, Leaf, Clock, Tag } from "lucide-react" // Using Lucide React for icons
import { Skeleton } from "@/components/ui/skeleton" // Ensure Skeleton is imported

export default function GroceryPromoSection() {
  const dispatch = useDispatch()
  const { categories, productsByCategory, homeDataLoading, productsLoading } = useSelector((state) => state.home)
  const { addToCart, cart } = useCart() // Assuming useCart provides addToCart and cart

  // Fetch initial data
  useEffect(() => {
    dispatch(fetchComprehensiveHomeData())
  }, [dispatch])

  // Find Fruits and Vegetables category
  const fruitsVegCategory = categories.find(
    (cat) =>
      (cat.name?.toLowerCase().includes("fruits") && cat.name?.toLowerCase().includes("vegetables")) ||
      cat.name?.toLowerCase().includes("fruit") ||
      cat.name?.toLowerCase().includes("vegetable") ||
      cat.name?.toLowerCase() === "produce" ||
      cat.name?.toLowerCase() === "fresh",
  )
  const categoryId = fruitsVegCategory?._id || fruitsVegCategory?.id

  // Fetch products for Fruits and Vegetables category
  useEffect(() => {
    if (categoryId && !productsByCategory[categoryId] && !productsLoading[categoryId]) {
      dispatch(fetchProductsByCategory(categoryId))
    }
  }, [categoryId, productsByCategory, productsLoading, dispatch])

  // Get products for the category
  const categoryProducts = categoryId ? productsByCategory[categoryId] || [] : []

  // Normalize product data to match the component structure
  const mappedProducts =
    categoryProducts.length > 0
      ? categoryProducts.slice(0, 3).map((p) => {
          const variant = p.variants?.[0] || {}
          const basePrice = variant?.price?.base_price || p.price || p.originalPrice || 0
          const salePrice = variant?.price?.sale_price || p.salePrice || p.discountedPrice || basePrice
          return {
            id: p._id || p.id || `product-${Math.random()}`,
            name: p.name || p.title || "Unknown Product",
            brand: p.brand || p.manufacturer || "Fresh",
            seller: p.vendor_store_id?.store_name || p.seller || "Local Store",
            discountedPrice: salePrice,
            originalPrice: basePrice,
            image:
              variant?.images?.[0]?.url ||
              p.images?.[0]?.url ||
              p.image ||
              p.imageUrl ||
              "/placeholder.svg?height=100&width=100",
            weight:
              p.attributes?.find((attr) => attr.name?.toLowerCase() === "weight")?.value ||
              p.weight ||
              p.unit ||
              "1 kg",
            time: p.timing?.end_date || new Date(Date.now() + 12 * 60 * 60 * 1000),
            discount:
              basePrice && salePrice
                ? Math.round(((basePrice - salePrice) / basePrice) * 100)
                : Math.floor(Math.random() * 30) + 10, // Random discount 10-40% if not available
          }
        })
      : []

  // Check if we have no data
  const hasNoData = !homeDataLoading && (!categoryId || !productsLoading[categoryId]) && mappedProducts.length === 0

  // Show loading state
  if (homeDataLoading || (categoryId && productsLoading[categoryId])) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="rounded-3xl p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-green-50 to-lime-50 shadow-xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 lg:gap-8">
            <div className="flex-1 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="bg-white rounded-2xl p-4 shadow-md border border-gray-100">
                    <Skeleton className="w-full h-24 sm:h-28 lg:h-32 mb-3 rounded-xl bg-gray-200" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full rounded bg-gray-200" />
                      <Skeleton className="h-3 w-2/3 rounded bg-gray-200" />
                      <Skeleton className="h-3 w-1/2 rounded bg-gray-200" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0 w-full sm:w-[300px] lg:w-[320px] flex flex-col items-center lg:items-end">
              <Skeleton className="h-6 w-3/4 mb-2 rounded bg-gray-200" />
              <Skeleton className="h-8 w-full mb-4 rounded bg-gray-200" />
              <div className="flex gap-4 mb-4">
                <Skeleton className="h-16 w-16 rounded-full bg-gray-200" />
                <Skeleton className="h-16 w-16 rounded-full bg-gray-200" />
                <Skeleton className="h-16 w-16 rounded-full bg-gray-200" />
              </div>
              <Skeleton className="h-12 w-full rounded-full bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show "No data present" message
  if (hasNoData) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="rounded-3xl p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-green-50 to-lime-50 shadow-xl">
          <div className="flex items-center justify-center h-48">
            <div className="text-center">
              <p className="text-gray-600 text-xl font-semibold mb-2">No Fresh Produce Available</p>
              <p className="text-gray-500 text-sm max-w-md mx-auto">
                {!fruitsVegCategory
                  ? "The 'Fruits & Vegetables' category could not be found."
                  : "Currently, there are no products listed in this category. Please check back later!"}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="rounded-3xl p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-green-50 to-lime-50 shadow-xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 lg:gap-8">
          {/* Left - Product Cards Section */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {mappedProducts.map((product, index) => (
                <ProductCardMini key={product.id || index} product={product} addToCart={addToCart} cart={cart} />
              ))}
            </div>
          </div>
          {/* Right - Promo */}
          <div className="flex-shrink-0 flex flex-col justify-center items-center lg:items-end text-center lg:text-right w-full sm:w-[300px] lg:w-[320px] p-4 lg:p-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6"
            >
              <p className="font-semibold mb-2 text-base sm:text-lg text-lime-700 drop-shadow-sm">
                Get 10% OFF On Fresh Produce
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight drop-shadow-md">
                Fresh Fruits & Vegetables!
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex justify-center lg:justify-end gap-6 sm:gap-8 mb-8"
            >
              <div className="text-center flex flex-col items-center">
                <Leaf className="w-8 h-8 text-lime-600 mb-1" />
                <div className="text-xl sm:text-2xl font-bold text-gray-900">100+</div>
                <div className="text-xs sm:text-sm text-gray-600">Fresh Items</div>
              </div>
              <div className="text-center flex flex-col items-center">
                <Clock className="w-8 h-8 text-lime-600 mb-1" />
                <div className="text-xl sm:text-2xl font-bold text-gray-900">30</div>
                <div className="text-xs sm:text-sm text-gray-600">Minutes</div>
              </div>
              <div className="text-center flex flex-col items-center">
                <Tag className="w-8 h-8 text-lime-600 mb-1" />
                <div className="text-xl sm:text-2xl font-bold text-gray-900">25%</div>
                <div className="text-xs sm:text-sm text-gray-600">Up to offers</div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="w-full"
            >
              <Button
                className="cursor-pointer text-white px-8 py-3 rounded-full text-base sm:text-lg font-semibold flex items-center gap-2 transition-all duration-300 w-full sm:w-auto justify-center
                bg-gradient-to-r from-lime-600 to-green-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
                onClick={() => {
                  console.log("Navigate to category:", fruitsVegCategory?.name)
                }}
              >
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </div>
        {/* Optional: Add a background image or pattern for more visual interest */}
        <div className="absolute inset-0 -z-10 opacity-10">
          <Image src="/placeholder.svg?height=600&width=1200" alt="Background pattern" fill className="object-cover" />
        </div>
      </div>
    </div>
  )
}

// Mini Product Card Component
const ProductCardMini = ({ product, addToCart, cart }) => {
  const isInCart = cart.some((item) => item.id === product.id)
  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart({
        id: product.id,
        name: product.name,
        brand: product.brand,
        seller: product.seller,
        price: product.discountedPrice,
        mrp: product.originalPrice,
        image: product.image,
        weight: product.weight || "1 unit",
      })
    }
  }

  const imageSrc =
    product.image && typeof product.image === "string" && product.image.trim() !== ""
      ? product.image
      : "/placeholder.svg?height=100&width=100" // Improved fallback

  return (
    <motion.div
      className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col items-center text-center relative overflow-hidden group"
      whileHover={{ scale: 1.03, boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Product Image */}
      <div className="relative bg-gray-50 rounded-xl h-28 sm:h-32 lg:h-36 w-full flex items-center justify-center mb-3 overflow-hidden">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={product.name || "Product image"}
          width={120}
          height={90}
          className="object-contain max-w-full max-h-full transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = "/placeholder.svg?height=100&width=100"
          }}
        />
        <motion.button
          onClick={handleAddToCart}
          disabled={!product.id}
          className={`absolute bottom-2 right-2 px-3 py-1 text-sm font-medium rounded-md transition-all duration-300 shadow-md
            ${
              isInCart
                ? "bg-green-100 text-green-700 border border-green-400 hover:bg-green-200"
                : "bg-white text-lime-600 border border-lime-400 hover:bg-lime-50"
            }`}
          aria-label={isInCart ? "Item added to cart" : "Add item to cart"}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isInCart ? <Check className="w-4 h-4" /> : "ADD"}
        </motion.button>
      </div>
      {/* Product Info */}
      <div className="flex-grow flex flex-col justify-between w-full px-2">
        <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
        <p className="text-xs text-gray-500 mb-2">({product.brand})</p>
        <div className="mb-3">
          <p className="text-sm sm:text-base font-bold text-green-600 mb-1">{product.discount}% OFF</p>
        </div>
        <div className="mb-3">
          <p className="text-xs text-gray-400 line-through">MRP: ₹{product.originalPrice}</p>
          <p className="text-base sm:text-lg font-extrabold text-gray-900">₹{product.discountedPrice}</p>
        </div>
      </div>
    </motion.div>
  )
}
