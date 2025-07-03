"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";



export default function LocationInfo() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const {coordinates, address, city, phone, password} = useSelector((state) => state.user);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  
  useEffect(() => {
    if (!coordinates?.lat || !coordinates?.lng) {
      toast.error('Location not found. Please allow access again.');
      router.push('/location');
    }
  }, [coordinates, router]);

  const handleConfirm = async () => {
    if (!phone || !password) {
        toast.error('Missing credentials. Please sign up again');
        router.push('/auth/signup');
        return;
    }

    try {
        const loginRes = await signIn('credentials', {
            redirect: false,
            phone,
            password,
        });

        if (loginRes.ok && !loginRes.error) {

            await axios.get("/lmd/api/v1/csrf-token", {
                withCredentials: true,
            });
            
            toast.success('Login successful!');
            router.push('/');
        }
    } catch (error) {
        toast.error('Something went wrong during login.');
        console.error(error);
    }
  }
  
  return (
    <div className="flex min-h-screen">
      {/* Left Side */}
      <div className="w-1/2 flex flex-col items-center justify-center px-10 relative">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute left-6 top-6 text-yellow-600 text-2xl"
        >
          ←
        </button>

        {/* Title */}
        <h2 className="text-[28px] font-semibold mb-6">Location Information</h2>

        {/* Map */}
        <div className="relative w-[90%] h-[350px] rounded-lg overflow-hidden shadow-md">
          {coordinates?.lat && coordinates?.lng ? (
            <iframe
              className="w-full h-full"
              src={`https://maps.google.com/maps?q=${coordinates.lat},${coordinates.lng}&z=16&output=embed`}
              loading="lazy"
              title="Location Map"
            ></iframe>
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              Loading map...
            </div>
          )}

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[100%] text-center">
            <div className="bg-black text-white text-xs p-1 rounded mb-1 shadow">
              Order will be delivered here
            </div>
            <div className="text-[24px] font-bold text-purple-600">{city || 'Unknown'}</div>
          </div>
        </div>

        {/* Address Card */}
        <div className="w-[90%] bg-white p-4 rounded-xl mt-6 shadow-md border">
          <p className="font-bold text-lg">{city}</p>
          <p className="text-gray-600 text-sm mt-1">{address}</p>
          <button
            onClick={handleConfirm}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 mt-4 rounded-lg"
          >
            Confirm & Continue
          </button>
        </div>
      </div>


      {/* Right Side Background Illustration */}
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
