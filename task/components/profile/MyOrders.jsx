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
import Image from "next/image";
import { motion } from "framer-motion";

export default function MyOrders() {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

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
          actionLabel: "View",
        },
      ],
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
          actionLabel: "Track",
        },
      ],
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
          actionLabel: "Reorder",
        },
      ],
    },
  ];

  const sortOrder = [...ORDERS].sort(
    (a, b) =>
      new Date(b.items[0].date).getTime() - new Date(a.items[0].date).getTime()
  );

  const filteredOrders =
    filter === "all"
      ? sortOrder
      : sortOrder.filter((order) => order.status === filter);

  const isEmpty = filteredOrders.length === 0;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-white">
      <Tabs defaultValue="orderHistory" className="w-full">
        {/* Tab Triggers */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <TabsList className="mb-6 p-1 rounded-2xl w-full flex flex-wrap justify-between gap-4 bg-transparent shadow-none border-none">
            <TabsTrigger
              value="orderHistory"
              className="flex-1 py-3 px-6 text-sm font-semibold rounded-xl 
                data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-amber-500 data-[state=active]:text-white
                data-[state=inactive]:bg-white data-[state=inactive]:text-black 
                transition-all shadow hover:shadow-md"
            >
              📦 Order History
            </TabsTrigger>
            <TabsTrigger
              value="toReview"
              className="flex-1 py-3 px-6 text-sm font-semibold rounded-xl 
                data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-amber-500 data-[state=active]:text-white
                data-[state=inactive]:bg-white data-[state=inactive]:text-black 
                transition-all shadow hover:shadow-md"
            >
              ⭐ To Review
            </TabsTrigger>
          </TabsList>
        </motion.div>

        {/* Order History */}
        <TabsContent value="orderHistory">
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
              {/* Spacing between tabs and filter buttons */}
              <div className="mt-6 mb-10 flex flex-wrap gap-3 gap-y-4">
                {["all", "pending", "completed"].map((status) => {
                  const isActive = filter === status;
                  return (
                    <motion.button
                      key={status}
                      onClick={() => setFilter(status)}
                      initial={false}
                      animate={{
                        scale: isActive ? 1.08 : 1,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 25,
                      }}
                      className={`px-5 py-2 rounded-md text-sm font-semibold transition-shadow
                        ${
                          isActive
                            ? "bg-gradient-to-r from-amber-400 to-amber-500 text-white shadow-md"
                            : "bg-gray-100 text-gray-700"
                        } hover:shadow-lg hover:scale-[1.03]`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </motion.button>
                  );
                })}
              </div>

              <div className="flex flex-col gap-6">
                {!isEmpty ? (
                  filteredOrders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      customButtons={
                        order.status === "completed" ? (
                          <button className="bg-gradient-to-r from-amber-400 to-amber-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold hover:brightness-105 transition-all">
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
        </TabsContent>

        {/* To Review */}
        <TabsContent value="toReview">
          {loading ? (
            <div className="space-y-6">
              {sortOrder
                .filter((o) => o.status === "completed")
                .map((_, i) => (
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
