import { useEffect, useState } from "react";
import { useGetPopularRoutesQuery } from "../../store/api/flights.api";
import { MdFlight, MdTrendingUp } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export function PopularRoutes() {
  const { data: routes, isLoading } = useGetPopularRoutesQuery(6);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-48 bg-gray-200 dark:bg-gray-700 rounded-xl"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!routes || routes.length === 0) return null;

  const handleRouteClick = (route: any) => {
    const params = new URLSearchParams({
      origin: route._id.fromCode,
      destination: route._id.toCode,
    });
    navigate(`/flights/search?${params.toString()}`);
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <MdTrendingUp className="text-3xl text-blue-600" />
          <h2 className="text-3xl font-bold text-foreground">
            Popular Flight Routes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.map((route: any, index: number) => (
            <div
              key={index}
              onClick={() => handleRouteClick(route)}
              className="group relative bg-card border border-card-border rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 opacity-5 group-hover:opacity-10 transition-opacity">
                <MdFlight className="text-8xl text-blue-600 transform rotate-45" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-blue-600">
                    {route._id.fromCode}
                  </div>
                  <MdFlight className="text-2xl text-blue-600 transform group-hover:translate-x-2 transition-transform" />
                  <div className="text-2xl font-bold text-blue-600">
                    {route._id.toCode}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <span>{route._id.from}</span>
                  <span>→</span>
                  <span>{route._id.to}</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-card-border">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">
                      From
                    </div>
                    <div className="text-xl font-bold text-green-600">
                      ${route.minPrice}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground mb-1">
                      Flights
                    </div>
                    <div className="text-sm font-semibold text-card-foreground">
                      {route.count}
                    </div>
                  </div>
                </div>

                {route.airlines && route.airlines.length > 0 && (
                  <div className="mt-4">
                    <div className="text-xs text-muted-foreground mb-2">
                      Airlines
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {route.airlines
                        .slice(0, 3)
                        .map((airline: string, i: number) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full"
                          >
                            {airline}
                          </span>
                        ))}
                      {route.airlines.length > 3 && (
                        <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">
                          +{route.airlines.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
