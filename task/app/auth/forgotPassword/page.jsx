"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import toast from 'react-hot-toast';

export default function ForgotPassword() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const cleanedNumber = phoneNumber.replace(/\D/g, "");
      if (cleanedNumber.length !== 10) {
        throw new Error(
          "Invalid phone number format. Please enter a 10-digit number."
        );
      }

      //req to BE
      const response = await fetch("/api/v1/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: cleanedNumber }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send OTP");
      }
      // Redirect to verification page with password-reset flow
      router.push(
        `/verification?phone=${encodeURIComponent(
          cleanedNumber
        )}&flow=password-reset`
      );
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen bg-white flex-col lg:flex-row">
      {/* Left Side - Forgot Password Form */}
      <div className="w-full lg:w-1/2 xl:w-2/5">
        <div className="flex flex-col justify-center items-start max-w-[418px] mx-auto h-screen px-4 sm:px-6 lg:px-8">
          <Image
            src="/auth-asset/logo.png"
            alt="Logo"
            width={86}
            height={65}
            className="mb-6 sm:mb-8 lg:mb-[32px]"
          />

          <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-medium leading-tight text-black">
            Forgot password
          </h1>
          <p className="text-base sm:text-lg lg:text-[20px] text-[#828282] font-normal leading-relaxed tracking-[0.15px] mt-4 sm:mt-6 lg:mt-[32px]">
            Enter your number for the verification process.
          </p>

          <form className="w-full max-w-md mt-6 sm:mt-8 lg:mt-[32px]" onSubmit={handleSubmit}>
            {/* Mobile Number */}
            <div className="mb-4 sm:mb-6">
              <label className="block text-sm font-medium text-black mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="6002500300"
                className="w-full p-3 sm:p-4 border border-[#D9D9D9] rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-base"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 sm:py-4 bg-yellow-400 font-semibold rounded-lg transition-colors text-base
              ${
                isLoading
                  ? "opacity-75 cursor-not-allowed"
                  : "hover:bg-yellow-500"
              }`}
            >
              {isLoading ? "Sending OTP..." : "CONTINUE"}
            </button>
          </form>
          
          <div className="mt-4 sm:mt-6 text-center w-full">
            <Link href="/login" className="hover:underline font-medium text-sm sm:text-base">
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Background Image */}
      <div className="hidden lg:block lg:w-1/2 xl:w-3/5 shrink-0 rounded-l-[40px] relative">
        <Image
          src="/auth-asset/hero-bg.png"
          alt="Decorative background"
          fill
          priority
          className="rounded-l-[40px] object-cover"
        />
      </div>
    </div>
  );
}
