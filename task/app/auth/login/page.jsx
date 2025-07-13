"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { loginSchema } from "@/lib/validators/auth";
import { signIn } from "next-auth/react";
import { Phone } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    console.log("=== Login Form Submission ===");
    console.log("Form values:", data);
    setIsLoading(true);
    setError("");

    try {
      console.log("🔄 Calling NextAuth signIn...");
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email, 
        password: data.password,
        rememberMe,
        callbackUrl: "/",
      });

      console.log("📥 NextAuth response:", res);

      if (res?.error) {
        throw new Error(res.error);
      }

      if (res?.url) {
        console.log("✅ Login successful, redirecting...");
        toast.success("Login successful!");
        router.push(res.url);
      }
    } catch (error) {
      console.error("❌ Login error:", error);
      const errorMessage = error.message === "CredentialsSignin"
        ? "Invalid credentials. Please try again."
        : error.message || "Login failed. Please try again later.";
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider) => {
    console.log(`=== OAuth Sign In: ${provider} ===`);
    try {
      setOauthLoading(provider);
      
      console.log(`🔄 Calling NextAuth signIn with ${provider}...`);
      await signIn(provider, { callbackUrl: "/" });
    } catch (error) {
      console.error(`❌ ${provider} sign-in error:`, error);
      const errorMessage = `Failed to sign in with ${provider}. Please try again.`;
      toast.error(errorMessage);
      setOauthLoading("");
    }
  };

  return (
    <div className="flex min-h-screen bg-white flex-col lg:flex-row">
      {/* Left Side - Login Form */}
      <div className="w-full lg:w-1/2 xl:w-2/5">
        <div className="flex flex-col justify-center items-start max-w-[418px] mx-auto h-screen px-4 sm:px-6 lg:px-8">
          <Image
            src="/auth-asset/logo.png"
            alt="Logo"
            width={75}
            height={62}
            className="mb-6 sm:mb-8 lg:mb-[32px]"
          />

          <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-medium text-black">Welcome back!</h1>

          <p className="text-base font-medium text-black mt-2 sm:mt-4">
            Please login to continue to your account
          </p>

          <form className="w-full max-w-md mt-8 sm:mt-12 lg:mt-[70px]" onSubmit={handleSubmit(onSubmit)}>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-black">
                  Email
                </label>
              </div>

              <input
                {...register("email")}
                type="text"
                placeholder="Enter email or phone"
                className={`w-full p-3 sm:p-4 border rounded-lg ${errors.email ? 'border-red-500' : 'border-[#D9D9D9]'
                  } focus:ring-2 focus:ring-yellow-500 text-base`}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="mb-4 relative">
              <label className="block text-sm font-medium text-black">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`w-full sm:p-4 p-3 border rounded-lg ${
                    errors.password ? "border-red-500" : "border-[#D9D9D9]"
                  } focus:ring-2 focus:ring-yellow-500 text-base`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="flex justify-end mt-1">
              <Link
                href="/auth/forgot-password"
                className="text-[#FFC107] text-[12px] font-medium hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <div className="mt-[5px]">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="shrink-0 border border-black mr-[6px]"
              />
              <label htmlFor="remember" className="text-sm text-black">
                Remember
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 sm:py-4 mt-6 bg-[#FFC107] text-white rounded-lg font-semibold 
                        hover:bg-yellow-600 transition-colors text-base
                        ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
          </form>

          {/* Divider */}
          <div className="flex items-center mt-[32px] mb-[40px] w-full max-w-md">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-4 text-gray-500 text-sm">Or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* OAuth Buttons */}
          <div className="w-full flex flex-col gap-3">
            {/* Google Sign-In */}
            <button
              type="button"
              onClick={() => handleOAuthSignIn('google')}
              disabled={oauthLoading !== ""}
              className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg shadow-sm 
                   hover:bg-gray-50 transition duration-200 w-full"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="ml-3 text-gray-700 text-sm font-medium">
                {oauthLoading === 'google' ? 'Connecting...' : 'Continue with Google'}
              </span>
            </button>

            {/* Facebook Sign-In */}
            <button
              type="button"
              onClick={() => handleOAuthSignIn('facebook')}
              disabled={oauthLoading !== ""}
              className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg shadow-sm 
                   hover:bg-gray-50 transition duration-200 w-full"
            >
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="ml-3 text-gray-700 text-sm font-medium">
                {oauthLoading === 'facebook' ? 'Connecting...' : 'Continue with Facebook'}
              </span>
            </button>
          </div>

          <div className="mt-4 text-sm text-black w-full flex justify-center items-center">
            Don't have an account?
            <Link
              href="/auth/signup"
              className="text-[#FFC107] font-medium hover:underline ml-1"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Background Image */}
      <div className="hidden lg:block lg:w-1/2 xl:w-3/5 shrink-0 rounded-l-[40px] relative">
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
