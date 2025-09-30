import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  Bell,
  Heart,
  Users,
  MapPin,
  Phone
} from "lucide-react";

interface Notification {
  id: number;
  type: "report_accepted" | "donation_received" | "general";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  data?: any;
}

interface NotificationSystemProps {
  notifications: Notification[];
  onMarkAsRead: (notificationId: number) => void;
  onDismiss: (notificationId: number) => void;
}

export function NotificationSystem({ 
  notifications, 
  onMarkAsRead, 
  onDismiss 
}: NotificationSystemProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "report_accepted":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "donation_received":
        return <Heart className="h-5 w-5 text-red-600" />;
      default:
        return <Bell className="h-5 w-5 text-blue-600" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "report_accepted":
        return "border-green-200 bg-green-50";
      case "donation_received":
        return "border-red-200 bg-red-50";
      default:
        return "border-blue-200 bg-blue-50";
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffMinutes < 60) {
      return `منذ ${diffMinutes} دقيقة`;
    } else if (diffMinutes < 1440) {
      return `منذ ${Math.floor(diffMinutes / 60)} ساعة`;
    } else {
      return `منذ ${Math.floor(diffMinutes / 1440)} يوم`;
    }
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <Button
        variant="ghost"
        size="sm"
        className="relative"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Button>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="absolute top-full right-0 mt-2 w-80 max-h-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">الإشعارات</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNotifications(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            {unreadCount > 0 && (
              <p className="text-blue-100 text-sm mt-1">
                {unreadCount} إشعار جديد
              </p>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center">
                <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">لا توجد إشعارات</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 transition-colors ${
                      !notification.read ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium text-gray-900 text-sm">
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 mt-1"></div>
                          )}
                        </div>
                        
                        <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">
                            {formatTime(notification.timestamp)}
                          </span>
                          
                          <div className="flex gap-2">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onMarkAsRead(notification.id)}
                                className="text-xs h-6 px-2"
                              >
                                تمييز كمقروء
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onDismiss(notification.id)}
                              className="text-xs h-6 px-2 text-red-600"
                            >
                              حذف
                            </Button>
                          </div>
                        </div>

                        {/* Additional data for specific notification types */}
                        {notification.type === "report_accepted" && notification.data && (
                          <div className="mt-3 p-2 bg-green-50 rounded border border-green-200">
                            <div className="text-xs text-green-800">
                              <div className="flex items-center gap-1 mb-1">
                                <Users className="h-3 w-3" />
                                <span>دار الرعاية: {notification.data.careHomeName}</span>
                              </div>
                              {notification.data.contactPhone && (
                                <div className="flex items-center gap-1">
                                  <Phone className="h-3 w-3" />
                                  <span>للتواصل: {notification.data.contactPhone}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {notifications.length > 0 && (
            <div className="border-t border-gray-200 p-3">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-blue-600"
                onClick={() => {
                  notifications.forEach(n => {
                    if (!n.read) onMarkAsRead(n.id);
                  });
                }}
              >
                تمييز الكل كمقروء
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Helper function to create notifications
export function createNotification(
  type: "report_accepted" | "donation_received" | "general",
  title: string,
  message: string,
  data?: any
): Notification {
  return {
    id: Date.now() + Math.random(),
    type,
    title,
    message,
    timestamp: new Date().toISOString(),
    read: false,
    data
  };
}