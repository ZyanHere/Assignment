"use client"
import Image from "next/image";
import { useEffect, useState } from "react";


export default function Verification() {
  const [timer, setTimer] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(true);

 

  // Handle Timer for Resend Button
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setResendDisabled(false);
    }
  }, [timer]);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white px-10">
        <h2 className="text-[32px] font-normal text-black">Verification</h2>
        <p className="text-[#828282] text-lg mt-[30px]">
          Enter the 4 digit code we sent to <span className="font-medium">+92-3469560184</span>
        </p>

        {/* OTP Input Fields */}
        <div className="flex space-x-[24px] mt-[33px]">
            <input
              type="text"
              maxLength="1"
              className="w-16 h-14 border border-gray-400 rounded-md text-center text-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="text"
              maxLength="1"
              className="w-16 h-14 border border-gray-400 rounded-md text-center text-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="text"
              maxLength="1"
              className="w-16 h-14 border border-gray-400 rounded-md text-center text-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="text"
              maxLength="1"
              className="w-16 h-14 border border-gray-400 rounded-md text-center text-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
        </div>

        {/* Timer */}
        <p className="text-red-500 text-sm mt-[24px]">{timer > 0 ? `00:${timer < 10 ? `0${timer}` : timer}` : null}</p>

        {/* Continue Button */}
        <button className="bg-yellow-400 text-white text-[16px] w-[470px] py-3 mt-6 rounded-md hover:bg-yellow-500">
          VERIFY
        </button>

        {/* Resend Code */}
        <p className="text-gray-500 text-sm mt-[33px]">
          If you didn’t receive a code!{" "}
          <button
            className={`text-orange-500 font-medium ${resendDisabled ? "opacity-50 cursor-not-allowed" : "hover:underline"}`}
            disabled={resendDisabled}
            onClick={() => {
              setTimer(30);
              setResendDisabled(true);
            }}
          >
            Resend
          </button>
        </p>
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
