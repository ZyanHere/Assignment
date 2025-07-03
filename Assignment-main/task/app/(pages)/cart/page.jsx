// app/cart/page.jsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Header from '@/components/home/Header';
import { useCart } from '@/lib/contexts/cart-context';
import { useSelectedItems } from '@/lib/contexts/selected-items-context';

export default function CartPage() {
  const {
    cart,
    isLoading,
    updateQuantity,
    removeFromCart,
  } = useCart();
  const [selected, setSelected] = React.useState([]);
  const { setSelectedItems } = useSelectedItems();
  const router = useRouter();

  const toggleSelection = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

  const selectAll = (checked) =>
    setSelected(checked ? cart.map((i) => i.id) : []);

  const handleProceed = () => {
    setSelectedItems(cart.filter((i) => selected.includes(i.id)));
    router.push('/buy-now');
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-1">
        <Header />
        <div className="p-3 md:p-6 mx-auto max-w-[1700px]">
          <nav className="mb-4 text-2xl md:text-4xl">
            <Link href="/cart" className="font-medium hover:underline">
              Cart
            </Link>
          </nav>

          {cart.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-xl text-gray-500">Your cart is empty</p>
              <Link href="/">
                <Button className="mt-4">Continue Shopping</Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
                {/* Mobile view */}
                <div className="md:hidden space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="border rounded-lg p-3 shadow-sm"
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <input
                          type="checkbox"
                          checked={selected.includes(item.id)}
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
                            By {item.brand}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <div>MRP ₹{item.price}</div>
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              updateQuantity(item.variantId, -1)
                            }
                            disabled={isLoading}
                          >
                            -
                          </Button>
                          <span className="mx-2">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              updateQuantity(item.variantId, 1)
                            }
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
                          onClick={() => removeFromCart(item.variantId)}
                          disabled={isLoading}
                        >
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop view */}
                <div className="hidden md:block">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          <input
                            type="checkbox"
                            checked={selected.length === cart.length}
                            onChange={(e) => selectAll(e.target.checked)}
                          />
                        </TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="text-center">
                          Quantity
                        </TableHead>
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
                              checked={selected.includes(item.id)}
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
                                By {item.brand}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>₹{item.price}</TableCell>
                          <TableCell className="flex justify-center items-center">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                updateQuantity(item.variantId, -1)
                              }
                              disabled={isLoading}
                            >
                              -
                            </Button>
                            <span className="mx-2">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                updateQuantity(item.variantId, 1)
                              }
                              disabled={isLoading}
                            >
                              +
                            </Button>
                          </TableCell>
                          <TableCell>
                            ₹{item.price * item.quantity}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              onClick={() => removeFromCart(item.variantId)}
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

              <div className="flex justify-end mt-4">
                <Button
                  onClick={handleProceed}
                  disabled={isLoading || selected.length === 0}
                >
                  + Let’s Go
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
