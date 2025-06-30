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
  // const [loginMethod, setLoginMethod] = useState("email");
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

  // const toggleLoginMethod = () => {
  //   setLoginMethod(prev => prev === "email" ? "phone" : "email");
  //   reset();
  // };

  const onSubmit = async (data) => {
    console.log("Form values:", data);
    setIsLoading(true);
    setError("");

    try {
      // const credentials = {
      //   password: data.password,
      //   username: data.username,
      // };

      const res = await signIn("credentials", {
        redirect: false,
        email: data.email, 
        password: data.password,
        rememberMe,
        callbackUrl: "/",
      });

      if (res?.error) {
        throw new Error(res.error);
      }

      if (res?.url) {
        toast.success("Login successful!");
        router.push(res.url);
      }
    } catch (error) {
      setError(
        error.message === "CredentialsSignin"
          ? "Invalid credentials. Please try again."
          : error.message || "Login failed. Please try again later."
      );
      toast.error(
        error.message === "CredentialsSignin"
          ? "Invalid credentials. Please try again."
          : error.message || "Login failed. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // const handleOAuthSignIn = async (provider) => {
  //   try {
  //     setOauthLoading(provider);
  //     // Use the direct approach without catching errors here
  //     // NextAuth will handle redirects and error states internally
  //     await signIn(provider, { callbackUrl: "/" });
  //   } catch (error) {
  //     // This catch block will likely not run as signIn handles redirects
  //     toast.error(`Failed to sign in with ${provider}. Please try again.`);
  //     console.error(`${provider} sign-in error:`, error);
  //     setOauthLoading("");
  //     // } finally {
  //     //   setOauthLoading("");
  //     // }
  //   }
  // };

  return (
    <div className="flex min-h-screen bg-white">
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

          <form
            className="w-full max-w-md mt-[70px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-black">
                  {/* {loginMethod === "email" ? "Email Address" : "Mobile Number"} */}
                  Username
                </label>
                {/* <button
                  type="button"
                  onClick={toggleLoginMethod}
                  className="text-[#FFC107] text-xs hover:underline"
                >
                  {loginMethod === "email" 
                    ? "Use phone instead" 
                    : "Use email instead"}
                </button> */}
              </div>

              {/* {loginMethod === "email" ? (
                <>
                  <input
                    {...register("email")}
                    type="email"
                    className={`w-full p-3 border rounded-lg ${
                      errors.email ? 'border-red-500' : 'border-[#D9D9D9]'
                    } focus:ring-2 focus:ring-yellow-500`}
                    placeholder="example@mail.com"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">{errors.email.message}</span>
                  )}
                </>
              ) : (
                <> */}
              <input
                {...register("email")}
                type="text"
                placeholder="Enter email or phone"
                className={`... ${
                  errors.email ? "border-red-500" : "border-[#D9D9D9]"
                }`}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
              {/* </> */}
              {/* )} */}
            </div>

            <div className="mb-4 relative">
              <label className="block text-sm font-medium text-black">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`w-full p-3 border rounded-lg ${
                    errors.password ? "border-red-500" : "border-[#D9D9D9]"
                  } focus:ring-2 focus:ring-yellow-500`}
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
                href="/forgot-password"
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 mt-6 bg-[#FFC107] text-white rounded-lg font-semibold 
                        hover:bg-yellow-600 transition-colors
                        ${isLoading ? "opacity-75 cursor-not-allowed" : ""}`}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
          </form>

          {/* <div className="flex items-center mt-[32px] mb-[40px] w-full max-w-md">
            <hr className="flex-grow #F5F5F5" />
            <span className="mx-4 text-black">Or</span>
            <hr className="flex-grow #F5F5F5" />
          </div> */}

          {/* <div className="w-full flex justify-between mt-4 "> */}
          {/* Google Sign-In */}
          {/* <div>
              <button
                type="button"
                onClick={() => handleOAuthSignIn('google')}
                disabled={oauthLoading !== ""}
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
                  {oauthLoading === 'google' ? 'Connecting...' : 'Sign in with Google'}
                </span>
              </button>
            </div> */}

          {/* Facebook Sign-In (replacing Apple) */}
          {/* <div>
              <button
                type="button"
                onClick={() => handleOAuthSignIn('facebook')}
                disabled={oauthLoading !== ""}
                className="flex items-center px-6 py-2 border border-gray-300 rounded-full shadow-sm 
                     hover:bg-gray-100 transition duration-200"
              >
                {/* You'll need to add a Facebook logo to your assets */}
          {/* <svg
                  className="w-5 h-5 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  fill="currentColor"
                >
                  <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                </svg>
                <span className="ml-2 text-black text-sm font-medium">
                  {oauthLoading === 'facebook' ? 'Connecting...' : 'Sign in with Facebook'}
                </span>
              </button>
            </div>  */}
          {/* </div> */}

          <div className="mt-4 text-sm text-black w-full flex justify-center items-center">
            Don't have an account?
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
