"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Logout() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear user session or authentication data here
    localStorage.removeItem("userToken"); // Example: Removing authentication token
    sessionStorage.clear(); // Clearing session storage
    console.log("User logged out");

    // Redirect to homepage or login page
    router.push("/login"); // Redirecting to the login page
  };

  return (
    <div className="flex justify-between items-center max-w-5xl mx-auto p-10">
      {/* Left Side: Image Grid */}
      <div className="grid grid-cols-2 gap-2">
        <Image
          src="/profile/store.png"
          alt="Store"
          width={200}
          height={200}
          className="rounded-lg"
        />
        <div>
          <Image
            src="/profile/farmer.png"
            alt="Farmer"
            width={200}
            height={200}
            className="rounded-lg"
          />
          <Image
            src="/profile/garden.png"
            alt="Garden"
            width={200}
            height={200}
            className="rounded-lg col-span-2 mt-2"
          />
        </div>
      </div>

      {/* Right Side: Logout Confirmation (Directly on Page) */}
      <div className="flex flex-col items-center p-8 border border-gray-300 rounded-lg shadow-lg ">
        {/* Question Mark Icon */}
        <div className="w-16 h-16 flex items-center justify-center rounded-full ">
          <Image
            src="/profile/question-icon.svg"
            alt="Question"
            width={45}
            height={45}
          />
        </div>

        {/* Confirmation Text */}
        <h2 className="text-xl font-semibold mt-4">Are You Sure?</h2>
        <p className="text-gray-500">Do you want to log out?</p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <Button
            variant="outline"
            className="border-[#FFA922] text-[#FFA922] px-6 py-3"
            onClick={handleLogout}
          >
            Log Out
          </Button>
          <Button className="bg-black px-6 py-3">Cancel</Button>
        </div>
      </div>
    </div>
  );
}
