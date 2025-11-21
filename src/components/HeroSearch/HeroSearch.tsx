import { SearchBar } from "../../components/searchBar/searchBar";

// Constants for maintainability
const HERO_IMAGE = "/hero-img.jpg";
const CONTENT = {
  title: "Find Your Perfect Stay",
  description:
    "Discover amazing hotels, apartments, and unique stays around the world",
} as const;

export function HeroSearch() {
  return (
    <div className="relative min-h-screen md:min-h-[85vh] flex flex-col justify-end">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${HERO_IMAGE}')`,
        }}
        role="img"
        aria-label="Hero background"
      >
        {/* Dark Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 pb-8 md:pb-12 lg:pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Text */}
          <header className="text-center mb-6 md:mb-8 lg:mb-10 text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 drop-shadow-2xl">
              {CONTENT.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto opacity-90 drop-shadow-lg px-4">
              {CONTENT.description}
            </p>
          </header>

          {/* Search Card - Extends below hero section */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 transform translate-y-8 md:translate-y-12 lg:translate-y-16">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}