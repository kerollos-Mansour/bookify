import { useState, useEffect } from "react";
import { Bell, Mail, MessageSquare, Calendar, Check, X } from "lucide-react";
import { useToast } from "../../UI/ToastProvider/ToastProvider";

interface Notification {
  _id: string;
  type: "booking" | "promotion" | "update" | "message";
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface NotificationPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  promotionalEmails: boolean;
  bookingUpdates: boolean;
  priceAlerts: boolean;
}

export default function CommunicationsTab() {
  const toast = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      _id: "1",
      type: "booking",
      title: "Booking Confirmed",
      message:
        "Your booking at Grand Hotel has been confirmed for Dec 25, 2025",
      read: false,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      _id: "2",
      type: "promotion",
      title: "Special Offer!",
      message: "Get 20% off on your next booking. Use code: WINTER2025",
      read: false,
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    },
    {
      _id: "3",
      type: "update",
      title: "Profile Updated",
      message: "Your profile information has been successfully updated",
      read: true,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
  ]);

  const [preferences, setPreferences] = useState<NotificationPreferences>({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    promotionalEmails: true,
    bookingUpdates: true,
    priceAlerts: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const notificationIcons = {
    booking: Calendar,
    promotion: Bell,
    update: MessageSquare,
    message: Mail,
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif._id === id ? { ...notif, read: true } : notif))
    );
    toast.success("Notification marked as read");
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
    toast.success("All notifications marked as read");
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif._id !== id));
    toast.success("Notification deleted");
  };

  const handlePreferenceChange = (key: keyof NotificationPreferences) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const savePreferences = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    toast.success("Notification preferences saved successfully!");
  };

  const getTimeAgo = (date: string) => {
    const seconds = Math.floor(
      (new Date().getTime() - new Date(date).getTime()) / 1000
    );
    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="bg-card rounded-3xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/30">
              <Bell className="w-8 h-8 text-white" />
            </div>
            <div className="text-white">
              <h2 className="text-2xl font-bold">Communications</h2>
              <p className="text-blue-100 text-sm">
                {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="px-6 py-3 bg-background text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Mark all as read
            </button>
          )}
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Notifications List */}
        <section>
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Recent Notifications
          </h3>
          <div className="space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => {
                const Icon = notificationIcons[notification.type];
                return (
                  <div
                    key={notification._id}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      notification.read
                        ? "bg-muted border-input-border"
                        : "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 shadow-sm"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-3 rounded-xl ${
                          notification.read
                            ? "bg-muted"
                            : "bg-blue-100 dark:bg-blue-900"
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 ${
                            notification.read
                              ? "text-muted-foreground"
                              : "text-blue-600"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground text-sm">
                              {notification.title}
                            </h4>
                            <p className="text-muted-foreground text-sm mt-1">
                              {notification.message}
                            </p>
                            <p className="text-muted-foreground/80 text-xs mt-2">
                              {getTimeAgo(notification.createdAt)}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification._id)}
                                className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                                title="Mark as read"
                              >
                                <Check className="w-4 h-4 text-blue-600" />
                              </button>
                            )}
                            <button
                              onClick={() =>
                                deleteNotification(notification._id)
                              }
                              className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <X className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* Notification Preferences */}
        <section>
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Notification Preferences
          </h3>
          <div className="bg-muted rounded-2xl p-6 space-y-4">
            <PreferenceToggle
              label="Email Notifications"
              description="Receive notifications via email"
              checked={preferences.emailNotifications}
              onChange={() => handlePreferenceChange("emailNotifications")}
            />
            <PreferenceToggle
              label="Push Notifications"
              description="Receive push notifications in your browser"
              checked={preferences.pushNotifications}
              onChange={() => handlePreferenceChange("pushNotifications")}
            />
            <PreferenceToggle
              label="SMS Notifications"
              description="Receive important updates via SMS"
              checked={preferences.smsNotifications}
              onChange={() => handlePreferenceChange("smsNotifications")}
            />
            <hr className="border-input-border" />
            <PreferenceToggle
              label="Promotional Emails"
              description="Receive special offers and deals"
              checked={preferences.promotionalEmails}
              onChange={() => handlePreferenceChange("promotionalEmails")}
            />
            <PreferenceToggle
              label="Booking Updates"
              description="Get notified about booking confirmations and changes"
              checked={preferences.bookingUpdates}
              onChange={() => handlePreferenceChange("bookingUpdates")}
            />
            <PreferenceToggle
              label="Price Alerts"
              description="Receive alerts when prices drop for saved searches"
              checked={preferences.priceAlerts}
              onChange={() => handlePreferenceChange("priceAlerts")}
            />

            <button
              onClick={savePreferences}
              disabled={isLoading}
              className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save Preferences"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

interface PreferenceToggleProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}

function PreferenceToggle({
  label,
  description,
  checked,
  onChange,
}: PreferenceToggleProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <p className="font-medium text-foreground text-sm">{label}</p>
        <p className="text-muted-foreground text-xs mt-0.5">{description}</p>
      </div>
      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? "bg-blue-600" : "bg-input-border dark:bg-gray-600"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
