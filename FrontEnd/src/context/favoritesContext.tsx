import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { DestinationType } from "../types/destination.type";

type FavoritesContextType = {
  favorites: DestinationType[];
  addFavorite: (item: DestinationType) => void;
  removeFavorite: (id: string) => void;
  openSidebar: boolean;
  setOpenSidebar: (value: boolean) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<DestinationType[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("favorites");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });
  const [openSidebar, setOpenSidebar] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  const addFavorite = (item: DestinationType) => {
    if (!favorites.find((f) => f.id === item.id)) {
      setFavorites([...favorites, item]);
    }
  };

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter((f) => f.id !== id));
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        openSidebar,
        setOpenSidebar,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  return context;
};
