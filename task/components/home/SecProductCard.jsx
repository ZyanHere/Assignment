"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";

const ProCard = ({ imageSrc, name, price, stockStatus }) => {
  const [added, setAdded] = useState(false);

  
    return (
        <div className="flex flex-col items-left justify-left gap-[11.063px] w-[230px] h-[388px] border rounded-2xl shadow-sm p-4">
          <div className="relative flex items-center justify-center w-[194.287px] h-[192.804px] bg-blue-50 rounded-xl p-6">
            <Image
              src={imageSrc}
              alt={name}
              width={148}
              height={90}
              className="w-[148px] h-[90px] object-contain"
            />
    
            {/* Add Button Positioned at Bottom Right */}
            <Button
              onClick={() => setAdded(!added)}
              className="absolute bottom-2 right-10 transform translate-y-1/2 translate-x-1/2 w-[53px] h-[33px] border border-blue-400 text-blue-400 font-medium rounded-md hover:bg-blue-100 transition bg-white shadow-md"
            >
              {added ? "✓" : "ADD"}
            </Button>
          </div>
    
          <p className="text-gray-500 text-sm">{stockStatus}</p>
    
          <div className="w-full px-4 text-center">
            <h3 className="text-lg font-bold">{name}</h3>
            <p className="text-gray-600 text-sm">(100% Natural & Farm Fresh)</p>
          </div>
    
          {/* Rating (Static for now) */}
          <div className="flex text-yellow-500 text-lg">★★★★☆</div>
    
          {/* Price */}
          <p className="text-lg font-bold">Rs {price}</p>
        </div>
      );
};

export default ProCard;
