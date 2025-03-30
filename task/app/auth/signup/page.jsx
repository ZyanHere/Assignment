"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

//mock api service
const mockAPI = {
  signup: () => new Promise((resolve) => setTimeout(resolve, 1500)),
};

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [passwordsMatch, setPasswordMatch] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    //passwords match
    if (data.password !== data.confirmPassword) {
      setPasswordMatch(false);
      return;
    }

    setLoading(true);
    try {
      await mockAPI.signup();
      router.push("/verification");
    } catch {
      setError("Failed to create account. Please try again.");
    } finally {
      setLoading(false);
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

          <form onSubmit={handleSubmit} className="w-full max-w-md mt-[70px]">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-black">
                Name
              </label>
              <input
                name="name"
                type="text"
                required
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
                name="phone"
                type="text"
                placeholder="Enter mobile number"
                pattern="[0-9]{11}"
                required
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
                name="email"
                type="email"
                placeholder="Enter your email"
                required
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
                name="password"
                type="password"
                placeholder="Enter Password"
                minLength={8}
                required
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
                name="confirmPassword"
                type="password"
                placeholder="Re-Enter Password"
                onChange={() => setPasswordMatch(true)}
                className={`w-full px-[10px] py-[13px] border rounded-[10px] placeholder:text-black placeholder:opacity-20 
                  ${passwordsMatch ? "border-[#D9D9D9]" : "border-red-500"}
                  focus:outline-none focus:ring-2 focus:ring-yellow-500`}
              />
              {!passwordsMatch && (
                <p className="text-red-500 text-sm mt-1">
                  Passwords do not match
                </p>
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
            f
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-[15px] mt-[16px] rounded-[10px] bg-[#FFC107] text-white font-semibold 
              hover:bg-yellow-600 transition duration-200
              ${loading ? "opacity-75 cursor-not-allowed" : ""}`}
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
