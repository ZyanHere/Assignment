"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createPayment, processPayment } from "@/lib/api/payment";
import { initializeRazorpayWithHandler } from "@/lib/utils/razorpay";
import { useSelectedItems } from "@/lib/contexts/selected-items-context";
import { useRouter } from "next/navigation";
import { ShoppingCart, CreditCard, Shield, ArrowRight } from "lucide-react";

const QuickCheckout = ({ 
  className = "",
  showOrderSummary = true,
  showPaymentOptions = false 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { selectedItems } = useSelectedItems();
  const router = useRouter();

  // Calculate totals
  const subtotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const transactionFee = 20;
  const totalAmount = subtotal + transactionFee;

  const handleQuickCheckout = async () => {
    if (selectedItems.length === 0) {
      setError("No items in cart");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Create payment on backend
      const paymentData = await createPayment(
        "temp-order-id", // This should be replaced with actual order ID
        "razorpay",
        "Quick Checkout Payment"
      );

      // Initialize Razorpay payment using handler approach
      initializeRazorpayWithHandler({
        ...paymentData,
        customer_details: {
          name: "Customer Name", // This should come from user context
          email: "customer@example.com", // This should come from user context
          phone: "1234567890", // This should come from user context
        },
        order_id: "temp-order-id", // This should be replaced with actual order ID
        customer_id: "temp-customer-id", // This should come from user context
      }, async (response) => {
        // Handler function - called when payment is successful
        console.log('✅ Quick checkout payment successful:', response);
        console.log('Payment ID:', response.razorpay_payment_id);
        console.log('Order ID:', response.razorpay_order_id);
        console.log('Signature:', response.razorpay_signature);

        try {
          // Process payment on backend
          const paymentResult = await processPayment({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            payment_method: "razorpay",
            payment_method_details: {
              checkout_type: "quick_checkout",
              source: 'handler_callback'
            },
          });

          if (paymentResult.success) {
            console.log('✅ Payment processed successfully on backend');
            
            // Redirect to success page with payment details
            const successParams = new URLSearchParams({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              amount: totalAmount.toString(),
              items_count: selectedItems.length.toString(),
              checkout_type: 'quick_checkout'
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

  const handleDetailedCheckout = () => {
    router.push('/buy-now');
  };

  if (selectedItems.length === 0) {
    return (
      <div className={`bg-gray-50 p-6 rounded-lg text-center ${className}`}>
        <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 mb-2">Your cart is empty</h3>
        <p className="text-gray-500 mb-4">Add some items to your cart to proceed with checkout</p>
        <Button onClick={() => router.push('/')} className="bg-yellow-500 hover:bg-orange-600">
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className={`bg-white border rounded-lg shadow-sm ${className}`}>
      {/* Header */}
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Quick Checkout</h2>
        <p className="text-gray-600">Complete your purchase securely with Razorpay</p>
      </div>

      {/* Order Summary */}
      {showOrderSummary && (
        <div className="p-6 border-b">
          <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
          
          {/* Items */}
          <div className="space-y-3 mb-4">
            {selectedItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal:</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Transaction Fee:</span>
              <span>₹{transactionFee}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg border-t pt-2">
              <span>Total:</span>
              <span className="text-yellow-600">₹{totalAmount}</span>
            </div>
          </div>
        </div>
      )}

      {/* Payment Options */}
      {showPaymentOptions && (
        <div className="p-6 border-b">
          <h3 className="font-semibold text-gray-900 mb-4">Payment Options</h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 border rounded-lg bg-yellow-50 border-yellow-200">
              <CreditCard className="w-5 h-5 text-yellow-600 mr-3" />
              <div className="flex-1">
                <p className="font-medium text-gray-900">Razorpay Secure Checkout</p>
                <p className="text-sm text-gray-600">Pay with UPI, Cards, Net Banking, or Wallets</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Info */}
      <div className="p-6 border-b bg-gray-50">
        <div className="flex items-center text-sm text-gray-600">
          <Shield className="w-4 h-4 mr-2" />
          <span>Your payment is secured by Razorpay's 256-bit SSL encryption</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-6 space-y-3">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
            {error}
          </div>
        )}

        <Button
          onClick={handleQuickCheckout}
          disabled={isLoading}
          className="w-full bg-yellow-500 hover:bg-orange-600 text-white py-3 text-lg font-medium"
        >
          {isLoading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Processing...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <span>Pay ₹{totalAmount}</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </div>
          )}
        </Button>

        <Button
          onClick={handleDetailedCheckout}
          variant="outline"
          className="w-full py-3"
        >
          Detailed Checkout
        </Button>
      </div>
    </div>
  );
};

export default QuickCheckout; 