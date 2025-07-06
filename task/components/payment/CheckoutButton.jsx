"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createRazorpayOrder, processPayment } from "@/lib/api/payment";
import { initializeRazorpayWithHandler } from "@/lib/utils/razorpay";
import { useSelectedItems } from "@/lib/contexts/selected-items-context";
import { useCart } from "@/lib/contexts/cart-context";
import { useRouter } from "next/navigation";

const CheckoutButton = ({ 
  className = "", 
  variant = "default", 
  size = "default",
  showAmount = true,
  customText = null,
  useCartItems = false,
  selectedCartItems = []
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { selectedItems } = useSelectedItems();
  const { cart } = useCart();
  const router = useRouter();

  // Determine which items to use for checkout
  const itemsToCheckout = useCartItems 
    ? (selectedCartItems.length > 0 ? selectedCartItems : cart)
    : selectedItems;

  // Calculate total amount
  const totalAmount = itemsToCheckout.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 20; // Adding transaction fee

  const handleCheckout = async () => {
    if (itemsToCheckout.length === 0) {
      setError("No items to checkout");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Step 1: Create Razorpay Order (as per official docs)
      const orderData = await createRazorpayOrder({
        amount: totalAmount,
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
        notes: {
          order_type: 'retail',
          items_count: itemsToCheckout.length,
          customer_id: 'temp-customer-id', // Replace with actual user ID
          checkout_type: useCartItems ? 'cart_checkout' : 'buy_now_checkout'
        }
      });

      if (!orderData || !orderData.razorpay_order_id) {
        throw new Error('Failed to create order');
      }

      // Step 2: Initialize Razorpay Checkout using handler approach (working approach)
      initializeRazorpayWithHandler({
        key_id: orderData.key_id, // From backend
        amount: orderData.amount, // Already in paise
        currency: orderData.currency,
        name: 'Last Minute Deal',
        description: `Payment for ${itemsToCheckout.length} item(s)`,
        image: 'https://example.com/your_logo', // Replace with your logo
        razorpay_order_id: orderData.razorpay_order_id,
        customer_details: {
          name: 'Customer Name', // Replace with actual user data
          email: 'customer@example.com',
          phone: '1234567890'
        },
        notes: {
          order_id: orderData.order_id,
          customer_id: 'temp-customer-id',
          items: itemsToCheckout.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price
          }))
        },
        theme: {
          color: '#F59E0B'
        }
      }, async (response) => {
        // Handler function - called when payment is successful
        console.log('✅ Payment successful:', response);
        console.log('Payment ID:', response.razorpay_payment_id);
        console.log('Order ID:', response.razorpay_order_id);
        console.log('Signature:', response.razorpay_signature);

        try {
          // Step 3: Process payment on backend
          const paymentResult = await processPayment({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            payment_method: 'razorpay',
            payment_method_details: {
              source: 'handler_callback'
            }
          });

          if (paymentResult.success) {
            console.log('✅ Payment processed successfully on backend');
            
            // Redirect to success page with payment details
            const successParams = new URLSearchParams({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              amount: totalAmount.toString(),
              items_count: itemsToCheckout.length.toString()
            });
            
            window.location.href = `/payment-success?${successParams.toString()}`;
          } else {
            console.error('❌ Payment processing failed on backend:', paymentResult.error);
            // Redirect to failure page
            const errorParams = new URLSearchParams({
              error_description: paymentResult.error || 'Payment processing failed',
              razorpay_order_id: response.razorpay_order_id
            });
            window.location.href = `/payment-failed?${errorParams.toString()}`;
          }
        } catch (processingError) {
          console.error('❌ Error processing payment:', processingError);
          // Redirect to failure page
          const errorParams = new URLSearchParams({
            error_description: 'Payment processing failed',
            razorpay_order_id: response.razorpay_order_id
          });
          window.location.href = `/payment-failed?${errorParams.toString()}`;
        }
      });

      // Note: The code below won't execute because Razorpay will handle the flow
      // The payment processing and redirects happen in the handler function above
    } catch (error) {
      console.error("Payment error:", error);
      setError(error.message || "Payment failed. Please try again.");
      setIsLoading(false);
    }
  };

  const getButtonText = () => {
    if (customText) return customText;
    if (isLoading) return "Processing...";
    if (showAmount) return `Pay ₹${totalAmount}`;
    return "Checkout";
  };

  return (
    <div className="w-full">
      <Button
        onClick={handleCheckout}
        disabled={isLoading || itemsToCheckout.length === 0}
        variant={variant}
        size={size}
        className={`w-full bg-yellow-500 hover:bg-orange-600 text-white ${className}`}
      >
        {getButtonText()}
      </Button>
      
      {error && (
        <div className="mt-2 text-sm text-red-600 text-center">
          {error}
        </div>
      )}
    </div>
  );
};

export default CheckoutButton; 