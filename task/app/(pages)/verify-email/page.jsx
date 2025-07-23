"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState("verifying"); // verifying, success, error
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setError("No verification token provided.");
      return;
    }
    const verify = async () => {
      try {
        setStatus("verifying");
        setError("");
        // Call backend to verify email
        const res = await axios.get(
          `https://lmd-user-2ky8.onrender.com/lmd/api/v1/auth/customer/verify-email/${token}`
        );
        if (res.data?.success) {
          setStatus("success");
          toast.success("Email verified! Logging you in...");
          // Auto-login: backend should return email/phone for this token
          const { email, phone } = res.data.data.user || {};
          // Try to sign in with email and a temp password if available
          // (You may need to adjust this logic based on your backend)
          // For now, redirect to login page with a success message
          setTimeout(() => {
            router.push("/auth/login?verified=1");
          }, 2000);
        } else {
          setStatus("error");
          setError(res.data?.message || "Verification failed.");
        }
      } catch (err) {
        setStatus("error");
        setError(
          err.response?.data?.message || err.message || "Verification failed."
        );
      }
    };
    verify();
  }, [token, router]);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-white">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        {status === "verifying" && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">Verifying your email...</h2>
            <p className="text-gray-500">Please wait while we verify your email address.</p>
          </>
        )}
        {status === "success" && (
          <>
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-100">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-xl font-semibold mb-2 text-green-600">Email Verified!</h2>
            <p className="text-gray-500">You will be logged in and redirected to the home page.</p>
          </>
        )}
        {status === "error" && (
          <>
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-red-100">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </div>
            <h2 className="text-xl font-semibold mb-2 text-red-600">Verification Failed</h2>
            <p className="text-gray-500 mb-4">{error}</p>
            <button
              className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500"
              onClick={() => router.push("/auth/login")}
            >
              Go to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
} 