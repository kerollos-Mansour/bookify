import { SearchBar } from "../searchBar/SearchBar";

// Constants for maintainability
const HERO_IMAGE = "/hero-img.jpg";
const CONTENT = {
  title: "Find Your Perfect Stay",
  description:
    "Discover amazing hotels, apartments, and unique stays around the world",
} as const;

export function HeroSection() {
  return (
    <div className="relative min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh] lg:min-h-[85vh] flex flex-col justify-center pb-20">
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
      <div className="relative z-10 pt-20 sm:pt-24 md:pt-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          {/* Hero Text */}
          <header className="text-center text-white">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-3 md:mb-4 drop-shadow-2xl leading-tight px-2">
              {CONTENT.title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto opacity-90 drop-shadow-lg px-4 sm:px-6 mt-2 sm:mt-3">
              {CONTENT.description}
            </p>
          </header>
        </div>
      </div>
    </div>
  );
}

export function HeroFloatingSearch() {
  return (
    <div className="max-w-5xl mx-auto px-2 sm:px-4">
      {/* <div className="bg-card rounded-full shadow-2xl dark:shadow-2xl p-3 sm:p-4 md:p-6 lg:p-8 border border-card-border transition-colors duration-300">
        <SearchBar />
      </div> */}
      <SearchBar />
    </div>
  );
}

// Keep default export for backward compatibility if needed, but composed
export function HeroSearch() {
  return (
    <div className="relative">
      <HeroSection />
      <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 z-20">
        <HeroFloatingSearch />
      </div>
    </div>
  )
}
