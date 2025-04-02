"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Success() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(3); // Auto-redirect timer

  // auto redirect
  useEffect(() => {
    if (countdown>0){
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      },1000);
      return () => clearInterval(timer);
    } else{
      router.push("auth/location")
    }
  },[countdown, router]);

  const handleContinue = () => {
    setIsLoading(true);
    router.push("/auth/location");
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side Content */}
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Success Message */}
        <h2 className="text-[45px] font-medium text-black mt-8">
          Successfully
        </h2>
        {/* <p className="text-[#828282] text-[16px] mt-8 text-center">
          Your account has been created
        </p> */}
        <p className="text-gray-600 mt-4 text-center">
          Redirecting to location setup in {countdown} seconds...
        </p>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={isLoading}
          className={`bg-yellow-400 text-white w-full max-w-[300px] py-4 mt-8 rounded-lg hover:bg-yellow-500 transition-colors ${
            isLoading ? "opacity-75 cursor-not-allowed" : ""
          }`}
          aria-label="Continue to location setup"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-3"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {/* Loading spinner */}
              </svg>
              Redirecting...
            </span>
          ) : (
            `CONTINUE NOW (${countdown})`
          )}
        </button>
      </div>

      {/* Right Side Image */}
      <div className="hidden md:block w-1/2 shrink-0 rounded-l-[40px] relative">
        <Image
          src="/auth-asset/hero-bg.png"
          alt="Background"
          fill
          priority
          className="rounded-l-[40px] object-cover"
        />
      </div>
    </div>
  );
}
