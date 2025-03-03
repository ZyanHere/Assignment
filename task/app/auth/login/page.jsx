import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Login() {
  return (
    <div className="flex min-h-screen  h-[1024px]  bg-white">
      {/* Left Side - Login Form */}
      <div className="w-1/2">
        <div className="flex flex-col justify-center items-start max-w-[418px] mx-auto h-screen">
          <Image
            src="/auth-asset/logo.png"
            alt="Logo"
            width={75}
            height={62}
            className="mb-[32px]"
          />

          <h1 className="text-black text-[32px] font-medium">Welcome back!</h1>

          <p className="text-black text-[16px] font-medium">
            Please login to continue to your account
          </p>

          <form className="w-full max-w-md mt-[70px]">
            <div className="">
              <label className="block text-sm font-medium text-black">
                Mobile Number
              </label>
              <input
                type="text"
                placeholder="Enter your number"
                className="w-full pl-[10px] pr-[267px] pt-[10px] pb-[13px] 
                            border border-[#D9D9D9] rounded-[10px] 
                            focus:outline-none focus:ring-2 focus:ring-yellow-500
                          placeholder:text-black placeholder:opacity-20 "
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-black mt-[14px]">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full pl-[10px] pr-[267px] pt-[10px] pb-[13px] 
                            border border-[#D9D9D9] rounded-[10px] 
                            focus:outline-none focus:ring-2 focus:ring-yellow-500
                          placeholder:text-black placeholder:opacity-20 "
              />
            </div>

            <div className="flex justify-end mt-1">
              <a
                href="#"
                className="text-[#FFC107] text-[12px] font-medium  hover:underline"
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
              Sign In
            </button>
          </form>

          <div className="flex items-center mt-[32px] mb-[40px] w-full max-w-md">
            <hr className="flex-grow #F5F5F5" />
            <span className="mx-4 text-black">Or</span>
            <hr className="flex-grow #F5F5F5" />
          </div>

          <div className="w-full flex justify-between mt-4 ">
            {/* Google Sign-In */}
            <div >
              <button
                className=" flex items-center px-6 py-2 border border-gray-300 rounded-full shadow-sm 
                     hover:bg-gray-100 transition duration-200"
              >
                <Image
                  src="/auth-asset/google-logo.svg"
                  alt="Google"
                  width={20}
                  height={20}
                />
                <span className="ml-2 text-black text-sm font-medium">
                  Sign in with Google
                </span>
              </button>
            </div>

            {/* Apple Sign-In */}
            <div>
              <button
                className=" flex items-center px-6 py-2 border border-gray-300 rounded-full shadow-sm 
                     hover:bg-gray-100 transition duration-200"
              >
                <Image
                  src="/auth-asset/apple-logo.svg"
                  alt="Apple"
                  width={20}
                  height={20}
                />
                <span className="ml-2 text-black text-sm font-medium">
                  Sign in with Apple
                </span>
              </button>
            </div>
          </div>

          <div className="mt-4 text-sm text-black w-full flex justify-center items-center">
            Don’t have an account?
            <Link
              href="/signup"
              className="text-[#FFC107] font-medium hover:underline ml-1"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Background Image */}
      <div className="hidden md:block w-1/2  shrink-0 rounded-l-[40px] relative">
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
