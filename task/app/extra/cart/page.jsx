"use client";
import Header from "@/components/home/Header";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCart } from "@/lib/contexts/cart-context";
import { useSelectedItems } from "@/lib/contexts/selected-items-context";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const { setSelectedItems } = useSelectedItems();
  const router = useRouter();

  const isSelected = (id) => selectedItemIds.includes(id);

  const toggleSelection = (id) => {
    setSelectedItemIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked) => {
    setSelectedItemIds(checked ? cart.map((item) => item.id) : []);
  };

  const handleUpdateQuantity = async (id, amount) => {
    setIsLoading(true);
    try {
      await updateQuantity(id, amount);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFromCart = async (id) => {
    setIsLoading(true);
    try {
      await removeFromCart(id);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProceed = () => {
    const selected = cart.filter((item) => selectedItemIds.includes(item.id));
    setSelectedItems(selected);
    router.push("/buy-now");
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-1">
        <Header />

        <div className="p-3 md:p-6 w-full max-w-[1700px] mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-4 text-black text-2xl md:text-4xl">
            <Link href="/cart" className="hover:underline font-medium">
              Cart
            </Link>
          </nav>

          {/* Cart Table */}
          <div className="bg-white shadow-md rounded-lg p-2 md:p-4">
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-xl font-medium text-gray-500">
                  Your cart is empty
                </p>
                <Link href="/">
                  <Button className="mt-4 bg-blue-500 hover:bg-blue-600">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                {/* Mobile View */}
                <div className="md:hidden space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="border rounded-lg p-3 shadow-sm"
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <input
                          type="checkbox"
                          checked={isSelected(item.id)}
                          onChange={() => toggleSelection(item.id)}
                        />
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="w-14 h-14 rounded-lg"
                        />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            By {item.brand || item.seller || "Unknown"}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <div>MRP ₹{item.price}</div>
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateQuantity(item.id, -1)}
                            disabled={isLoading}
                          >
                            -
                          </Button>
                          <span className="mx-2">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateQuantity(item.id, 1)}
                            disabled={isLoading}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <div>Total: ₹{item.price * item.quantity}</div>
                        <Button
                          variant="ghost"
                          onClick={() => handleRemoveFromCart(item.id)}
                          disabled={isLoading}
                        >
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          <input
                            type="checkbox"
                            checked={selectedItemIds.length === cart.length}
                            onChange={(e) => handleSelectAll(e.target.checked)}
                          />
                        </TableHead>
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
                          <TableCell>
                            <input
                              type="checkbox"
                              checked={isSelected(item.id)}
                              onChange={() => toggleSelection(item.id)}
                            />
                          </TableCell>
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
                              <p className="text-sm text-gray-500">
                                By {item.brand || item.seller || "Unknown"}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>MRP ₹{item.price}</TableCell>
                          <TableCell className="text-center flex justify-center items-center">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUpdateQuantity(item.id, -1)}
                              disabled={isLoading}
                            >
                              -
                            </Button>
                            <span className="mx-2">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUpdateQuantity(item.id, 1)}
                              disabled={isLoading}
                            >
                              +
                            </Button>
                          </TableCell>
                          <TableCell>₹{item.price * item.quantity}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              onClick={() => handleRemoveFromCart(item.id)}
                              disabled={isLoading}
                            >
                              <Trash2 size={18} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}

            {/* Checkout Button */}
            {cart.length > 0 && (
              <div className="flex justify-end mt-4">
                <Button
                  className="bg-green-500 text-white"
                  disabled={isLoading || selectedItemIds.length === 0}
                  onClick={handleProceed}
                >
                  {isLoading ? "Processing..." : "+ Let's Go"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
