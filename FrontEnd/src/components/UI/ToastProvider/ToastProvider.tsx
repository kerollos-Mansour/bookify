import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import Toast, { ToastType } from "../Toast/Toast";

interface ToastData {
  id: string;
  type: ToastType;
  message: string;
  description?: string;
  duration?: number;
}

interface ToastContextType {
  showToast: (
    type: ToastType,
    message: string,
    description?: string,
    duration?: number
  ) => void;
  success: (message: string, description?: string) => void;
  error: (message: string, description?: string) => void;
  info: (message: string, description?: string) => void;
  warning: (message: string, description?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (
      type: ToastType,
      message: string,
      description?: string,
      duration: number = 5000
    ) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastData = { id, type, message, description, duration };
      setToasts((prev) => [...prev, newToast]);
    },
    []
  );

  const success = useCallback(
    (message: string, description?: string) => {
      showToast("success", message, description);
    },
    [showToast]
  );

  const error = useCallback(
    (message: string, description?: string) => {
      showToast("error", message, description);
    },
    [showToast]
  );

  const info = useCallback(
    (message: string, description?: string) => {
      showToast("info", message, description);
    },
    [showToast]
  );

  const warning = useCallback(
    (message: string, description?: string) => {
      showToast("warning", message, description);
    },
    [showToast]
  );

  return (
    <ToastContext.Provider value={{ showToast, success, error, info, warning }}>
      {children}
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-[9999] max-w-md w-full pointer-events-none">
        <div className="pointer-events-auto">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              id={toast.id}
              type={toast.type}
              message={toast.message}
              description={toast.description}
              duration={toast.duration}
              onClose={removeToast}
            />
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
}
