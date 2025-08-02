"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Image from "next/image"
import { ShoppingBag, MessageSquare, Star, Truck, Eye, Package, Calendar, CreditCard } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function OrderCard({ order, customButtons = null, onTrackOrder = null }) {
  const router = useRouter()
  const { storeName, status, items } = order

  const statusConfig = {
    pending: {
      text: "Pending",
      class: "bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border-yellow-200",
      icon: "⏳",
    },
    confirmed: {
      text: "Confirmed",
      class: "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200",
      icon: "✅",
    },
    processing: {
      text: "Processing",
      class: "bg-gradient-to-r from-purple-100 to-violet-100 text-purple-800 border-purple-200",
      icon: "⚙️",
    },
    shipped: {
      text: "Shipped",
      class: "bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-800 border-indigo-200",
      icon: "🚚",
    },
    delivered: {
      text: "Delivered",
      class: "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200",
      icon: "📦",
    },
    completed: {
      text: "Completed",
      class: "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200",
      icon: "🎉",
    },
    cancelled: {
      text: "Cancelled",
      class: "bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-red-200",
      icon: "❌",
    },
    refunded: {
      text: "Refunded",
      class: "bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-800 border-orange-200",
      icon: "💰",
    },
    failed: {
      text: "Failed",
      class: "bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-red-200",
      icon: "⚠️",
    },
  }[status] || {
    text: "Processing",
    class: "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200",
    icon: "⚙️",
  }

  const handleCardClick = (e) => {
    if (e.target.closest("button") || e.target.closest("[data-action]")) {
      return
    }
    router.push(`/orders/${order.order_id}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
    >
      <Card
        className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-white to-gray-50"
        onClick={handleCardClick}
      >
        {/* Enhanced Header */}
        <CardHeader className="bg-gradient-to-r from-slate-50 via-white to-slate-50 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-lg text-gray-900">{storeName}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Package className="w-4 h-4" />
                  <span>Order #{order.order_id}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span>{order.date}</span>
                </div>
                {order.isMultiVendor && (
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold">
                      Multi-Vendor
                    </Badge>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {order.vendorOrders.length} vendor{order.vendorOrders.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="text-right space-y-2">
              <Badge className={cn("px-4 py-2 text-sm font-bold border shadow-sm", statusConfig.class)}>
                <span className="mr-2">{statusConfig.icon}</span>
                {statusConfig.text}
              </Badge>
              <div className="flex items-center gap-2 text-lg font-bold text-green-600">
                <CreditCard className="w-5 h-5" />
                <span>{order.total}</span>
              </div>
            </div>
          </div>
        </CardHeader>

        {/* Enhanced Vendor Breakdown */}
        {order.isMultiVendor && (
          <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-b">
            <h4 className="text-sm font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Truck className="w-4 h-4" />
              Vendor Breakdown
            </h4>
            <div className="grid gap-3">
              {order.vendorOrders.map((vendorOrder, index) => (
                <motion.div
                  key={index}
                  className="flex justify-between items-center p-4 bg-white rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="space-y-1">
                    <p className="font-semibold text-gray-900">{vendorOrder.vendor_store_id?.store_name || "Vendor"}</p>
                    <p className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full inline-block">
                      Order: {vendorOrder.vendor_order_number}
                    </p>
                  </div>
                  <div className="text-right space-y-2">
                    <p className="text-lg font-bold text-green-600">
                      ₹{Number(vendorOrder.total_amount?.$numberDecimal || vendorOrder.total_amount || 0)}
                    </p>
                    <Badge
                      className={cn("text-xs px-3 py-1", {
                        "bg-yellow-100 text-yellow-800": vendorOrder.status === "pending",
                        "bg-blue-100 text-blue-800": vendorOrder.status === "confirmed",
                        "bg-purple-100 text-purple-800": vendorOrder.status === "processing",
                        "bg-indigo-100 text-indigo-800": vendorOrder.status === "shipped",
                        "bg-green-100 text-green-800": vendorOrder.status === "delivered",
                        "bg-red-100 text-red-800": vendorOrder.status === "cancelled",
                      })}
                    >
                      {vendorOrder.status}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Items Table */}
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gradient-to-r from-gray-50 to-slate-50">
                <TableRow className="border-b border-gray-200">
                  <TableHead className="font-bold text-gray-900 py-4">Product</TableHead>
                  <TableHead className="font-bold text-gray-900 text-center">Qty</TableHead>
                  <TableHead className="font-bold text-gray-900 text-center">Unit Price</TableHead>
                  <TableHead className="font-bold text-gray-900 text-center">Total</TableHead>
                  <TableHead className="font-bold text-gray-900 text-center">Status</TableHead>
                  {order.isMultiVendor && <TableHead className="font-bold text-gray-900 text-center">Vendor</TableHead>}
                  <TableHead className="font-bold text-gray-900 text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item, index) => (
                  <TableRow
                    key={index}
                    className={cn(
                      "hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-colors",
                      index !== items.length - 1 ? "border-b border-gray-100" : "",
                    )}
                  >
                    <TableCell className="py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-md">
                          <Image
                            src={item.productImage || "/placeholder.svg?height=64&width=64"}
                            alt={item.product}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="space-y-1">
                          <div className="font-semibold text-gray-900 line-clamp-2">{item.product}</div>
                          <div className="text-sm text-gray-600">{item.brand}</div>
                          {item.vendorStoreName && (
                            <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full inline-block">
                              From {item.vendorStoreName}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-semibold">{item.quantity}</TableCell>
                    <TableCell className="text-center font-semibold text-green-600">₹{item.price}</TableCell>
                    <TableCell className="text-center font-bold text-green-600">
                      ₹{item.totalPrice || item.price * item.quantity}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        className={cn("px-3 py-1 text-xs font-semibold", {
                          "bg-yellow-100 text-yellow-800": item.status === "pending",
                          "bg-blue-100 text-blue-800": item.status === "confirmed",
                          "bg-purple-100 text-purple-800": item.status === "processing",
                          "bg-indigo-100 text-indigo-800": item.status === "shipped",
                          "bg-green-100 text-green-800": item.status === "delivered",
                          "bg-red-100 text-red-800": item.status === "cancelled",
                        })}
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    {order.isMultiVendor && (
                      <TableCell className="text-center">
                        <div className="text-xs space-y-1">
                          <div className="font-semibold text-gray-700">{item.vendorStoreName}</div>
                          <div className="text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{item.vendorOrderId}</div>
                        </div>
                      </TableCell>
                    )}
                    <TableCell className="text-center">
                      <Button
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
                        data-action="true"
                        size="sm"
                      >
                        {item.actionLabel}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>

        {/* Enhanced Footer */}
        <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50 p-6 border-t border-gray-100">
          <div className="flex flex-wrap justify-end gap-3">
            {customButtons || (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    router.push(`/orders/${order.order_id}`)
                  }}
                  className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                  data-action="true"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </Button>

                {status === "completed" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 hover:bg-yellow-50 hover:border-yellow-300 transition-colors bg-transparent"
                    data-action="true"
                  >
                    <Star className="w-4 h-4" />
                    Leave Review
                  </Button>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 hover:bg-green-50 hover:border-green-300 transition-colors bg-transparent"
                  data-action="true"
                >
                  <MessageSquare className="w-4 h-4" />
                  Contact Seller
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
