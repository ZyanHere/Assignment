"use client";

import OrderCard from "./OrderCard";


const ORDERS = [
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
        status: "pending",
        actionLabel: "View",
      },
    ],
  },
  {
    id: 2,
    storeName: "Pantaloons",
    status: "completed",
    items: [
      {
        product: "Shirt",
        productImage: "/profile/order2.png",
        brand: "By Pantaloons",
        quantity: 3,
        date: "23/01/2025",
        price: "165",
        status: "Completed",
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
        status: "pending",
        actionLabel: "View",
      },
    ],
  },
];



export default function OrderHistory() {
    
  return (
    <div className="flex flex-col gap-6">
      {ORDERS.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
      
    </div>
  );
}
