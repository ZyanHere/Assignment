"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSelector } from "react-redux";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

export default function Success() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { phone, password } = useSelector((state) => state.user);

  const handleContinue = async () => {
    if (!phone?.trim() || !password?.trim()) {
      toast.error("Missing credentials. Please log in manually.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        phone,
        password,
      });

      if (res?.ok && !res?.error) {
        toast.success("Login successful!");
        router.push("/");
      } else {
        toast.error(res?.error || "Login failed. Please try again.");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Something went wrong during login.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side */}
      <div className="w-1/2 flex flex-col justify-center items-center max-w-[537px] mx-auto h-screen">
        {/* Success Icon */}
        <div
          role="status"
          aria-label="Account created successfully"
          className="w-[154px] h-[154px] border-4 border-yellow-400 rounded-full flex items-center justify-center animate-fade-in"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-24 h-24 text-yellow-400"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Success Message */}
        <h2 className="text-[45px] font-medium text-black mt-8">Successfully</h2>
        <p className="text-gray-600 mt-4 text-center">
          Your account has been created.
        </p>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={isLoading}
          className={`w-full max-w-[300px] py-4 mt-8 text-white font-semibold rounded-lg transition-colors
            ${isLoading ? "bg-yellow-300 cursor-not-allowed" : "bg-yellow-400 hover:bg-yellow-500"}`}
          aria-label="Continue to homepage"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24" />
              Logging in...
            </span>
          ) : (
            "CONTINUE NOW"
          )}
        </button>
      </div>

      {/* Right Side Image */}
      <div className="hidden md:block w-1/2 shrink-0 relative">
        <Image
          src="/auth-asset/hero-bg.png"
          alt="Background"
          fill
          priority
          className="object-cover rounded-l-[40px]"
        />
      </div>
    </div>
  );
}
