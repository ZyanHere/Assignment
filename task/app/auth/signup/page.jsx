"use client";
import { signupSchema } from "@/lib/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { signUpFailure, signUpStart, signUpSuccess } from "@/lib/redux/auth/authSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error } = useSelector((state) => state.user);

  // Local UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [oauthLoading, setOauthLoading] = useState("");

  // RHF + Zod setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  // Handle form submission
  const onSubmit = async (data) => {
    dispatch(signUpStart());
    try {
      const payload = {
        userName: data.userName,
        email: data.email,
        // prefix country code; adjust if you support multiple countries
        phone: `+91${data.phone}`,
        password: data.password,
        confirmPassword: data.confirmPassword,
      };

      const res = await axios.post(
        "https://api.lastminutessdeal.com/lmd/api/v1/auth/customer/signup",
        payload
      );

      // Dispatch success with user + temp credentials for auto-login
      dispatch(
        signUpSuccess({
          user: res.data.data.user,
          phone: data.phone,
          password: data.password,
        })
      );

      // Optionally persist "remember me" here (e.g. cookie/localStorage)

      // Redirect to next step (e.g. OTP verification)
      router.push("/auth/verify-email");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message;
      dispatch(signUpFailure(msg));
    }
  };

  const handleOAuthSignIn = async (provider) => {
    try {
      setOauthLoading(provider);
      
      // Dispatch login start action for OAuth
      dispatch(signUpStart());
      
      await signIn(provider, { callbackUrl: "/" });
    } catch (error) {
      const errorMessage = `Failed to sign in with ${provider}. Please try again.`;
      toast.error(errorMessage);
      console.error(`${provider} sign-in error:`, error);
      
      // Dispatch signup failure action for OAuth
      dispatch(signUpFailure(errorMessage));
      setOauthLoading("");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Side - Signup Form */}
      <div className="w-full md:w-1/2 mt-6 md:mt-20 mb-6 md:mb-20 px-4 sm:px-8 flex items-center justify-center">
        <div className="flex flex-col justify-center items-center w-full max-w-xs sm:max-w-md md:max-w-[404px] mx-auto">
          <Image
            src="/auth-asset/logo.png"
            alt="Logo"
            width={81.5}
            height={62}
            className="mb-6 md:mb-8"
          />

          <h1 className="text-black text-2xl md:text-[32px] font-medium text-center">
            Get Started Now
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-full sm:max-w-md mt-8 md:mt-12"
          >
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-black">
                Username
              </label>
              <input
                id="userName"
                type="text"
                {...register("userName")}
                className={`w-full p-3 border rounded-[10px] ${
                  errors.userName ? "border-red-500" : "border-[#D9D9D9]"
                } focus:ring-2 focus:ring-yellow-500`}
                placeholder="Enter Username"
              />
              {errors.userName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.userName.message}
                </p>
              )}
            </div>
            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-medium text-black mt-4">
                Mobile Number
              </label>
              <input
                id="phone"
                {...register("phone")}
                type="tel"
                className={`w-full p-3 border rounded-lg ${
                  errors.phone ? "border-red-500" : "border-[#D9D9D9]"
                } focus:ring-2 focus:ring-yellow-500`}
                placeholder="3001234567"
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">
                  {errors.phone.message}
                </span>
              )}
            </div>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-black mt-4">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className={`w-full p-3 border rounded-lg ${
                  errors.email ? "border-red-500" : "border-[#D9D9D9]"
                } focus:ring-2 focus:ring-yellow-500`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
            {/* Password */}
            <div className="relative mt-4">
              <label className="block text-sm font-medium text-black mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`w-full p-3 border rounded-lg ${
                    errors.password ? "border-red-500" : "border-[#D9D9D9]"
                  } focus:ring-2 focus:ring-yellow-500`}
                  placeholder="Enter Password"
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

            {/* Confirm Password */}
            <div className="relative mt-4">
              <label className="block text-sm font-medium text-black">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  className={`w-full p-3 border rounded-lg ${
                    errors.confirmPassword ? "border-red-500" : "border-[#D9D9D9]"
                  } focus:ring-2 focus:ring-yellow-500`}
                  placeholder="Confirm Password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            {/* Remember Me */}
            <div className="mt-4">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="shrink-0 border border-black mr-[6px]"
              />
              <label htmlFor="remember" className="text-sm text-black">
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 mt-6 bg-[#FFC107] text-white rounded-lg font-semibold 
                        hover:bg-yellow-600 transition-colors
                        ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {loading ? "Creating Account..." : "Create Account"}
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
            Already have an account?
            <Link
              href="/auth/login"
              className="text-[#FFC107] font-medium hover:underline ml-1"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Background Image */}
      <div className="hidden md:block md:w-1/2 relative">
        <Image
          src="/auth-asset/hero-bg.png"
          alt="Background"
          fill
          priority
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Signup;
