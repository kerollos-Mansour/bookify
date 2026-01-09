import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./authContext";
import { API_CONFIG } from "../config/api.config";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  unreadNotifications: number;
}

const SocketContext = createContext<SocketContextType | null>(null);

// Using localhost:3000 as inferred from app.js in backend
// Using localhost:5000 as inferred from env
const SOCKET_URL = API_CONFIG.SOCKET_URL;

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const { token, user } = useAuth();

  useEffect(() => {
    // Only connect if we have a token and user (and not already connected)
    if (token && user) {
      console.log("Initializing socket connection for user:", user.username);

      const newSocket = io(SOCKET_URL, {
        auth: {
          token: token,
        },
        transports: ["websocket"], // Force websocket to avoid polling issues
      });

      newSocket.on("connect", () => {
        console.log("Socket connected:", newSocket.id);
        setIsConnected(true);
      });

      newSocket.on("disconnect", () => {
        console.log("Socket disconnected");
        setIsConnected(false);
      });

      newSocket.on("connect_error", (err) => {
        console.error("Socket connection error:", err);
        setIsConnected(false);
      });

      // ✅ Global notification listener for toast notifications
      newSocket.on("new_notification", (notification: any) => {
        console.log("🔔 New notification received globally:", notification);
        setUnreadNotifications((prev) => prev + 1);

        // Show browser notification if permission granted
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification(notification.title, {
            body: notification.message,
            icon: "/logo.png",
          });
        }
      });

      // Listen for notification read events to update count
      newSocket.on("notification:updated", () => {
        setUnreadNotifications((prev) => Math.max(0, prev - 1));
      });

      newSocket.on("notification:all_read", () => {
        setUnreadNotifications(0);
      });

      setSocket(newSocket);

      return () => {
        console.log("Cleaning up socket connection");
        newSocket.close();
        setSocket(null);
        setIsConnected(false);
      };
    } else {
      // If no token/user, ensure socket is closed
      if (socket) {
        socket.close();
        setSocket(null);
        setIsConnected(false);
      }
    }
  }, [token, user?.username]); // Re-connect only if token or username changes significantly

  return (
    <SocketContext.Provider
      value={{ socket, isConnected, unreadNotifications }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
