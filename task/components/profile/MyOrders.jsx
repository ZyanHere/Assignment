"use client";
import { useState, useEffect } from "react";
import OrderCard from "./OrderCard";
import ToReview from "./ToReview";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { motion } from "framer-motion";

export default function MyOrders() {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  // Properly structured dummy data matching OrderCard expectations
  const ORDERS = [
    {
      id: 1,
      storeName: "Pizza House",
      status: "completed",
      items: [
        {
          product: "Margherita Pizza",
          productImage: "/profile/pizza.png",
          brand: "Pizza House Special",
          quantity: 2,
          date: "2023-05-15",
          price: "24.99",
          status: "Delivered",
          actionLabel: "View"
        }
      ]
    },
    {
      id: 2,
      storeName: "Sushi Express",
      status: "pending",
      items: [
        {
          product: "Sushi Combo",
          productImage: "/profile/sushi.png",
          brand: "Sushi Express",
          quantity: 1,
          date: "2023-05-16",
          price: "18.50",
          status: "Preparing",
          actionLabel: "Track"
        }
      ]
    },
    {
      id: 3,
      storeName: "Burger King",
      status: "completed",
      items: [
        {
          product: "Whopper Meal",
          productImage: "/profile/burger.png",
          brand: "Burger King",
          quantity: 1,
          date: "2023-05-14",
          price: "12.99",
          status: "Delivered",
          actionLabel: "Reorder"
        }
      ]
    }
  ];

  const sortOrder = [...ORDERS].sort((a,b) => 
    new Date(b.items[0].date) - new Date(a.items[0].date)

  )

  const filteredOrders = filter === "all" ? sortOrder : sortOrder.filter(order => order.status === filter);
  const isEmpty = filteredOrders.length === 0;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-4 lg:p-8">
      <Tabs defaultValue="orderHistory" className="w-full">
        {/* Tabs Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <TabsList className="mb-4 bg-gray-100 p-2 rounded-xl w-full shadow-sm flex gap-4">
            <TabsTrigger
              value="orderHistory"
              className="data-[state=active]:bg-white data-[state=active]:shadow-md px-6 py-3 rounded-lg text-sm transition-all"
            >
              📦 Order History
            </TabsTrigger>
            <TabsTrigger
              value="toReview"
              className="data-[state=active]:bg-white data-[state=active]:shadow-md px-6 py-3 rounded-lg text-sm transition-all"
            >
              ⭐ To Review
            </TabsTrigger>
          </TabsList>
        </motion.div>

        {/* Tabs Content */}
        <TabsContent value="orderHistory">
          <ScrollArea className="h-[calc(100vh-220px)] pr-4">
            {loading ? (
              <div className="space-y-6">
                {sortOrder.map((_, i) => ( 
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Skeleton className="h-[150px] w-full rounded-xl" />
                  </motion.div>
                ))}
              </div>
            ) : (
              <>
                <div className="mb-4 flex gap-4">
                  {["all", "pending", "completed"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilter(status)}
                      className={`px-4 py-2 rounded-md ${
                        filter === status
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>

                <div className="flex flex-col gap-6">
                  {!isEmpty ? (
                    filteredOrders.map((order) => (
                      <OrderCard 
                        key={order.id} 
                        order={order} 
                        // Add customButtons if needed
                        customButtons={
                          order.status === "completed" ? (
                            <button className="bg-green-500 text-white px-3 py-1 rounded text-sm">
                              Reorder
                            </button>
                          ) : null
                        }
                      />
                    ))
                  ) : (
                    <div className="text-center text-gray-500">
                      <Image
                        src="/profile/no-orders.svg"
                        width={160}
                        height={160}
                        alt="No orders"
                        className="mx-auto mb-3"
                      />
                      <p>No orders found</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="toReview">
          <ScrollArea className="h-[calc(100vh-220px)] pr-4">
            {loading ? (
              <div className="space-y-6">
                {sortOrder.filter(o => o.status === "completed").map((_, i) => ( 
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Skeleton className="h-[150px] w-full rounded-xl" />
                  </motion.div>
                ))}
              </div>
            ) : (
              <ToReview />
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}