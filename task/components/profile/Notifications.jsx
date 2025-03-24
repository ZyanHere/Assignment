"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function Notifications() {
  const [allowNotifications, setAllowNotifications] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [orderNotifications, setOrderNotifications] = useState(false);
  const [generalNotifications, setGeneralNotifications] = useState(false);

  const handleSaveSettings = () => {
    console.log("Saving settings:", {
      allowNotifications,
      emailNotifications,
      orderNotifications,
      generalNotifications,
    });
    alert("Settings saved!");
  };

  return (
    <div className="bg-white p-10 rounded-md shadow-sm max-w-6xl mx-auto">
      {/* Allow Notifications */}
      <div className="flex items-center justify-between py-6 border-b">
        <div>
          <h2 className="text-2xl font-medium">Allow Notifications</h2>
          <p className="text-lg text-gray-500">
            Lorem ipsum dolor sit amet, consectetur sadi pscing elit
          </p>
        </div>
        <Switch
          checked={allowNotifications}
          onCheckedChange={setAllowNotifications}
        />
      </div>

      {/* Email Notifications */}
      <div className="flex items-center justify-between py-6 border-b">
        <div>
          <h2 className="text-2xl font-medium">Email Notifications</h2>
          <p className="text-lg text-gray-500">
            Lorem ipsum dolor sit amet, consectetur sadi pscing elit
          </p>
        </div>
        <Switch
          checked={emailNotifications}
          onCheckedChange={setEmailNotifications}
        />
      </div>

      {/* Order Notifications */}
      <div className="flex items-center justify-between py-6 border-b">
        <div>
          <h2 className="text-2xl font-medium">Order Notifications</h2>
          <p className="text-lg text-gray-500">
            Lorem ipsum dolor sit amet, consectetur sadi pscing elit
          </p>
        </div>
        <Switch
          checked={orderNotifications}
          onCheckedChange={setOrderNotifications}
        />
      </div>

      {/* General Notifications */}
      <div className="flex items-center justify-between py-6">
        <div>
          <h2 className="text-2xl font-medium">General Notifications</h2>
          <p className="text-lg text-gray-500">
            Lorem ipsum dolor sit amet, consectetur sadi pscing elit
          </p>
        </div>
        <Switch
          checked={generalNotifications}
          onCheckedChange={setGeneralNotifications}
        />
      </div>

      {/* Save Button */}
      <div className="flex justify-center mt-6">
        <Button
          className="w-[75%] h-14 text-lg font-medium text-white rounded-[13px] 
          bg-gradient-to-r from-[#FFB94D] to-[#FFA922] shadow-md"
          style={{
            boxShadow: "2px 2px 20px 0px rgba(255, 178, 58, 0.20)",
          }}
          onClick={handleSaveSettings}
        >
          Save settings
        </Button>
      </div>
    </div>
  );
}
