"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Messages() {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Left Column: Contact Info */}
      <div className="md:w-1/3 bg-white p-6 rounded-md shadow-md">
        {/* Call To Us */}
        <div className="flex items-center gap-2 mb-2">
          <Image
            src="/profile/phone.svg"
            alt="Phone Icon"
            width={37}
            height={37}
          />
          <h2 className="text-lg font-semibold">Call To Us</h2>
        </div>
        <p className="text-gray-700">We are available 24/7, 7 days a week.</p>
        <p className="text-gray-700 font-medium mt-1">Phone: +8801112222</p>

        {/* Write To Us */}
        <div className="flex items-center gap-2 mt-6 mb-2">
          <Image
            src="/profile/write.svg"
            alt="Write Icon"
            width={37}
            height={37}
          />
          <h2 className="text-lg font-semibold">Write To Us</h2>
        </div>
        <p className="text-gray-700">
          Fill out our form and we will contact you within 24 hours.
        </p>
        <p className="text-gray-700 font-medium mt-2">Emails:</p>
        <p className="text-gray-700">customer@exlusive.com</p>
        <p className="text-gray-700">support@exlusive.com</p>
      </div>

      {/* Right Column: Form */}
      <div className="flex-1 bg-white p-6 rounded-md shadow-md">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name *
            </label>
            <Input type="text" placeholder="Enter your name" />
          </div>

      
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Email *
            </label>
            <Input type="email" placeholder="Enter your email" />
          </div>

         
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Phone *
            </label>
            <Input type="text" placeholder="Enter your phone number" />
          </div>

  
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Message
            </label>
            <Textarea
              placeholder="Write your message here..."
              className="min-h-[120px]"
            />
          </div>


          <div className="md:col-span-4 flex justify-end">
            <Button className="bg-[#DB4444] hover:bg-red-600 text-white font-medium px-6 py-2 rounded-none">
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
