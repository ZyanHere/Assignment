const NotificationCard = ({ icon, header, message, time }) => (
    <div className="notification-card flex items-center p-4 border border-gray-200 rounded-lg mb-3 bg-white shadow-sm">
      <span className="mr-4 text-xl text-blue-600 flex-shrink-0">{icon}</span>
      <div className="flex-1">
        <div className="font-bold text-base mb-1">{header}</div>
        <div className="text-gray-600 mb-1">{message}</div>
        <div className="text-xs text-gray-400">{time}</div>
      </div>
    </div>
  );
  
  export default NotificationCard;
  