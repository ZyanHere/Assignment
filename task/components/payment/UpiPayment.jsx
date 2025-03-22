import Image from "next/image";

const UpiPayment = ({ method }) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4">Scan the QR Code to Pay via {method.replace("-", " ")}</h2>
      <Image src="/payment/qr-code.png" alt="QR Code" width={200} height={200} />
    </div>
  );
};

export default UpiPayment;
