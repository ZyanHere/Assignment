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
import { Trash2 } from "lucide-react";
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

export default function CartPage() {
  const [cart, setCart] = useState(initialCart);

  const updateQuantity = (id, amount) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1">
        <Header />

        <div className="p-6">
          {/* breadcrumb */}
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
        </div>
      </div>
    </div>
  );
}
