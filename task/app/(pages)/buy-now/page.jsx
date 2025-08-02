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
  Zap,
} from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  createOrderFromCart,
  createOrderFromSingleItem,
} from "@/lib/redux/user/userSlice";
import { initializeRazorpay } from "@/lib/utils/razorpay";
import { createCashfreeOrder, processCashfreePayment } from "@/lib/api/cashfree";
import { initializeCashfree } from "@/lib/utils/cashfree";
import { useCart } from "@/lib/contexts/cart-context";
import { useAuth } from "@/lib/hooks/useAuth";
import { useDiscount } from "@/lib/contexts/discount-context";
import DiscountCodeInput from "@/components/discount/DiscountCodeInput";
import DiscountSummary from "@/components/discount/DiscountSummary";
import HotelOrderSummary from "@/components/hotel/HotelOrderSummary";
import toast from "react-hot-toast";

export default function BuyNowPage() {
  const { selectedItems, singleItem } = useSelectedItems();
  const { clearCart, removeFromCart } = useCart();
  const { addresses, primaryAddress, session, orderCreating } = useAuth();
  const { appliedDiscount, calculateDiscountAmount } = useDiscount();
  const dispatch = useDispatch();
  const [purchaseMode, setPurchaseMode] = useState("homeDelivery");
  const [activeInstruction, setActiveInstruction] = useState("soundbite");
  const [loading, setLoading] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [addressError, setAddressError] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cashfree"); // Changed from "razorpay" to "cashfree"
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
    const deliveryFeeOriginal = priceTotal > 0 ? 165 : 0;
    console.log(selectedItems);

    // Check if any item is a hotel product
    const hasHotelProducts = selectedItems.some(item => item.category === 'hotel' || item.isHotelBooking === true);

    // Group items by vendor
    const vendorGroups = selectedItems.reduce((groups, item) => {
      const vendorId = item.vendorId || "default";
      if (!groups[vendorId]) {
        groups[vendorId] = {
          vendorName: item.vendorName || "Last Minute Deal",
          items: [],
          subtotal: 0,
          itemCount: 0,
        };
      }
      groups[vendorId].items.push(item);
      groups[vendorId].subtotal += item.price * item.quantity;
      groups[vendorId].itemCount += item.quantity;
      return groups;
    }, {});

    // Calculate totals with discount
    const subtotal = priceTotal;
    const discountAmount = calculateDiscountAmount(subtotal);
    const taxAmount = (subtotal - discountAmount) * 0.18; // 18% GST on (subtotal - discount)
    const shippingAmount = 0; // Free shipping
    const totalAmount = subtotal - discountAmount + taxAmount + shippingAmount;

    // Debug logging for calculation verification
    console.log('Frontend Calculation Debug:', {
      priceTotal,
      subtotal,
      discountAmount,
      taxAmount,
      shippingAmount,
      totalAmount,
      hasHotelProducts,
    });

    return {
      mrpTotal: {
        label: "MRP Total",
        amount: mrpTotal.toFixed(2),
        mrp: mrpTotal.toFixed(2),
      },
      subTotal: {
        label: "Subtotal",
        amount: subtotal.toFixed(2),
        mrp: mrpTotal.toFixed(2),
      },
      savings: {
        label: "Savings",
        amount: savings.toFixed(2),
      },
      deliveryFee: {
        label: "Delivery Fee",
        amount: "0",
        original: deliveryFeeOriginal.toFixed(2),
      },
      taxAmount: {
        label: "Tax (18% GST)",
        amount: taxAmount.toFixed(2),
      },
      grandTotal: {
        label: "Total Amount",
        amount: totalAmount.toFixed(2),
      },
      vendorGroups,
      hasHotelProducts,
    };
  }, [selectedItems, appliedDiscount, calculateDiscountAmount]);

  // Complete checkout process
  const handleCheckout = async () => {
    if (selectedItems.length === 0) {
      alert("No items selected for checkout");
      return;
    }

    // Validate address selection for home delivery
    if (purchaseMode === "homeDelivery") {
      if (!selectedAddressId && addresses.length === 0) {
        setAddressError("Please add a delivery address before proceeding");
        return;
      }

      if (!selectedAddressId && addresses.length > 0) {
        setAddressError("Please select a delivery address");
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
          selectedAddress = addresses.find(
            (addr) => addr._id === selectedAddressId
          );
        } else {
          // Use primary address or first available address
          selectedAddress = primaryAddress || addresses[0];
        }

        if (!selectedAddress) {
          throw new Error("No delivery address available");
        }
      }

      // Step 2: Create order from cart items
      console.log("Creating order from cart items:", selectedItems);
      console.log("Single item mode:", singleItem);

      // Use session from useAuth hook
      const user = session?.user;

      const orderData = {
        billing_address:
          purchaseMode === "homeDelivery"
            ? {
                name: `${user?.firstName || "Customer"} ${
                  user?.lastName || "Name"
                }`,
                email: user?.email || "customer@example.com",
                address_line1: selectedAddress.addressLine1,
                address_line2: selectedAddress.addressLine2 || "",
                city: selectedAddress.city,
                state: selectedAddress.state,
                postal_code: selectedAddress.postalCode,
                country: selectedAddress.country,
                phone: user?.phone || "1234567890",
              }
            : {
                name: `${user?.firstName || "Customer"} ${
                  user?.lastName || "Name"
                }`,
                email: user?.email || "customer@example.com",
                address_line1: "Store Pickup",
                city: "Store Location",
                state: "Store State",
                postal_code: "000000",
                country: "India",
                phone: user?.phone || "1234567890",
              },
        shipping_address:
          purchaseMode === "homeDelivery"
            ? {
                name: `${user?.firstName || "Customer"} ${
                  user?.lastName || "Name"
                }`,
                email: user?.email || "customer@example.com",
                address_line1: selectedAddress.addressLine1,
                address_line2: selectedAddress.addressLine2 || "",
                city: selectedAddress.city,
                state: selectedAddress.state,
                postal_code: selectedAddress.postalCode,
                country: selectedAddress.country,
                phone: user?.phone || "1234567890",
              }
            : {
                name: `${user?.firstName || "Customer"} ${
                  user?.lastName || "Name"
                }`,
                email: user?.email || "customer@example.com",
                address_line1: "Store Pickup",
                city: "Store Location",
                state: "Store State",
                postal_code: "000000",
                country: "India",
                phone: user?.phone || "1234567890",
              },
        notes: `Order from buy-now page with ${selectedItems.length} items. Delivery mode: ${purchaseMode}. Delivery instruction: ${activeInstruction}`,
        coupon_code: appliedDiscount?.code || null,
      };

      // Create order using Redux thunk
      // Check if token is available
      if (!session?.user?.token) {
        throw new Error(
          "Authentication token not available. Please login again."
        );
      }

      const orderResult = singleItem
        ? await dispatch(
            createOrderFromSingleItem({ token: session.user.token, orderData })
          ).unwrap()
        : await dispatch(
            createOrderFromCart({ token: session.user.token, orderData })
          ).unwrap();

      console.log("Order created successfully:", orderResult);

      // Check if orderResult is valid
      if (!orderResult) {
        throw new Error("Order creation failed - no result returned");
      }

      // The Redux thunk returns the data directly from the API response
      // So we need to access orderResult.order_id directly
      if (!orderResult.order_id) {
        console.error("Order result structure:", orderResult);
        throw new Error("Order creation failed - missing order_id in response");
      }

      console.log("Order ID extracted successfully:", orderResult.order_id);

      // Step 3: Process payment based on selected method
      if (selectedPaymentMethod === "cashfree") {
        await handleCashfreePayment(orderResult.order_id, orderData);
      } 
      /* Razorpay option commented out for now
      else if (selectedPaymentMethod === "razorpay") {
        await handleRazorpayPayment(orderResult.order_id, orderData);
      }
      */
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error(`Checkout failed: ${error.message || error}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle Razorpay payment
  const handleRazorpayPayment = async (orderId, orderData) => {
    try {
      const token = session?.user?.token;

      const razorpayResponse = await fetch(
        `/api/orders/${orderId}/create-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            payment_method: "razorpay",
          }),
        }
      );

      if (!razorpayResponse.ok) {
        const errorData = await razorpayResponse.json();
        throw new Error(errorData.message || "Failed to create Razorpay order");
      }

      const razorpayData = await razorpayResponse.json();
      console.log("Razorpay order created:", razorpayData.data);

      // Initialize Razorpay payment
      const razorpay = await initializeRazorpay();
      if (!razorpay) {
        throw new Error("Razorpay failed to load");
      }

      // Configure payment options
      const options = {
        key: razorpayData.data.key_id,
        amount: Math.round(Number(razorpayData.data.total_amount) * 100), // Convert to paise with proper conversion
        currency: razorpayData.data.currency,
        name: "Last Minute Deal",
        description: `Order ${razorpayData.data.order_number}`,
        order_id: razorpayData.data.razorpay_order_id,
        handler: function (response) {
          console.log("Payment successful:", response);
          // Process payment on backend
          processRazorpayPayment(response, orderId);
        },
        prefill: {
          name: orderData.billing_address.name,
          contact: orderData.billing_address.phone,
        },
        notes: {
          order_number: razorpayData.data.order_number,
          order_id: orderId,
        },
        theme: {
          color: "#10b981",
        },
        modal: {
          ondismiss: function () {
            console.log("Payment modal dismissed");
          },
        },
      };

      // Open Razorpay checkout
      const rzp = new razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error during Razorpay payment:", error);
      throw error;
    }
  };

  // Handle Cashfree payment
  const handleCashfreePayment = async (orderId, orderData) => {
    try {
      const user = session?.user;
      
      // Create Cashfree order
      const cashfreeOrderData = await createCashfreeOrder({
        amount: billDetails.grandTotal.amount,
        currency: 'INR',
        orderId: `order_${orderId}_${Date.now()}`,
        customerDetails: {
          customerId: user?._id || user?.id || 'temp-customer-id',
          customerName: orderData.billing_address.name,
          customerEmail: orderData.billing_address.email,
          customerPhone: orderData.billing_address.phone,
        },
        orderNote: `Order ${orderId} - ${selectedItems.length} items`,
        orderTags: { order_id: orderId }
      });

      console.log("Cashfree order created:", cashfreeOrderData);

      // Initialize Cashfree SDK v1.0.5 - Always use sandbox for testing
      const cashfree = await initializeCashfree('sandbox');

      const checkoutOptions = {
        paymentSessionId: cashfreeOrderData.orderToken || cashfreeOrderData.payment_session_id,
        redirectTarget: "_modal"
      };

      console.log("Cashfree checkout options:", checkoutOptions);

      // Open Cashfree checkout using v1.0.5 SDK
      const paymentResult = await cashfree.checkout(checkoutOptions);
      
      // Handle payment result
      if (paymentResult.paymentDetails) {
        await processCashfreePaymentResult(paymentResult, orderId, cashfreeOrderData);
      } else if (paymentResult.error) {
        toast.error(paymentResult.error.message || 'Payment failed. Please try again.');
        router.push('/payment-failed');
      } else if (paymentResult.redirect) {
        toast.error('Payment redirection failed.');
        router.push('/payment-failed');
      }
      
    } catch (error) {
      console.error("Error during Cashfree payment:", error);
      throw error;
    }
  };

  // Process Razorpay payment after successful payment
  const processRazorpayPayment = async (paymentResponse, orderId) => {
    try {
      const token = session?.user?.token;
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

      const response = await fetch(`${backendUrl}/lmd/api/v1/payments/razorpay/process`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          razorpay_payment_id: paymentResponse.razorpay_payment_id,
          razorpay_order_id: paymentResponse.razorpay_order_id,
          razorpay_signature: paymentResponse.razorpay_signature,
          order_id: orderId,
          payment_method: 'razorpay',
        }),
      });

      const result = await response.json();

      if (result.success || result.status === 'success') {
        // Remove only the purchased items from the cart
        for (const item of selectedItems) {
          await removeFromCart(item.variantId);
        }
        toast.success("Payment successful! Your order has been confirmed.");
        router.push(
          `/payment-success?order_id=${orderId}&payment_id=${paymentResponse.razorpay_payment_id}`
        );
      } else {
        throw new Error(result.message || result.error || "Payment processing failed");
      }
    } catch (error) {
      console.error("Error processing Razorpay payment:", error);
      toast.error(`Payment processing failed: ${error.message}`);
    }
  };

  // Process Cashfree payment after successful payment
  const processCashfreePaymentResult = async (paymentResult, orderId, cashfreeOrderData) => {
    try {
      const paymentDetails = paymentResult.paymentDetails;
      
      // Log the payment details for debugging
      console.log('Cashfree payment details:', paymentDetails);
      
      // Extract reference_id with multiple fallback options
      let referenceId = paymentDetails.referenceId || 
                       paymentDetails.paymentId || 
                       paymentDetails.orderId || 
                       paymentDetails.transactionId ||
                       paymentDetails.id ||
                       paymentDetails.reference_id;
      
      // If still no reference_id, use order_id as fallback
      if (!referenceId) {
        console.warn('No reference_id found in payment details, using order_id as fallback');
        referenceId = orderId || cashfreeOrderData.order_id;
      }
      
      // Validate that we have a reference_id
      if (!referenceId) {
        throw new Error('Unable to extract reference_id from payment response');
      }
      
      const txTime = paymentDetails.txTime || paymentDetails.timestamp || new Date().toISOString();
      
      console.log('Processing payment with reference_id:', referenceId);
      
      // Note: Signature verification should be handled on the backend
      // Cashfree SDK v1.0.5 may not always return signature in paymentDetails
      // The backend will verify the payment using Cashfree's API as fallback
      
      const processResult = await processCashfreePayment({
        order_id: orderId,
        order_number: cashfreeOrderData.order_id,
        customer_id: session?.user?._id || session?.user?.id,
        amount: parseFloat(billDetails.grandTotal.amount), // Convert to number
        payment_method: 'cashfree',
        cashfree_order_id: cashfreeOrderData.cashfree_order_id || cashfreeOrderData.order_id,
        reference_id: referenceId,
        payment_status: 'success',
        payment_method_details: {
          payment_method: paymentDetails.paymentMethod || 'cashfree',
          card_network: paymentDetails.cardNetwork,
          bank_code: paymentDetails.bankCode,
          upi_id: paymentDetails.upiId,
        },
        // Only include signature if it's available from the SDK
        ...(paymentDetails.signature && { signature: paymentDetails.signature }),
        tx_time: txTime
      });

      if (processResult.success) {
        // Remove only the purchased items from the cart
        for (const item of selectedItems) {
          await removeFromCart(item.variantId);
        }
        toast.success("Payment successful! Your order has been confirmed.");
        router.push(
          `/payment-success?order_id=${orderId}&payment_id=${paymentDetails.paymentId || paymentDetails.referenceId || referenceId}`
        );
      } else {
        throw new Error(processResult.error || 'Payment processing failed');
      }
    } catch (error) {
      console.error("Error processing Cashfree payment:", error);
      toast.error(`Payment processing failed: ${error.message}`);
    }
  };

  // Note: Cashfree SDK v3 is loaded dynamically when needed
  // No need to preload it in useEffect

  // const handleProceedToPayment = () => {
  //   // Navigate to payment mode selection
  //   router.push('/payment-mode');
  // };

  if (!selectedItems.length) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              No Items Selected
            </h2>
            <p className="text-gray-500 mb-6">
              Please select items to proceed with checkout.
            </p>
            <Link href="/">
              <Button className="bg-yellow-500 hover:bg-orange-600 text-white">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto p-6">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <Link href="/" className="text-gray-500 hover:text-gray-700">
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/cart" className="text-gray-500 hover:text-gray-700">
            Cart
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900 font-medium">Checkout</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-3 space-y-6">
            {/* Delivery Mode Selection */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Delivery Mode</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button
                  variant={purchaseMode === "homeDelivery" ? "default" : "outline"}
                  onClick={() => setPurchaseMode("homeDelivery")}
                  className="flex items-center gap-2 p-4 h-auto"
                >
                  <Truck className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">Home Delivery</div>
                    <div className="text-sm text-gray-500">Free delivery</div>
                  </div>
                </Button>
                <Button
                  variant={purchaseMode === "storePickup" ? "default" : "outline"}
                  onClick={() => setPurchaseMode("storePickup")}
                  className="flex items-center gap-2 p-4 h-auto"
                >
                  <Store className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">Store Pickup</div>
                    <div className="text-sm text-gray-500">Pick up from store</div>
                  </div>
                </Button>
              </div>
            </div>

            {/* Address Section */}
            {purchaseMode === "homeDelivery" && (
              <AddressSection
                addresses={addresses}
                selectedAddressId={selectedAddressId}
                onAddressSelect={setSelectedAddressId}
                error={addressError}
              />
            )}

            {/* Discount Code - Moved above order summary */}
            <DiscountCodeInput />

            {/* Order Summary */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              {/* Multi-vendor notice - Enhanced */}
              {Object.keys(billDetails.vendorGroups).length > 1 && (
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">
                        {Object.keys(billDetails.vendorGroups).length}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900">Multi-Vendor Order</h3>
                      <p className="text-sm text-blue-700">
                        Items from {Object.keys(billDetails.vendorGroups).length} different vendors
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-blue-700">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      <span>Items will be shipped from different vendors</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-700">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      <span>Separate delivery tracking for each vendor</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-700">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      <span>Individual order confirmations will be sent</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Vendor-wise item breakdown */}
              {Object.keys(billDetails.vendorGroups).length > 1 ? (
                <div className="space-y-6">
                  {Object.entries(billDetails.vendorGroups).map(([vendorId, vendorGroup]) => (
                    <div key={vendorId} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">{vendorGroup.vendorName}</h3>
                        <span className="text-sm text-gray-500">
                          {vendorGroup.itemCount} item{vendorGroup.itemCount !== 1 ? 's' : ''}
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        {vendorGroup.items.map((item) => (
                          <div key={item.variantId} className="flex items-center gap-4">
                            <Image
                              src={item.image || "/placeholder-product.jpg"}
                              alt={item.name}
                              width={50}
                              height={50}
                              className="rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{item.name}</h4>
                              <p className="text-xs text-gray-500">
                                Qty: {item.quantity} × ₹{item.price}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="font-medium text-sm">₹{(item.price * item.quantity).toFixed(2)}</div>
                              {item.mrp && item.mrp > item.price && (
                                <div className="text-xs text-gray-400 line-through">
                                  ₹{(item.mrp * item.quantity).toFixed(2)}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Vendor Subtotal:</span>
                        <span className="font-semibold text-gray-900">₹{vendorGroup.subtotal.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedItems.map((item) => (
                    <div key={item.variantId} className="flex items-center gap-4">
                      <Image
                        src={item.image || "/placeholder-product.jpg"}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity} × ₹{item.price}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</div>
                        {item.mrp && item.mrp > item.price && (
                          <div className="text-sm text-gray-400 line-through">
                            ₹{(item.mrp * item.quantity).toFixed(2)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Payment Summary & Checkout - Sticky */}
          <div className="lg:col-span-2">
            <div className="sticky top-6 space-y-6">
              {/* Bill Summary */}
              {billDetails && (
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-lg font-semibold mb-4">Bill Summary</h2>

                  {/* Multi-vendor summary - Enhanced */}
                  {Object.keys(billDetails.vendorGroups).length > 1 && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-green-800">
                          Multi-Vendor Order Summary
                        </span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          {Object.keys(billDetails.vendorGroups).length} vendors
                        </span>
                      </div>
                      <div className="text-xs text-green-700 space-y-1">
                        <div>• Total items: {selectedItems.reduce((sum, item) => sum + item.quantity, 0)}</div>
                        <div>• Combined order value: ₹{billDetails.grandTotal.amount}</div>
                        <div>• Free delivery on all items</div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    {Object.entries(billDetails).map(([key, item]) =>
                      key !== "grandTotal" && key !== "vendorGroups" && key !== "hasHotelProducts" ? (
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
                    
                    {/* Discount Summary */}
                    <DiscountSummary subtotal={billDetails.subTotal.amount} />
                  </div>
                  <div className="mt-4 pt-4 border-t flex justify-between font-semibold text-orange-500">
                    <span>{billDetails.grandTotal.label}</span>
                    <span>₹{billDetails.grandTotal.amount}</span>
                  </div>
                </div>
              )}

              {/* Hotel Order Summary - Show if hotel products exist */}
              {billDetails?.hasHotelProducts && (
                <HotelOrderSummary 
                  items={selectedItems.filter(item => item.category === 'hotel' || item.productType === 'hotel')}
                  totalAmount={billDetails?.grandTotal?.amount}
                />
              )}

              {/* Payment Method Selection */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Choose Payment Method</h3>
                <div className="space-y-3">
                  {/* Razorpay option commented out for now
                  <div
                    className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedPaymentMethod === "razorpay"
                        ? "border-yellow-500 bg-yellow-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedPaymentMethod("razorpay")}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={selectedPaymentMethod === "razorpay"}
                      onChange={() => setSelectedPaymentMethod("razorpay")}
                      className="w-4 h-4 text-yellow-500"
                    />
                    <div className="flex items-center gap-3">
                      <Image
                        src="/payment/razorpay.svg"
                        alt="Razorpay"
                        width={40}
                        height={40}
                        className="rounded"
                      />
                      <div>
                        <div className="font-medium">Razorpay</div>
                        <div className="text-sm text-gray-500">Cards, UPI, Net Banking</div>
                      </div>
                    </div>
                  </div>
                  */}

                  <div
                    className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedPaymentMethod === "cashfree"
                        ? "border-yellow-500 bg-yellow-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedPaymentMethod("cashfree")}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={selectedPaymentMethod === "cashfree"}
                      onChange={() => setSelectedPaymentMethod("cashfree")}
                      className="w-4 h-4 text-yellow-500"
                    />
                    <div className="flex items-center gap-3">
                      <Image
                        src="/payment/cashfree.svg"
                        alt="Cashfree"
                        width={40}
                        height={40}
                        className="rounded"
                      />
                      <div>
                        <div className="font-medium">Cashfree</div>
                        <div className="text-sm text-gray-500">Fast & Secure Payments</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Options */}
              <div className="space-y-4">
                {/* Quick Checkout */}
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Quick Checkout with Cashfree
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <Button
                        onClick={handleCheckout}
                        disabled={loading || orderCreating}
                        variant="default"
                        size="lg"
                        className="w-full bg-yellow-500 hover:bg-orange-600 text-white"
                      >
                        {loading || orderCreating ? (
                          <>
                            <ShoppingCart className="w-4 h-4 mr-2 animate-spin" />
                            {orderCreating ? "Creating Order..." : "Processing..."}
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

                {/* Security Notice */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-blue-600 text-xl">🔒</div>
                    <div>
                      <h4 className="font-medium text-blue-900 mb-1">Secure Payment</h4>
                      <p className="text-sm text-blue-700">
                        All payments are processed through secure, PCI DSS compliant payment gateways.
                      </p>
                    </div>
                  </div>
                </div>
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
            {loading || orderCreating ? (
              <>
                <ShoppingCart className="w-4 h-4 mr-2 animate-spin" />
                {orderCreating ? "Creating Order..." : "Processing..."}
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
