"use client";
import { useState, useEffect, useRef } from "react";
import { Bell, X, Check, Archive, Clock, ShoppingBag, AlertCircle, Heart, Star, Settings, MoreHorizontal, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const NotificationDropdown = ({ 
  isOpen, 
  onClose, 
  notifications = [], 
  theme = 'light',
  maxHeight = '400px',
  showActions = true,
  // showSettings = true,
  position = 'right'
}) => {
  const dropdownRef = useRef(null);
  const [localNotifications, setLocalNotifications] = useState(notifications);
  const [hoveredNotification, setHoveredNotification] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    setLocalNotifications(notifications);
  }, [notifications]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const markAsRead = (id) => {
    setLocalNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setLocalNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const archiveNotification = (id) => {
    setLocalNotifications(prev => 
      prev.filter(notif => notif.id !== id)
    );
  };

  const getNotificationIcon = (type) => {
    const iconProps = { className: "w-4 h-4" };
    
    switch (type) {
      case 'order':
        return <ShoppingBag {...iconProps} className="w-4 h-4 text-green-500" />;
      case 'promotion':
        return <Star {...iconProps} className="w-4 h-4 text-yellow-500" />;
      case 'wishlist':
        return <Heart {...iconProps} className="w-4 h-4 text-red-500" />;
      case 'alert':
        return <AlertCircle {...iconProps} className="w-4 h-4 text-orange-500" />;
      default:
        return <Bell {...iconProps} className="w-4 h-4 text-blue-500" />;
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const unreadCount = localNotifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  const themeClasses = {
    light: {
      container: 'bg-white border-gray-200',
      header: 'bg-gradient-to-r from-blue-50 to-purple-50 border-gray-100',
      text: 'text-gray-900',
      subtext: 'text-gray-600',
      hover: 'hover:bg-gray-50'
    },
    dark: {
      container: 'bg-gray-900 border-gray-700',
      header: 'bg-gradient-to-r from-gray-800 to-gray-700 border-gray-700',
      text: 'text-white',
      subtext: 'text-gray-300',
      hover: 'hover:bg-gray-800'
    }
  };

  const currentTheme = themeClasses[theme];
  const positionClasses = position === 'left' ? 'left-0' : 'right-0';

  return (
    <AnimatePresence>
      <motion.div
        ref={dropdownRef}
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`absolute ${positionClasses} top-full mt-3 w-80 sm:w-96 ${currentTheme.container} rounded-2xl shadow-2xl border backdrop-blur-sm z-50 overflow-hidden`}
        style={{ maxHeight }}
      >
        {/* Header */}
        <div className={`${currentTheme.header} p-4 border-b`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Bell className="w-6 h-6 text-blue-600" />
                  {unreadCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg"
                    >
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </motion.div>
                  )}
                </motion.div>
              </div>
              <div>
                <h3 className={`font-semibold ${currentTheme.text}`}>Notifications</h3>
                <p className={`text-sm ${currentTheme.subtext}`}>
                  {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs text-blue-600 hover:bg-blue-100 px-3 py-1 rounded-lg transition-all duration-200"
                  >
                    <Check className="w-3 h-3 mr-1" />
                    Mark all read
                  </Button>
                </motion.div>
              )}
              {showSettings && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSettings(!showSettings)}
                    className={`${currentTheme.subtext} hover:bg-gray-100 p-2 rounded-lg transition-all duration-200`}
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                </motion.div>
              )}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className={`${currentTheme.subtext} hover:bg-gray-100 p-2 rounded-lg transition-all duration-200`}
                >
                  <X className="w-4 h-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <ScrollArea className="max-h-80 overflow-y-auto">
          {localNotifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <h4 className="font-medium text-gray-900 mb-1">No notifications</h4>
              <p className="text-sm text-gray-500">You're all caught up!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {localNotifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-4 hover:bg-gray-50 transition-colors ${
                    !notification.read ? 'bg-blue-50/50' : ''
                  }`}
                >
                  <div className="flex gap-3">
                    {/* Icon */}
                    <div className="flex-shrink-0 p-2">
                      {getNotificationIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h4 className={`text-sm font-medium ${
                            !notification.read ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {notification.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
                        )}
                      </div>

                      {/* Time and Actions */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          {formatTime(notification.timestamp)}
                        </div>
                        <div className="flex gap-1">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="text-xs h-6 px-2 hover:bg-blue-100 text-blue-600"
                            >
                              Mark read
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => archiveNotification(notification.id)}
                            className="text-xs h-6 px-2 hover:bg-red-100 text-red-600"
                          >
                            <Archive className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        <div className={`p-3 ${currentTheme.container} border-t border-gray-200`}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="ghost"
              className={`w-full text-sm text-blue-600 hover:bg-blue-50 py-3 rounded-lg font-medium transition-all duration-200 ${currentTheme.hover}`}
              onClick={() => {
                onClose();
                // Use Next.js router for better navigation
                if (typeof window !== 'undefined') {
                  window.location.href = '/profile?tab=Notifications';
                }
              }}
            >
              View all notifications
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NotificationDropdown;
