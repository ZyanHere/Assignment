"use client";
import { useState, useMemo, memo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  Store,
  Home,
  Receipt,
  Truck,
  Wallet,
  HandCoins,
  Mic,
  PhoneOff,
  BellOff,
} from "lucide-react";
import Sidebar from "@/components/home/sidebar";
import Header from "@/components/home/Header";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/contexts/cart-context";

const addresses = [
  {
    id: 1,
    text: `Shop No. 203, Sunshine Residency, Baner Road, Near DMart, Pune - 411045, Maharashtra, India.`,
  },
  {
    id: 2,
    text: `Flat No. 4, Sunshine Apartments, Lane No. 5, Koregaon Park, Pune, Maharashtra, 411001, India.`,
  },
];

// Memoized cart item component
const CartItem = memo(({ item, updateQuantity, removeFromCart, isLoading }) => (
  <TableRow key={item.id}>
    <TableCell className="flex items-center space-x-4">
      <Image
        src={item.image}
        alt={item.name}
        width={100}
        height={100}
        className="w-14 h-14 rounded-lg"
      />
      <div>
        <p className="font-medium">{item.name}</p>
        <p className="text-sm text-gray-500">
          By {item.brand || item.seller || "Unknown"}
        </p>
      </div>
    </TableCell>
    <TableCell>MRP ₹{item.price}</TableCell>
    <TableCell className="text-center flex flex-row items-center justify-center">
      <Button
        variant="outline"
        size="sm"
        onClick={() => updateQuantity(item.id, -1)}
        disabled={isLoading}
      >
        -
      </Button>
      <span className="mx-2">{item.quantity}</span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => updateQuantity(item.id, 1)}
        disabled={isLoading}
      >
        +
      </Button>
    </TableCell>
    <TableCell>MRP ₹{item.price * item.quantity}</TableCell>
    <TableCell>
      <Button
        variant="ghost"
        onClick={() => removeFromCart(item.id)}
        disabled={isLoading}
      >
        <Trash2 size={18} />
      </Button>
    </TableCell>
  </TableRow>
));

