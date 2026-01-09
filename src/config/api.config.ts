export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1",
  SOCKET_URL: import.meta.env.VITE_SOCKET_URL || "http://localhost:5000",
  DASHBOARD_URL: import.meta.env.VITE_DASHBOARD_URL || "http://localhost:3000",
  TIMEOUT: 10000,
};
