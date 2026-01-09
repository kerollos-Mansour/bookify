import { useEffect, useState, useRef } from "react";

export default function NavigationBar() {
  const [activeSection, setActiveSection] = useState("overview");
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-100px 0px -60% 0px", 
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      if (isScrollingRef.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    const sections = ["overview", "about", "amenities", "rooms", "reviews"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    isScrollingRef.current = true;
    setActiveSection(id);

    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });

      // Reset the "isScrolling" flag after the smooth scroll animation completes
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000); // Wait for smooth scroll to finish
    }
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "about", label: "About" },
    { id: "rooms", label: "Rooms" },
    { id: "amenities", label: "Amenities" },
    { id: "reviews", label: "Reviews" },
  ];

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
      {/* Tabs - Horizontal scroll on mobile */}
      <div className="flex gap-4 md:gap-8 overflow-x-auto w-full lg:w-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => scrollToSection(tab.id)}
            className={`pb-4 border-b-2 font-semibold whitespace-nowrap text-sm md:text-base transition-all duration-200 ${activeSection === tab.id
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <button
        onClick={() => scrollToSection("rooms")}
        className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 w-full lg:w-auto text-sm md:text-base transition-colors mb-2 lg:mb-0"
      >
        Select a room
      </button>
    </div>
  );
}
