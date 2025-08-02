"use client"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, Truck, CheckCircle, Clock, MapPin, Calendar, X, RefreshCw, Sparkles, Navigation } from "lucide-react"

const statusIcons = {
  pending: Clock,
  confirmed: CheckCircle,
  processing: Package,
  shipped: Truck,
  delivered: CheckCircle,
  cancelled: X,
  refunded: CheckCircle,
  failed: X,
}

const statusColors = {
  pending: "bg-gradient-to-r from-yellow-500 to-amber-500 text-white border-yellow-300",
  confirmed: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-blue-300",
  processing: "bg-gradient-to-r from-purple-500 to-violet-500 text-white border-purple-300",
  shipped: "bg-gradient-to-r from-indigo-500 to-blue-500 text-white border-indigo-300",
  delivered: "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-green-300",
  cancelled: "bg-gradient-to-r from-red-500 to-pink-500 text-white border-red-300",
  refunded: "bg-gradient-to-r from-orange-500 to-yellow-500 text-white border-orange-300",
  failed: "bg-gradient-to-r from-red-500 to-pink-500 text-white border-red-300",
}

export default function OrderTrackingModal({
  isOpen,
  onClose,
  order,
  trackingData,
  onRefresh,
  trackingLoading = false,
}) {
  const getProgressPercentage = (status) => {
    const progressMap = {
      pending: 10,
      confirmed: 20,
      processing: 40,
      shipped: 70,
      delivered: 100,
      cancelled: 0,
      refunded: 100,
      failed: 0,
    }
    return progressMap[status] || 0
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleRefresh = async () => {
    if (onRefresh) {
      await onRefresh()
    }
  }

  if (!order || !isOpen) {
    return null
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
              onClick={onClose}
            />

            {/* Modal panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Enhanced Header */}
              <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 px-6 py-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                      <Navigation className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Order Tracking
                      </h3>
                      <p className="text-gray-600 mt-1">#{order.order_number || order.id}</p>
                      <p className="text-sm text-gray-500 mt-1">Track your order from placement to delivery</p>
                    </div>
                    <Sparkles className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="flex gap-3">
                    <Button
                      onClick={handleRefresh}
                      disabled={trackingLoading}
                      variant="outline"
                      className="hover:bg-blue-50 hover:border-blue-300 transition-colors bg-transparent"
                    >
                      <RefreshCw className={`h-4 w-4 mr-2 ${trackingLoading ? "animate-spin" : ""}`} />
                      Refresh
                    </Button>
                    <Button
                      onClick={onClose}
                      variant="outline"
                      className="hover:bg-gray-50 transition-colors bg-transparent"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="px-6 py-6 space-y-6 bg-gradient-to-br from-gray-50 to-white">
                {/* Loading State */}
                {trackingLoading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                    <div className="p-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                      <RefreshCw className="h-16 w-16 text-blue-500 animate-spin" />
                    </div>
                    <p className="text-gray-600 text-lg">Loading tracking information...</p>
                  </motion.div>
                )}

                {/* Content when tracking data is available */}
                {trackingData && !trackingLoading && (
                  <>
                    {/* Order Summary */}
                    <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
                      <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 border-b">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Package className="w-5 h-5 text-blue-500" />
                          Order Summary
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                            <Calendar className="h-8 w-8 text-blue-500" />
                            <div>
                              <p className="text-sm font-semibold text-gray-700">Order Date</p>
                              <p className="text-gray-900 font-bold">
                                {formatDate(trackingData.created_at || order.created_at)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                            <Package className="h-8 w-8 text-purple-500" />
                            <div>
                              <p className="text-sm font-semibold text-gray-700">Total Items</p>
                              <p className="text-gray-900 font-bold">{trackingData.items?.length || 0} items</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                            <MapPin className="h-8 w-8 text-green-500" />
                            <div>
                              <p className="text-sm font-semibold text-gray-700">Order Status</p>
                              <p className="text-gray-900 font-bold">{trackingData.status || order.status}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Progress Bar */}
                    <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
                      <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 border-b">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Truck className="w-5 h-5 text-indigo-500" />
                          Delivery Progress
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-6">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold text-gray-700">Order Progress</span>
                            <span className="text-sm font-bold text-blue-600">
                              {trackingData.progress_percentage ||
                                getProgressPercentage(trackingData.status || order.status)}
                              %
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
                            <motion.div
                              className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full shadow-lg"
                              initial={{ width: 0 }}
                              animate={{
                                width: `${
                                  trackingData.progress_percentage ||
                                  getProgressPercentage(trackingData.status || order.status)
                                }%`,
                              }}
                              transition={{ duration: 1, ease: "easeOut" }}
                            />
                          </div>
                          <div className="flex justify-between items-center">
                            <Badge
                              className={`px-4 py-2 text-sm font-bold shadow-lg ${
                                statusColors[trackingData.status || order.status] || statusColors.pending
                              }`}
                            >
                              {(trackingData.status || order.status).charAt(0).toUpperCase() +
                                (trackingData.status || order.status).slice(1)}
                            </Badge>
                            {trackingData.estimated_delivery_date && (
                              <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                                Estimated: {formatDate(trackingData.estimated_delivery_date)}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Tracking History */}
                    {trackingData.tracking_history && trackingData.tracking_history.length > 0 && (
                      <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
                        <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 border-b">
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <Clock className="w-5 h-5 text-orange-500" />
                            Tracking History
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                          <div className="space-y-6">
                            {trackingData.tracking_history.map((event, index) => {
                              const IconComponent = statusIcons[event.status] || Clock
                              return (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  className="flex gap-6"
                                >
                                  <div className="flex flex-col items-center">
                                    <div
                                      className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                                        statusColors[event.status] || statusColors.pending
                                      }`}
                                    >
                                      <IconComponent className="h-6 w-6" />
                                    </div>
                                    {index < trackingData.tracking_history.length - 1 && (
                                      <div className="w-1 h-12 bg-gradient-to-b from-gray-300 to-gray-200 mt-3 rounded-full" />
                                    )}
                                  </div>
                                  <div className="flex-1 pb-6">
                                    <div className="bg-gradient-to-r from-white to-gray-50 p-4 rounded-xl shadow-md">
                                      <div className="flex justify-between items-start mb-2">
                                        <div>
                                          <p className="font-bold text-gray-900 text-lg">
                                            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                          </p>
                                          <p className="text-gray-600 mt-1">{event.description}</p>
                                          {event.location && (
                                            <p className="text-sm text-blue-600 mt-2 flex items-center gap-1">
                                              <MapPin className="w-4 h-4" />
                                              {event.location}
                                            </p>
                                          )}
                                          {event.tracking_number && (
                                            <p className="text-sm text-purple-600 mt-1 bg-purple-50 px-2 py-1 rounded-lg inline-block">
                                              Tracking: {event.tracking_number}
                                            </p>
                                          )}
                                        </div>
                                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                          {formatDate(event.timestamp)}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              )
                            })}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Order Items */}
                    {trackingData.items && trackingData.items.length > 0 && (
                      <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
                        <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 border-b">
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <Package className="w-5 h-5 text-green-500" />
                            Order Items
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                          <div className="grid gap-4">
                            {trackingData.items.map((item, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center justify-between p-4 bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                              >
                                <div className="flex items-center gap-4">
                                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center shadow-md">
                                    <Package className="h-8 w-8 text-blue-500" />
                                  </div>
                                  <div>
                                    <p className="font-bold text-gray-900">{item.product_name}</p>
                                    <p className="text-sm text-gray-600">
                                      Qty: {item.quantity} • {item.vendor_store}
                                    </p>
                                    {item.tracking_number && (
                                      <p className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-lg inline-block mt-1">
                                        Tracking: {item.tracking_number}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <Badge
                                  className={`px-3 py-1 text-xs font-semibold shadow-md ${
                                    statusColors[item.status] || statusColors.pending
                                  }`}
                                >
                                  {item.status}
                                </Badge>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Vendor Orders */}
                    {trackingData.vendor_orders && trackingData.vendor_orders.length > 0 && (
                      <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
                        <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 border-b">
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <Truck className="w-5 h-5 text-purple-500" />
                            Vendor Orders
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                          <div className="grid gap-4">
                            {trackingData.vendor_orders.map((vendorOrder, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-4 bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-xl shadow-md"
                              >
                                <div className="flex justify-between items-start mb-3">
                                  <div>
                                    <p className="font-bold text-gray-900">{vendorOrder.vendor_store}</p>
                                    <p className="text-sm text-gray-600">Order: {vendorOrder.vendor_order_number}</p>
                                  </div>
                                  <Badge
                                    className={`px-3 py-1 text-xs font-semibold shadow-md ${
                                      statusColors[vendorOrder.status] || statusColors.pending
                                    }`}
                                  >
                                    {vendorOrder.status}
                                  </Badge>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                  <span className="text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                                    Progress: {vendorOrder.progress_percentage}%
                                  </span>
                                  {vendorOrder.estimated_delivery_date && (
                                    <span className="text-gray-600 bg-blue-50 px-2 py-1 rounded-full">
                                      Est. Delivery: {formatDate(vendorOrder.estimated_delivery_date)}
                                    </span>
                                  )}
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
