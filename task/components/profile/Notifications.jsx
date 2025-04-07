"use client";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Mail, ShoppingCart, AlertCircle, CheckCircle } from "lucide-react";

export default function Notifications() {
  const [notificationSettings, setNotificationSettings] = useState({
    appNotifications: true,
    emailNotifications: true,
    orderUpdates: true,
    promotions: false,
    securityAlerts: true,
  });

  const [showSaved, setShowSaved] = useState(false);

  const handleSwitchChange = (setting) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSave = () => {
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  const notificationTypes = [
    {
      id: "appNotifications",
      label: "App Notifications",
      description: "Receive notifications in the app",
      icon: <Bell className="w-5 h-5 text-blue-500" />,
      enabled: notificationSettings.appNotifications
    },
    {
      id: "emailNotifications",
      label: "Email Notifications",
      description: "Get important updates via email",
      icon: <Mail className="w-5 h-5 text-orange-500" />,
      enabled: notificationSettings.emailNotifications
    },
    {
      id: "orderUpdates",
      label: "Order Updates",
      description: "Notifications about your orders",
      icon: <ShoppingCart className="w-5 h-5 text-green-500" />,
      enabled: notificationSettings.orderUpdates
    },
    {
      id: "promotions",
      label: "Promotions & Offers",
      description: "Special deals and discounts",
      icon: <AlertCircle className="w-5 h-5 text-purple-500" />,
      enabled: notificationSettings.promotions
    },
    {
      id: "securityAlerts",
      label: "Security Alerts",
      description: "Important security notifications",
      icon: <CheckCircle className="w-5 h-5 text-red-500" />,
      enabled: notificationSettings.securityAlerts
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-4"
    >
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 p-6 border-b">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-bold">Notification Settings</h1>
          </div>
          <p className="text-gray-600 mt-1">
            Manage how you receive notifications
          </p>
        </div>

        {/* Notification Settings */}
        <div className="p-6 space-y-6">
          {notificationTypes.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.01 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-medium">{item.label}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
              <Switch
                checked={item.enabled}
                onCheckedChange={() => handleSwitchChange(item.id)}
                className="data-[state=checked]:bg-blue-500"
              />
            </motion.div>
          ))}
        </div>

        {/* Save Button */}
        <div className="p-6 border-t">
          <Button
            onClick={handleSave}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Save Settings
          </Button>
        </div>
      </div>

      {/* Success Notification */}
      <AnimatePresence>
        {showSaved && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 right-4 bg-green-50 border border-green-200 text-green-800 px-4 py-2 rounded-md flex items-center gap-2 text-sm"
          >
            <CheckCircle className="w-4 h-4" />
            Settings saved successfully
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}