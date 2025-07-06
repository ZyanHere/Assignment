"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { createPayment, processPayment } from "@/lib/api/payment";
import { initializeRazorpayPayment } from "@/lib/utils/razorpay";
import { useSelectedItems } from "@/lib/contexts/selected-items-context";

const NetBanking = () => {
  const [selectedBank, setSelectedBank] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { selectedItems } = useSelectedItems();

  // Calculate total amount
  const totalAmount = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 20; // Adding transaction fee

  const banks = [
    { code: "SBIN", name: "State Bank of India" },
    { code: "HDFC", name: "HDFC Bank" },
    { code: "ICIC", name: "ICICI Bank" },
    { code: "AXIS", name: "Axis Bank" },
    { code: "KOTAK", name: "Kotak Mahindra Bank" },
    { code: "YESB", name: "Yes Bank" },
    { code: "IDIB", name: "Indian Bank" },
    { code: "IOBA", name: "Indian Overseas Bank" },
    { code: "PSIB", name: "Punjab & Sind Bank" },
    { code: "PUNB", name: "Punjab National Bank" },
    { code: "BARB", name: "Bank of Baroda" },
    { code: "UBIN", name: "Union Bank of India" },
    { code: "CNRB", name: "Canara Bank" },
    { code: "BKID", name: "Bank of India" },
    { code: "CBIN", name: "Central Bank of India" },
  ];

  const handlePayment = async () => {
    if (!selectedBank) {
      setError("Please select a bank");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Create payment on backend
      const paymentData = await createPayment(
        "temp-order-id", // This should be replaced with actual order ID
        "netbanking",
        `Net Banking Payment via ${selectedBank}`
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
          payment_method: "netbanking",
          payment_method_details: {
            bank_name: selectedBank,
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

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Net Banking</h2>

      <div className="space-y-4">
        <div>
          <Label htmlFor="bank">Select Bank</Label>
          <select
            id="bank"
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          >
            <option value="">Choose your bank</option>
            {banks.map((bank) => (
              <option key={bank.code} value={bank.code}>
                {bank.name}
              </option>
            ))}
          </select>
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
          disabled={isLoading || !selectedBank}
          className="w-full bg-yellow-500 hover:bg-orange-600 text-white py-3"
        >
          {isLoading ? "Processing..." : `Pay ₹${totalAmount}`}
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            You will be redirected to your bank's secure payment page
          </p>
        </div>
      </div>
    </div>
  );
};

export default NetBanking;
