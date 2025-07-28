"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus("error");
        toast.error("Missing verification token.");
        return;
      }

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/lmd/api/v1/auth/customer/verify-email/${token}`
        );

        if (res?.data?.success) {
          toast.success("Email verified successfully!");
          router.push("/auth/success");
        } else {
          setStatus("error");
          toast.error("Invalid or expired verification link.");
        }
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("error");
        toast.error("Verification failed. Please try again.");
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center text-center px-4">
      <div>
        {status === "loading" && (
          <>
            <h2 className="text-xl font-semibold mb-2">Verifying your email...</h2>
            <p className="text-gray-600">Please wait while we confirm your email.</p>
          </>
        )}
        {status === "error" && (
          <>
            <h2 className="text-xl font-semibold text-red-500 mb-2">Verification Failed</h2>
            <p className="text-gray-600 mb-4">Your token might be invalid or expired.</p>
            <button
              onClick={() => router.push("/auth/signup")}
              className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
            >
              Back to Signup
            </button>
          </>
        )}
      </div>
    </div>
  );
}
