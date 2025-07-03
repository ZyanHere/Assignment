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

      // Optionally persist “remember me” here (e.g. cookie/localStorage)

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
    <div className="flex min-h-screen ">
      {/* Left Side - Signup Form */}
      <div className="w-1/2 mt-20 mb-20">
        <div className="flex flex-col justify-center items-start max-w-[404px] mx-auto ">
          <Image
            src="/auth-asset/logo.png"
            alt="Logo"
            width={81.5}
            height={62}
            className="mb-[32px]"
          />

          <h1 className="text-black text-[32px] font-medium">
            Get Started Now
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md mt-[70px]"
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
                placeholder="Enter Userame"
              />
              {errors.userName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.userName.message}
                </p>
              )}
            </div>
            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-medium text-black mt-[14px]">
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
              <label className="block text-sm font-medium text-black mt-[14px]">
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
            <div className=" relative">
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
            <div className="relative">
              <label className="block text-sm font-medium text-black mt-[14px]">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  className={`w-full p-3 border rounded-lg ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-[#D9D9D9]"
                  } focus:ring-2 focus:ring-yellow-500`}
                  placeholder="Re-Enter Password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? (
                    <FiEyeOff size={20} />
                  ) : (
                    <FiEye size={20} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            <div className="flex justify-end mt-1">
              <Link
                href="/auth/forgotPassword"
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
              <label htmlFor="remember" className="text-[14px] text-black">
                Remember
              </label>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#FFC107] font-semibold rounded-lg hover:bg-yellow-600 disabled:opacity-75 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
          </form>

          {/* Social Signup Section */}
          <div className="flex items-center mt-[32px] mb-[40px] w-full max-w-md">
            <hr className="flex-grow border-[#F5F5F5]" />
            <span className="mx-4 text-black">Or</span>
            <hr className="flex-grow border-[#F5F5F5]" />
          </div>

          <div className="w-full flex justify-between mt-4">
            {/* Google Sign-Up */}
            <div>
              <button
                className="flex items-center px-6 py-2 border border-gray-300 rounded-full shadow-sm 
                     hover:bg-gray-100 transition duration-200"
              >
                <Image
                  src="/auth-asset/google-logo.svg"
                  alt="Google"
                  width={20}
                  height={20}
                />
                <span className="ml-2 text-black text-sm font-medium">
                  Sign up with Google
                </span>
              </button>
            </div>

            {/* Apple Sign-Up */}
            <div>
              <button
                className="flex items-center px-6 py-2 border border-gray-300 rounded-full shadow-sm 
                     hover:bg-gray-100 transition duration-200"
              >
                <Image
                  src="/auth-asset/apple-logo.svg"
                  alt="Apple"
                  width={20}
                  height={20}
                />
                <span className="ml-2 text-black text-sm font-medium">
                  Sign up with Apple
                </span>
              </button>
            </div>
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
};

export default Signup;
