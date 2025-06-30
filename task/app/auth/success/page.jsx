"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSelector } from "react-redux";

export default function Success() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(5); // Auto-redirect timer
  const { phone, password} = useSelector((state) => state.user);

  const handleSkip = async () => {
  if (!phone || !password) {
    toast.error("Missing credentials");
    return;
  }

  try {
    const loginRes = await signIn("credentials", {
      redirect: false,
      phone,
      password,
    });

    if (loginRes.ok && !loginRes.error) {
      await axios.get("/lmd/api/v1/csrf-token", {
        withCredentials: true,
      });
      toast.success("Login successful!");
      router.push("/");
    } else {
      toast.error("Login failed");
    }
  } catch (error) {
    toast.error("Something went wrong during login.");
    console.error(error);
  }
};


  // auto redirect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      router.push("/auth/location");
    }
  }, [countdown, router]);

  const handleContinue = () => {
    setIsLoading(true);
    router.push("/auth/location");
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side Content */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl text-center">
          {/* Success Icon */}
          <div
            role="status"
            aria-label="Account created successfully"
            className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 border-4 border-yellow-400 rounded-full flex items-center justify-center animate-fade-in mx-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 text-yellow-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Success Message */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium text-black mt-4 sm:mt-6 md:mt-8 lg:mt-10">
            Successfully
          </h2>
          
          <p className="text-gray-600 mt-2 sm:mt-4 text-xs sm:text-sm md:text-base text-center">
            Redirecting to location setup in {countdown} seconds...
          </p>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={isLoading}
            className={`bg-yellow-400 text-white w-full max-w-xs sm:max-w-sm md:max-w-md py-2 sm:py-3 mt-4 sm:mt-6 md:mt-8 rounded-lg hover:bg-yellow-500 transition-colors font-medium text-sm sm:text-base ${
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
              `CONTINUE NOW`
            )}
          </button>
          
          {/* Skip Button */}
          <button
            onClick={handleSkip}
            className="text-blue-500 font-medium cursor-pointer pt-6 sm:pt-8 md:pt-10 text-xs sm:text-sm hover:text-blue-600 transition-colors"
          >
            Skip to Homepage 
          </button>
        </div>
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
