"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ShoppingBag, MessageSquare, Star } from "lucide-react";

export default function OrderCard({ order, customButtons = null }) {
  const { storeName, status, items } = order;

  const statusVariant = {
    pending: { text: "Pending", class: "bg-yellow-100 text-yellow-800" },
    confirmed: { text: "Confirmed", class: "bg-blue-100 text-blue-800" },
    processing: { text: "Processing", class: "bg-purple-100 text-purple-800" },
    shipped: { text: "Shipped", class: "bg-indigo-100 text-indigo-800" },
    delivered: { text: "Delivered", class: "bg-green-100 text-green-800" },
    completed: { text: "Completed", class: "bg-green-100 text-green-800" },
    cancelled: { text: "Cancelled", class: "bg-red-100 text-red-800" },
    refunded: { text: "Refunded", class: "bg-orange-100 text-orange-800" },
    failed: { text: "Failed", class: "bg-red-100 text-red-800" },
  }[status] || { text: "Processing", class: "bg-gray-100 text-gray-800" };

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      {/* Card Header */}
      <div className="bg-gray-50 p-4 flex justify-between items-center border-b">
        <div className="flex items-center gap-3">
          <ShoppingBag className="w-5 h-5 text-gray-700" />
          <div>
            <h3 className="font-medium">{storeName}</h3>
            <p className="text-sm text-gray-500">Order #{order.id}</p>
            <p className="text-xs text-gray-400">{order.date}</p>
            {order.isMultiVendor && (
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                  Multi-Vendor
                </span>
                <span className="text-xs text-gray-500">
                  {order.vendorOrders.length} vendor{order.vendorOrders.length !== 1 ? 's' : ''}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="text-right">
          <span
            className={cn(
              "px-3 py-1 rounded-full text-sm font-medium",
              statusVariant.class
            )}
          >
            {statusVariant.text}
          </span>
          <p className="text-sm text-gray-500 mt-1">₹{order.total}</p>
        </div>
      </div>

      {/* Vendor Breakdown */}
      {order.isMultiVendor && (
        <div className="p-4 bg-blue-50 border-b">
          <h4 className="text-sm font-medium text-blue-800 mb-3">Vendor Breakdown</h4>
          <div className="space-y-2">
            {order.vendorOrders.map((vendorOrder, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-white rounded border">
                <div>
                  <p className="text-sm font-medium">{vendorOrder.vendor_store_id?.store_name || 'Vendor'}</p>
                  <p className="text-xs text-gray-500">Order: {vendorOrder.vendor_order_number}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">₹{Number(vendorOrder.total_amount?.$numberDecimal || vendorOrder.total_amount || 0)}</p>
                  <span className={cn(
                    "text-xs px-2 py-1 rounded-full",
                    {
                      'bg-yellow-100 text-yellow-800': vendorOrder.status === 'pending',
                      'bg-blue-100 text-blue-800': vendorOrder.status === 'confirmed',
                      'bg-purple-100 text-purple-800': vendorOrder.status === 'processing',
                      'bg-indigo-100 text-indigo-800': vendorOrder.status === 'shipped',
                      'bg-green-100 text-green-800': vendorOrder.status === 'delivered',
                      'bg-red-100 text-red-800': vendorOrder.status === 'cancelled',
                    }
                  )}>
                    {vendorOrder.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Order Items Table */}
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-[300px]">Product</TableHead>
            <TableHead className="w-[80px]">Qty</TableHead>
            <TableHead className="w-[100px]">Unit Price</TableHead>
            <TableHead className="w-[100px]">Total</TableHead>
            <TableHead className="w-[120px]">Status</TableHead>
            {order.isMultiVendor && <TableHead className="w-[120px]">Vendor Order</TableHead>}
            <TableHead className="w-[140px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow
              key={index}
              className={index !== items.length - 1 ? "border-b" : ""}
            >
              <TableCell className="w-[300px]">
                <div className="flex items-center gap-3">
                  <Image
                    src={item.productImage || "/placeholder-product.jpg"}
                    alt={item.product}
                    width={48}
                    height={48}
                    className="rounded-md border"
                  />
                  <div>
                    <div className="font-medium">{item.product}</div>
                    <div className="text-sm text-gray-500">{item.brand}</div>
                    {item.vendorStoreName && (
                      <div className="text-xs text-blue-600">From {item.vendorStoreName}</div>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell className="w-[80px]">{item.quantity}</TableCell>
              <TableCell className="w-[100px]">₹{item.price}</TableCell>
              <TableCell className="w-[100px]">₹{item.totalPrice || item.price * item.quantity}</TableCell>
              <TableCell className="w-[120px]">
                <span className={cn(
                  "px-2 py-1 rounded-full text-xs font-medium",
                  {
                    'bg-yellow-100 text-yellow-800': item.status === 'pending',
                    'bg-blue-100 text-blue-800': item.status === 'confirmed',
                    'bg-purple-100 text-purple-800': item.status === 'processing',
                    'bg-indigo-100 text-indigo-800': item.status === 'shipped',
                    'bg-green-100 text-green-800': item.status === 'delivered',
                    'bg-red-100 text-red-800': item.status === 'cancelled',
                  }
                )}>
                  {item.status}
                </span>
              </TableCell>
              {order.isMultiVendor && (
                <TableCell className="w-[120px]">
                  <div className="text-xs">
                    <div className="font-medium text-gray-700">{item.vendorStoreName}</div>
                    <div className="text-gray-500">{item.vendorOrderId}</div>
                  </div>
                </TableCell>
              )}
              <TableCell className="w-[140px]">
                <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700">
                  {item.actionLabel}
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Card Footer */}
      <div className="bg-gray-50 p-4 border-t flex justify-end gap-3">
        {customButtons || (
          <>
            {status === "completed" && (
              <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded flex items-center gap-2 hover:bg-blue-700">
                <Star className="w-4 h-4" />
                Leave Review
              </button>
            )}
            <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded flex items-center gap-2 hover:bg-blue-700">
              <MessageSquare className="w-4 h-4" />
              Contact Seller
            </button>
          </>
        )}
      </div>
    </div>
  );
}
