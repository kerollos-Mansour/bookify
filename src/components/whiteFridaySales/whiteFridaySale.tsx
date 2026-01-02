import { Gift, Sparkles, X } from "lucide-react";
import { useState } from "react";

const SALE_CONTENT = {
  badge: "Limited Time",
  title: "White Friday Sale: Save up to 50%",
  description: "Save on eligible hotels, plus find deals on flights and more.",
  ctaText: "Shop Deals",
  dismissLabel: "Dismiss sale banner",
} as const;

export function WhiteFridaySale() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <section
      className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white border-t border-b border-gray-700 relative"
      aria-label="White Friday sale announcement"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 md:gap-6 max-w-7xl mx-auto">
          {/* Left: Icon + Text */}
          <div className="flex items-center gap-3 md:gap-4 text-center sm:text-left">
            {/* Gift Icon with Sparkles */}
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg animate-bounce-subtle">
                <Gift className="w-6 h-6 md:w-7 md:h-7" aria-hidden="true" />
              </div>
              <Sparkles
                className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-yellow-400 animate-pulse"
                aria-hidden="true"
              />
            </div>

            {/* Text Content */}
            <div className="space-y-1">
              {/* Badge */}
              <div className="inline-block px-2 py-0.5 bg-red-600 text-white text-xs font-bold rounded-full mb-1">
                {SALE_CONTENT.badge}
              </div>
              
              <h2 className="text-base md:text-lg lg:text-xl font-bold tracking-tight">
                {SALE_CONTENT.title}
              </h2>
              <p className="text-xs md:text-sm text-blue-200">
                {SALE_CONTENT.description}
              </p>
            </div>
          </div>

          {/* Right: CTA + Close Button */}
          <div className="flex items-center gap-3">
            <a
              href="#deals"
              className="px-5 md:px-6 py-2 md:py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 whitespace-nowrap"
            >
              {SALE_CONTENT.ctaText}
            </a>

            {/* Dismiss Button */}
            <button
              onClick={() => setIsVisible(false)}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
              aria-label={SALE_CONTENT.dismissLabel}
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}