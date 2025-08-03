"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  Trash2,
  CreditCard,
  ShoppingCart,
  AlertCircle,
  RefreshCw,
  Plus,
  Minus,
  CheckCircle2,
  Package,
  ArrowRight,
  Sparkles,
  Heart,
  Share2,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Header from "@/components/home/Header"
import { useCart } from "@/lib/contexts/cart-context"
import { useSelectedItems } from "@/lib/contexts/selected-items-context"
import { useAuth } from "@/lib/hooks/useAuth"
import { useDiscount } from "@/lib/contexts/discount-context"
import DiscountCodeInput from "@/components/discount/DiscountCodeInput"
import DiscountSummary from "@/components/discount/DiscountSummary"
import HotelCartItem from "@/components/hotel/HotelCartItem"
import { isHotelBooking } from "@/lib/utils/hotelUtils"

export default function CartPage() {
  const { isAuthenticated } = useAuth()
  const {
    cart,
    isLoading,
    error,
    fetched,
    totalQuantity,
    totalAmount,
    updateQuantity,
    removeFromCart,
    clearCart,
    refreshCart,
    clearError,
    isInCart,
    getItemQuantity,
  } = useCart()

  const [selected, setSelected] = React.useState([])
  const [removingItems, setRemovingItems] = React.useState(new Set())
  const [updatingItems, setUpdatingItems] = React.useState(new Set())
  const { setSelectedItems } = useSelectedItems()
  const router = useRouter()

  // Discount system
  const { appliedDiscount, calculateDiscountAmount } = useDiscount()

  // Clear error when component mounts or error changes
  React.useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error, clearError])

  const toggleSelection = (id) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))

  const selectAll = (checked) => setSelected(checked ? cart.map((i) => i.cart_item_id || i.id) : [])

  const handleProceed = () => {
    setSelectedItems(cart.filter((i) => selected.includes(i.cart_item_id || i.id)))
    router.push("/buy-now")
  }

  const handleCheckout = (itemsToCheckout) => {
    if (itemsToCheckout.length === 0) {
      alert("Please select items to checkout")
      return
    }
    setSelectedItems(itemsToCheckout)
    router.push("/buy-now")
  }

  // Calculate totals
  const selectedItems = cart.filter((i) => selected.includes(i.cart_item_id || i.id))
  const vendorGroups = selectedItems.reduce((groups, item) => {
    const vendorId = item.vendorId || "default"
    if (!groups[vendorId]) {
      groups[vendorId] = {
        vendorName: item.vendorName || "Last Minute Deal",
        items: [],
        subtotal: 0,
      }
    }
    groups[vendorId].items.push(item)
    groups[vendorId].subtotal += item.price * item.quantity
    return groups
  }, {})

  const calculateSubtotal = (items) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  const calculateFinalTotal = (subtotal, discountAmount) => {
    return subtotal - discountAmount + 20
  }

  const selectedSubtotal = calculateSubtotal(selectedItems)
  const selectedDiscountAmount = calculateDiscountAmount(selectedSubtotal)
  const selectedTotal = calculateFinalTotal(selectedSubtotal, selectedDiscountAmount)

  const allItemsSubtotal = calculateSubtotal(cart)
  const allItemsDiscountAmount = calculateDiscountAmount(allItemsSubtotal)
  const allItemsTotal = calculateFinalTotal(allItemsSubtotal, allItemsDiscountAmount)

  const handleQuantityUpdate = async (variantId, change) => {
    setUpdatingItems((prev) => new Set(prev).add(variantId))

    try {
      const currentQuantity = getItemQuantity(variantId)
      const newQuantity = currentQuantity + change

      if (newQuantity <= 0) {
        setRemovingItems((prev) => new Set(prev).add(variantId))
        await removeFromCart(variantId)
        setRemovingItems((prev) => {
          const newSet = new Set(prev)
          newSet.delete(variantId)
          return newSet
        })
      } else {
        await updateQuantity(variantId, change)
      }
    } finally {
      setUpdatingItems((prev) => {
        const newSet = new Set(prev)
        newSet.delete(variantId)
        return newSet
      })
    }
  }

  const handleRemoveItem = async (variantId) => {
    setRemovingItems((prev) => new Set(prev).add(variantId))
    try {
      await removeFromCart(variantId)
      setSelected((prev) => prev.filter((id) => id !== variantId))
    } finally {
      setRemovingItems((prev) => {
        const newSet = new Set(prev)
        newSet.delete(variantId)
        return newSet
      })
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <Header />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 flex flex-col items-center justify-center p-8"
        >
          <div className="text-center max-w-md">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
            >
              <ShoppingCart className="w-12 h-12 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Your Cart</h2>
            <p className="text-gray-600 mb-8">Please sign in to view and manage your cart items</p>
            <Link href="/auth/login">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full">
                Sign In to Continue
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      <Header />

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Side - Products */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 sm:p-6 border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <ShoppingCart className="w-8 h-8 text-purple-600" />
                  {cart.length > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
                    >
                      <span className="text-white text-xs font-bold">{cart.length}</span>
                    </motion.div>
                  )}
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Shopping Cart
                  </h1>
                  <p className="text-gray-600 text-sm">
                    {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
                  </p>
                </div>
              </div>

              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={refreshCart}
                  disabled={isLoading}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 hover:bg-purple-50 hover:border-purple-200 bg-transparent"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                  <span className="hidden sm:inline">Refresh</span>
                </Button>
              </motion.div>
            </div>

            {/* Error Display */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                  <Button onClick={clearError} variant="ghost" size="sm">
                    ×
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Loading State */}
          {isLoading && !fetched && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex items-center justify-center p-8"
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
                >
                  <RefreshCw className="w-8 h-8 text-white" />
                </motion.div>
                <p className="text-gray-600">Loading your cart...</p>
              </div>
            </motion.div>
          )}

          {/* Empty Cart */}
          {fetched && cart.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 flex items-center justify-center p-8"
            >
              <div className="text-center max-w-md">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center"
                >
                  <Package className="w-16 h-16 text-gray-400" />
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
                <p className="text-gray-600 mb-8">Discover amazing products and add them to your cart</p>
                <Link href="/">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full">
                    Start Shopping
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}

          {/* Cart Items */}
          {fetched && cart.length > 0 && (
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 sm:p-6">
                {/* Mobile/Tablet View */}
                <div className="lg:hidden space-y-4">
                  <AnimatePresence>
                    {cart.map((item, index) => {
                      const isHotelItem = isHotelBooking(item)
                      const itemId = item.cart_item_id || item.id
                      const isRemoving = removingItems.has(item.variantId)
                      const isUpdating = updatingItems.has(item.variantId)

                      if (isHotelItem) {
                        return (
                          <motion.div
                            key={itemId}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: isRemoving ? 0.5 : 1, y: 0 }}
                            exit={{ opacity: 0, x: -100, height: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <HotelCartItem
                              item={item}
                              onQuantityChange={handleQuantityUpdate}
                              onRemove={handleRemoveItem}
                              isSelected={selected.includes(itemId)}
                              onToggleSelect={toggleSelection}
                            />
                          </motion.div>
                        )
                      }

                      return (
                        <motion.div
                          key={itemId}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: isRemoving ? 0.5 : 1, y: 0 }}
                          exit={{ opacity: 0, x: -100, height: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="relative"
                        >
                          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                            {/* Selection Indicator */}
                            <motion.div
                              className={`absolute inset-0 rounded-2xl border-2 transition-all duration-300 ${
                                selected.includes(itemId) ? "border-purple-500 bg-purple-50/30" : "border-transparent"
                              }`}
                              animate={{
                                borderColor: selected.includes(itemId) ? "#8b5cf6" : "transparent",
                                backgroundColor: selected.includes(itemId) ? "rgba(139, 92, 246, 0.05)" : "transparent",
                              }}
                            />

                            <div className="relative z-10">
                              <div className="flex items-start space-x-4 mb-4">
                                <motion.div whileTap={{ scale: 0.9 }} className="mt-1">
                                  <input
                                    type="checkbox"
                                    checked={selected.includes(itemId)}
                                    onChange={() => toggleSelection(itemId)}
                                    disabled={isLoading || isRemoving}
                                    className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                                  />
                                </motion.div>

                                <div className="relative">
                                  <Image
                                    src={item.image || "/placeholder.svg?height=80&width=80&query=product"}
                                    alt={item.name}
                                    width={80}
                                    height={80}
                                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover"
                                  />
                                  {selected.includes(itemId) && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center"
                                    >
                                      <CheckCircle2 className="w-4 h-4 text-white" />
                                    </motion.div>
                                  )}
                                </div>

                                <div className="flex-1 min-w-0">
                                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                                    {item.name}
                                  </h3>
                                  <p className="text-gray-500 text-xs sm:text-sm">By {item.brand}</p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <span className="text-lg font-bold text-purple-600">₹{item.price}</span>
                                    {item.originalPrice && item.originalPrice > item.price && (
                                      <span className="text-sm text-gray-400 line-through">₹{item.originalPrice}</span>
                                    )}
                                  </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                  <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                  >
                                    <Heart className="w-5 h-5" />
                                  </motion.button>
                                  <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                                  >
                                    <Share2 className="w-5 h-5" />
                                  </motion.button>
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleQuantityUpdate(item.variantId, -1)}
                                    disabled={isLoading || isUpdating || isRemoving}
                                    className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 disabled:opacity-50"
                                  >
                                    <Minus className="w-4 h-4" />
                                  </motion.button>

                                  <motion.div
                                    key={item.quantity}
                                    initial={{ scale: 1.2 }}
                                    animate={{ scale: 1 }}
                                    className="min-w-[3rem] text-center"
                                  >
                                    <span className="text-lg font-semibold">{isUpdating ? "..." : item.quantity}</span>
                                  </motion.div>

                                  <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleQuantityUpdate(item.variantId, 1)}
                                    disabled={isLoading || isUpdating || isRemoving}
                                    className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 disabled:opacity-50"
                                  >
                                    <Plus className="w-4 h-4" />
                                  </motion.button>
                                </div>

                                <div className="flex items-center space-x-4">
                                  <div className="text-right">
                                    <p className="text-lg font-bold text-gray-900">
                                      ₹{(item.price * item.quantity).toLocaleString()}
                                    </p>
                                    <p className="text-xs text-gray-500">Total</p>
                                  </div>

                                  <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleRemoveItem(item.variantId)}
                                    disabled={isLoading || isRemoving}
                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200 disabled:opacity-50"
                                  >
                                    {isRemoving ? (
                                      <RefreshCw className="w-5 h-5 animate-spin" />
                                    ) : (
                                      <Trash2 className="w-5 h-5" />
                                    )}
                                  </motion.button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </AnimatePresence>
                </div>

                {/* Desktop Table View */}
                <div className="hidden lg:block">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gradient-to-r from-purple-50 to-pink-50 border-b-0">
                          <TableHead className="w-12 py-4">
                            <motion.div whileTap={{ scale: 0.9 }}>
                              <input
                                type="checkbox"
                                checked={selected.length === cart.length && cart.length > 0}
                                onChange={(e) => selectAll(e.target.checked)}
                                disabled={isLoading}
                                className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                              />
                            </motion.div>
                          </TableHead>
                          <TableHead className="font-semibold text-gray-900">Product</TableHead>
                          <TableHead className="font-semibold text-gray-900">Price</TableHead>
                          <TableHead className="font-semibold text-gray-900 text-center">Quantity</TableHead>
                          <TableHead className="font-semibold text-gray-900">Total</TableHead>
                          <TableHead className="font-semibold text-gray-900">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <AnimatePresence>
                          {cart.map((item, index) => {
                            const isHotelItem = isHotelBooking(item)
                            const itemId = item.cart_item_id || item.id
                            const isRemoving = removingItems.has(item.variantId)
                            const isUpdating = updatingItems.has(item.variantId)

                            return (
                              <motion.tr
                                key={itemId}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: isRemoving ? 0.5 : 1, y: 0 }}
                                exit={{ opacity: 0, x: -100, height: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className={`border-b border-gray-50 hover:bg-gradient-to-r hover:from-purple-50/30 hover:to-pink-50/30 transition-all duration-300 ${
                                  selected.includes(itemId) ? "bg-gradient-to-r from-purple-50/50 to-pink-50/50" : ""
                                }`}
                              >
                                <TableCell className="py-6">
                                  <motion.div whileTap={{ scale: 0.9 }}>
                                    <input
                                      type="checkbox"
                                      checked={selected.includes(itemId)}
                                      onChange={() => toggleSelection(itemId)}
                                      disabled={isLoading || isRemoving}
                                      className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                                    />
                                  </motion.div>
                                </TableCell>
                                <TableCell className="py-6">
                                  <div className="flex items-center space-x-4">
                                    <div className="relative">
                                      <Image
                                        src={item.image || "/placeholder.svg?height=80&width=80&query=product"}
                                        alt={item.name}
                                        width={80}
                                        height={80}
                                        className="w-16 h-16 rounded-xl object-cover"
                                      />
                                      {selected.includes(itemId) && (
                                        <motion.div
                                          initial={{ scale: 0 }}
                                          animate={{ scale: 1 }}
                                          className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center"
                                        >
                                          <CheckCircle2 className="w-4 h-4 text-white" />
                                        </motion.div>
                                      )}
                                    </div>
                                    <div className="min-w-0">
                                      <h3 className="font-semibold text-gray-900 text-base">{item.name}</h3>
                                      <p className="text-gray-500 text-sm">By {item.brand}</p>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell className="py-6">
                                  <div className="flex items-center gap-2">
                                    <span className="text-lg font-semibold text-purple-600">
                                      ₹{item.price.toLocaleString()}
                                    </span>
                                    {item.originalPrice && item.originalPrice > item.price && (
                                      <span className="text-sm text-gray-400 line-through">
                                        ₹{item.originalPrice.toLocaleString()}
                                      </span>
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell className="py-6">
                                  <div className="flex items-center justify-center space-x-3">
                                    <motion.button
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => handleQuantityUpdate(item.variantId, -1)}
                                      disabled={isLoading || isUpdating || isRemoving}
                                      className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 disabled:opacity-50"
                                    >
                                      <Minus className="w-4 h-4" />
                                    </motion.button>

                                    <motion.div
                                      key={item.quantity}
                                      initial={{ scale: 1.2 }}
                                      animate={{ scale: 1 }}
                                      className="min-w-[3rem] text-center"
                                    >
                                      <span className="text-lg font-semibold">
                                        {isUpdating ? "..." : item.quantity}
                                      </span>
                                    </motion.div>

                                    <motion.button
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => handleQuantityUpdate(item.variantId, 1)}
                                      disabled={isLoading || isUpdating || isRemoving}
                                      className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 disabled:opacity-50"
                                    >
                                      <Plus className="w-4 h-4" />
                                    </motion.button>
                                  </div>
                                </TableCell>
                                <TableCell className="py-6">
                                  <span className="text-lg font-bold text-gray-900">
                                    ₹{(item.price * item.quantity).toLocaleString()}
                                  </span>
                                </TableCell>
                                <TableCell className="py-6">
                                  <div className="flex items-center space-x-2">
                                    <motion.button
                                      whileTap={{ scale: 0.9 }}
                                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200"
                                    >
                                      <Heart className="w-5 h-5" />
                                    </motion.button>
                                    <motion.button
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => handleRemoveItem(item.variantId)}
                                      disabled={isLoading || isRemoving}
                                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200 disabled:opacity-50"
                                    >
                                      {isRemoving ? (
                                        <RefreshCw className="w-5 h-5 animate-spin" />
                                      ) : (
                                        <Trash2 className="w-5 h-5" />
                                      )}
                                    </motion.button>
                                  </div>
                                </TableCell>
                              </motion.tr>
                            )
                          })}
                        </AnimatePresence>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Order Summary */}
        {fetched && cart.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-96 xl:w-[28rem] bg-white border-t lg:border-l lg:border-t-0 flex flex-col shadow-xl"
          >
            <div className="p-6 flex-1 overflow-y-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
              </div>

              {/* Discount Code Section */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6"
              >
                <DiscountCodeInput
                  cartDetails={{
                    total_amount: selected.length > 0 ? selectedSubtotal : allItemsSubtotal,
                    items: (selected.length > 0 ? selectedItems : cart).map((item) => ({
                      category: item.category || "General",
                      subcategory: item.subcategory || "",
                      quantity: item.quantity,
                      price: item.price,
                    })),
                  }}
                />
              </motion.div>

              {/* Selected Items Summary */}
              <AnimatePresence>
                {selected.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6"
                  >
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Selected Items ({selected.length})
                    </h3>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between text-gray-700">
                          <span>Subtotal</span>
                          <span className="font-semibold">₹{selectedSubtotal.toLocaleString()}</span>
                        </div>

                        <DiscountSummary subtotal={selectedSubtotal} />

                        <div className="flex justify-between text-gray-700">
                          <span>Transaction Fee</span>
                          <span className="font-semibold">₹20</span>
                        </div>

                        <div className="border-t border-purple-200 pt-3 flex justify-between font-bold text-lg">
                          <span>Total</span>
                          <span className="text-purple-600">₹{selectedTotal.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <motion.div whileTap={{ scale: 0.98 }}>
                          <Button
                            onClick={() => handleCheckout(selectedItems)}
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            {isLoading ? (
                              <>
                                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              <>
                                <CreditCard className="w-5 h-5 mr-2" />
                                Pay ₹{selectedTotal.toLocaleString()}
                                <ArrowRight className="w-5 h-5 ml-2" />
                              </>
                            )}
                          </Button>
                        </motion.div>

                        <motion.div whileTap={{ scale: 0.98 }}>
                          <Button
                            onClick={handleProceed}
                            disabled={isLoading}
                            variant="outline"
                            className="w-full py-3 rounded-xl border-2 border-purple-200 hover:bg-purple-50 transition-all duration-300 bg-transparent"
                          >
                            Continue Shopping
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* All Items Summary */}
              {cart.length > 0 && selected.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-6"
                >
                  <h3 className="text-lg font-semibold mb-4">All Items ({cart.length})</h3>

                  <div className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-2xl p-6 border border-gray-200">
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-gray-700">
                        <span>Subtotal</span>
                        <span className="font-semibold">₹{allItemsSubtotal.toLocaleString()}</span>
                      </div>

                      <DiscountSummary subtotal={allItemsSubtotal} />

                      <div className="flex justify-between text-gray-700">
                        <span>Transaction Fee</span>
                        <span className="font-semibold">₹20</span>
                      </div>

                      <div className="border-t border-gray-300 pt-3 flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span className="text-purple-600">₹{allItemsTotal.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <motion.div whileTap={{ scale: 0.98 }}>
                        <Button
                          onClick={() => handleCheckout(cart)}
                          disabled={isLoading}
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          {isLoading ? (
                            <>
                              <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <CreditCard className="w-5 h-5 mr-2" />
                              Checkout All ₹{allItemsTotal.toLocaleString()}
                              <ArrowRight className="w-5 h-5 ml-2" />
                            </>
                          )}
                        </Button>
                      </motion.div>

                      <motion.div whileTap={{ scale: 0.98 }}>
                        <Button
                          onClick={() => selectAll(true)}
                          disabled={isLoading}
                          variant="outline"
                          className="w-full py-3 rounded-xl border-2 border-purple-200 hover:bg-purple-50 transition-all duration-300"
                        >
                          Select All Items
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
