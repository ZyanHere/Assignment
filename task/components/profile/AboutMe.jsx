"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AboutMe = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center">
      <div className="max-w-7xl w-full bg-white p-6 rounded-md shadow-md border mt-10">
        <div className="grid grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">First Name</label>
            <Input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="hopeyouknowyourname"
              className="mt-2"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">Last Name</label>
            <Input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="hopeyouknowyournamepart2"
              className="mt-2"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="text-sm font-medium text-gray-700">Phone Number</label>
            <Input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="your10digits,remember?"
              className="mt-2"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="enteryourmail@gmail.com"
              className="mt-2"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center mt-6">
          <Button className="w-[400px] h-12 bg-orange-400 hover:bg-orange-500 text-white text-lg font-medium">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
