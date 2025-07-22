"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, Bell, Archive, Filter, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import NotificationCard from "./subCards/NotificationCard";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [isMarkingRead, setIsMarkingRead] = useState(false);

  // Sample notification data
  const sampleNotifications = [
    {
      id: "1",
      type: "order",
      title: "Order Shipped",
      message: "Your order #ORD-2023-001 has been shipped",
      timestamp: "2023-06-15T10:30:00Z",
      read: false
    },
    {
      id: "2",
      type: "promotion",
      title: "Special Offer",
      message: "20% off on all electronics this weekend",
      timestamp: "2023-06-14T09:15:00Z",
      read: true
    },
    {
      id: "3",
      type: "account",
      title: "Security Alert",
      message: "New login from Chrome on Windows",
      timestamp: "2023-06-13T14:45:00Z",
      read: false
    },
    {
      id: "4",
      type: "payment",
      title: "Payment Received",
      message: "Your payment of $29.99 has been processed",
      timestamp: "2023-06-12T11:20:00Z",
      read: true
    }
  ];

  useEffect(() => {
    // Simulate API fetch
    const fetchNotifications = async () => {
      setIsLoading(true);
      try {
        setTimeout(() => {
          setNotifications(sampleNotifications);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = async () => {
    setIsMarkingRead(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setNotifications(prev =>
        prev.map(notification => ({ ...notification, read: true }))
      );
    } finally {
      setIsMarkingRead(false);
    }
  };

  const archiveNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const filteredNotifications = unreadOnly
    ? notifications.filter(n => !n.read)
    : notifications;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-2 sm:p-4 max-w-4xl w-full mx-auto">
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 p-4 sm:p-6 border-b">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-blue-600" />
            <h1 className="text-xl font-semibold">Notifications</h1>
            <Badge variant="secondary">
              {notifications.filter(n => !n.read).length} Unread
            </Badge>
          </div>

          <p className="text-gray-600 mt-1">
            Manage how you receive notifications
          </p>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="p-6 space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="p-8 text-center">
            <Bell className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium">No notifications</h3>
            <p className="text-gray-500 mt-1">
              {unreadOnly
                ? "You have no unread notifications"
                : "You have no notifications yet"}
            </p>
          </div>
        ) : (
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="divide-y">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "p-4 hover:bg-gray-50 transition-colors",
                    !notification.read && "bg-blue-50"
                  )}
                >
                  <NotificationCard
                    icon={<Bell className="w-5 h-5 text-blue-600" />}
                    header={notification.title}
                    message={notification.message}
                    time={formatDate(notification.timestamp)}
                  />
                  <div className="flex gap-2 mt-2">
                    {!notification.read && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                        className="text-xs h-7"
                      >
                        <Check className="w-3 h-3 mr-1" />
                        Mark as read
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => archiveNotification(notification.id)}
                      className="text-xs h-7"
                    >
                      <Archive className="w-3 h-3 mr-1" />
                      Dismiss
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        {/* Save Button */}
        <div className="p-2 sm:p-6 border-t">
          <Button
            onClick={markAllAsRead}
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={isMarkingRead || !notifications.some(n => !n.read)}
          >
            {isMarkingRead ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Check className="w-4 h-4 mr-2" />
            )}
            Mark all as read
          </Button>
        </div>
      </div>

      {/* Success Notification */}
      {/* The original code had this block commented out, so it's removed. */}
    </div>
  );
}