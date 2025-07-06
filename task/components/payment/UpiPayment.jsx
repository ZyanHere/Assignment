"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { createPayment, processPayment } from "@/lib/api/payment";
import { initializeRazorpayPayment } from "@/lib/utils/razorpay";
import { useSelectedItems } from "@/lib/contexts/selected-items-context";

const UpiPayment = ({ method }) => {
  const [upiId, setUpiId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { selectedItems } = useSelectedItems();

  // Calculate total amount
  const totalAmount = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 20; // Adding transaction fee

  const handlePayment = async () => {
    if (!upiId.trim()) {
      setError("Please enter your UPI ID");
      return;
    }

    // Validate UPI ID format
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/;
    if (!upiRegex.test(upiId)) {
      setError("Please enter a valid UPI ID (e.g., username@bank)");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Create payment on backend
      const paymentData = await createPayment(
        "temp-order-id", // This should be replaced with actual order ID
        method,
        `UPI Payment via ${method}`
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
          payment_method: method,
          payment_method_details: {
            upi_vpa: upiId,
          },
        });

        // Redirect to success page
        router.push("/payment-success");
      } else {
        setError("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setError(error.message || "Payment failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getMethodName = (method) => {
    const methodNames = {
      "paytm-upi": "Paytm UPI",
      "phonepe": "PhonePe",
      "gpay": "Google Pay",
    };
    return methodNames[method] || method;
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {getMethodName(method)} Payment
      </h2>

      <div className="space-y-4">
        <div>
          <Label htmlFor="upiId">UPI ID</Label>
          <Input
            id="upiId"
            type="text"
            placeholder="username@bank"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            className="mt-1"
          />
          <p className="text-sm text-gray-500 mt-1">
            Enter your UPI ID (e.g., username@bank)
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Payment Summary</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Items Total:</span>
              <span>₹{selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</span>
            </div>
            <div className="flex justify-between">
              <span>Transaction Fee:</span>
              <span>₹20</span>
            </div>
            <div className="border-t pt-1 flex justify-between font-semibold">
              <span>Total Amount:</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <Button
          onClick={handlePayment}
          disabled={isLoading || !upiId.trim()}
          className="w-full bg-yellow-500 hover:bg-orange-600 text-white py-3"
        >
          {isLoading ? "Processing..." : `Pay ₹${totalAmount}`}
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            You will be redirected to {getMethodName(method)} to complete the payment
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpiPayment;
