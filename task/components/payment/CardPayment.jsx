"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { createPayment, processPayment } from "@/lib/api/payment";
import { initializeRazorpayPayment } from "@/lib/utils/razorpay";
import { useSelectedItems } from "@/lib/contexts/selected-items-context";

const CardPayment = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { selectedItems } = useSelectedItems();

  // Calculate total amount
  const totalAmount = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 20; // Adding transaction fee

  const validateForm = () => {
    if (!cardNumber.trim()) {
      setError("Please enter card number");
      return false;
    }
    if (!cardHolderName.trim()) {
      setError("Please enter card holder name");
      return false;
    }
    if (!expiryDate.trim()) {
      setError("Please enter expiry date");
      return false;
    }
    if (!cvv.trim()) {
      setError("Please enter CVV");
      return false;
    }

    // Validate card number (basic Luhn algorithm)
    const cardNumberClean = cardNumber.replace(/\s/g, "");
    if (!/^\d{13,19}$/.test(cardNumberClean)) {
      setError("Please enter a valid card number");
      return false;
    }

    // Validate expiry date
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      setError("Please enter expiry date in MM/YY format");
      return false;
    }

    // Validate CVV
    if (!/^\d{3,4}$/.test(cvv)) {
      setError("Please enter a valid CVV");
      return false;
    }

    return true;
  };

  const handlePayment = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Create payment on backend
      const paymentData = await createPayment(
        "temp-order-id", // This should be replaced with actual order ID
        "card",
        "Card Payment"
      );

      // Initialize Razorpay payment
      const razorpayResponse = await initializeRazorpayPayment({
        ...paymentData,
        customer_details: {
          name: cardHolderName,
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
          payment_method: "card",
          payment_method_details: {
            card_network: getCardNetwork(cardNumber),
            card_type: "credit", // This could be determined based on card number
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

  const getCardNetwork = (cardNumber) => {
    const cleanNumber = cardNumber.replace(/\s/g, "");
    
    if (/^4/.test(cleanNumber)) return "visa";
    if (/^5[1-5]/.test(cleanNumber)) return "mastercard";
    if (/^6/.test(cleanNumber)) return "rupay";
    if (/^3[47]/.test(cleanNumber)) return "amex";
    
    return "unknown";
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Card Payment</h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Card Number
          </label>
          <Input
            id="cardNumber"
            type="text"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            maxLength={19}
            className="mt-1"
          />
        </div>

        <div>
          <label htmlFor="cardHolderName" className="block text-sm font-medium text-gray-700 mb-1">
            Card Holder Name
          </label>
          <Input
            id="cardHolderName"
            type="text"
            placeholder="John Doe"
            value={cardHolderName}
            onChange={(e) => setCardHolderName(e.target.value.toUpperCase())}
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date
            </label>
            <Input
              id="expiryDate"
              type="text"
              placeholder="MM/YY"
              value={expiryDate}
              onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
              maxLength={5}
              className="mt-1"
            />
          </div>

          <div>
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
              CVV
            </label>
            <Input
              id="cvv"
              type="password"
              placeholder="123"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
              maxLength={4}
              className="mt-1"
            />
          </div>
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
          disabled={isLoading || !cardNumber || !cardHolderName || !expiryDate || !cvv}
          className="w-full bg-yellow-500 hover:bg-orange-600 text-white py-3"
        >
          {isLoading ? "Processing..." : `Pay ₹${totalAmount}`}
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Your payment is secured by Razorpay
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardPayment;
