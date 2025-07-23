"use client";
import { useState } from "react";
import OrderCard from "./subCards/OrderCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const OrderHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  // Sample orders data
  const orders = [
    {
      id: "0722F7SB",
      status: "pending",
      total_amount: 1299,
      created_at: "2025-07-22",
      storeName: "Last Minute Deal",
      items: [
        {
          product: "Sample Product",
          quantity: 1,
          price: 1299,
          productImage: "/placeholder-product.jpg"
        }
      ]
    }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || order.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container mx-auto md:px-4 px-1 py-6 space-y-6">
      {/* Clean Header Section */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Order History</h1>
        <p className="text-gray-600">View and manage your past orders</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search by order number..."
          className="pl-10 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Fixed Filter Tabs */}
      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList className="flex w-full overflow-x-auto pb-2 space-x-2">
          {["all", "pending", "completed", "shipped", "cancelled"].map((tab) => (
            <TabsTrigger 
              key={tab}
              value={tab}
              className="px-4 py-2 whitespace-nowrap flex-shrink-0 capitalize"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <OrderCard 
            key={order.id}
            order={order}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;