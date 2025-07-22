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
    <div className="p-4 lg:p-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Tabs Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <TabsList className="md:justify-center justify-start md:flex-1 mb-4 bg-gray-100 p-2 rounded-xl w-full shadow-sm flex gap-4">
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
          <OrderHistory />
        </TabsContent>

        <TabsContent value="toReview">
          <ToReview />
        </TabsContent>
      </Tabs>
    </div>
  );
}