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
        { name: "Paytm UPI", src: "/payment/paytm.png" },
        { name: "PhonePe", src: "/payment/phonepe.png" },
        { name: "GPay", src: "/payment/gpay.png" },
      ],
    },
    {
      title: "Card",
      methods: [
        { name: "Visa", src: "/payment/visa.png" },
        { name: "MasterCard", src: "/payment/mastercard.png" },
        { name: "RuPay", src: "/payment/rupay.png" },
      ],
    },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6">
          <nav className="mb-4 text-black text-4xl">
            <Link href="/Cart" className="hover:underline font-medium">
              Cart
            </Link>
            <span className="mx-2 text-gray-400">&gt;</span>
            <span className="font-semibold text-yellow-500">
              Select Payment Mode
            </span>
          </nav>
          <div className="mx-auto p-10">
            <h2 className="text-xl font-semibold mb-4">Select payment mode</h2>
            {paymentOptions.map((section) => (
              <div key={section.title} className="mb-6 p-8">
                <h3 className="text-lg font-medium mb-2">{section.title}</h3>
                <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-26">
                  {section.methods.map((method) => (
                    <div
                      key={method.name}
                      className={`flex flex-col items-center cursor-pointer relative w-full ${
                        selectedMethod === method.name
                          ? "border-2 border-orange-500 p-2 rounded-lg"
                          : ""
                      }`}
                      onClick={() => setSelectedMethod(method.name)}
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
                        checked={selectedMethod === method.name}
                        onChange={() => setSelectedMethod(method.name)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Net Banking Section */}
            <div
              className={`bg-white py-10 px-20 m-8 rounded-lg shadow-md flex items-center justify-between cursor-pointer relative ${
                selectedMethod === "Net Banking" ? "border-2 border-orange-500" : ""
              }`}
              onClick={() => setSelectedMethod("Net Banking")}
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
                checked={selectedMethod === "Net Banking"}
                onChange={() => setSelectedMethod("Net Banking")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6"
              />
            </div>

            {/* Next Button */}
            <div className="flex justify-end mt-8">
              <button
                onClick={() => router.push("/order-summary")}
                disabled={!selectedMethod}
                className={`flex items-center gap-2 bg-yellow-500 text-white px-6 py-3 rounded-lg text-lg font-medium transition-all $ {
                  !selectedMethod ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-600"
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
