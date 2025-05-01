"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Verification() {
  const router = useRouter();
  const [timer, setTimer] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [rawPhone, setRawPhone] = useState("");
  const [isClient, setIsClient] = useState(false);


  useEffect(() => {
    setIsClient(true); // Mark client-side mount
    const storedPhone = localStorage.getItem("signup-phone");
    if(!storedPhone) {
      toast.error("Phone number not found. Signup again.");
      router.push("/auth/signup");
    }else {
      setRawPhone(storedPhone);
    }
  }, [])

  const formattedPhone = rawPhone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");

  const handleVerify = async () => {
    try {
      setIsVerifying(true);
      const code = otp.join("");

      //send verif req to BE
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: rawPhone, code }),
      });

      if (!response.ok) throw new Error("Invalid OTP");

      localStorage.removeItem("signup-phone");

      router.push("/auth/success");
    } catch (error) {
      alert(error.message);
      setOtp(["", "", "", ""]);
    } finally {
      setIsVerifying(false);
    }
  };

  // Resend OTP handler
  const handleResendOtp = async () => {
    if (!rawPhone) {
      toast.error("Phone number not found");
      return;
    }

    try {
      setIsResending(true);
      const response = await fetch("/api/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: rawPhone }),
      });

      if (!response.ok) throw new Error("Failed to resend OTP");

      toast.success("New OTP sent successfully!");
      setOtp(["", "", "", ""]); // Clear existing OTP inputs
      setTimer(30);
      setResendDisabled(true);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsResending(false);
    }
  };

  //  // Auto-submit when all OTP digits are entered
  // useEffect(() => {
  //   if (otp.every(digit => digit !== '') && !isVerifying) {
  //     handleVerify();
  //   }
  // }, [otp]);

  // Handle Timer for Resend Button
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setResendDisabled(false);
    }
  }, [timer]);

  if (!isClient) return null; // Prevent server mismatch

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white px-10">
        <h2 className="text-[32px] font-normal text-black">Verification</h2>
        <p className="text-[#828282] text-lg mt-[30px]">
          Enter the 4 digit code we sent to{" "}
          <span className="font-medium">{formattedPhone}</span>
        </p>

        {/* OTP Input Fields */}
        <div className="flex gap-4 my-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                const newOtp = [...otp];
                newOtp[index] = value;
                setOtp(newOtp);
                // Auto-focus to next input
                if (value && index < 3) {
                  document.getElementById(`otp-${index + 1}`)?.focus();
                }
              }}
              id={`otp-${index}`}
              className="w-16 h-16 text-2xl text-center border-2 border-gray-300 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200"
              disabled={isVerifying}
            />
          ))}
        </div>

        {/* Timer */}
        <p className="text-red-500 text-sm mt-[24px]">
          {timer > 0 ? `00:${timer < 10 ? `0${timer}` : timer}` : null}
        </p>

        {/* Continue Button */}
        <button 
         onClick={handleVerify}
         disabled={isVerifying}
        className="bg-yellow-400 font-medium text-[16px] w-[470px] py-3 mt-6 rounded-md hover:bg-yellow-500">
          {isVerifying ? "Verifying..." : "VERIFY"}
        </button>

        {/* Resend Code */}
        <p className="text-gray-500 text-sm mt-[33px]">
          If you didn’t receive a code!{" "}
          <button
            onClick={handleResendOtp}
            className={`text-yellow-500 font-medium ${
              resendDisabled || isResending
                ? "opacity-50 cursor-not-allowed"
                : "hover:underline"
            }`}
            disabled={resendDisabled || isResending}
          >
            {isResending ? "Sending..." : "Resend Code"}
          </button>
        </p>
      </div>

      {/* Right Side */}
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
