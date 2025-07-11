// app/cart/page.jsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, CreditCard, ShoppingCart } from 'lucide-react';
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
    clearCart,
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

  // Navigate to buy-now page with selected items
  const handleCheckout = (itemsToCheckout) => {
    if (itemsToCheckout.length === 0) {
      alert('Please select items to checkout');
      return;
    }

    // Set selected items in context and navigate to buy-now page
    setSelectedItems(itemsToCheckout);
    router.push('/buy-now');
  };

  // Calculate total for selected items
  const selectedItems = cart.filter((i) => selected.includes(i.id));
  
  // Group selected items by vendor
  const vendorGroups = selectedItems.reduce((groups, item) => {
    const vendorId = item.vendorId || 'default';
    if (!groups[vendorId]) {
      groups[vendorId] = {
        vendorName: item.vendorName || 'Last Minute Deal',
        items: [],
        subtotal: 0
      };
    }
    groups[vendorId].items.push(item);
    groups[vendorId].subtotal += item.price * item.quantity;
    return groups;
  }, {});

  const selectedTotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 20; // Adding transaction fee

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

              {/* Cart Summary and Checkout Options */}
              {selected.length > 0 && (
                <div className="mt-6 bg-white shadow-md rounded-lg p-6">
                  {/* Vendor Breakdown */}
                  {Object.keys(vendorGroups).length > 1 && (
                    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                      <h3 className="text-lg font-semibold mb-3">Order Breakdown by Vendor</h3>
                      <div className="space-y-3">
                        {Object.entries(vendorGroups).map(([vendorId, vendor]) => (
                          <div key={vendorId} className="flex justify-between items-center p-3 bg-white rounded border">
                            <div>
                              <p className="font-medium">{vendor.vendorName}</p>
                              <p className="text-sm text-gray-500">{vendor.items.length} item{vendor.items.length !== 1 ? 's' : ''}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">₹{vendor.subtotal}</p>
                              <p className="text-xs text-gray-500">Subtotal</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="text-center md:text-left">
                      <p className="text-lg font-semibold">
                        Selected Items: {selected.length}
                      </p>
                      <p className="text-2xl font-bold text-orange-500">
                        Total: ₹{selectedTotal}
                      </p>
                      {Object.keys(vendorGroups).length > 1 && (
                        <p className="text-sm text-gray-500">
                          From {Object.keys(vendorGroups).length} vendor{Object.keys(vendorGroups).length !== 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                      <Button
                        onClick={handleProceed}
                        disabled={isLoading}
                        variant="outline"
                        className="w-full sm:w-auto"
                      >
                        Continue Shopping
                      </Button>
                      
                      <div className="w-full sm:w-48">
                        <Button
                          onClick={() => handleCheckout(selectedItems)}
                          disabled={isLoading}
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                        >
                          {isLoading ? (
                            <>
                              <ShoppingCart className="w-4 h-4 mr-2 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <CreditCard className="w-4 h-4 mr-2" />
                              Pay ₹{selectedTotal}
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Checkout for All Items */}
              {cart.length > 0 && selected.length === 0 && (
                <div className="mt-6 bg-white shadow-md rounded-lg p-6">
                  {/* All Items Vendor Breakdown */}
                  {(() => {
                    const allVendorGroups = cart.reduce((groups, item) => {
                      const vendorId = item.vendorId || 'default';
                      if (!groups[vendorId]) {
                        groups[vendorId] = {
                          vendorName: item.vendorName || 'Last Minute Deal',
                          items: [],
                          subtotal: 0
                        };
                      }
                      groups[vendorId].items.push(item);
                      groups[vendorId].subtotal += item.price * item.quantity;
                      return groups;
                    }, {});
                    
                    return Object.keys(allVendorGroups).length > 1 ? (
                      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                        <h3 className="text-lg font-semibold mb-3">All Items by Vendor</h3>
                        <div className="space-y-3">
                          {Object.entries(allVendorGroups).map(([vendorId, vendor]) => (
                            <div key={vendorId} className="flex justify-between items-center p-3 bg-white rounded border">
                              <div>
                                <p className="font-medium">{vendor.vendorName}</p>
                                <p className="text-sm text-gray-500">{vendor.items.length} item{vendor.items.length !== 1 ? 's' : ''}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold">₹{vendor.subtotal}</p>
                                <p className="text-xs text-gray-500">Subtotal</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null;
                  })()}
                  
                  <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="text-center md:text-left">
                      <p className="text-lg font-semibold">
                        All Items in Cart: {cart.length}
                      </p>
                      <p className="text-2xl font-bold text-orange-500">
                        Total: ₹{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 20}
                      </p>
                      {(() => {
                        const vendorCount = new Set(cart.map(item => item.vendorId || 'default')).size;
                        return vendorCount > 1 ? (
                          <p className="text-sm text-gray-500">
                            From {vendorCount} vendor{vendorCount !== 1 ? 's' : ''}
                          </p>
                        ) : null;
                      })()}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                      <Button
                        onClick={() => selectAll(true)}
                        disabled={isLoading}
                        variant="outline"
                        className="w-full sm:w-auto"
                      >
                        Select All
                      </Button>
                      
                      <div className="w-full sm:w-48">
                        <Button
                          onClick={() => handleCheckout(cart)}
                          disabled={isLoading}
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                        >
                          {isLoading ? (
                            <>
                              <ShoppingCart className="w-4 h-4 mr-2 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <CreditCard className="w-4 h-4 mr-2" />
                              Checkout All ₹{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 20}
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}