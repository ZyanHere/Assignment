import { useState } from "react";

const CardPayment = () => {
  const [cardNumber, setCardNumber] = useState("");

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow-lg rounded-md">
      <h2 className="text-xl font-semibold mb-4">Enter Card Details</h2>
      <input
        type="text"
        placeholder="Card Number"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        className="w-full border px-4 py-2 rounded-md"
      />
      <button className="mt-4 bg-yellow-500 text-white px-6 py-2 rounded-md">Proceed</button>
    </div>
  );
};

export default CardPayment;
