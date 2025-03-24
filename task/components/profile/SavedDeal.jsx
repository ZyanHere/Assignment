"use client";

import React from "react";
import OrderCard from "./OrderCard";
import { Button } from "../ui/button";


const PENDING_ORDERS = [
  {
    id: 1,
    storeName: "Pantaloons",
    status: "pending",
    items: [
      {
        product: "Shirt",
        productImage: "/profile/order1.png",
        brand: "By Pantaloons",
        quantity: 3,
        date: "23/01/2025",
        price: "165",
        status: "Pending",
        actionLabel: "View",
      },
    ],
  },
  {
    id: 3,
    storeName: "Metro",
    status: "pending",
    items: [
      {
        product: "Shirt",
        productImage: "/profile/order1.png",
        brand: "By Metro",
        quantity: 3,
        date: "23/01/2025",
        price: "190",
        status: "Pending",
        actionLabel: "View",
      },
    ],
  },
];

export default function SavedDeals() {
  // Custom buttons for Saved Deals (override bottom actions)
  const customButtons = (
    <>
      <Button variant="outline" className="text-sm">
        Cancel
      </Button>
      <Button className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm ">
        Pay Now
      </Button>
    </>
  );

  return (
    <div className="flex flex-col gap-6">
      {PENDING_ORDERS.length > 0 ? (
        PENDING_ORDERS.map((order) => (
          <OrderCard key={order.id} order={order} customButtons={customButtons} />
        ))
      ) : (
        <p className="text-gray-500 text-center">No saved deals found.</p>
      )}
    </div>
  );
}
