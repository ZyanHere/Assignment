"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";

export default function Success() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const { email, phone, password } = useSelector((state) => state.user);
  const { data: session, status } = useSession();

  const identifier = phone || email;
  const hasCredentials = identifier && password;
  const isPostVerification = !hasCredentials;

  const handleLogin = async () => {
    try {
      const loginRes = await signIn("credentials", {
        redirect: false,
        email: identifier,
        password,
      });

      if (loginRes.ok) {
        toast.success("Login successful!");
        router.push("/auth/location");
      } else {
        toast.error("Login failed.");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Something went wrong during login.");
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/auth/location");
      return;
    }

    if (!hasCredentials) {
      const timer = setTimeout(() => {
        router.push("/auth/login");
      }, 5000);
      return () => clearTimeout(timer);
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, hasCredentials, router, status]);

  const handleContinue = () => {
    if (hasCredentials) {
      setIsLoading(true);
      handleLogin();
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* Left Side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-4 py-8 mx-auto">
        <div className="w-full max-w-xs sm:max-w-md md:max-w-[340px] mx-auto flex flex-col items-center">
          {/* Success Icon */}
          <div className="w-20 h-20 md:w-24 md:h-24 border-4 border-yellow-400 rounded-full flex items-center justify-center animate-fade-in mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-12 h-12 md:w-16 md:h-16 text-yellow-400"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-2xl md:text-3xl font-medium text-black mt-6 text-center">
            {isPostVerification ? "Email Verified!" : "Successfully"}
          </h2>
          <p className="text-gray-600 mt-2 text-center">
            {isPostVerification
              ? "Your email has been verified. You can now log in."
              : "Your account has been created."}
          </p>

          <button
            onClick={handleContinue}
            disabled={isLoading}
            className={`w-full py-3 mt-6 text-white font-semibold rounded-lg transition-colors ${
              isLoading
                ? "bg-yellow-300 cursor-not-allowed"
                : "bg-yellow-400 hover:bg-yellow-500"
            }`}
          >
            {isLoading
              ? "Logging in..."
              : isPostVerification
              ? "Go to Login"
              : "CONTINUE NOW"}
          </button>

          {hasCredentials && (
            <p className="mt-2 text-xs text-gray-400 text-center">
              Auto-login in {countdown} seconds...
            </p>
          )}
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
