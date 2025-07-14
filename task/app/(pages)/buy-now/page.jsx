"use client";
import Header from "@/components/home/Header";
import { useSelectedItems } from "@/lib/contexts/selected-items-context";
import AddressSection from "@/app/components/address/AddressSection";
import {
  Receipt,
  Truck,
  Wallet,
  HandCoins,
  Mic,
  PhoneOff,
  BellOff,
  Store,
  Home,
  CreditCard,
  ShoppingCart,
  AlertCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useDispatch } from 'react-redux';
import { createOrderFromCart, createOrderFromSingleItem } from "@/lib/redux/user/userSlice";
import { initializeRazorpay } from "@/lib/utils/razorpay";
import { useCart } from '@/lib/contexts/cart-context';
import { useAuth } from '@/lib/hooks/useAuth';
import toast from 'react-hot-toast';

export default function BuyNowPage() {
  const { selectedItems, singleItem } = useSelectedItems();
  const { clearCart } = useCart();
  const { addresses, primaryAddress, session, orderCreating } = useAuth();
  const dispatch = useDispatch();
  const [purchaseMode, setPurchaseMode] = useState("homeDelivery");
  const [activeInstruction, setActiveInstruction] = useState("soundbite");
  const [loading, setLoading] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [addressError, setAddressError] = useState(null);
  const router = useRouter();

  //console.log(selectedItems);

  //const selectedItems = singleItem ? [singleItem] : selectedItems
  //console.log(selectedItems);
  const billDetails = useMemo(() => {
    if (!selectedItems.length) return null;

    const mrpTotal = selectedItems.reduce(
      (t, i) => t + (i.mrp || i.price) * i.quantity,
      0
    );
    const priceTotal = selectedItems.reduce(
      (t, i) => t + i.price * i.quantity,
      0
    );
    const savings = mrpTotal - priceTotal;
    const transactionFee = priceTotal > 0 ? 20 : 0;
    const deliveryFeeOriginal = priceTotal > 0 ? 165 : 0;

    // Group items by vendor
    const vendorGroups = selectedItems.reduce((groups, item) => {
      const vendorId = item.vendorId || 'default';
      if (!groups[vendorId]) {
        groups[vendorId] = {
          vendorName: item.vendorName || 'Last Minute Deal',
          items: [],
          subtotal: 0,
          itemCount: 0
        };
      }
      groups[vendorId].items.push(item);
      groups[vendorId].subtotal += item.price * item.quantity;
      groups[vendorId].itemCount += item.quantity;
      return groups;
    }, {});

    return {
      vendorGroups,
      subTotal: {
        label: "Sub total",
        amount: priceTotal,
        mrp: mrpTotal,
        icon: <Receipt />,
      },
      deliveryFee: {
        label: "Delivery fee",
        amount: 0,
        original: deliveryFeeOriginal,
        icon: <Truck />,
      },
      transactionFee: {
        label: "Transaction fee",
        amount: transactionFee,
        icon: <Wallet />,
      },
      savings: {
        label: "Total savings",
        amount: savings + deliveryFeeOriginal,
        icon: <HandCoins />,
      },
      grandTotal: {
        label: "Grand Total",
        amount: priceTotal + transactionFee,
      },
    };
  }, [selectedItems]);

  // Complete checkout process
  const handleCheckout = async () => {
    if (selectedItems.length === 0) {
      alert('No items selected for checkout');
      return;
    }

    // Validate address selection for home delivery
    if (purchaseMode === "homeDelivery") {
      if (!selectedAddressId && addresses.length === 0) {
        setAddressError('Please add a delivery address before proceeding');
        return;
      }

      if (!selectedAddressId && addresses.length > 0) {
        setAddressError('Please select a delivery address');
        return;
      }
    }

    setLoading(true);
    setAddressError(null);

    try {
      // Step 1: Get selected address or primary address
      let selectedAddress = null;

      if (purchaseMode === "homeDelivery") {
        if (selectedAddressId) {
          selectedAddress = addresses.find(addr => addr._id === selectedAddressId);
        } else {
          // Use primary address or first available address
          selectedAddress = primaryAddress || addresses[0];
        }

        if (!selectedAddress) {
          throw new Error('No delivery address available');
        }
      }

      // Step 2: Create order from cart items
      console.log('Creating order from cart items:', selectedItems);
      console.log('Single item mode:', singleItem);

      // Use session from useAuth hook
      const user = session?.user;

      const orderData = {
        billing_address: purchaseMode === "homeDelivery" ? {
          name: `${user?.firstName || 'Customer'} ${user?.lastName || 'Name'}`,
          email: user?.email || 'customer@example.com',
          address_line1: selectedAddress.addressLine1,
          address_line2: selectedAddress.addressLine2 || '',
          city: selectedAddress.city,
          state: selectedAddress.state,
          postal_code: selectedAddress.postalCode,
          country: selectedAddress.country,
          phone: user?.phone || '1234567890'
        } : {
          name: `${user?.firstName || 'Customer'} ${user?.lastName || 'Name'}`,
          email: user?.email || 'customer@example.com',
          address_line1: 'Store Pickup',
          city: 'Store Location',
          state: 'Store State',
          postal_code: '000000',
          country: 'India',
          phone: user?.phone || '1234567890'
        },
        shipping_address: purchaseMode === "homeDelivery" ? {
          name: `${user?.firstName || 'Customer'} ${user?.lastName || 'Name'}`,
          email: user?.email || 'customer@example.com',
          address_line1: selectedAddress.addressLine1,
          address_line2: selectedAddress.addressLine2 || '',
          city: selectedAddress.city,
          state: selectedAddress.state,
          postal_code: selectedAddress.postalCode,
          country: selectedAddress.country,
          phone: user?.phone || '1234567890'
        } : {
          name: `${user?.firstName || 'Customer'} ${user?.lastName || 'Name'}`,
          email: user?.email || 'customer@example.com',
          address_line1: 'Store Pickup',
          city: 'Store Location',
          state: 'Store State',
          postal_code: '000000',
          country: 'India',
          phone: user?.phone || '1234567890'
        },
        notes: `Order from buy-now page with ${selectedItems.length} items. Delivery mode: ${purchaseMode}. Delivery instruction: ${activeInstruction}`,
        coupon_code: null,
      };

      // Create order using Redux thunk
      // Check if token is available
      if (!session?.user?.token) {
        throw new Error('Authentication token not available. Please login again.');
      }
      
      const orderResult = singleItem 
        ? await dispatch(createOrderFromSingleItem({ token: session.user.token, orderData })).unwrap()
        : await dispatch(createOrderFromCart({ token: session.user.token, orderData })).unwrap();

      console.log('Order created successfully:', orderResult);

      // Check if orderResult is valid
      if (!orderResult) {
        throw new Error('Order creation failed - no result returned');
      }

      // The Redux thunk returns the data directly from the API response
      // So we need to access orderResult.order_id directly
      if (!orderResult.order_id) {
        console.error('Order result structure:', orderResult);
        throw new Error('Order creation failed - missing order_id in response');
      }

      console.log('Order ID extracted successfully:', orderResult.order_id);

      // Step 2: Create Razorpay order
      const token = session?.user?.token;

      const razorpayResponse = await fetch(`/api/orders/${orderResult.order_id}/create-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          payment_method: 'razorpay'
        }),
      });

      if (!razorpayResponse.ok) {
        const errorData = await razorpayResponse.json();
        throw new Error(errorData.message || 'Failed to create Razorpay order');
      }

      const razorpayData = await razorpayResponse.json();
      console.log('Razorpay order created:', razorpayData.data);

      // Step 3: Initialize Razorpay payment
      const razorpay = await initializeRazorpay();
      if (!razorpay) {
        throw new Error('Razorpay failed to load');
      }

      // Configure payment options
      const options = {
        key: razorpayData.data.key_id,
        amount: Math.round(razorpayData.data.total_amount * 100), // Convert to paise
        currency: razorpayData.data.currency,
        name: 'Last Minute Deal',
        description: `Order ${razorpayData.data.order_number}`,
        order_id: razorpayData.data.razorpay_order_id,
        handler: function (response) {
          console.log('Payment successful:', response);
          // Process payment on backend
          processPayment(response, orderResult.order_id);
        },
        prefill: {
          name: orderData.billing_address.name,
          contact: orderData.billing_address.phone,
        },
        notes: {
          order_number: razorpayData.data.order_number,
          order_id: orderResult.order_id,
        },
        theme: {
          color: '#10b981',
        },
        modal: {
          ondismiss: function () {
            console.log('Payment modal dismissed');
          },
        },
      };

      // Open Razorpay checkout
      const rzp = new razorpay(options);
      rzp.open();

    } catch (error) {
      console.error('Error during checkout:', error);
      toast.error(`Checkout failed: ${error.message || error}`);
    } finally {
      setLoading(false);
    }
  };

  // Process payment after successful Razorpay payment
  const processPayment = async (paymentResponse, orderId) => {
    try {
      const token = session?.user?.token;

      const response = await fetch('/api/payments/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          razorpay_payment_id: paymentResponse.razorpay_payment_id,
          razorpay_order_id: paymentResponse.razorpay_order_id,
          razorpay_signature: paymentResponse.razorpay_signature,
          order_id: orderId,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Clear cart after successful payment
        await clearCart();
        alert('Payment successful! Your order has been confirmed.');
        router.push(`/payment-success?order_id=${orderId}&payment_id=${paymentResponse.razorpay_payment_id}`);
      } else {
        throw new Error(result.message || 'Payment processing failed');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert(`Payment processing failed: ${error.message}`);
    }
  };

  // const handleProceedToPayment = () => {
  //   // Navigate to payment mode selection
  //   router.push('/payment-mode');
  // };

  if (!selectedItems.length) {
    return (
      <div className="p-6 text-center text-gray-500 lg:p-6 ">No items selected.</div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-1">
        <Header />

        <div className="p-3 md:p-6 w-full max-w-[1700px] mx-auto">
          {/* Selected Items */}
          <h2 className="text-xl font-semibold mb-4 lg:text-xl ">Your Items</h2>

          {/* Vendor Breakdown */}
          {Object.keys(billDetails?.vendorGroups || {}).length > 1 && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Order Breakdown by Vendor</h3>
              <div className="space-y-3">
                {Object.entries(billDetails.vendorGroups).map(([vendorId, vendor]) => (
                  <div key={vendorId} className="bg-white rounded-lg p-4 border">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium text-lg">{vendor.vendorName}</h4>
                      <span className="text-sm text-gray-500">{vendor.itemCount} item{vendor.itemCount !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="space-y-2">
                      {vendor.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                          <div className="flex items-center space-x-3">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={40}
                              height={40}
                              className="rounded-md w-10 h-10 object-cover"
                            />
                            <div>
                              <p className="font-medium text-sm">{item.name}</p>
                              <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <p className="font-semibold text-sm">₹{item.price * item.quantity}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t flex justify-between items-center">
                      <span className="text-sm text-gray-600">Vendor Subtotal:</span>
                      <span className="font-semibold">₹{vendor.subtotal}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4 lg:space-y-4 ">
            {selectedItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border rounded-lg p-4 lg:flex-row lg:items-center lg:justify-between lg:p-4 flex-col sm:flex-row sm:items-center sm:justify-between  gap-3 sm:gap-0"
              >
                <div className="flex items-center space-x-4 lg:flex lg:items-center lg:space-x-4 w-full sm:w-auto">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-md lg:w-20 lg:h-20 w-16 h-16 object-cover"
                  />
                  <div className="lg:block flex-1 min-w-0">
                    <p className="font-medium lg:text-base text-sm truncate">{item.name}</p>
                    <p className="text-sm text-gray-500 lg:text-sm ">
                      Qty: {item.quantity}
                    </p>
                    {item.vendorName && (
                      <p className="text-xs text-blue-600">From {item.vendorName}</p>
                    )}
                  </div>
                </div>
                <p className="font-semibold lg:text-base text-sm self-end sm:self-auto">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          {/* Purchase Mode + Address */}
          <div className="mt-6 p-4 bg-white rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-3">Select purchase mode</h2>

            <div className="flex flex-col md:flex-row gap-4 pr-0 md:pr-4 lg:flex lg:flex-row lg:gap-4 lg:pr-0 lg:md:pr-4">
              <Button
                variant={purchaseMode === "storePickup" ? "default" : "outline"}
                onClick={() => setPurchaseMode("storePickup")}
                className="flex flex-col items-center gap-2 px-4 md:px-6 py-4 md:py-6 w-full md:w-1/2 text-lg justify-center h-auto md:h-[120px] lg:flex lg:flex-col lg:items-center lg:gap-2 lg:px-4 lg:md:px-6 lg:py-4 lg:md:py-6 lg:w-full lg:md:w-1/2 lg:text-lg lg:justify-center lg:h-auto lg:md:h-[120px]  sm:text-base "
              >
                <Store
                  style={{
                    width: "30px",
                    height: "30px",
                    flexShrink: 0,
                  }}
                  className="lg:w-[30px] lg:h-[30px] w-6 h-6"
                />
                <span>Store Pickup</span>
              </Button>

              <Button
                variant={
                  purchaseMode === "homeDelivery" ? "default" : "outline"
                }
                onClick={() => setPurchaseMode("homeDelivery")}
                className="flex flex-col items-center gap-2 px-4 md:px-6 py-4 md:py-6 w-full md:w-1/2 text-lg justify-center h-auto md:h-[120px] lg:flex lg:flex-col lg:items-center lg:gap-2 lg:px-4 lg:md:px-6 lg:py-4 lg:md:py-6 lg:w-full lg:md:w-1/2 lg:text-lg lg:justify-center lg:h-auto lg:md:h-[120px]  sm:text-base"
              >
                <Home
                  style={{
                    width: "30px",
                    height: "30px",
                    flexShrink: 0,
                  }}
                  className="lg:w-[30px] lg:h-[30px] w-6 h-6"
                />
                <span>Home Delivery</span>
              </Button>
            </div>
            {purchaseMode === "homeDelivery" && (
              <div className="mt-4">
                {addressError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <p className="text-red-600 text-sm">{addressError}</p>
                  </div>
                )}
                <AddressSection
                  onAddressSelect={setSelectedAddressId}
                  selectedAddressId={selectedAddressId}
                />
              </div>
            )}
          </div>

          {/* Bill Details */}
          {billDetails && (
            <div className="p-4 bg-white shadow rounded-lg mt-6">
              <h2 className="text-lg font-semibold mb-3">Bill Details</h2>

              {/* Vendor Summary */}
              {Object.keys(billDetails.vendorGroups).length > 1 && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-800">
                      Multi-Vendor Order
                    </span>
                    <span className="text-xs text-blue-600">
                      {Object.keys(billDetails.vendorGroups).length} vendor{Object.keys(billDetails.vendorGroups).length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <p className="text-xs text-blue-600 mt-1">
                    Items will be shipped from different vendors
                  </p>
                </div>
              )}

              <div className="space-y-2">
                {Object.entries(billDetails).map(([key, item]) =>
                  key !== "grandTotal" && key !== "vendorGroups" ? (
                    <div key={key} className="flex justify-between">
                      <span>{item.label}</span>
                      <span>
                        {key === "subTotal" ? (
                          <>
                            ₹{item.amount}{" "}
                            <span className="text-gray-400 line-through ml-1">
                              ₹{item.mrp}
                            </span>
                          </>
                        ) : key === "deliveryFee" ? (
                          <>
                            <span className="text-gray-400 line-through">
                              ₹{item.original}
                            </span>{" "}
                            <span className="text-green-500 ml-2">Free</span>
                          </>
                        ) : (
                          <>₹{item.amount}</>
                        )}
                      </span>
                    </div>
                  ) : null
                )}
              </div>
              <div className="mt-4 pt-4 border-t flex justify-between font-semibold text-orange-500">
                <span>{billDetails.grandTotal.label}</span>
                <span>₹{billDetails.grandTotal.amount}</span>
              </div>
            </div>
          )}

          {/* Delivery Instructions */}
          {/* <div className="mt-6">
            <h2 className="text-lg font-semibold mb-3">Delivery Instruction</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:flex lg:flex-wrap lg:justify-center lg:gap-4">
              <Button
                variant={
                  activeInstruction === "soundbite"
                    ? "default"
                    : "outline"
                }
                onClick={() => setActiveInstruction("soundbite")}
                className="flex items-center gap-2 px-4 py-2 text-sm"
              >
                <Mic className="w-4 h-4" />
                Soundbite
              </Button>
              <Button
                variant={
                  activeInstruction === "noCall"
                    ? "default"
                    : "outline"
                }
                onClick={() => setActiveInstruction("noCall")}
                className="flex items-center gap-2 px-4 py-2 text-sm"
              >
                <PhoneOff className="w-4 h-4" />
                No Call
              </Button>
              <Button
                variant={
                  activeInstruction === "noRing"
                    ? "default"
                    : "outline"
                }
                onClick={() => setActiveInstruction("noRing")}
                className="flex items-center gap-2 px-4 py-2 text-sm"
              >
                <BellOff className="w-4 h-4" />
                No Ring
              </Button>
            </div>
          </div> */}

          {/* Payment Options */}
          <div className="mt-8 space-y-4">
            {/* Razorpay Quick Checkout */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Checkout with Razorpay</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Button
                    onClick={handleCheckout}
                    disabled={loading || orderCreating}
                    variant="default"
                    size="lg"
                    className="w-full bg-yellow-500 hover:bg-orange-600 text-white"
                  >
                    {(loading || orderCreating) ? (
                      <>
                        <ShoppingCart className="w-4 h-4 mr-2 animate-spin" />
                        {orderCreating ? 'Creating Order...' : 'Processing...'}
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4 mr-2" />
                        Pay ₹{billDetails?.grandTotal?.amount || 0}
                      </>
                    )}
                  </Button>
                </div>
                {/* <div className="flex-1">
                  <Button
                    onClick={handleProceedToPayment}
                    variant="outline"
                    size="lg"
                    className="w-full"
                  >
                    Other Payment Methods
                  </Button>
                </div> */}
              </div>
            </div>

            {/* Payment Methods Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium mb-2">Accepted Payment Methods:</h4>
              <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                <span className="bg-white px-2 py-1 rounded">Credit Cards</span>
                <span className="bg-white px-2 py-1 rounded">Debit Cards</span>
                <span className="bg-white px-2 py-1 rounded">UPI</span>
                <span className="bg-white px-2 py-1 rounded">Net Banking</span>
                <span className="bg-white px-2 py-1 rounded">Wallets</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Pay Button - Mobile Only */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-md mx-auto">
          {billDetails && (
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600">Total:</span>
              <span className="font-bold text-lg text-orange-500">
                ₹{billDetails.grandTotal.amount}
              </span>
            </div>
          )}
          <Button
            onClick={handleCheckout}
            disabled={loading || orderCreating}
            variant="default"
            size="lg"
            className="w-full bg-yellow-500 hover:bg-orange-600 text-white"
          >
            {(loading || orderCreating) ? (
              <>
                <ShoppingCart className="w-4 h-4 mr-2 animate-spin" />
                {orderCreating ? 'Creating Order...' : 'Processing...'}
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4 mr-2" />
                Pay ₹{billDetails?.grandTotal?.amount || 0}
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Bottom spacing for fixed button - Mobile Only */}
      <div className="sm:hidden h-32"></div>
    </div>
  );
}