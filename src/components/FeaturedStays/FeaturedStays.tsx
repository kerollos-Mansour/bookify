import { featuredData } from "../../Data/featuredStays";
import { DestinationType } from "../../Data/DestinationType";
import { Link } from "react-router-dom";
function DestinationCard({ item }: { item: DestinationType }) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
      <div className="relative">
        <Link to={`/property/${item.id}`}>
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-48 object-cover"
          />
        </Link>
        {item.bestSeller && (
          <span className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-sm font-medium shadow">
            Best Seller
          </span>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#f97316"
              viewBox="0 0 24 24"
            >
              <path d="M12 .587l3.668 7.568L24 9.748l-6 5.848L19.335 24 12 19.771 4.665 24 6 15.596l-6-5.848 8.332-1.593z" />
            </svg>
            <span className="text-sm font-medium text-gray-500">
              {item.rating}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7-7.5 11-7.5 11S4.5 17.5 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
          {item.address}
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-xl font-semibold">
            ${item.price} <span className="text-sm text-gray-400">/night</span>
          </p>
          <Link to={`/property/${item.id}`}>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition">
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedStays({
  destinations,
}: {
  destinations: DestinationType[];
}) {
  return (
    <section className="py-16 bg-[#f8f9fb]">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-semibold text-gray-900">
          Featured Destination
        </h2>
        <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
          Discover our handpicked selection of exceptional properties around the
          world, offering unparalleled luxury and unforgettable experiences.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
        {destinations.map((item, index) => (
          <DestinationCard key={index} item={item} />
        ))}
      </div>

      <div className="text-center mt-12">
        <Link to={"/search"} className="px-6 py-3 border border-gray-400 rounded-full font-medium hover:bg-gray-100 transition">
          View All Destinations
        </Link>
      </div>
    </section>
  );
}
