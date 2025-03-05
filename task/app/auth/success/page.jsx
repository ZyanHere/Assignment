"use client"
import Image from "next/image";

export default function Success() {
    return (
      <div className="flex min-h-screen bg-white">
        {/* Left Side */}
        <div className="w-1/2 flex flex-col justify-center items-center max-w-[537px] mx-auto h-screen">
          {/* Success Icon */}
          <div className="w-[154px] h-[154px] border-4 border-yellow-400 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-26 h-26 text-yellow-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
  
          {/* Success Message */}
          <h2 className="text-[45px]  text-black mt-8">Successfully</h2>
          <p className="text-[#828282] text-[16px] mt-8">
            Your account has been created
          </p>
  
          {/* Continue Button */}
          <button
            className="bg-yellow-400 text-white w-full py-4 mt-8 rounded-md hover:bg-yellow-500"
            onClick={() => window.location.href = "/auth/location"} 
          >
            CONTINUE
          </button>
        </div>
  
        {/* Right Side */}
        <div className="hidden md:block w-1/2 shrink-0 rounded-l-[40px] relative">
                <Image
                  src="/auth-asset/hero-bg.png"
                  alt="Background"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-l-[40px]"
                />
              </div>
      </div>
    );
  }
  