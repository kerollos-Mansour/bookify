const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

export default function NavigationBar() {
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        {/* Tabs - Horizontal scroll on mobile */}
        <div className="flex gap-4 md:gap-8 overflow-x-auto w-full lg:w-auto pb-2 scrollbar-hide">
          <button
            onClick={() => scrollToSection("overview")}
            className="pb-4 border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 font-semibold whitespace-nowrap text-sm md:text-base transition-colors"
          >
            Overview
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="pb-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white whitespace-nowrap text-sm md:text-base transition-colors"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("rooms")}
            className="pb-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white whitespace-nowrap text-sm md:text-base transition-colors"
          >
            Rooms
          </button>
          <button
            onClick={() => scrollToSection("amenities")}
            className="pb-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white whitespace-nowrap text-sm md:text-base transition-colors"
          >
            Amenities
          </button>
        </div>
        <button
          onClick={() => scrollToSection("rooms")}
          className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 w-full lg:w-auto text-sm md:text-base transition-colors"
        >
          Select a room
        </button>
      </div>
    </>
  );
}
