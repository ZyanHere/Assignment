// app/cart/page.jsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, CreditCard, ShoppingCart, AlertCircle, RefreshCw } from 'lucide-react';
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
import { useAuth } from '@/lib/hooks/useAuth';

export default function CartPage() {
  const { isAuthenticated } = useAuth();
  const {
    cart,
    isLoading,
    error,
    fetched,
    totalQuantity,
    totalAmount,
    updateQuantity,
    removeFromCart,
    clearCart,
    refreshCart,
    clearError,
    isInCart,
    getItemQuantity,
  } = useCart();
  
  const [selected, setSelected] = React.useState([]);
  const { setSelectedItems } = useSelectedItems();
  const router = useRouter();

  // Clear error when component mounts or error changes
  React.useEffect(() => {
    if (error) {
      // Auto-clear error after 5 seconds
      const timer = setTimeout(() => {
        clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

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

  // Handle quantity update with better UX
  const handleQuantityUpdate = async (variantId, change) => {
    const currentQuantity = getItemQuantity(variantId);
    const newQuantity = currentQuantity + change;
    
    if (newQuantity <= 0) {
      // Remove item if quantity becomes 0
      await removeFromCart(variantId);
    } else {
      // Update quantity
      await updateQuantity(variantId, change);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen  justify-center">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="text-center">
            <p className="text-lg sm:text-xl text-gray-700 mb-4">Login before adding items to cart</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 flex flex-col xl:flex-row overflow-hidden">
        {/* Left Side - Products */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-3 sm:p-4 border-b bg-white">
            <div className="flex items-center justify-between">
              <nav className="text-xl sm:text-2xl font-medium">
                <Link href="/cart" className="hover:underline">
                  Cart
                </Link>
              </nav>
              
              {/* Refresh button */}
              <Button
                onClick={refreshCart}
                disabled={isLoading}
                variant="outline"
                size="sm"
                className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
              >
                <RefreshCw className={`w-3 h-3 sm:w-4 sm:h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </Button>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 flex-shrink-0" />
                  <p className="text-red-700 text-xs sm:text-sm">{error}</p>
                </div>
                <Button onClick={clearError} variant="ghost" size="sm" className="flex-shrink-0">
                  ×
                </Button>
              </div>
            )}
          </div>

          {/* Loading state */}
          {isLoading && !fetched && (
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="text-center">
                <RefreshCw className="w-6 h-6 sm:w-8 sm:h-8 animate-spin mx-auto mb-3 sm:mb-4" />
                <p className="text-gray-500 text-sm sm:text-base">Loading cart...</p>
              </div>
            </div>
          )}

          {/* Empty cart */}
          {fetched && cart.length === 0 && (
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="text-center">
                <ShoppingCart className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-400 mb-3 sm:mb-4" />
                <p className="text-lg sm:text-xl text-gray-500 mb-3 sm:mb-4">Your cart is empty</p>
                <Link href="/">
                  <Button className="text-sm sm:text-base">Continue Shopping</Button>
                </Link>
              </div>
            </div>
          )}

          {/* Cart items */}
          {fetched && cart.length > 0 && (
            <div className="flex-1 overflow-y-auto">
              <div className="p-3 sm:p-4">
                {/* Mobile view */}
                <div className="xl:hidden space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="border rounded-lg p-3 shadow-sm bg-white"
                    >
                      <div className="flex items-start space-x-3 mb-3">
                        <input
                          type="checkbox"
                          checked={selected.includes(item.id)}
                          onChange={() => toggleSelection(item.id)}
                          disabled={isLoading}
                          className="mt-1 flex-shrink-0"
                        />
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm sm:text-base truncate">{item.name}</p>
                          <p className="text-xs sm:text-sm text-gray-500">
                            By {item.brand}
                          </p>
                          <p className="text-sm sm:text-base font-medium text-green-600 mt-1">
                            ₹{item.price}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityUpdate(item.variantId, -1)}
                            disabled={isLoading}
                            className="w-8 h-8 p-0 text-lg leading-none flex items-center justify-center font-mono"
                          >
                            <span className="block w-full text-center">-</span>
                          </Button>
                          <span className="text-sm sm:text-base font-medium min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityUpdate(item.variantId, 1)}
                            disabled={isLoading}
                            className="w-8 h-8 p-0 text-lg leading-none flex items-center justify-center font-mono"
                          >
                            <span className="block w-full text-center">+</span>
                          </Button>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <div className="text-right">
                            <p className="text-sm sm:text-base font-semibold">
                              ₹{item.price * item.quantity}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            onClick={() => removeFromCart(item.variantId)}
                            disabled={isLoading}
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tablet view */}
                <div className="hidden xl:block bg-white rounded-lg shadow-sm overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <input
                            type="checkbox"
                            checked={selected.length === cart.length && cart.length > 0}
                            onChange={(e) => selectAll(e.target.checked)}
                            disabled={isLoading}
                          />
                        </TableHead>
                        <TableHead className="min-w-[300px]">Product</TableHead>
                        <TableHead className="min-w-[100px]">Price</TableHead>
                        <TableHead className="text-center min-w-[150px]">
                          Quantity
                        </TableHead>
                        <TableHead className="min-w-[100px]">Total</TableHead>
                        <TableHead className="w-16">Action</TableHead>
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
                              disabled={isLoading}
                            />
                          </TableCell>
                          <TableCell className="flex items-center space-x-3 sm:space-x-4">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={100}
                              height={100}
                              className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover flex-shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="font-medium text-sm sm:text-base truncate">{item.name}</p>
                              <p className="text-xs sm:text-sm text-gray-500">
                                By {item.brand}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm sm:text-base">₹{item.price}</TableCell>
                          <TableCell className="flex justify-center items-center">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleQuantityUpdate(item.variantId, -1)}
                                disabled={isLoading}
                                className="w-8 h-8 p-0 text-lg leading-none flex items-center justify-center font-mono"
                              >
                                <span className="block w-full text-center">-</span>
                              </Button>
                              <span className="text-sm sm:text-base font-medium min-w-[2rem] text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleQuantityUpdate(item.variantId, 1)}
                                disabled={isLoading}
                                className="w-8 h-8 p-0 text-lg leading-none flex items-center justify-center font-mono"
                              >
                                <span className="block w-full text-center">+</span>
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm sm:text-base font-semibold">
                            ₹{item.price * item.quantity}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              onClick={() => removeFromCart(item.variantId)}
                              disabled={isLoading}
                              size="sm"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Summary */}
        {fetched && cart.length > 0 && (
          <div className="w-full xl:w-80 2xl:w-96 bg-gray-50 border-t xl:border-l xl:border-t-0 flex flex-col">
            <div className="p-4 sm:p-6 flex-1 overflow-y-auto">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Order Summary</h2>
              
              {/* Selected Items Summary */}
              {selected.length > 0 && (
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-medium mb-2 sm:mb-3">Selected Items</h3>
                  
                  {/* Vendor Breakdown */}
                  {Object.keys(vendorGroups).length > 1 && (
                    <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-white rounded-lg border">
                      <h4 className="text-xs sm:text-sm font-medium mb-2">By Vendor</h4>
                      <div className="space-y-2">
                        {Object.entries(vendorGroups).map(([vendorId, vendor]) => (
                          <div key={vendorId} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <div className="min-w-0">
                              <p className="text-xs sm:text-sm font-medium truncate">{vendor.vendorName}</p>
                              <p className="text-xs text-gray-500">{vendor.items.length} item{vendor.items.length !== 1 ? 's' : ''}</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className="text-xs sm:text-sm font-semibold">₹{vendor.subtotal}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-white rounded-lg border p-3 sm:p-4">
                    <div className="space-y-2 mb-3 sm:mb-4">
                      <div className="flex justify-between text-sm sm:text-base">
                        <span>Items ({selected.length})</span>
                        <span>₹{selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</span>
                      </div>
                      <div className="flex justify-between text-sm sm:text-base">
                        <span>Transaction Fee</span>
                        <span>₹20</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-semibold text-base sm:text-lg">
                        <span>Total</span>
                        <span className="text-orange-500">₹{selectedTotal}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 sm:space-y-3">
                      <Button
                        onClick={() => handleCheckout(selectedItems)}
                        disabled={isLoading}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm sm:text-base"
                      >
                        {isLoading ? (
                          <>
                            <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                            Pay ₹{selectedTotal}
                          </>
                        )}
                      </Button>
                      
                      <Button
                        onClick={handleProceed}
                        disabled={isLoading}
                        variant="outline"
                        className="w-full text-sm sm:text-base"
                      >
                        Continue Shopping
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* All Items Summary */}
              {cart.length > 0 && selected.length === 0 && (
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-medium mb-2 sm:mb-3">All Items</h3>
                  
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
                      <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-white rounded-lg border">
                        <h4 className="text-xs sm:text-sm font-medium mb-2">By Vendor</h4>
                        <div className="space-y-2">
                          {Object.entries(allVendorGroups).map(([vendorId, vendor]) => (
                            <div key={vendorId} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                              <div className="min-w-0">
                                <p className="text-xs sm:text-sm font-medium truncate">{vendor.vendorName}</p>
                                <p className="text-xs text-gray-500">{vendor.items.length} item{vendor.items.length !== 1 ? 's' : ''}</p>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <p className="text-xs sm:text-sm font-semibold">₹{vendor.subtotal}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null;
                  })()}
                  
                  <div className="bg-white rounded-lg border p-3 sm:p-4">
                    <div className="space-y-2 mb-3 sm:mb-4">
                      <div className="flex justify-between text-sm sm:text-base">
                        <span>Items ({cart.length})</span>
                        <span>₹{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</span>
                      </div>
                      <div className="flex justify-between text-sm sm:text-base">
                        <span>Transaction Fee</span>
                        <span>₹20</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-semibold text-base sm:text-lg">
                        <span>Total</span>
                        <span className="text-orange-500">₹{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 20}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 sm:space-y-3">
                      <Button
                        onClick={() => handleCheckout(cart)}
                        disabled={isLoading}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm sm:text-base"
                      >
                        {isLoading ? (
                          <>
                            <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                            Checkout All ₹{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 20}
                          </>
                        )}
                      </Button>
                      
                      <Button
                        onClick={() => selectAll(true)}
                        disabled={isLoading}
                        variant="outline"
                        className="w-full text-sm sm:text-base"
                      >
                        Select All
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}