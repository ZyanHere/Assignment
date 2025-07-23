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
  const { storeName, status, items = [] } = order;

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
      <div className="bg-gray-50 p-3 sm:p-4 flex flex-col sm:flex-row justify-between gap-3 border-b">
        <div className="flex items-start gap-3">
          <ShoppingBag className="w-5 h-5 text-gray-700 mt-1 flex-shrink-0" />
          <div className="overflow-hidden">
            <h3 className="font-medium text-sm sm:text-base truncate">{storeName}</h3>
            <p className="text-xs sm:text-sm text-gray-500">Order #{order.id}</p>
            <p className="text-xs text-gray-400">{order.date}</p>
          </div>
        </div>
        <div className="flex justify-between sm:block sm:text-right">
          <span
            className={cn(
              "px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium",
              statusVariant.class
            )}
          >
            {statusVariant.text}
          </span>
          <p className="text-sm text-gray-500 mt-1">₹{order.total}</p>
        </div>
      </div>

      {/* Order Items - Mobile List (Always Visible) */}
      <div className="sm:hidden divide-y">
        {items.map((item, index) => (
          <div key={`${order.id}-${index}`} className="p-4">
            <div className="flex gap-3">
              <Image
                src={item.productImage || "/placeholder-product.jpg"}
                alt={item.product}
                width={80}
                height={80}
                className="rounded-md border flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium truncate">{item.product}</h4>
                <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                  <div>
                    <span className="text-gray-500">Qty:</span> {item.quantity}
                  </div>
                  <div>
                    <span className="text-gray-500">Price:</span> ₹{item.price}
                  </div>
                  <div>
                    <span className="text-gray-500">Total:</span> ₹{item.totalPrice || item.price * item.quantity}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Items - Desktop Table */}
      <div className="hidden sm:block">
        <Table>
          <TableBody>
            {items.map((item, index) => (
              <TableRow
                key={`${order.id}-${index}`}
                className={index !== items.length - 1 ? "border-b" : ""}
              >
                <TableCell className="min-w-[200px]">
                  <div className="flex items-center gap-3">
                    <Image
                      src={item.productImage || "/placeholder-product.jpg"}
                      alt={item.product}
                      width={48}
                      height={48}
                      className="rounded-md border"
                    />
                    <div className="min-w-0">
                      <div className="font-medium truncate">{item.product}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="w-[80px]">{item.quantity}</TableCell>
                <TableCell className="w-[100px]">₹{item.price}</TableCell>
                <TableCell className="w-[100px]">₹{item.totalPrice || item.price * item.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Card Footer */}
      <div className="bg-gray-50 p-3 sm:p-4 border-t flex flex-wrap justify-center sm:justify-end gap-2">
        <Button size="sm" className="gap-1">
          <MessageSquare className="w-4 h-4" />
          Contact Seller
        </Button>
        <Button size="sm" className="gap-1">
          <Star className="w-4 h-4" />
          Leave Review
        </Button>
      </div>
    </div>
  );
}