"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createPayment, processPayment } from "@/lib/api/payment";
import { initializeRazorpayPayment } from "@/lib/utils/razorpay";
import { useSelectedItems } from "@/lib/contexts/selected-items-context";
import { useRouter } from "next/navigation";
import { ShoppingCart, X } from "lucide-react";

const FloatingCheckoutButton = ({ 
  position = "bottom-right", // bottom-right, bottom-left, top-right, top-left
  className = "",
  showBadge = true 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const { selectedItems } = useSelectedItems();
  const router = useRouter();

  // Calculate total amount
  const totalAmount = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 20;

  // Get position classes
  const getPositionClasses = () => {
    switch (position) {
      case "bottom-right":
        return "bottom-6 right-6";
      case "bottom-left":
        return "bottom-6 left-6";
      case "top-right":
        return "top-6 right-6";
      case "top-left":
        return "top-6 left-6";
      default:
        return "bottom-6 right-6";
    }
  };

  const handleQuickCheckout = async () => {
    if (selectedItems.length === 0) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
      return;
    }

    setIsLoading(true);

    try {
      // Create payment on backend
      const paymentData = await createPayment(
        "temp-order-id", // This should be replaced with actual order ID
        "razorpay",
        "Floating Checkout Payment"
      );

      // Initialize Razorpay payment
      const razorpayResponse = await initializeRazorpayPayment({
        ...paymentData,
        customer_details: {
          name: "Customer Name", // This should come from user context
          email: "customer@example.com", // This should come from user context
          phone: "1234567890", // This should come from user context
        },
        order_id: "temp-order-id", // This should be replaced with actual order ID
        customer_id: "temp-customer-id", // This should come from user context
      });

      if (razorpayResponse.success) {
        // Process payment on backend
        await processPayment({
          razorpay_payment_id: razorpayResponse.razorpay_payment_id,
          razorpay_order_id: razorpayResponse.razorpay_order_id,
          razorpay_signature: razorpayResponse.razorpay_signature,
          payment_method: "razorpay",
          payment_method_details: {
            checkout_type: "floating_checkout",
          },
        });

        // Redirect to success page
        router.push("/payment-success");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  if (selectedItems.length === 0) {
    return null; // Don't show if no items
  }

  return (
    <div className={`fixed ${getPositionClasses()} z-50 ${className}`}>
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full right-0 mb-2 w-64 bg-gray-900 text-white text-sm rounded-lg p-3 shadow-lg">
          <div className="flex items-start">
            <div className="flex-1">
              <p className="font-medium">Quick Checkout</p>
              <p className="text-gray-300 text-xs mt-1">
                {selectedItems.length === 0 
                  ? "Add items to cart first" 
                  : `Pay ₹${totalAmount} securely with Razorpay`
                }
              </p>
            </div>
            <button 
              onClick={() => setShowTooltip(false)}
              className="ml-2 text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}

      {/* Main Button */}
      <Button
        onClick={handleQuickCheckout}
        disabled={isLoading}
        className="relative bg-yellow-500 hover:bg-orange-600 text-white rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all duration-200"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
        ) : (
          <ShoppingCart className="w-6 h-6" />
        )}
        
        {/* Badge */}
        {showBadge && selectedItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
            {selectedItems.length}
          </span>
        )}
      </Button>

      {/* Amount Display */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white border rounded-lg px-3 py-1 shadow-md">
        <span className="text-sm font-semibold text-gray-900">₹{totalAmount}</span>
      </div>
    </div>
  );
};

export default FloatingCheckoutButton; 