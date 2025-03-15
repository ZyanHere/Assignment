import Image from "next/image";
import { Button } from "../ui/button";


const ProductCard = () => {
  return (
    <div className="pb-2">
      <div className="w-[180px] p-3 border border-blue-200 rounded-lg shadow-sm">
        {/* Product Image */}
        <div className="bg-blue-50 p-2 rounded-lg">
          <Image
            src="/home/essentials/Macbook.png"
            alt="Macbook Pro"
            width={150}
            height={100}
            className="mx-auto"
          />
        </div>

        {/* Product Details */}
        <h3 className="font-bold text-sm mt-2">Macbook Pro</h3>
        <p className="text-xs text-gray-500">(Apple Macbook)</p>
        <p className="text-xs text-gray-500">100 g</p>
        <p className="text-xs text-gray-500">By Metro</p>

        {/* Timer */}
        <div className="flex justify-between text-xs font-medium mt-2">
          <p className="text-blue-700">0 3 : 0 1 : 2 3</p>
          <p className="text-gray-500">hours min sec</p>
        </div>

        {/* Price Details */}
        <p className="text-sm text-blue-700 font-semibold mt-1">20% OFF</p>
        <p className="text-xs text-gray-400 line-through">MRP: ₹75000</p>
        <p className="text-sm font-bold">₹67460</p>

        {/* Add Button */}
        <Button
          variant="outline"
          className="w-full mt-2 text-blue-700 border-blue-200"
        >
          ADD
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
