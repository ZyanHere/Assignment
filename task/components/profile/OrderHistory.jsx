"use client"
import OrderCard from "./OrderCard"
import OrderTrackingModal from "./OrderTrackingModal"
import { Search, RefreshCw, ShoppingBag, Package } from "lucide-react"
import { useState, useMemo } from "react"
import { useDispatch } from "react-redux"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  fetchUserOrders,
  fetchOrderTracking,
  refreshOrderTracking,
  clearOrderTracking,
} from "@/lib/redux/user/userSlice"
import { useAuth } from "@/lib/hooks/useAuth"
import toast from "react-hot-toast"
import { motion, AnimatePresence } from "framer-motion"

const OrderHistory = () => {
  const dispatch = useDispatch()
  const {
    orders,
    ordersLoading,
    ordersError,
    orderTracking,
    trackingLoading,
    trackingError,
    isAuthenticated,
    session,
  } = useAuth()

  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [trackingModalOpen, setTrackingModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)

  const filteredOrders = useMemo(() => {
    if (!Array.isArray(orders)) {
      return []
    }
    return orders.filter((order) => {
      const matchesSearch =
        order.order_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.order_id?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = filter === "all" || order.status === filter
      return matchesSearch && matchesFilter
    })
  }, [orders, searchTerm, filter])

  const handleRefresh = async () => {
    if (!isAuthenticated || !session?.user?.token) {
      toast.error("Authentication required")
      return
    }

    setIsRefreshing(true)
    try {
      await dispatch(fetchUserOrders({ token: session.user.token })).unwrap()
      toast.success("Orders refreshed successfully")
    } catch (error) {
      console.error("Failed to refresh orders:", error)
      toast.error(error || "Failed to refresh orders")
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleTrackOrder = async (order) => {
    if (!isAuthenticated || !session?.user?.token) {
      toast.error("Authentication required")
      return
    }

    setSelectedOrder(order)
    setTrackingModalOpen(true)

    try {
      const orderId = order.order_id
      if (!orderId) {
        throw new Error("Order ID not found")
      }

      await dispatch(
        fetchOrderTracking({
          token: session.user.token,
          orderId,
        }),
      ).unwrap()
    } catch (error) {
      console.error("Error fetching tracking data:", error)
      toast.error(error || "Failed to load tracking information")
      setTrackingModalOpen(false)
    }
  }

  const handleRefreshTracking = async () => {
    if (!selectedOrder || !session?.user?.token) return

    try {
      await dispatch(
        refreshOrderTracking({
          token: session.user.token,
          orderId: selectedOrder.order_id,
        }),
      ).unwrap()

      toast.success("Tracking information updated")
    } catch (error) {
      console.error("Error refreshing tracking data:", error)
      toast.error(error || "Failed to refresh tracking information")
    }
  }

  const closeTrackingModal = () => {
    setTrackingModalOpen(false)
    setSelectedOrder(null)
    if (selectedOrder?.order_id) {
      dispatch(clearOrderTracking(selectedOrder.order_id))
    }
  }

  const getTrackingData = () => {
    if (!selectedOrder?.order_id) return null
    return orderTracking[selectedOrder.order_id] || null
  }

  if (!isAuthenticated) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0">
          <CardContent className="text-center py-16">
            <div className="p-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center">
              <ShoppingBag className="h-16 w-16 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h3>
            <p className="text-gray-600 text-lg">Please log in to view your orders</p>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  if (ordersError && !ordersLoading) {
    return (
      <div className="space-y-6">
        <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Order History</h1>
                <p className="text-gray-600">View and manage your past orders</p>
              </div>
              <Button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
          <CardContent className="text-center py-16">
            <div className="text-red-500 mb-6">
              <div className="p-8 bg-gradient-to-br from-red-100 to-pink-100 rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                <ShoppingBag className="h-16 w-16" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Failed to Load Orders</h3>
              <p className="text-lg">{ordersError}</p>
            </div>
            <Button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (ordersLoading && orders.length === 0) {
    return (
      <div className="space-y-6">
        <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Order History</h1>
                <p className="text-gray-600">View and manage your past orders</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
          <CardContent className="flex items-center justify-center py-16">
            <div className="flex items-center gap-3 text-lg">
              <RefreshCw className="h-6 w-6 animate-spin text-blue-500" />
              <span className="text-gray-700">Loading orders...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Order History</h1>
                <p className="text-gray-600">View and manage your past orders</p>
              </div>
            </div>

            <Button
              onClick={handleRefresh}
              disabled={isRefreshing || ordersLoading}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>

          {/* Enhanced Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by order number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 bg-white/50 backdrop-blur-sm"
            />
          </div>

          {/* Enhanced Filter Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {[
                { value: "all", label: "All Orders", icon: "📦" },
                { value: "completed", label: "Completed", icon: "✅" },
                { value: "pending", label: "Pending", icon: "⏳" },
                { value: "shipped", label: "Shipped", icon: "🚚" },
                { value: "cancelled", label: "Cancelled", icon: "❌" },
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setFilter(tab.value)}
                  className={`py-3 px-1 border-b-2 font-semibold text-sm whitespace-nowrap transition-all ${
                    filter === tab.value
                      ? "border-purple-500 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Orders List */}
      <div className="space-y-6">
        <AnimatePresence>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order, index) => (
              <motion.div
                key={order._id || order.order_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <OrderCard
                  order={{
                    id: order.order_number || order.order_id,
                    order_id: order.order_id,
                    storeName: order.vendor_orders?.[0]?.vendor_store_id?.store_name || "Last Minute Deal",
                    status: order.status,
                    date: new Date(order.created_at || order.createdAt).toLocaleDateString(),
                    total: `₹${order.total_amount || 0}`,
                    vendorOrders: order.vendor_orders || [],
                    isMultiVendor: (order.vendor_orders || []).length > 1,
                    items:
                      order.items?.map((item) => ({
                        product: item.product_name || item.name,
                        productImage:
                          item.product_image?.url || item.product_image || "/placeholder.svg?height=64&width=64",
                        brand: item.brand || "LMD",
                        quantity: item.quantity,
                        price: item.unit_price || item.price,
                        totalPrice: item.final_price || item.unit_price * item.quantity,
                        status: item.status || order.status,
                        vendorStoreName: item.vendor_store_name,
                        vendorOrderId: item.vendor_order_id,
                        actionLabel: order.status === "delivered" ? "Review" : "Review",
                      })) || [],
                  }}
                  onTrackOrder={handleTrackOrder}
                />
              </motion.div>
            ))
          ) : orders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
                <CardContent className="text-center py-16">
                  <div className="p-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                    <ShoppingBag className="h-16 w-16 text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">No orders yet</h3>
                  <p className="text-gray-600 mb-8 text-lg">Start shopping to see your orders here</p>
                  <Button
                    onClick={() => (window.location.href = "/")}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all px-8 py-3 text-lg"
                  >
                    Start Shopping
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
                <CardContent className="text-center py-16">
                  <div className="p-8 bg-gradient-to-br from-gray-100 to-slate-100 rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                    <Search className="h-16 w-16 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">No orders found</h3>
                  <p className="text-gray-600 text-lg">Try adjusting your search or filter criteria</p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={trackingModalOpen}
        onClose={closeTrackingModal}
        order={selectedOrder}
        trackingData={getTrackingData()}
        onRefresh={handleRefreshTracking}
        trackingLoading={trackingLoading}
      />

      {/* Enhanced Loading Indicator */}
      {(isRefreshing || ordersLoading) && orders.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 text-sm font-medium">
                <RefreshCw className="h-5 w-5 animate-spin text-blue-500" />
                <span className="text-gray-700">Updating orders...</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}

export default OrderHistory
