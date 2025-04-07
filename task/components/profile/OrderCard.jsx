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
    completed: { text: "Completed", class: "bg-green-100 text-green-800" },
    cancelled: { text: "Cancelled", class: "bg-red-100 text-red-800" },
    shipped: { text: "Shipped", class: "bg-blue-100 text-blue-800" },
  }[status] || { text: "Processing", class: "bg-gray-100 text-gray-800" };

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      {/* Card Header */}
      <div className="bg-gray-50 p-4 flex justify-between items-center border-b">
        <div className="flex items-center gap-3">
          <ShoppingBag className="w-5 h-5 text-gray-700" />
          <h3 className="font-medium">{storeName}</h3>
        </div>
        <span
          className={cn(
            "px-3 py-1 rounded-full text-sm font-medium",
            statusVariant.class
          )}
        >
          {statusVariant.text}
        </span>
      </div>

      {/* Order Items Table */}
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-[260px]">Product</TableHead>
            <TableHead className="w-[80px]">Qty</TableHead>
            <TableHead className="w-[140px]">Date</TableHead>
            <TableHead className="w-[100px]">Price</TableHead>
            <TableHead className="w-[120px]">Status</TableHead>
            <TableHead className="w-[140px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow
              key={index}
              className={index !== items.length - 1 ? "border-b" : ""}
            >
              <TableCell className="w-[260px]">
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
                  </div>
                </div>
              </TableCell>
              <TableCell className="w-[80px]">{item.quantity}</TableCell>
              <TableCell className="w-[140px]">{item.date}</TableCell>
              <TableCell className="w-[100px]">${item.price}</TableCell>
              <TableCell className="w-[120px]">{item.status}</TableCell>
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
