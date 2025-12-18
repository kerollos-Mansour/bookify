/**
 * Utility for handling SessionStorage or generic caching operations.
 */
export const cache = {
  get: (key: string) => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting ${key} from cache`, error);
      return null;
    }
  },

  set: (key: string, value: any) => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting ${key} to cache`, error);
    }
  },

  remove: (key: string) => {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from cache`, error);
    }
  },

  clear: () => {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.error("Error clearing cache", error);
    }
  },
};
