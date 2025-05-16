"use client";
import Header from "@/components/home/Header";
import Sidebar from "@/components/home/sidebar";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const PaymentMode = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const router = useRouter();

  const paymentOptions = [
    {
      title: "UPI",
      methods: [
        { name: "Paytm UPI", slug: "paytm-upi", src: "/payment/paytm.png" },
        { name: "PhonePe", slug: "phonepe", src: "/payment/phonepe.png" },
        { name: "GPay", slug: "gpay", src: "/payment/gpay.png" },
      ],
    },
    {
      title: "Card",
      methods: [
        { name: "Visa", slug: "visa", src: "/payment/visa.png" },
        {
          name: "MasterCard",
          slug: "mastercard",
          src: "/payment/mastercard.png",
        },
        { name: "RuPay", slug: "rupay", src: "/payment/rupay.png" },
      ],
    },
  ];

  const handleNext = () => {
    if (selectedMethod) {
      router.push(`/payment-mode/${selectedMethod}`);
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
              Select Payment Mode
            </span>
          </nav>

          <div className="mx-auto p-10">
            <h2 className="text-xl font-semibold mb-4">Select payment mode</h2>

            {/* Payment Options */}
            {paymentOptions.map((section) => (
              <div key={section.title} className="mb-6 p-8">
                <h3 className="text-lg font-medium mb-2">{section.title}</h3>
                <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-6">
                  {section.methods.map((method) => (
                    <div
                      key={method.slug}
                      className={`flex flex-col items-center cursor-pointer relative w-full ${
                        selectedMethod === method.slug
                          ? "border-2 border-orange-500 p-2 rounded-lg"
                          : ""
                      }`}
                      onClick={() => setSelectedMethod(method.slug)}
                    >
                      <Image
                        src={method.src}
                        alt={method.name}
                        width={100}
                        height={100}
                      />
                      <p className="mt-2 text-lg">{method.name}</p>
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={selectedMethod === method.slug}
                        onChange={() => setSelectedMethod(method.slug)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Net Banking Option */}
            <div
              className={`bg-white py-10 px-20 m-8 rounded-lg shadow-md flex items-center justify-between cursor-pointer relative ${
                selectedMethod === "net-banking"
                  ? "border-2 border-orange-500"
                  : ""
              }`}
              onClick={() => setSelectedMethod("net-banking")}
            >
              <div className="flex items-center gap-4">
                <Image
                  src="/payment/netbanking.png"
                  alt="Net Banking"
                  width={100}
                  height={100}
                />
                <p className="text-lg">Net Banking</p>
              </div>
              <input
                type="radio"
                name="paymentMethod"
                checked={selectedMethod === "net-banking"}
                onChange={() => setSelectedMethod("net-banking")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6"
              />
            </div>

            {/* COD */}
            <div
              className={`bg-white py-10 px-20 m-8 rounded-lg shadow-md flex items-center justify-between cursor-pointer relative ${
                selectedMethod === "cod" ? "border-2 border-orange-500" : ""
              }`}
              onClick={() => setSelectedMethod("cod")}
            >
              <div className="flex items-center gap-4">
                <Image
                  src="/payment/cod.png"
                  alt="Cash on Delivery"
                  width={100}
                  height={100}
                />
                <p className="text-lg">Cash on Delivery</p>
              </div>
              <input
                type="radio"
                name="paymentMethod"
                checked={selectedMethod === "cod"}
                onChange={() => setSelectedMethod("cod")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6"
              />
            </div>

            {/* Next Button */}
            <div className="flex justify-end mt-8">
              <button
                onClick={handleNext}
                disabled={!selectedMethod}
                className={`flex items-center gap-2 bg-yellow-500 text-white px-6 py-3 rounded-lg text-lg font-medium transition-all ${
                  !selectedMethod
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-orange-600"
                }`}
              >
                Next <span className="text-xl">➡️</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMode;
