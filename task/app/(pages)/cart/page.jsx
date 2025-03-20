"use client";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  Store,
  Home,
  Receipt,
  Truck,
  Wallet,
  HandCoins,
} from "lucide-react";
import Sidebar from "@/components/home/sidebar";
import Header from "@/components/home/Header";
import Link from "next/link";
import Image from "next/image";

const initialCart = [
  {
    id: 1,
    name: "Pear",
    brand: "Pantaloons",
    price: 165,
    quantity: 1,
    image: "/categories/pear.png",
  },
];

const addresses = [
  {
    id: 1,
    text: `Shop No. 203, Sunshine Residency, Baner Road, Near DMart, Pune - 411045, Maharashtra, India.`,
  },
  {
    id: 2,
    text: `Flat No. 4, Sunshine Apartments, Lane No. 5, Koregaon Park, Pune, Maharashtra, 411001, India.`,
  },
];

const billDetails = {
  subTotal: { label: "Sub total", amount: 100, mrp: 165, icon: <Receipt /> },
  deliveryFee: {
    label: "Delivery fee",
    amount: 0,
    original: 165,
    icon: <Truck />,
  },
  transactionFee: { label: "Transaction fee", amount: 20, icon: <Wallet /> },
  savings: { label: "Total savings", amount: 30, icon: <HandCoins /> },
};

const grandTotal =
  billDetails.subTotal.amount +
  billDetails.deliveryFee.amount +
  billDetails.transactionFee.amount -
  billDetails.savings.amount;

billDetails.grandTotal = { label: "Grand Total", amount: grandTotal };

export default function CartPage() {
  const [cart, setCart] = useState(initialCart);
  const [purchaseMode, setPurchaseMode] = useState("homeDelivary");
  const [selectedAddress, setSelectedAddress] = useState(1);

  // Update Quantity
  const updateQuantity = (id, amount) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  // Remove Item
  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1">
        <Header />

        <div className="p-6">
          {/* Breadcrumb */}
          <nav className="mb-4 text-black text-4xl">
            <Link href="/cart" className="hover:underline font-medium">
              Cart
            </Link>
          </nav>

          {/* Cart Table */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Product</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="flex items-center space-x-4">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="w-14 h-14 rounded-lg"
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">By {item.brand}</p>
                      </div>
                    </TableCell>
                    <TableCell>MRP ₹{item.price}</TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        -
                      </Button>
                      <span className="mx-2">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        +
                      </Button>
                    </TableCell>
                    <TableCell>MRP ₹{item.price * item.quantity}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 size={18} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Checkout Button */}
            <div className="flex justify-end mt-4">
              <Button className="bg-green-500 text-white">+ Let's Go</Button>
            </div>
          </div>

          {/* Purchase Mode & Address Section */}
          <div className="p-6 bg-white shadow-md rounded-lg mt-6">
            {/* Purchase Mode Selection */}
            <h2 className="text-lg font-semibold mb-3">Select purchase mode</h2>

            <div className="flex gap-4 pr-4">
              <Button
                variant={purchaseMode === "storePickup" ? "default" : "outline"}
                onClick={() => setPurchaseMode("storePickup")}
                className="flex flex-col items-center gap-2 px-6 py-6 w-1/2 text-lg justify-center h-[120px]"
              >
                <Store
                  style={{
                    width: "43.744px",
                    height: "39.766px",
                    flexShrink: 0,
                  }}
                />
                <span>Store Pickup</span>
              </Button>

              <Button
                variant={
                  purchaseMode === "homeDelivery" ? "default" : "outline"
                }
                onClick={() => setPurchaseMode("homeDelivery")}
                className="flex flex-col items-center gap-2 px-6 py-6 w-1/2 text-lg justify-center h-[120px]"
              >
                <Home
                  style={{
                    width: "43.744px",
                    height: "39.766px",
                    flexShrink: 0,
                  }}
                />
                <span>Home Delivery</span>
              </Button>
            </div>

            {/* Address Selection */}
            <h2 className="text-lg font-semibold mt-6 mb-3 ">Address</h2>
            <div className="grid grid-cols-2 gap-4">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  onClick={() => setSelectedAddress(address.id)}
                  className={`p-4 border rounded-lg cursor-pointer ${
                    selectedAddress === address.id
                      ? "bg-gray-200 border-black"
                      : "border-gray-300"
                  }`}
                >
                  {address.text}
                </div>
              ))}
            </div>
          </div>

          {/* Bill Details Section */}
          <div className="p-6 bg-white shadow-md rounded-lg mt-6 border border-blue-200">
            <h2 className="text-lg font-semibold mb-3">Bill details</h2>

            {/* Bill Items (excluding Grand Total) */}
            <div className="space-y-4 px-16">
              {Object.entries(billDetails).map(([key, item]) =>
                key !== "grandTotal" ? (
                  <div key={key} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      {item.icon && (
                        <div className="w-6 h-6 flex items-center justify-center">
                          {item.icon}
                        </div>
                      )}
                      <span>{item.label}</span>
                    </div>

                    <div className="text-right">
                      {key === "subTotal" ? (
                        <>
                          <span className="font-semibold">₹{item.amount}</span>{" "}
                          <span className="text-gray-500 line-through">
                            MRP ₹{item.mrp}
                          </span>
                        </>
                      ) : key === "deliveryFee" ? (
                        <>
                          <span className="text-gray-500 line-through">
                            ₹{item.original}
                          </span>{" "}
                          <span className="text-green-500 font-medium">
                            Free
                          </span>
                        </>
                      ) : (
                        <span className="text-black">{`₹${item.amount}`}</span>
                      )}
                    </div>
                  </div>
                ) : null
              )}
            </div>

            {/* Grand Total (separate from the rest) */}
            <div className="mt-4 border-t pt-4 px-16 flex justify-between items-center">
              <span className="font-semibold text-lg text-orange-500">
                {billDetails.grandTotal.label}
              </span>
              <span className="font-semibold text-lg text-black">{`₹${billDetails.grandTotal.amount}`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