// Memoized bill item component
const BillItem = memo(({ itemKey, item }) => (
  <div className="flex justify-between items-center">
    <div className="flex items-center gap-3">
      {item.icon && (
        <div className="w-6 h-6 flex items-center justify-center">
          {item.icon}
        </div>
      )}
      <span>{item.label}</span>
    </div>

    <div className="text-right">
      {itemKey === "subTotal" ? (
        <>
          <span className="font-semibold">₹{item.amount}</span>{" "}
          <span className="text-gray-500 line-through">
            MRP ₹{item.mrp}
          </span>
        </>
      ) : itemKey === "deliveryFee" ? (
        <>
          <span className="text-gray-500 line-through">
            ₹{item.original}
          </span>{" "}
          <span className="text-green-500 font-medium">
            Free
          </span>
        </>
      ) : (
        <span className="text-black">{`₹${item.amount}`}</span>
      )}
    </div>
  </div>
));

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [purchaseMode, setPurchaseMode] = useState("homeDelivery");
  const [selectedAddress, setSelectedAddress] = useState(1);
  const [activeInstruction, setActiveInstruction] = useState("soundbite");
  const [isLoading, setIsLoading] = useState(false);
  
  // Memoize bill details calculation
  const billDetails = useMemo(() => {
    if (cart.length === 0) {
      return {
        subTotal: { label: "Sub total", amount: 0, mrp: 0, icon: <Receipt /> },
        deliveryFee: {
          label: "Delivery fee",
          amount: 0,
          original: 0,
          icon: <Truck />,
        },
        transactionFee: { label: "Transaction fee", amount: 0, icon: <Wallet /> },
        savings: { label: "Total savings", amount: 0, icon: <HandCoins /> },
        grandTotal: { label: "Grand Total", amount: 0 }
      };
    }

    const mrpTotal = cart.reduce((total, item) => total + (item.mrp || item.price) * item.quantity, 0);
    const priceTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const savings = mrpTotal - priceTotal;
    
    const transactionFee = priceTotal > 0 ? 20 : 0;
    const deliveryFeeOriginal = priceTotal > 0 ? 165 : 0;
    
    const billDetails = {
      subTotal: { label: "Sub total", amount: priceTotal, mrp: mrpTotal, icon: <Receipt /> },
      deliveryFee: {
        label: "Delivery fee",
        amount: 0,
        original: deliveryFeeOriginal,
        icon: <Truck />,
      },
      transactionFee: { label: "Transaction fee", amount: transactionFee, icon: <Wallet /> },
      savings: { label: "Total savings", amount: savings + deliveryFeeOriginal, icon: <HandCoins /> },
    };

    const grandTotal = billDetails.subTotal.amount + 
                       billDetails.deliveryFee.amount + 
                       billDetails.transactionFee.amount;

    billDetails.grandTotal = { label: "Grand Total", amount: grandTotal };
    
    return billDetails;
  }, [cart]);

  // Handlers with loading states
  const handleUpdateQuantity = async (id, amount) => {
    setIsLoading(true);
    try {
      await updateQuantity(id, amount);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFromCart = async (id) => {
    setIsLoading(true);
    try {
      await removeFromCart(id);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar - hidden on mobile */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="flex-1">
        <Header />

        <div className="p-3 md:p-6">
          {/* Breadcrumb */}
          <nav className="mb-4 text-black text-2xl md:text-4xl">
            <Link href="/cart" className="hover:underline font-medium">
              Cart
            </Link>
          </nav>

          {/* Cart Table - with responsive design */}
          <div className="bg-white shadow-md rounded-lg p-2 md:p-4">
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-xl font-medium text-gray-500">Your cart is empty</p>
                <Link href="/">
                  <Button className="mt-4 bg-blue-500 hover:bg-blue-600">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                {/* Mobile view for cart items */}
                <div className="md:hidden space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="border rounded-lg p-3 shadow-sm">
                      <div className="flex items-center space-x-3 mb-2">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="w-14 h-14 rounded-lg"
                        />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            By {item.brand || item.seller || "Unknown"}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <div>MRP ₹{item.price}</div>
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateQuantity(item.id, -1)}
                            disabled={isLoading}
                          >
                            -
                          </Button>
                          <span className="mx-2">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateQuantity(item.id, 1)}
                            disabled={isLoading}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <div>Total: ₹{item.price * item.quantity}</div>
                        <Button
                          variant="ghost"
                          onClick={() => handleRemoveFromCart(item.id)}
                          disabled={isLoading}
                        >
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop view - traditional table */}
                <div className="hidden md:block">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">Product</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="text-center">Quantity</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cart.map((item) => (
                        <CartItem 
                          key={item.id}
                          item={item}
                          updateQuantity={handleUpdateQuantity}
                          removeFromCart={handleRemoveFromCart}
                          isLoading={isLoading}
                        />
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}

            {/* Checkout Button */}
            {cart.length > 0 && (
              <div className="flex justify-end mt-4">
                <Button className="bg-green-500 text-white" disabled={isLoading}>
                  {isLoading ? "Processing..." : "+ Let's Go"}
                </Button>
              </div>
            )}
          </div>

          {/* Only show these sections if cart is not empty */}
          {cart.length > 0 && (
            <>
              {/* Purchase Mode & Address Section */}
              <div className="p-3 md:p-6 bg-white shadow-md rounded-lg mt-6">
                {/* Purchase Mode Selection */}
                <h2 className="text-lg font-semibold mb-3">Select purchase mode</h2>

                <div className="flex flex-col md:flex-row gap-4 pr-0 md:pr-4">
                  <Button
                    variant={purchaseMode === "storePickup" ? "default" : "outline"}
                    onClick={() => setPurchaseMode("storePickup")}
                    className="flex flex-col items-center gap-2 px-4 md:px-6 py-4 md:py-6 w-full md:w-1/2 text-lg justify-center h-auto md:h-[120px]"
                    disabled={isLoading}
                  >
                    <Store
                      style={{
                        width: "30px",
                        height: "30px",
                        flexShrink: 0,
                      }}
                    />
                    <span>Store Pickup</span>
                  </Button>

                  <Button
                    variant={
                      purchaseMode === "homeDelivery" ? "default" : "outline"
                    }
                    onClick={() => setPurchaseMode("homeDelivery")}
                    className="flex flex-col items-center gap-2 px-4 md:px-6 py-4 md:py-6 w-full md:w-1/2 text-lg justify-center h-auto md:h-[120px]"
                    disabled={isLoading}
                  >
                    <Home
                      style={{
                        width: "30px",
                        height: "30px",
                        flexShrink: 0,
                      }}
                    />
                    <span>Home Delivery</span>
                  </Button>
                </div>

                {/* Address Selection */}
                <h2 className="text-lg font-semibold mt-6 mb-3">Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      onClick={() => !isLoading && setSelectedAddress(address.id)}
                      className={`p-4 border rounded-lg cursor-pointer ${
                        selectedAddress === address.id
                          ? "bg-gray-200 border-black"
                          : "border-gray-300"
                      } ${isLoading ? "opacity-50" : ""}`}
                    >
                      {address.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bill Details Section */}
              <div className="p-3 md:p-6 bg-white shadow-md rounded-lg mt-6 border border-blue-200">
                <h2 className="text-lg font-semibold mb-3">Bill details</h2>

                {/* Bill Items (excluding Grand Total) */}
                <div className="space-y-4 px-2 md:px-16">
                  {Object.entries(billDetails).map(([key, item]) =>
                    key !== "grandTotal" ? (
                      <BillItem key={key} itemKey={key} item={item} />
                    ) : null
                  )}
                </div>

                {/* Grand Total (separate from the rest) */}
                <div className="mt-4 border-t pt-4 px-2 md:px-16 flex justify-between items-center">
                  <span className="font-semibold text-lg text-orange-500">
                    {billDetails.grandTotal.label}
                  </span>
                  <span className="font-semibold text-lg text-black">{`₹${billDetails.grandTotal.amount}`}</span>
                </div>

                <div className="text-xs mt-2 text-right px-2 md:px-16 text-gray-500">
                  * Final pricing will be validated by the server
                </div>
              </div>

              {/* Delivery Instruction Section */}
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-3 pl-4 md:pl-40">
                  Delivery instruction
                </h2>

                {/* Instruction Options */}
                <div className="flex flex-wrap md:flex-nowrap justify-center gap-2 md:gap-4">
                  {[
                    { label: "Soundbite", icon: <Mic />, key: "soundbite" },
                    {
                      label: "Avoid Calling",
                      icon: <PhoneOff />,
                      key: "avoidCalling",
                    },
                    { label: "No Ringing", icon: <BellOff />, key: "noRinging" },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className={`flex flex-col items-center p-2 md:p-4 rounded-lg shadow-md cursor-pointer transition-all w-[30%] md:w-auto
                ${
                  activeInstruction === item.key
                    ? "bg-yellow-100 text-yellow-600 border border-yellow-400"
                    : "bg-white text-gray-700 border border-gray-300"
                } ${isLoading ? "opacity-50" : ""}`}
                      onClick={() => !isLoading && setActiveInstruction(item.key)}
                    >
                      <div className="w-[30px] h-[30px] md:w-[43.744px] md:h-[39.766px] flex items-center justify-center">
                        {item.icon}
                      </div>
                      <span className="font-medium mt-2 text-sm md:text-base">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Click to Pay Button */}
              <div className="px-2 md:px-40">
                <Link href="/payment-mode">
                  <button 
                    className="mt-6 w-full py-3 md:py-4 text-lg font-semibold text-white bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg shadow-md cursor-pointer disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : "Click to pay"}
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}