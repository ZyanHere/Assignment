"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CardPayment = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    // Fetch grand total from localStorage or API
    const total = localStorage.getItem("grandTotal") || 0;
    setGrandTotal(parseFloat(total));
  }, []);

  const handlePayment = () => {
    alert("Payment Processing...");
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters

    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2); // Add "/" after MM
    }

    setExpiry(value.slice(0, 5)); // Limit to MM/YY format
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Total Amount */}
      <div className="mb-4 text-center">
        <h2 className="text-lg font-semibold">Total Amount</h2>
        <p className="text-xl font-bold">₹{grandTotal.toFixed(2)}</p>
      </div>

      {/* Card Payment Form */}
      <Card className="shadow-lg">
        <CardHeader>
          <h3 className="text-lg font-semibold">Card Details</h3>
        </CardHeader>

        <CardContent>
          {/* Card Number */}
          <Input
            type="text"
            placeholder="Enter Card Number"
            maxLength={16}
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="mb-6 p-6"
          />

          {/* Cardholder Name */}
          <Input
            type="text"
            placeholder="Cardholder's Name"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
            className="mb-6 p-6"
          />

          {/* Expiry & CVV */}
          <div className="flex gap-3">
            <Input
              type="text"
              placeholder="MM/YY"
              maxLength={5}
              value={expiry}
              onChange={handleExpiryChange}
              className="w-1/2 p-6"
            />

            <Input
              type="password"
              placeholder="CVV"
              maxLength={3}
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="w-1/2 p-6"
            />
          </div>
        </CardContent>

        {/* Place Order & Pay Button */}
        <CardFooter className="flex justify-center">
          <Button
            onClick={handlePayment}
            className="w-[75%] h-14 bg-[#7DD8E1] text-lg text-black hover:text-white"
          >
            Place Order & Pay
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardPayment;
