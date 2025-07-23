"use client";
import { useState } from "react";
import OrderHistory from "./OrderHistory";
import ToReview from "./ToReview";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { motion } from "framer-motion";

export default function MyOrders() {
  const [activeTab, setActiveTab] = useState("orderHistory");

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Tabs Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <TabsList className="flex flex-wrap justify-start sm:justify-center mb-4 bg-gray-100 p-2 rounded-xl w-full shadow-sm gap-2 sm:gap-4">
            <TabsTrigger
              value="orderHistory"
              className="data-[state=active]:bg-white data-[state=active]:shadow-md px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm transition-all flex-1 sm:flex-none text-center"
            >
              📦 Order History
            </TabsTrigger>
            <TabsTrigger
              value="toReview"
              className="data-[state=active]:bg-white data-[state=active]:shadow-md px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm transition-all flex-1 sm:flex-none text-center"
            >
              ⭐ To Review
            </TabsTrigger>
          </TabsList>
        </motion.div>

        {/* Tabs Content */}
        <TabsContent value="orderHistory" className="mt-4">
          <OrderHistory />
        </TabsContent>

        <TabsContent value="toReview" className="mt-4">
          <ToReview />
        </TabsContent>
      </Tabs>
    </div>
  );
}