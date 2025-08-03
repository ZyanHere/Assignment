"use client";
import Sidebar from "@/app/extra/home/sidebar";
import Header from "@/components/home/Header";
import { useSelectedItems } from "@/lib/contexts/selected-items-context";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PaymentMode = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const { selectedItems } = useSelectedItems();

  // Calculate total amount
  const totalAmount =
    selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0) +
    20; // Adding transaction fee

  const paymentGateways = [
    {
      id: "razorpay",
      name: "Razorpay",
      description: "Secure online payments with cards, UPI, wallets & more",
      logo: "/payment/razorpay.png",
      features: ["Credit/Debit Cards", "UPI", "Net Banking", "Wallets", "EMI"],
      color: "#0C4A6E"
    },
    {
      id: "cashfree",
      name: "Cashfree",
      description: "Fast and secure payments with multiple payment options",
      logo: "/payment/cashfree.png",
      features: ["Credit/Debit Cards", "UPI", "Net Banking", "Wallets", "EMI"],
      color: "#1E40AF"
    },
    {
      id: "cod",
      name: "Cash on Delivery",
      description: "Pay when you receive your order",
      logo: "/payment/cod.png",
      features: ["Pay on delivery"],
      color: "#059669"
    }
  ];

  const handleNext = () => {
    if (selectedMethod) {
      if (selectedMethod === "cod") {
        handleCODOrder();
      } else {
        router.push(`/payment/${selectedMethod}`);
      }
    }
  };

  const handleCODOrder = async () => {
    setIsProcessing(true);
    try {
      // For COD, we would typically create an order without payment
      // and redirect to success page
      // This is a simplified implementation

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Redirect to success page with COD details
      router.push(
        `/payment-success?payment_id=cod_${Date.now()}&order_id=order_${Date.now()}&amount=${totalAmount}&method=cod`
      );
    } catch (error) {
      console.error("COD order error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6">
          {/* Breadcrumb Navigation */}
          <nav className="mb-4 text-black text-4xl">
            <Link href="/cart" className="hover:underline font-medium">
              Cart
            </Link>
            <span className="mx-2 text-gray-400">&gt;</span>
            <span className="font-semibold text-yellow-500">
              Select Payment Gateway
            </span>
          </nav>

          <div className="mx-auto p-10">
            <h2 className="text-2xl font-semibold mb-6">Choose your payment gateway</h2>

            {/* Payment Summary */}
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="font-semibold mb-3 text-lg">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Items Total:</span>
                  <span>
                    ₹
                    {selectedItems.reduce(
                      (sum, item) => sum + item.price * item.quantity,
                      0
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Transaction Fee:</span>
                  <span>₹20</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                  <span>Total Amount:</span>
                  <span>₹{totalAmount}</span>
                </div>
              </div>
            </div>

            {/* Payment Gateway Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {paymentGateways.map((gateway) => (
                <div
                  key={gateway.id}
                  className={`bg-white rounded-lg shadow-md border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedMethod === gateway.id
                      ? "border-yellow-500 shadow-lg"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedMethod(gateway.id)}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src={gateway.logo}
                          alt={gateway.name}
                          width={60}
                          height={60}
                          className="rounded-lg"
                        />
                        <div>
                          <h3 className="text-lg font-semibold">{gateway.name}</h3>
                          <p className="text-sm text-gray-600">{gateway.description}</p>
                        </div>
                      </div>
                      <input
                        type="radio"
                        name="paymentGateway"
                        checked={selectedMethod === gateway.id}
                        onChange={() => setSelectedMethod(gateway.id)}
                        className="w-5 h-5 text-yellow-500"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-700">Supported Payment Methods:</h4>
                      <div className="flex flex-wrap gap-1">
                        {gateway.features.map((feature, index) => (
                          <span
                            key={index}
                            className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {gateway.id === "razorpay" && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-xs text-blue-700">
                          💳 Supports all major cards, UPI, net banking, and digital wallets
                        </p>
                      </div>
                    )}

                    {gateway.id === "cashfree" && (
                      <div className="mt-4 p-3 bg-green-50 rounded-lg">
                        <p className="text-xs text-green-700">
                          🚀 Fast processing with instant payment confirmation
                        </p>
                      </div>
                    )}

                    {gateway.id === "cod" && (
                      <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                        <p className="text-xs text-orange-700">
                          📦 Pay securely when your order arrives
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Security Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="text-blue-600 text-xl">🔒</div>
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">Secure Payment</h4>
                  <p className="text-sm text-blue-700">
                    All payments are processed through secure, PCI DSS compliant payment gateways. 
                    Your payment information is encrypted and never stored on our servers.
                  </p>
                </div>
              </div>
            </div>

            {/* Next Button */}
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                disabled={!selectedMethod || isProcessing}
                className={`flex items-center gap-3 bg-yellow-500 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all ${
                  !selectedMethod || isProcessing
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-orange-600 hover:shadow-lg"
                }`}
              >
                {isProcessing ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    Processing...
                  </>
                ) : (
                  <>
                    {selectedMethod === "cod" ? "Place Order" : "Continue to Payment"}
                    <span className="text-xl">➡️</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMode;