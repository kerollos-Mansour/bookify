import { Search, MapPin, Calendar, Users } from "lucide-react";

interface SearchBarProps {
  compact?: boolean;
}

export function SearchBar({ compact = false }: SearchBarProps) {
  if (compact) {
    return (
      <div className="bg-white rounded-lg shadow-md p-3 flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium">Cairo, Egypt</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-gray-600 border-l pl-4">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium">Nov 20 - Nov 25</span>
        </div>
        <div className="hidden md:flex items-center gap-2 text-gray-600 border-l pl-4">
          <Users className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium">2 guests</span>
        </div>
        <button className="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors">
          <Search className="w-4 h-4" />
          Search
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Location */}
        <div className="relative md:col-span-2">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Where
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search destinations"
              defaultValue="Cairo, Egypt"
              className="w-full pl-10 pr-4 h-12 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Dates */}
        <div className="relative">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Check-in / Check-out
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Add dates"
              defaultValue="Nov 20 - Nov 25"
              className="w-full pl-10 pr-4 h-12 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Guests */}
        <div className="relative">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Guests
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Add guests"
              defaultValue="2 guests"
              className="w-full pl-10 pr-4 h-12 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Search Button */}
      <button className="mt-4 h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-colors w-full md:w-auto">
        <Search className="w-5 h-5" />
        Search
      </button>
    </div>
  );
}