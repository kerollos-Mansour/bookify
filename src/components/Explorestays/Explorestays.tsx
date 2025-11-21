import "./ExploreStays.css";
import React, { useState } from "react";

type CardItem = {
  title: string;
  subtitle: string;
};

export default function ExploreStays() {
  const [activeTab, setActiveTab] = useState<string>("Beach");

  const cards: Record<string, CardItem[]> = {
    Beach: [
      { title: "Bali", subtitle: "Indonesia" },
      { title: "Malibu", subtitle: "USA" },
    ],
    Culture: [
      { title: "Rome", subtitle: "Italy" },
      { title: "Kyoto", subtitle: "Japan" },
    ],
    Ski: [
      { title: "Truckee", subtitle: "California, USA" },
      { title: "Chamonix-Mont-Blanc", subtitle: "France" },
      { title: "Morzine", subtitle: "France" },
    ],
    Family: [
      { title: "Orlando", subtitle: "USA" },
      { title: "Dubai", subtitle: "UAE" },
    ],
    Wellness: [
      { title: "Ubud", subtitle: "Bali" },
      { title: "Zermatt", subtitle: "Switzerland" },
    ],
  };

  return (
    <>
      <h2>
        <b className="text-[40px]">Explore stays in popular destinations</b>
      </h2>
      <h4>Average prices based on current calendar month</h4>

      {/* Tabs */}
      <div className="tabs">
        {["Beach", "Culture", "Ski", "Family", "Wellness"].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "tab active" : "tab"}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="cards-container">
        {cards[activeTab].map((card, index) => (
          <div className="card" key={index}>
            <div className="img-placeholder"></div>
            <h3>{card.title}</h3>
            <p>{card.subtitle}</p>
          </div>
        ))}
      </div>
    </>
  );
}
