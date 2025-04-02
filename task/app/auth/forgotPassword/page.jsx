"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";

export default function ForgotPassword() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const cleanedNumber = phoneNumber.replace(/\D/g, '');
      if (cleanedNumber.length !== 10){
        throw new Error('Invalid phone number format. Please enter a 10-digit number.');
      }

      //req to BE
      const response = await fetch('/api/v1/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({ phone: cleanedNumber }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      
    }
  }
  return (
    <div className="flex min-h-screen  bg-white">
      {/* Left Side - Forgot Password Form */}
      <div className="w-1/2">
        <div className="flex flex-col justify-center items-start max-w-[418px] mx-auto h-screen">
          <Image
            src="/auth-asset/logo.png"
            alt="Logo"
            width={86}
            height={65}
            className="mb-[32px]"
          />

          <h1 className="text-black text-[32px] font-medium height-[52px] width-[257px]">
            Forgot password
          </h1>
          <p className="text-[#828282] text-[20px] font-normal leading-[24px] tracking-[0.15px] mt-[32px]">
            Enter your number for the verification process.
          </p>

          <form className="w-full max-w-md mt-[32px]">
            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-medium text-black mb-[4px]">
                Mobile Number
              </label>
              <input
                type="text"
                placeholder="Enter your mobile number"
                className="w-full pl-[10px] pt-[12px] pb-[12px] 
                            border border-[#D9D9D9] rounded-[5px] 
                            focus:outline-none focus:ring-2 focus:ring-yellow-500
                            placeholder:text-black placeholder:opacity-20 "
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center 
              py-[15px] pb-[14px] mt-[24px]
               border border-[rgba(255,196,64,0.73)] 
              bg-[#FFC107] text-white font-semibold 
              hover:bg-yellow-600 transition duration-200"
            >
              CONTINUE
            </button>
          </form>
        </div>
      </div>

      {/* Right Side - Background Image */}
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
