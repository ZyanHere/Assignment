"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import OrderHistory from "./OrderHistory";
import ToReview from "./ToReview";

export default function MyOrders() {
  return (
    <div className="p-4">
      <Tabs defaultValue="orderHistory" className="w-full">
        {/* Tabs List */}
        <TabsList className="mb-4">
          <TabsTrigger value="orderHistory">Order History</TabsTrigger>
          <TabsTrigger value="toReview">To Review</TabsTrigger>
        </TabsList>

        {/* Order History Tab */}
        <TabsContent value="orderHistory">
          <OrderHistory />
        </TabsContent>

        {/* To Review Tab */}
        <TabsContent value="toReview">
          <ToReview />
        </TabsContent>
      </Tabs>
    </div>
  );
}
