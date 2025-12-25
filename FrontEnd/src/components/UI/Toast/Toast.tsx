import { useEffect } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  description?: string;
  duration?: number;
  onClose: (id: string) => void;
}

const toastConfig = {
  success: {
    icon: CheckCircle,
    bgColor: "bg-gradient-to-r from-green-50 to-emerald-50",
    borderColor: "border-green-500",
    iconColor: "text-green-600",
    textColor: "text-green-900",
  },
  error: {
    icon: AlertCircle,
    bgColor: "bg-gradient-to-r from-red-50 to-rose-50",
    borderColor: "border-red-500",
    iconColor: "text-red-600",
    textColor: "text-red-900",
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-gradient-to-r from-yellow-50 to-amber-50",
    borderColor: "border-yellow-500",
    iconColor: "text-yellow-600",
    textColor: "text-yellow-900",
  },
  info: {
    icon: Info,
    bgColor: "bg-gradient-to-r from-blue-50 to-indigo-50",
    borderColor: "border-blue-500",
    iconColor: "text-blue-600",
    textColor: "text-blue-900",
  },
};

export default function Toast({
  id,
  type,
  message,
  description,
  duration = 5000,
  onClose,
}: ToastProps) {
  const config = toastConfig[type];
  const Icon = config.icon;

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  return (
    <div
      className={`${config.bgColor} ${config.borderColor} border-l-4 rounded-xl shadow-xl p-4 mb-3 animate-slideIn backdrop-blur-sm`}
      style={{
        animation: "slideIn 0.3s ease-out",
      }}
    >
      <div className="flex items-start gap-3">
        <div className={`${config.iconColor} flex-shrink-0 mt-0.5`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className={`font-semibold ${config.textColor} text-sm`}>
            {message}
          </p>
          {description && (
            <p className={`${config.textColor} opacity-80 text-xs mt-1`}>
              {description}
            </p>
          )}
        </div>
        <button
          onClick={() => onClose(id)}
          className={`${config.iconColor} hover:opacity-70 transition-opacity flex-shrink-0`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
