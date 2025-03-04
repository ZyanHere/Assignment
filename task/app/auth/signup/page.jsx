import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Signup() {
  return (
    <div className="flex min-h-screen bg-white">
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

          <form className="w-full max-w-md mt-[70px]">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-black">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                className="w-full pl-[10px] pr-[316px] pt-[10px] pb-[13px] 
                            border border-[#D9D9D9] rounded-[10px] 
                            focus:outline-none focus:ring-2 focus:ring-yellow-500
                          placeholder:text-black placeholder:opacity-20 "
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-medium text-black mt-[14px]">
                Mobile Number
              </label>
              <input
                type="text"
                placeholder="Enter mobile number"
                className="w-full pl-[10px] pr-[256px] pt-[10px] pb-[13px] 
                            border border-[#D9D9D9] rounded-[10px] 
                            focus:outline-none focus:ring-2 focus:ring-yellow-500
                          placeholder:text-black placeholder:opacity-20 "
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-black mt-[14px]">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-[10px] pr-[287px] pt-[10px] pb-[13px] 
                            border border-[#D9D9D9] rounded-[10px] 
                            focus:outline-none focus:ring-2 focus:ring-yellow-500
                          placeholder:text-black placeholder:opacity-20 "
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-black mt-[14px]">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full pl-[10px] pr-[290px] pt-[10px] pb-[13px] 
                            border border-[#D9D9D9] rounded-[10px] 
                            focus:outline-none focus:ring-2 focus:ring-yellow-500
                          placeholder:text-black placeholder:opacity-20 "
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-black mt-[14px]">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Re-Enter Password"
                className="w-full pl-[10px] pr-[267px] pt-[10px] pb-[13px] 
                            border border-[#D9D9D9] rounded-[10px] 
                            focus:outline-none focus:ring-2 focus:ring-yellow-500
                          placeholder:text-black placeholder:opacity-20 "
              />
            </div>

            <div className="flex justify-end mt-1">
              <a
                href="#"
                className="text-[#FFC107] text-[12px] font-medium hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <div className="mt-[5px]">
              <input
                type="checkbox"
                id="remember"
                className="shrink-0 border border-black mr-[6px]"
              />
              <label htmlFor="remember" className="text-[14px] text-black">
                Remember
              </label>
            </div>

            <button
              className="w-full flex justify-center items-center 
             py-[15px] pb-[14px] mt-[16px]
             rounded-[10px] border border-[rgba(255,196,64,0.73)] 
             bg-[#FFC107] text-white font-semibold 
             hover:bg-yellow-600 transition duration-200"
            >
              Sign Up
            </button>
          </form>

          <div className="flex items-center mt-[32px] mb-[40px] w-full max-w-md">
            <hr className="flex-grow #F5F5F5" />
            <span className="mx-4 text-black">Or</span>
            <hr className="flex-grow #F5F5F5" />
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
              href="/login"
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
}
