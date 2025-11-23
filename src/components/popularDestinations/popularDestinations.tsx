import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";

// Types
type Destination = {
  id: string;
  name: string;
  location: string;
  price: number;
  image: string;
};

type CategoryId = "beach" | "culture" | "ski" | "family" | "wellness";

type Category = {
  id: CategoryId;
  label: string;
};

// Constants
const CATEGORIES: Category[] = [
  { id: "beach", label: "Beach" },
  { id: "culture", label: "Culture" },
  { id: "ski", label: "Ski" },
  { id: "family", label: "Family" },
  { id: "wellness", label: "Wellness and Relaxation" },
];

const DESTINATIONS: Record<CategoryId, Destination[]> = {
  beach: [
    {
      id: "1",
      name: "Rio de Janeiro",
      location: "Rio de Janeiro State, Brazil",
      price: 2585,
      image: "https://images.unsplash.com/photo-1679957631642-94f406206544?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxSaW8lMjBkZSUyMEphbmVpcm8lMjBiZWFjaHxlbnwxfHx8fDE3NjM3MDc5NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "2",
      name: "San Juan",
      location: "Puerto Rico",
      price: 5696,
      image: "https://images.unsplash.com/photo-1564238750394-08cb8e37b7e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTYW4lMjBKdWFuJTIwUHVlcnRvJTIwUmljbyUyMGZvcnR8ZW58MXx8fHwxNzYzNzA3OTYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "3",
      name: "Miami Beach",
      location: "Florida, United States of America",
      price: 5589,
      image: "https://images.unsplash.com/photo-1581271414285-8f702bc49eea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNaWFtaSUyMEJlYWNoJTIwaG90ZWxzfGVufDF8fHx8MTc2MzcwNzk2M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "4",
      name: "Oranjestad",
      location: "Aruba",
      price: 4823,
      image: "https://images.unsplash.com/photo-1719710384057-1f6944ab531e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxPcmFuamVzdGFkJTIwQXJ1YmElMjBoYXJib3J8ZW58MXx8fHwxNzYzNzA3OTY0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "5",
      name: "Montego Bay",
      location: "Saint James, Jamaica",
      price: 3912,
      image: "https://images.unsplash.com/photo-1558031715-5c8d48b508bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNb250ZWdvJTIwQmF5JTIwSmFtYWljYXxlbnwxfHx8fDE3NjM3MDc5NjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ],
  culture: [
    {
      id: "6",
      name: "Cairo",
      location: "Egypt",
      price: 1850,
      image: "https://images.unsplash.com/photo-1723465308831-29da05e011f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MzUzODAyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "7",
      name: "Rome",
      location: "Italy",
      price: 3200,
      image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjM1NDI1NzF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ],
  ski: [
    {
      id: "8",
      name: "Aspen",
      location: "Colorado, USA",
      price: 6800,
      image: "https://images.unsplash.com/photo-1482192505345-5655af888cc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGNhYmlufGVufDF8fHx8MTc2MzU1NjQxNXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ],
  family: [
    {
      id: "9",
      name: "Orlando",
      location: "Florida, USA",
      price: 2950,
      image: "https://images.unsplash.com/photo-1662944726441-a4ca20f6f3fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwY290dGFnZXxlbnwxfHx8fDE3NjM1NjcwNjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ],
  wellness: [
    {
      id: "10",
      name: "Bali",
      location: "Indonesia",
      price: 2100,
      image: "https://images.unsplash.com/photo-1623718649591-311775a30c43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHBvb2x8ZW58MXx8fHwxNzYzNTU5NDYwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ],
};

const SCROLL_AMOUNT = 400;
const CURRENCY = "EGP";

// Destination Card Component
function DestinationCard({ destination }: { destination: Destination }) {
  const [imageError, setImageError] = useState(false);

  return (
    <article className="shrink-0 w-72 sm:w-80 md:w-96 bg-white rounded-xl md:rounded-2xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 cursor-pointer group snap-start">
      <div className="relative aspect-video bg-gray-100 overflow-hidden">
        {!imageError ? (
          <img
            src={destination.image}
            alt={`${destination.name}, ${destination.location}`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <ImageOff className="w-12 h-12 md:w-16 md:h-16 text-gray-400" />
          </div>
        )}
      </div>

      <div className="p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1 truncate">
          {destination.name}
        </h3>
        <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4 truncate">
          {destination.location}
        </p>
        <div>
          <span className="text-xl md:text-2xl font-bold text-gray-900">
            {CURRENCY} {destination.price.toLocaleString()}
          </span>
          <p className="text-xs md:text-sm text-gray-500">avg. nightly price</p>
        </div>
      </div>
    </article>
  );
}

// Main Component
export function PopularDestinations() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("beach");
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentDestinations = DESTINATIONS[activeCategory];

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section className="py-12 md:py-16 bg-gray-50" aria-label="Popular destinations">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <header className="mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">
            Explore stays in popular destinations
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            Average prices based on current calendar month
          </p>
        </header>

        {/* Category Tabs */}
        <div
          className="flex gap-4 md:gap-8 mb-8 md:mb-10 border-b border-gray-200 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0"
          role="tablist"
          aria-label="Destination categories"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              role="tab"
              aria-selected={activeCategory === cat.id}
              aria-controls={`destinations-${cat.id}`}
              className={`relative pb-3 md:pb-4 text-sm md:text-lg font-medium transition-colors whitespace-nowrap focus:ring-offset-2 rounded-t ${
                activeCategory === cat.id
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {cat.label}
              {activeCategory === cat.id && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-0.5 md:h-1 bg-blue-600 rounded-full"
                  aria-hidden="true"
                />
              )}
            </button>
          ))}
        </div>

        {/* Carousel */}
        <div className="relative group/carousel">
          {/* Left Arrow */}
          <button
            onClick={() => handleScroll("left")}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover/carousel:opacity-100 transition-opacity bg-white rounded-full shadow-xl p-2 md:p-3 hover:scale-110 hidden lg:flex items-center justify-center border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Scroll to previous destinations"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-800" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => handleScroll("right")}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover/carousel:opacity-100 transition-opacity bg-white rounded-full shadow-xl p-2 md:p-3 hover:scale-110 hidden lg:flex items-center justify-center border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Scroll to next destinations"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-800" />
          </button>

          {/* Destinations */}
          <div
            ref={scrollRef}
            id={`destinations-${activeCategory}`}
            role="tabpanel"
            className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide"
          >
            {currentDestinations.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}