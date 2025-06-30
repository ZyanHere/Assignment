"use client";
import { signupSchema } from "@/lib/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  signUpStart,
  signUpSuccess,
  signUpFailure,
} from "@/lib/redux/user/userSlice";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

const Signup = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error } = useSelector((state) => state.user);

  // Local UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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
        "https://lmd-user-2ky8.onrender.com/lmd/api/v1/auth/customer/signup",
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
      router.push("/auth/verification");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message;
      dispatch(signUpFailure(msg));
    }
  };



  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side - Signup Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
          <Image
            src="/auth-asset/logo.png"
            alt="Logo"
            width={81.5}
            height={62}
            className="mb-6 sm:mb-8 md:mb-10 w-16 h-12 sm:w-20 sm:h-16 md:w-24 md:h-18 lg:w-28 lg:h-20"
          />

          <h1 className="text-black text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium mb-3 sm:mb-5 md:mb-7">
            Get Started Now
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full mt-6 sm:mt-8 md:mt-10"
          >
            {/* Name */}
            <div className="mb-3 sm:mb-4">
              <label className="block text-sm sm:text-base font-medium text-black mb-2">
                Username
              </label>
              <input
                id="userName"
                type="text"
                {...register("userName")}
                className={`w-full p-3 sm:p-4 border rounded-lg text-base sm:text-lg ${
                  errors.userName ? "border-red-500" : "border-[#D9D9D9]"
                } focus:ring-2 focus:ring-yellow-500 focus:outline-none`}
                placeholder="Enter Username"
              />
              {errors.userName && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.userName.message}
                </p>
              )}
            </div>
            
            {/* Mobile Number */}
            <div className="mb-3 sm:mb-4">
              <label className="block text-sm sm:text-base font-medium text-black mb-2">
                Mobile Number
              </label>
              <input
                id="phone"
                {...register("phone")}
                type="tel"
                className={`w-full p-3 sm:p-4 border rounded-lg text-base sm:text-lg ${
                  errors.phone ? "border-red-500" : "border-[#D9D9D9]"
                } focus:ring-2 focus:ring-yellow-500 focus:outline-none`}
                placeholder="3001234567"
              />
              {errors.phone && (
                <span className="text-red-500 text-sm mt-2">
                  {errors.phone.message}
                </span>
              )}
            </div>
            
            {/* Email */}
            <div className="mb-3 sm:mb-4">
              <label className="block text-sm sm:text-base font-medium text-black mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className={`w-full p-3 sm:p-4 border rounded-lg text-base sm:text-lg ${
                  errors.email ? "border-red-500" : "border-[#D9D9D9]"
                } focus:ring-2 focus:ring-yellow-500 focus:outline-none`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-2">
                  {errors.email.message}
                </span>
              )}
            </div>
            
            {/* Password */}
            <div className="mb-3 sm:mb-4">
              <label className="block text-sm sm:text-base font-medium text-black mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`w-full p-3 sm:p-4 border rounded-lg text-base sm:text-lg pr-12 ${
                    errors.password ? "border-red-500" : "border-[#D9D9D9]"
                  } focus:ring-2 focus:ring-yellow-500 focus:outline-none`}
                  placeholder="Enter Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 p-1 hover:text-gray-700"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-500 text-sm mt-2">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-3 sm:mb-4">
              <label className="block text-sm sm:text-base font-medium text-black mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  className={`w-full p-3 sm:p-4 border rounded-lg text-base sm:text-lg pr-12 ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-[#D9D9D9]"
                  } focus:ring-2 focus:ring-yellow-500 focus:outline-none`}
                  placeholder="Re-Enter Password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 p-1 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <FiEyeOff size={20} />
                  ) : (
                    <FiEye size={20} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm mt-2">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            
            <div className="flex justify-end mt-1 mb-3">
              <Link
                href="/auth/forgotPassword"
                className="text-[#FFC107] text-xs sm:text-sm font-medium hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            
            <div className="flex items-center mb-4 sm:mb-6">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="shrink-0 border border-black mr-3 w-4 h-4 sm:w-5 sm:h-5"
              />
              <label htmlFor="remember" className="text-sm sm:text-base text-black">
                Remember
              </label>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 sm:py-3 bg-[#FFC107] font-semibold rounded-lg hover:bg-yellow-600 disabled:opacity-75 disabled:cursor-not-allowed transition-colors text-base sm:text-lg"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
          </form>

          {/* Social Signup Section */}
          <div className="flex items-center mt-6 sm:mt-8 md:mt-10 mb-4 sm:mb-6 w-full">
            <hr className="flex-grow border-[#F5F5F5]" />
            <span className="mx-4 text-black text-sm sm:text-base">Or</span>
            <hr className="flex-grow border-[#F5F5F5]" />
          </div>

          <div className="w-full flex flex-col md:flex-col lg:flex-row gap-3 lg:gap-6 mb-4 sm:mb-6">
            {/* Google Sign-Up */}
            <button className="flex items-center justify-center px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-full shadow-sm hover:bg-gray-100 transition duration-200 w-full lg:w-auto">
              <Image
                src="/auth-asset/google-logo.svg"
                alt="Google"
                width={20}
                height={20}
                className="w-5 h-5 sm:w-6 sm:h-6"
              />
              <span className="ml-2 text-black text-sm sm:text-base font-medium">
                Sign up with Google
              </span>
            </button>

            {/* Apple Sign-Up */}
            <button className="flex items-center justify-center px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-full shadow-sm hover:bg-gray-100 transition duration-200 w-full lg:w-auto">
              <Image
                src="/auth-asset/apple-logo.svg"
                alt="Apple"
                width={20}
                height={20}
                className="w-5 h-5 sm:w-6 sm:h-6"
              />
              <span className="ml-2 text-black text-sm sm:text-base font-medium">
                Sign up with Apple
              </span>
            </button>
          </div>

          <div className="text-xs sm:text-sm text-black w-full flex justify-center items-center">
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
};

export default Signup;