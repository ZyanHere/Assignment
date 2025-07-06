"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSelector } from "react-redux";

export default function Success() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(5); // Auto-redirect timer
  const { phone, password} = useSelector((state) => state.user);

  const handleSkip = async () => {
  if (!phone || !password) {
    toast.error("Missing credentials");
    return;
  }

  try {
    const loginRes = await signIn("credentials", {
      redirect: false,
      phone,
      password,
    });

    if (loginRes.ok && !loginRes.error) {
      await axios.get("/lmd/api/v1/csrf-token", {
        withCredentials: true,
      });
      toast.success("Login successful!");
      router.push("/");
    } else {
      toast.error("Login failed");
    }
  } catch (error) {
    toast.error("Something went wrong during login.");
    console.error(error);
  }
};


  // auto redirect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      router.push("/auth/location");
    }
  }, [countdown, router]);

  const handleContinue = () => {
    setIsLoading(true);
    router.push("/auth/location");
  };

  return (

    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* Left Side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-4 py-8 md:py-0 mx-auto">
        <div className="w-full max-w-xs sm:max-w-md md:max-w-[340px] mx-auto flex flex-col items-center">
          {/* Success Icon */}
          <div
            role="status"
            aria-label="Account created successfully"
            className="w-20 h-20 md:w-24 md:h-24 border-4 border-yellow-400 rounded-full flex items-center justify-center animate-fade-in mx-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-12 h-12 md:w-16 md:h-16 text-yellow-400"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Success Message */}
          <h2 className="text-2xl md:text-3xl font-medium text-black mt-6 md:mt-6 text-center">Successfully</h2>
          <p className="text-gray-600 mt-2 md:mt-2 text-left">
            Your account has been created.
          </p>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={isLoading}
            className={`w-full max-w-xs sm:max-w-md py-3 md:py-3 mt-6 md:mt-6 text-white font-semibold rounded-lg transition-colors text-center ${isLoading ? "bg-yellow-300 cursor-not-allowed" : "bg-yellow-400 hover:bg-yellow-500"}`}
            aria-label="Continue to homepage"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24" />
                Logging in...
              </span>
            ) : (
              "CONTINUE NOW"
            )}
          </button>
        </div>

//     <div className="flex min-h-screen bg-white">
//       {/* Left Side Content */}
//       <div className="w-1/2 flex flex-col justify-center items-center max-w-[537px] mx-auto h-screen">
//         {/* Success Icon */}
//         <div
//           role="status"
//           aria-label="Account created successfully"
//           className="w-[154px] h-[154px] border-4 border-yellow-400 rounded-full flex items-center justify-center animate-fade-in"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth="2"
//             stroke="currentColor"
//             className="w-24 h-24 text-yellow-400"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M5 13l4 4L19 7"
//             />
//           </svg>
//         </div>

//         {/* Success Message */}
//         <h2 className="text-[45px] font-medium text-black mt-8">
//           Successfully
//         </h2>
//         {/* <p className="text-[#828282] text-[16px] mt-8 text-center">
//           Your account has been created
//         </p> */}
//         <p className="text-gray-600 mt-4 text-center">
//           Redirecting to location setup in {countdown} seconds...
//         </p>

//         {/* Continue Button */}
//         <button
//           onClick={handleContinue}
//           disabled={isLoading}
//           className={`bg-yellow-400 text-white w-full max-w-[300px] py-4 mt-8 rounded-lg hover:bg-yellow-500 transition-colors ${
//             isLoading ? "opacity-75 cursor-not-allowed" : ""
//           }`}
//           aria-label="Continue to location setup"
//         >
//           {isLoading ? (
//             <span className="flex items-center justify-center">
//               <svg
//                 className="animate-spin h-5 w-5 mr-3"
//                 viewBox="0 0 24 24"
//                 aria-hidden="true"
//               >
//                 {/* Loading spinner */}
//               </svg>
//               Redirecting...
//             </span>
//           ) : (
//             `CONTINUE NOW`
//           )}
//         </button>
//         {/* Skip Button */}
//         <button
//           onClick={handleSkip}
//           className=" text-blue-500 font-medium cursor-pointer pt-20"
//         >
//           Skip to Homepage 
//         </button>

      </div>

      {/* Right Side Image */}
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
}
