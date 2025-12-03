import { SearchBar } from "../searchBar/searchBar";

// Constants for maintainability
const HERO_IMAGE = "/hero-img.jpg";
const CONTENT = {
  title: "Find Your Perfect Stay",
  description:
    "Discover amazing hotels, apartments, and unique stays around the world",
} as const;

export function HeroSearch() {
  return (
    <div className="relative min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh] lg:min-h-[85vh] flex flex-col justify-end">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${HERO_IMAGE}')`,
        }}
        role="img"
        aria-label="Hero background"
      >
        {/* Dark Overlay Gradient - Fixed gradient class */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 pb-6 sm:pb-8 md:pb-12 lg:pb-16 pt-20 sm:pt-24 md:pt-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          {/* Hero Text */}
          <header className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-white">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-3 md:mb-4 drop-shadow-2xl leading-tight px-2">
              {CONTENT.title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto opacity-90 drop-shadow-lg px-4 sm:px-6 mt-2 sm:mt-3">
              {CONTENT.description}
            </p>
          </header>

          {/* Search Card - Extends below hero section */}
          <div className="max-w-5xl mx-auto px-2 sm:px-4">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-3 sm:p-4 md:p-6 lg:p-8 transform translate-y-4 sm:translate-y-6 md:translate-y-10 lg:translate-y-12 xl:translate-y-16">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
