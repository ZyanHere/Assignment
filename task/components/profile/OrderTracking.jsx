"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, Truck, CheckCircle, Clock, MapPin, Calendar, RefreshCw, Navigation, Sparkles } from "lucide-react"

const statusIcons = {
  pending: Clock,
  confirmed: CheckCircle,
  processing: Package,
  shipped: Truck,
  delivered: CheckCircle,
  cancelled: Clock,
  refunded: CheckCircle,
  failed: Clock,
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

export default function OrderTracking({ order, trackingData, onRefresh, trackingLoading = false }) {
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

  const formatStatus = (status) => {
    if (!status) return "Unknown"
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  const handleRefresh = async () => {
    if (onRefresh) {
      await onRefresh()
    }
  }

  if (!order) {
    return null
  }

  const currentStatus = trackingData?.status || order?.status || "pending"

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                    <Navigation className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
                      Order Tracking
                    </span>
                    <p className="text-sm text-gray-600 font-normal mt-1">Real-time order status updates</p>
                  </div>
                  <Sparkles className="w-6 h-6 text-purple-400" />
                </CardTitle>
                <Button
                  onClick={handleRefresh}
                  disabled={trackingLoading}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${trackingLoading ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-6 lg:p-8 space-y-8">
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
              {trackingData && !trackingLoading ? (
                <>
                  {/* Order Summary */}
                  <Card className="bg-gradient-to-r from-gray-50 to-slate-50 shadow-lg border-0">
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
                            <p className="text-gray-900 font-bold">{currentStatus}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Progress Bar */}
                  <Card className="bg-white shadow-lg border-0">
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-gray-900">Delivery Progress</span>
                          <span className="text-lg font-bold text-blue-600">
                            {trackingData.progress_percentage || getProgressPercentage(currentStatus)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
                          <motion.div
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full shadow-lg"
                            initial={{ width: 0 }}
                            animate={{
                              width: `${trackingData.progress_percentage || getProgressPercentage(currentStatus)}%`,
                            }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <Badge
                            className={`px-4 py-2 text-sm font-bold shadow-lg ${
                              statusColors[currentStatus] || statusColors.pending
                            }`}
                          >
                            {formatStatus(currentStatus)}
                          </Badge>
                          {trackingData.estimated_delivery_date && (
                            <div className="text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-full">
                              Estimated: {formatDate(trackingData.estimated_delivery_date)}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Tracking History */}
                  {trackingData.tracking_history && trackingData.tracking_history.length > 0 && (
                    <Card className="bg-white shadow-lg border-0">
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
                                        <p className="font-bold text-gray-900 text-lg">{formatStatus(event.status)}</p>
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
                </>
              ) : (
                !trackingLoading && (
                  /* Default tracking view when no tracking data is available */
                  <div className="space-y-6">
                    <Card className="bg-gradient-to-r from-gray-50 to-slate-50 shadow-lg border-0">
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                            <Calendar className="h-8 w-8 text-blue-500" />
                            <div>
                              <p className="text-sm font-semibold text-gray-700">Order Date</p>
                              <p className="text-gray-900 font-bold">{formatDate(order.created_at)}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                            <Package className="h-8 w-8 text-purple-500" />
                            <div>
                              <p className="text-sm font-semibold text-gray-700">Order Status</p>
                              <p className="text-gray-900 font-bold">{currentStatus}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                            <MapPin className="h-8 w-8 text-green-500" />
                            <div>
                              <p className="text-sm font-semibold text-gray-700">Payment Status</p>
                              <p className="text-gray-900 font-bold">{order.payment_status || "N/A"}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-white shadow-lg border-0">
                      <CardContent className="p-6">
                        <div className="space-y-6">
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-gray-900">Order Progress</span>
                            <span className="text-lg font-bold text-blue-600">
                              {getProgressPercentage(currentStatus)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
                            <motion.div
                              className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full shadow-lg"
                              initial={{ width: 0 }}
                              animate={{ width: `${getProgressPercentage(currentStatus)}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                            />
                          </div>
                          <div className="flex justify-between items-center">
                            <Badge
                              className={`px-4 py-2 text-sm font-bold shadow-lg ${
                                statusColors[currentStatus] || statusColors.pending
                              }`}
                            >
                              {formatStatus(currentStatus)}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-16"
                    >
                      <div className="p-8 bg-gradient-to-br from-gray-100 to-slate-100 rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                        <Package className="h-16 w-16 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Tracking Information Pending</h3>
                      <p className="text-gray-600">
                        Detailed tracking information will be available once your order is processed
                      </p>
                    </motion.div>
                  </div>
                )
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
