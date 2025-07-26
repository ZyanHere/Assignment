// Sample notification data for the dropdown
export const sampleNotifications = [
  {
    id: 1,
    type: 'order',
    title: 'Order Shipped',
    message: 'Your order #12345 has been shipped and is on its way to you!',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
    read: false
  },
  {
    id: 2,
    type: 'promotion',
    title: 'Flash Sale Alert!',
    message: 'Get 50% off on all electronics. Limited time offer ending soon!',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    read: false
  },
  {
    id: 3,
    type: 'wishlist',
    title: 'Wishlist Item on Sale',
    message: 'The iPhone 15 Pro in your wishlist is now 20% off!',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    read: true
  },
  {
    id: 4,
    type: 'order',
    title: 'Order Delivered',
    message: 'Your order #12340 has been successfully delivered to your address.',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    read: true
  },
  {
    id: 5,
    type: 'alert',
    title: 'Payment Reminder',
    message: 'Your payment for order #12338 is due in 2 days.',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    read: false
  },
  {
    id: 6,
    type: 'promotion',
    title: 'Welcome Bonus',
    message: 'Welcome to our store! Enjoy 15% off your first purchase with code WELCOME15.',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    read: true
  }
];

// Function to get unread notification count
export const getUnreadCount = (notifications) => {
  return notifications.filter(notification => !notification.read).length;
};

// Function to get recent notifications (last 7 days)
export const getRecentNotifications = (notifications, days = 7) => {
  const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  return notifications.filter(notification => 
    new Date(notification.timestamp) > cutoffDate
  );
};