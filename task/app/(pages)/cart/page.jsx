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
import { useDiscount } from '@/lib/contexts/discount-context';
import DiscountCodeInput from '@/components/discount/DiscountCodeInput';
import DiscountSummary from '@/components/discount/DiscountSummary';
import HotelCartItem from '@/components/hotel/HotelCartItem';
import { isHotelBooking, getHotelBookingDetails } from '@/lib/utils/hotelUtils';


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

  // Discount system
  const { appliedDiscount, calculateDiscountAmount } = useDiscount();

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
    setSelected(checked ? cart.map((i) => i.cart_item_id || i.id) : []);

  const handleProceed = () => {
    setSelectedItems(cart.filter((i) => selected.includes(i.cart_item_id || i.id)));
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
  const selectedItems = cart.filter((i) => selected.includes(i.cart_item_id || i.id));

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

  // Calculate totals with discount
  const calculateSubtotal = (items) => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateFinalTotal = (subtotal, discountAmount) => {
    return subtotal - discountAmount + 20; // Adding transaction fee
  };

  const selectedSubtotal = calculateSubtotal(selectedItems);
  const selectedDiscountAmount = calculateDiscountAmount(selectedSubtotal);
  const selectedTotal = calculateFinalTotal(selectedSubtotal, selectedDiscountAmount);

  const allItemsSubtotal = calculateSubtotal(cart);
  const allItemsDiscountAmount = calculateDiscountAmount(allItemsSubtotal);
  const allItemsTotal = calculateFinalTotal(allItemsSubtotal, allItemsDiscountAmount);

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
                  {cart.map((item) => {
                    // Check if this is a hotel booking
                    const isHotelItem = isHotelBooking(item);
                    const itemId = item.cart_item_id || item.id;

                    // Console log if hotel booking is detected (mobile view)
                    if (isHotelItem) {
                      const hotelDetails = getHotelBookingDetails(item);
                      console.log('Hotel booking detected (mobile view):', {
                        itemId,
                        itemName: item.variant?.variant_name || item.product?.name || item.name,
                        ...hotelDetails,
                        price: item.price,
                        // Additional debugging info
                        hasBookingDetails: !!item.booking_details,
                        hasSelectedDates: !!item.selectedDates,
                        productType: item.product?.product_type || item.variant?.product?.product_type,
                        category: item.product?.category?.name || item.variant?.product?.category?.name
                      });
                    }

                    if (isHotelItem) {
                      return (
                        <HotelCartItem
                          key={itemId}
                          item={item}
                          onQuantityChange={handleQuantityUpdate}
                          onRemove={removeFromCart}
                          isSelected={selected.includes(itemId)}
                          onToggleSelect={toggleSelection}
                        />
                      );
                    }

                    return (
                      <div
                        key={itemId}
                        className="border rounded-lg p-3 shadow-sm bg-white"
                      >
                        <div className="flex items-start space-x-3 mb-3">
                          <input
                            type="checkbox"
                            checked={selected.includes(itemId)}
                            onChange={() => toggleSelection(itemId)}
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
                    );
                  })}
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
                      {cart.map((item) => {
                        // Check if this is a hotel booking
                        console.log('Item', item);
                        const isHotelItem = isHotelBooking(item);
                        console.log('Is hotel item:', isHotelItem);
                        const itemId = item.cart_item_id || item.id;

                        // Console log if hotel booking is detected
                        if (isHotelItem) {
                          const hotelDetails = getHotelBookingDetails(item);
                          console.log('Hotel booking detected:', {
                            itemId,
                            itemName: item.variant?.variant_name || item.product?.name || item.name,
                            ...hotelDetails,
                            price: item.price,
                            // Additional debugging info
                            hasBookingDetails: !!item.booking_details,
                            hasSelectedDates: !!item.selectedDates,
                            productType: item.product?.product_type || item.variant?.product?.product_type,
                            category: item.product?.category?.name || item.variant?.product?.category?.name
                          });
                        }

                        if (isHotelItem) {
                          // For hotel bookings, we'll render a special row
                          const bookingDetails = item.booking_details || {};
                          const checkInDate = item.checkIn ? new Date(item.checkIn) :
                            bookingDetails.check_in_date ? new Date(bookingDetails.check_in_date) : null;
                          const checkOutDate = item.checkOut ? new Date(item.checkOut) :
                            bookingDetails.check_out_date ? new Date(bookingDetails.check_out_date) : null;
                          const nights = item.nights || (checkInDate && checkOutDate ?
                            Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)) : 0);
                          const totalPrice = item.totalPrice || item.total_price || (item.unit_price || item.price) * (nights || 1);

                          return (
                            <TableRow key={itemId}>
                              <TableCell>
                                <input
                                  type="checkbox"
                                  checked={selected.includes(itemId)}
                                  onChange={() => toggleSelection(itemId)}
                                  disabled={isLoading}
                                />
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-3 sm:space-x-4">
                                  <Image
                                    src={item.variant?.images?.[0]?.url ||
                                      item.product?.images?.[0]?.url ||
                                      item.image}
                                    alt={item.variant?.variant_name || item.product?.name || item.name}
                                    width={100}
                                    height={100}
                                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover flex-shrink-0"
                                  />
                                  <div className="min-w-0">
                                    <p className="font-medium text-sm sm:text-base truncate">
                                      {item.variant?.variant_name || item.product?.name || item.name}
                                    </p>
                                    <p className="text-xs sm:text-sm text-gray-500">
                                      {item.variant?.product?.vendor_store_id?.store_name ||
                                        item.product?.vendor_store_id?.store_name ||
                                        'Hotel'}
                                    </p>
                                    {checkInDate && checkOutDate && (
                                      <div className="text-xs text-gray-600 mt-1">
                                        {checkInDate.toLocaleDateString()} - {checkOutDate.toLocaleDateString()} ({nights} nights)
                                      </div>
                                    )}
                                    {bookingDetails.guests && (
                                      <div className="text-xs text-gray-600">
                                        {bookingDetails.guests.adults} adult{bookingDetails.guests.adults !== 1 ? 's' : ''}
                                        {bookingDetails.guests.children > 0 && `, ${bookingDetails.guests.children} child${bookingDetails.guests.children !== 1 ? 'ren' : ''}`}
                                        {bookingDetails.guests.infants > 0 && `, ${bookingDetails.guests.infants} infant${bookingDetails.guests.infants !== 1 ? 's' : ''}`}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="text-sm sm:text-base">₹{item.price}/night</TableCell>
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
                                ₹{totalPrice}
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
                          );
                        }

                        // Regular item
                        return (
                          <TableRow key={itemId}>
                            <TableCell>
                              <input
                                type="checkbox"
                                checked={selected.includes(itemId)}
                                onChange={() => toggleSelection(itemId)}
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
                        );
                      })}
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

              {/* Discount Code Section */}
              <div className="mb-4 sm:mb-6">
                <DiscountCodeInput
                  cartDetails={{
                    total_amount: selected.length > 0 ? selectedSubtotal : allItemsSubtotal,
                    items: (selected.length > 0 ? selectedItems : cart).map(item => ({
                      category: item.category || 'General',
                      subcategory: item.subcategory || '',
                      quantity: item.quantity,
                      price: item.price
                    }))
                  }}
                />
              </div>

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
                        <span>₹{selectedSubtotal}</span>
                      </div>

                      <DiscountSummary subtotal={selectedSubtotal} />

                      <div className="flex justify-between text-sm sm:text-base">
                        <span>Transaction Fee</span>
                        <span>₹20</span>
                      </div>

                      <div className="border-t pt-2 flex justify-between font-semibold text-base sm:text-lg">
                        <span>Total</span>
                        <span className="text-orange-500">₹{selectedTotal.toFixed(2)}</span>
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
                            Pay ₹{selectedTotal.toFixed(2)}
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
                        <span>₹{allItemsSubtotal}</span>
                      </div>

                      <DiscountSummary subtotal={allItemsSubtotal} />

                      <div className="flex justify-between text-sm sm:text-base">
                        <span>Transaction Fee</span>
                        <span>₹20</span>
                      </div>

                      <div className="border-t pt-2 flex justify-between font-semibold text-base sm:text-lg">
                        <span>Total</span>
                        <span className="text-orange-500">₹{allItemsTotal.toFixed(2)}</span>
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
                            Checkout All ₹{allItemsTotal.toFixed(2)}
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