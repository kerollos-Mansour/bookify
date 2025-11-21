export default function PropertyCard() {
  return (
    <div className="w-full max-w-[320px] rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 overflow-hidden">
      <div className="relative">
        <img
          src="./card-photo.jpg"
          alt="Ubanza Suites"
          className="w-full h-48 object-cover"
        />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-lg leading-tight">
            Ubanza Suites
          </h3>
          <div className="flex items-center gap-1 ml-2">
            <span className="text-orange-500 text-sm">★</span>
            <span className="text-sm font-medium text-gray-700">4.5</span>
          </div>
        </div>

        <div className="flex items-center text-gray-500 text-sm mb-3">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span className="text-gray-600">Main Road 123 Street, 23 Colony</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">$299</span>
            <span className="text-sm text-gray-500">/night</span>
          </div>

          <a
            href="#"
            className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition shadow-sm"
          >
            Book Now
          </a>
        </div>
      </div>
    </div>
  );
}