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
    pending: { text: "Pending", class: "bg-amber-100 text-amber-700 border-amber-200" },
    completed: { text: "Completed", class: "bg-emerald-100 text-emerald-700 border-emerald-200" },
    cancelled: { text: "Cancelled", class: "bg-red-100 text-red-700 border-red-200" },
    shipped: { text: "Shipped", class: "bg-blue-100 text-blue-700 border-blue-200" },
  }[status] || { text: "Processing", class: "bg-gray-100 text-gray-700 border-gray-200" };

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm w-full">
      {/* Header */}
      <div className="bg-white px-4 md:px-6 py-5 flex justify-between items-center border-b border-gray-200 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-400 rounded-xl shadow-sm">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-slate-800 tracking-tight">{storeName}</h3>
        </div>
        <span
          className={cn(
            "px-4 py-2 rounded-full text-sm font-semibold shadow-sm border backdrop-blur-sm",
            statusVariant.class
          )}
        >
          {statusVariant.text}
        </span>
      </div>

      {/* Order Items */}
      <div className="px-4 md:px-6 py-5 space-y-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 border-b pb-4 last:border-none"
          >
            {/* Product Info */}
            <div className="flex items-center gap-4 sm:w-1/3">
              <div className="relative">
                <Image
                  src={item.productImage || "/placeholder-product.jpg"}
                  alt={item.product}
                  width={56}
                  height={56}
                  className="rounded-xl border-2 border-amber-100 shadow-sm hover:shadow-md transition-shadow duration-200"
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full border-2 border-white shadow-sm"></div>
              </div>
              <div>
                <div className="font-bold text-slate-800 text-base leading-tight">{item.product}</div>
                <div className="text-sm text-slate-500 font-medium">{item.brand}</div>
              </div>
            </div>

            {/* Order Details */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-6 text-sm text-slate-600 sm:w-2/3">
              <div className="flex flex-col gap-1">
                <p>
                  <span className="font-medium text-slate-700">Quantity:</span> {item.quantity}
                </p>
                <p>
                  <span className="font-medium text-slate-700">Date:</span> {item.date}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p>
                  <span className="font-medium text-slate-700">Price:</span> ${item.price}
                </p>
                <p>
                  <span className="font-medium text-slate-700">Status:</span>{" "}
                  <span className="bg-slate-100 border border-slate-200 px-2 py-1 rounded text-xs font-semibold text-slate-700">
                    {item.status}
                  </span>
                </p>
              </div>
              <div>
                <Button className="mt-2 sm:mt-0 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow hover:shadow-lg transition-all duration-200 transform hover:scale-105 border border-amber-300">
                  {item.actionLabel}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-slate-50 via-white to-slate-50 px-4 md:px-6 py-5 border-t border-gray-200 flex flex-wrap justify-end gap-4">
        {customButtons || (
          <>
            {status === "completed" && (
              <Button className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-5 py-2.5 text-sm rounded-xl hover:from-emerald-600 hover:to-emerald-700 flex items-center gap-2 font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 border border-emerald-400">
                <Star className="w-4 h-4" />
                Leave Review
              </Button>
            )}
            <Button className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white px-5 py-2.5 text-sm rounded-xl flex items-center gap-2 font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 border border-amber-300">
              <MessageSquare className="w-4 h-4" />
              Contact Seller
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
