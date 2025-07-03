"use client";
import Header from "@/components/home/Header";
import { useSelectedItems } from "@/lib/contexts/selected-items-context";
import AddressSection from "@/app/components/address/AddressSection";
import {
  Receipt,
  Truck,
  Wallet,
  HandCoins,
  Mic,
  PhoneOff,
  BellOff,
  Store,
  Home,
} from "lucide-react";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BuyNowPage() {
  const { selectedItems } = useSelectedItems();
  const [purchaseMode, setPurchaseMode] = useState("homeDelivery");
  const [activeInstruction, setActiveInstruction] = useState("soundbite");

  const billDetails = useMemo(() => {
    if (!selectedItems.length) return null;

    const mrpTotal = selectedItems.reduce(
      (t, i) => t + (i.mrp || i.price) * i.quantity,
      0
    );
    const priceTotal = selectedItems.reduce(
      (t, i) => t + i.price * i.quantity,
      0
    );
    const savings = mrpTotal - priceTotal;
    const transactionFee = priceTotal > 0 ? 20 : 0;
    const deliveryFeeOriginal = priceTotal > 0 ? 165 : 0;

    return {
      subTotal: {
        label: "Sub total",
        amount: priceTotal,
        mrp: mrpTotal,
        icon: <Receipt />,
      },
      deliveryFee: {
        label: "Delivery fee",
        amount: 0,
        original: deliveryFeeOriginal,
        icon: <Truck />,
      },
      transactionFee: {
        label: "Transaction fee",
        amount: transactionFee,
        icon: <Wallet />,
      },
      savings: {
        label: "Total savings",
        amount: savings + deliveryFeeOriginal,
        icon: <HandCoins />,
      },
      grandTotal: {
        label: "Grand Total",
        amount: priceTotal + transactionFee,
      },
    };
  }, [selectedItems]);

  if (!selectedItems.length) {
    return (
      <div className="p-6 text-center text-gray-500 lg:p-6 ">No items selected.</div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-1">
        <Header />

        <div className="p-3 md:p-6 w-full max-w-[1700px] mx-auto">
          {/* Selected Items */}
          <h2 className="text-xl font-semibold mb-4 lg:text-xl ">Your Items</h2>
          <div className="space-y-4 lg:space-y-4 ">
            {selectedItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border rounded-lg p-4 lg:flex-row lg:items-center lg:justify-between lg:p-4 flex-col sm:flex-row sm:items-center sm:justify-between  gap-3 sm:gap-0"
              >
                <div className="flex items-center space-x-4 lg:flex lg:items-center lg:space-x-4 w-full sm:w-auto">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-md lg:w-20 lg:h-20 w-16 h-16 object-cover"
                  />
                  <div className="lg:block flex-1 min-w-0">
                    <p className="font-medium lg:text-base text-sm truncate">{item.name}</p>
                    <p className="text-sm text-gray-500 lg:text-sm ">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-semibold lg:text-base text-sm self-end sm:self-auto">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          {/* Purchase Mode + Address */}
          <div className="mt-6 p-4 bg-white rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-3">Select purchase mode</h2>

            <div className="flex flex-col md:flex-row gap-4 pr-0 md:pr-4 lg:flex lg:flex-row lg:gap-4 lg:pr-0 lg:md:pr-4">
              <Button
                variant={purchaseMode === "storePickup" ? "default" : "outline"}
                onClick={() => setPurchaseMode("storePickup")}
                className="flex flex-col items-center gap-2 px-4 md:px-6 py-4 md:py-6 w-full md:w-1/2 text-lg justify-center h-auto md:h-[120px] lg:flex lg:flex-col lg:items-center lg:gap-2 lg:px-4 lg:md:px-6 lg:py-4 lg:md:py-6 lg:w-full lg:md:w-1/2 lg:text-lg lg:justify-center lg:h-auto lg:md:h-[120px]  sm:text-base "
              >
                <Store
                  style={{
                    width: "30px",
                    height: "30px",
                    flexShrink: 0,
                  }}
                  className="lg:w-[30px] lg:h-[30px] w-6 h-6"
                />
                <span>Store Pickup</span>
              </Button>

              <Button
                variant={
                  purchaseMode === "homeDelivery" ? "default" : "outline"
                }
                onClick={() => setPurchaseMode("homeDelivery")}
                className="flex flex-col items-center gap-2 px-4 md:px-6 py-4 md:py-6 w-full md:w-1/2 text-lg justify-center h-auto md:h-[120px] lg:flex lg:flex-col lg:items-center lg:gap-2 lg:px-4 lg:md:px-6 lg:py-4 lg:md:py-6 lg:w-full lg:md:w-1/2 lg:text-lg lg:justify-center lg:h-auto lg:md:h-[120px]  sm:text-base"
              >
                <Home
                  style={{
                    width: "30px",
                    height: "30px",
                    flexShrink: 0,
                  }}
                  className="lg:w-[30px] lg:h-[30px] w-6 h-6"
                />
                <span>Home Delivery</span>
              </Button>
            </div>
            <div className="mt-4">
              <AddressSection />
            </div>
          </div>

          {/* Bill Details */}
          {billDetails && (
            <div className="p-4 bg-white shadow rounded-lg mt-6">
              <h2 className="text-lg font-semibold mb-3">Bill Details</h2>
              <div className="space-y-2">
                {Object.entries(billDetails).map(([key, item]) =>
                  key !== "grandTotal" ? (
                    <div key={key} className="flex justify-between">
                      <span>{item.label}</span>
                      <span>
                        {key === "subTotal" ? (
                          <>
                            ₹{item.amount}{" "}
                            <span className="text-gray-400 line-through ml-1">
                              ₹{item.mrp}
                            </span>
                          </>
                        ) : key === "deliveryFee" ? (
                          <>
                            <span className="text-gray-400 line-through">
                              ₹{item.original}
                            </span>{" "}
                            <span className="text-green-500 ml-2">Free</span>
                          </>
                        ) : (
                          <>₹{item.amount}</>
                        )}
                      </span>
                    </div>
                  ) : null
                )}
              </div>
              <div className="mt-4 pt-4 border-t flex justify-between font-semibold text-orange-500">
                <span>{billDetails.grandTotal.label}</span>
                <span>₹{billDetails.grandTotal.amount}</span>
              </div>
              {/* <div className="text-xs text-right text-gray-400 mt-2">
                * Final pricing will be validated by the server
              </div> */}
            </div>
          )}

          {/* Delivery Instructions */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-3">Delivery Instruction</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:flex lg:flex-wrap lg:justify-center lg:gap-4">
              {[
                { key: "soundbite", label: "Soundbite", icon: <Mic /> },
                {
                  key: "avoidCalling",
                  label: "Avoid Calling",
                  icon: <PhoneOff />,
                },
                { key: "noRinging", label: "No Ringing", icon: <BellOff /> },
              ].map((item) => (
                <div
                  key={item.key}
                  className={`flex flex-col items-center border rounded-lg cursor-pointer  text-center lg:flex lg:flex-col lg:items-center lg:p-4 lg:border lg:rounded-lg lg:cursor-pointer lg:w-[120px] lg:text-center p-3 w-auto ${
                    activeInstruction === item.key
                      ? "bg-yellow-100 border-yellow-500 text-yellow-600"
                      : "bg-white border-gray-300"
                  }`}
                  onClick={() => setActiveInstruction(item.key)}
                >
                  <div className="lg:block">
                    <Mic className={`${item.key === 'soundbite' ? 'block' : 'hidden'} lg:w-6 lg:h-6 w-5 h-5`} />
                    <PhoneOff className={`${item.key === 'avoidCalling' ? 'block' : 'hidden'} lg:w-6 lg:h-6 w-5 h-5`} />
                    <BellOff className={`${item.key === 'noRinging' ? 'block' : 'hidden'} lg:w-6 lg:h-6 w-5 h-5`} />
                  </div>
                  <span className="mt-2 text-sm lg:mt-2 lg:text-sm ">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pay Button */}
          <div className="mt-6 lg:block hidden sm:block">
            <Link href="/payment-mode">
              <button className="w-full py-4 bg-orange-500 text-white font-semibold text-lg rounded-lg shadow">
                Click to Pay
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Pay Button - Mobile Only */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-md mx-auto">
          {billDetails && (
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600">Total:</span>
              <span className="font-bold text-lg text-orange-500">
                ₹{billDetails.grandTotal.amount}
              </span>
            </div>
          )}
          <Link href="/payment-mode">
            <button className="w-full py-4 bg-orange-500 text-white font-semibold text-lg rounded-lg shadow">
              Click to Pay
            </button>
          </Link>
        </div>
      </div>

      {/* Bottom spacing for fixed button - Mobile Only */}
      <div className="sm:hidden h-32"></div>
    </div>
  );
}