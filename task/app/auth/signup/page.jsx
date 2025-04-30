"use client";
import { signUpStart } from "@/lib/redux/user/userSlice";
import { signupSchema } from "@/lib/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { FiEyeOff, FiEye } from "react-icons/fi";


export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { loading, error } = useSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();

  // Zod form validation setup
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (formData) => {
    try {
      dispatch(signUpStart());

      //remove confirmPassword before sending to api
      const { confirmPassword, ...signupData } = formData;

      //api call
      const response = await axios.post("/api/auth/signup", signupData);

      //handle success
      if (response.data.success) {
        //toast.success("Account created successfully!");
        localStorage.setItem("signup-number", formData.phone)
        router.push("/verification");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
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
                Name
              </label>
              <input
                {...register("name")}
                className={`w-full p-3 border rounded-[10px] ${
                  errors.name ? "border-red-500" : "border-[#D9D9D9]"
                } focus:ring-2 focus:ring-yellow-500`}
                placeholder="Enter Name"
                // className="w-full pl-[10px] pr-[316px] pt-[10px] pb-[13px]
                //             border border-[#D9D9D9] rounded-[10px]
                //             focus:outline-none focus:ring-2 focus:ring-yellow-500
                //           placeholder:text-black placeholder:opacity-20 "
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>
            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-medium text-black mt-[14px]">
                Mobile Number
              </label>
              <input
                {...register("phone")}
                type="tel"
                className={`w-full p-3 border rounded-lg ${
                  errors.phone ? "border-red-500" : "border-[#D9D9D9]"
                } focus:ring-2 focus:ring-yellow-500`}
                placeholder="03001234567"
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">
                  {errors.phone.message}
                </span>
              )}
              {/* // className="w-full pl-[10px] pr-[256px] pt-[10px] pb-[13px] 
                //             border border-[#D9D9D9] rounded-[10px] 
                //             focus:outline-none focus:ring-2 focus:ring-yellow-500
                //           placeholder:text-black placeholder:opacity-20 " */}
            </div>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-black mt-[14px]">
                Email Address
              </label>
              <input
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
              {/* className="w-full pl-[10px] pr-[287px] pt-[10px] pb-[13px] 
                            border border-[#D9D9D9] rounded-[10px] 
                            focus:outline-none focus:ring-2 focus:ring-yellow-500
                          placeholder:text-black placeholder:opacity-20 " */}
            </div>
            {/* Password */}
            <div className=" relative">
              <label className="block text-sm font-medium text-black mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`w-full p-3 border rounded-lg ${
                    errors.password ? 'border-red-500' : 'border-[#D9D9D9]'
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
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>

{/* 
            className="w-full pl-[10px] pr-[290px] pt-[10px] pb-[13px]
                  //             border border-[#D9D9D9] rounded-[10px]
                  //             focus:outline-none focus:ring-2 focus:ring-yellow-500
                  //           placeholder:text-black placeholder:opacity-20 " */}





            {/* Confirm Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-black mt-[14px]">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  className={`w-full p-3 border rounded-lg ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-[#D9D9D9]"
                  } focus:ring-2 focus:ring-yellow-500`}
                  placeholder="Re-Enter Password"
                  // className={`w-full px-[10px] py-[13px] border rounded-[10px] placeholder:text-black placeholder:opacity-20
                  //   ${passwordsMatch ? "border-[#D9D9D9]" : "border-red-500"}
                  //   focus:outline-none focus:ring-2 focus:ring-yellow-500`}
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
              // className={`w-full py-[15px] mt-[16px] rounded-[10px] bg-[#FFC107] text-white font-semibold 
              // hover:bg-yellow-600 transition duration-200
              // ${loading ? "opacity-75 cursor-not-allowed" : ""}`}
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
