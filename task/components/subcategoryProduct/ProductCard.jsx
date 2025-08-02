"use client"
import React, { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/contexts/cart-context"
import { useRouter } from "next/navigation"
import { useProduct } from "@/lib/contexts/productContext"
import Image from "next/image"
import toast from "react-hot-toast"
import { useAuth } from "@/lib/hooks/useAuth"

const ProductCard = React.memo(({ product }) => {
  const { addToCart, isInCart, getItemQuantity, isProductLoading } = useCart()
  const router = useRouter()
  const { setSelectedProduct, setSelectedVariant } = useProduct()
  const [imageError, setImageError] = useState(false)
  const { isAuthenticated } = useAuth()

  const handleItemClick = () => {
    setSelectedProduct(product)
    setSelectedVariant(product.variants[0])
    router.push(`/product/${product._id || product.id}`)
  }

  const getVariantData = () => {
    const variant = product?.variants?.[0]
    if (!variant) return null
    const price = variant?.price?.base_price || variant.base_price || 100
    const sale_price = variant?.price?.sale_price || variant.sale_price || 0
    return {
      variant,
      price,
      sale_price,
      stock: variant.stock?.quantity || variant.available_quantity || 0,
      sku: variant.sku || "N/A",
    }
  }

  const getImageUrl = () => {
    if (!product.images || product.images.length === 0 || imageError) {
      return "/placeholder.svg?height=300&width=300"
    }
    const primaryImage = product.images.find((img) => img.is_primary) || product.images[0]
    return primaryImage?.url || "/placeholder.svg?height=300&width=300"
  }

  const handleImageError = (e) => {
    e.currentTarget.src = "/fallback.png"
    setImageError(true)
  }

  const handleAddToCart = async (e) => {
    e.stopPropagation()
    if (!isAuthenticated) {
      toast.error("Login to add products")
      router.push("/auth/login")
      return
    }
    const data = getVariantData()
    if (data?.variant && !isInCart(data.variant._id)) {
      try {
        await addToCart({
          id: data.variant._id,
          variant: data.variant,
          product,
          price: data.price,
          sale_price: data.sale_price,
          stock: data.stock,
          sku: data.sku,
        })
        toast.success("Added to Cart successfully")
      } catch (error) {
        toast.error(error.message || "Failed to add to cart")
      }
    } else if (isInCart(data.variant._id)) {
      toast.info("Item already in cart")
    } else {
      console.warn("No variant available for this product")
    }
  }

  const imageUrl = getImageUrl()
  const variantData = getVariantData()
  const displayPrice = variantData?.sale_price > 0 ? variantData.sale_price : variantData?.price || 100
  const originalPrice = variantData?.sale_price > 0 ? variantData.price : null
  const canAddToCart = variantData?.variant && variantData.stock > 0

  // Memoize cart-related values to prevent unnecessary re-renders
  const variantId = variantData?.variant?._id
  const isProductInCart = useMemo(() => isInCart(variantId), [isInCart, variantId])
  const cartItemQuantity = useMemo(() => getItemQuantity(variantId), [getItemQuantity, variantId])
  const isLoading = useMemo(() => isProductLoading(variantId), [isProductLoading, variantId])

  // Discount Percentage
  const discount = originalPrice ? Math.round(((originalPrice - displayPrice) / originalPrice) * 100) : 0

  // Memoize button text to prevent unnecessary re-renders
  const buttonText = useMemo(() => {
    if (isLoading) return "..."
    if (isProductInCart) return `${cartItemQuantity}`
    if (canAddToCart) return "ADD"
    return "OUT"
  }, [isLoading, isProductInCart, cartItemQuantity, canAddToCart])

  return (
    <Card
      className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-0 shadow-lg bg-white overflow-hidden rounded-2xl h-[340px] flex flex-col"
      onClick={handleItemClick}
    >
      <CardHeader className="p-0 relative overflow-hidden h-[180px]">
        <div className="relative w-full h-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={product.name}
            onError={handleImageError}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-110"
            quality={90}
            priority={false}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Discount Badge */}
          {discount > 0 && (
            <Badge className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white text-xs font-bold px-2 py-1 shadow-lg">
              {discount}% OFF
            </Badge>
          )}

          {/* Stock Status */}
          {variantData?.stock === 0 && (
            <Badge className="absolute top-3 right-3 bg-gray-800 text-white text-xs font-semibold">Out of Stock</Badge>
          )}

          {/* Enhanced Cart Button */}
          <div className="absolute bottom-3 right-3">
            {isProductInCart ? (
              <div className="flex items-center gap-1 bg-white/95 backdrop-blur-sm rounded-full shadow-xl border border-green-200 p-1">
                <div className="flex items-center px-2">
                  <ShoppingCart className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-xs font-bold text-green-600">{cartItemQuantity}</span>
                </div>
              </div>
            ) : (
              <Button
                className={`h-10 w-10 p-0 rounded-full shadow-xl transition-all duration-300 transform hover:scale-110 ${
                  canAddToCart
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                onClick={handleAddToCart}
                disabled={!canAddToCart || isLoading}
                aria-label={isProductInCart ? "Item in cart" : canAddToCart ? "Add to cart" : "Out of stock"}
              >
                {isLoading ? (
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <ShoppingCart className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <CardTitle className="text-sm font-bold line-clamp-2 text-gray-900 leading-tight">
            {variantData?.variant?.variant_name || product.name || <span className="text-gray-400">No name</span>}
          </CardTitle>

          <p className="text-xs text-gray-500 line-clamp-1">
            ({product.brand || <span className="text-gray-400">No brand</span>})
          </p>

          <p className="text-xs text-gray-400">
            By {product.vendor_store_id?.store_name || <span className="text-gray-400">Unknown Seller</span>}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <Star className="text-yellow-400 fill-yellow-400 h-4 w-4" />
              <p className="text-xs font-medium text-gray-600 ml-1">
                {product.rating?.average || 0} ({product.rating?.count || 0})
              </p>
            </div>
          </div>
        </div>

        <div className="mt-auto space-y-2">
          {/* Discount Badge */}
          <div className="min-h-[24px]">
            {discount > 0 ? (
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold">
                {discount}% OFF
              </Badge>
            ) : (
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-semibold">
                Best Price
              </Badge>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            {originalPrice && <p className="text-xs text-gray-400 line-through">₹{originalPrice}</p>}
            <p className="text-base font-bold text-green-600">
              {displayPrice ? `₹${displayPrice}` : <span className="text-gray-400">₹100</span>}
            </p>
          </div>

          {/* Stock Status */}
          {variantData?.stock === 0 && <p className="text-xs text-red-500 font-semibold">No stock</p>}
        </div>
      </CardContent>
    </Card>
  )
})

ProductCard.displayName = "ProductCard"
export default ProductCard
