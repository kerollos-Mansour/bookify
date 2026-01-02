/**
 * Utility for handling LocalStorage operations safely.
 */
export const storage = {
  getToken: () => {
    try {
      return localStorage.getItem("token");
    } catch (error) {
      console.error("Error getting token from storage", error);
      return null;
    }
  },

  setToken: (token: string) => {
    try {
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Error setting token to storage", error);
    }
  },

  removeToken: () => {
    try {
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Error removing token from storage", error);
    }
  },

  getUser: () => {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Error getting user from storage", error);
      return null;
    }
  },

  setUser: (user: any) => {
    try {
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.error("Error setting user to storage", error);
    }
  },

  removeUser: () => {
    try {
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Error removing user from storage", error);
    }
  },

  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing storage", error);
    }
  },
};
