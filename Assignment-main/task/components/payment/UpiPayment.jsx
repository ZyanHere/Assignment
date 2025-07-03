import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const UpiPayment = () => {
  const handlePayment = () => {
    alert("Payment Processing...");
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row shadow-lg p-6 border rounded-lg mt-20">
      {/* Left Side: QR Code */}
      <div className="md:w-1/2 flex flex-col justify-center items-center p-4 text-center">
        {/* QR Code */}
        <Image
          src="/payment/qr2.png" 
          alt="QR Code for UPI Payment"
          width={180} 
          height={180}
          className="rounded-lg"
        />

        
        <p className="mt-5 text-sm font-medium">Scan the QR using any UPI app</p>
        {/* <div className="flex gap-6 mt-3">
          <Image src="/payment/paytm.png" alt="Paytm UPI" width={50} height={50} />
          <Image src="/payment/phonepe.png" alt="PhonePe" width={50} height={50} />
          <Image src="/payment/gpay.png" alt="GPay" width={50} height={50} />
        </div> */}
      </div>

      {/* Right Side: UPI ID Input */}
      <div className="md:w-1/2 flex flex-col justify-center p-6">
        <h2 className="text-lg font-semibold mb-1">UPI ID</h2>
        <p className="text-sm text-gray-500 mb-3">Enter your UPI ID</p>
        
        <Input
          type="text"
          placeholder="xxxxxxxxxxxxxxxx"
          className="p-3 border rounded-md w-full"
        />

        <p className="text-xs text-gray-400 mt-2">
          Your UPI ID is fully encrypted and safeguarded at all times!
        </p>

        <div className="flex justify-center">
          <Button
            onClick={handlePayment}
            className="w-[75%] h-14 mt-6 bg-[#7DD8E1] text-lg text-black hover:text-white"
          >
            Pay
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpiPayment;
