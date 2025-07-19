"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LogOut, X } from "lucide-react";
import Image from "next/image";

export default function Logout() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    sessionStorage.clear();
    router.push("/login");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-center items-start pt-8 sm:pt-12 pb-4 sm:pb-8 px-2 sm:px-4"
    >
      <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-8 max-w-4xl w-full bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
        {/* Left Side: Image Grid (original layout) */}
        <div className="grid grid-cols-2 gap-1 sm:gap-2 w-full md:w-1/2">
          <Image
            src="/profile/store.png"
            alt="Store"
            width={200}
            height={200}
            className="rounded-lg w-full h-auto"
          />
          <div className="space-y-2">
            <Image
              src="/profile/farmer.png"
              alt="Farmer"
              width={200}
              height={200}
              className="rounded-lg w-full h-auto"
            />
            <Image
              src="/profile/garden.png"
              alt="Garden"
              width={200}
              height={200}
              className="rounded-lg w-full h-auto"
            />
          </div>
        </div>

        {/* Right Side: Confirmation */}
        <div className="w-full md:w-1/2 flex flex-col items-center p-2 sm:p-4">
          <motion.div 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-center"
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mx-auto mb-4">
              <Image
                src="/profile/question-icon.svg"
                alt="Question"
                width={45}
                height={45}
              />
            </div>
            
            <h2 className="text-xl font-semibold mb-2">Are You Sure?</h2>
            <p className="text-gray-500 mb-6">Do you want to log out?</p>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button
                variant="outline"
                className="border-[#FFA922] text-[#FFA922] hover:bg-amber-50 gap-2"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" />
                Log Out
              </Button>
              <Button 
                variant="default" 
                className="gap-2"
                onClick={() => router.back()}
              >
                <X className="w-4 h-4" />
                Cancel
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}