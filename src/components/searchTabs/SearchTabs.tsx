import { useState } from "react";
import { MdFlight, MdHotel } from "react-icons/md";

export type SearchMode = "hotels" | "flights";

interface SearchTabsProps {
  activeTab: SearchMode;
  onTabChange: (tab: SearchMode) => void;
}

export function SearchTabs({ activeTab, onTabChange }: SearchTabsProps) {
  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={() => onTabChange("hotels")}
        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
          activeTab === "hotels"
            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
            : "bg-card text-card-foreground hover:bg-muted border border-card-border"
        }`}
      >
        <MdHotel className="text-xl" />
        Hotels
      </button>
      <button
        onClick={() => onTabChange("flights")}
        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
          activeTab === "flights"
            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
            : "bg-card text-card-foreground hover:bg-muted border border-card-border"
        }`}
      >
        <MdFlight className="text-xl" />
        Flights
      </button>
    </div>
  );
}
