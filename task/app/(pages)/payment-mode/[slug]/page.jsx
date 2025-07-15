"use client";

import Sidebar from "@/app/extra/home/sidebar";
import Header from "@/components/home/Header";
import CardPayment from "@/components/payment/CardPayment";
import NetBanking from "@/components/payment/NetBanking";
import UpiPayment from "@/components/payment/UpiPayment";
import Link from "next/link";
import { useParams } from "next/navigation";

const PaymentPage = () => {
  const { slug } = useParams();

  const upiMthods = ["paytm-upi", "phonepe", "gpay"];
  const cardMethods = ["visa", "mastercard", "rupay"];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6">
          {/* breadcrumb */}
          <nav className="mb-4 text-black text-2xl">
            <Link href="/cart" className="hover:underline font-medium">
              Cart
            </Link>
            <span className="mx-2 text-gray-400">&gt;</span>
            <Link href="/payment-mode" className="hover:underline">
              Select Payment Mode
            </Link>
            {upiMthods.includes(slug) && (
              <>
                <span className="mx-2 text-gray-400"> &gt; </span>
                <span className="text-yellow-500 font-semibold">
                  {slug.replace("-", " ")}
                </span>
              </>
            )}
            {cardMethods.includes(slug) && (
              <>
                <span className="mx-2 text-gray-400"> &gt; </span>
                <span className="text-yellow-500 font-semibold">Add Card</span>
              </>
            )}
            {slug === "net-banking" && (
              <>
                <span className="mx-2 text-gray-400"> &gt; </span>
                <span className="text-yellow-500 font-semibold">
                  Net Banking
                </span>
              </>
            )}
          </nav>

          {upiMthods.includes(slug) && <UpiPayment method={slug} />}
          {cardMethods.includes(slug) && <CardPayment />}
          {slug === "net-banking" && <NetBanking />}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
