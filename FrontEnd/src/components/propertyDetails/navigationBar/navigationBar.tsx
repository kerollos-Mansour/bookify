
export default function NavigationBar(props){
return (
    <>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
          {/* Tabs - Horizontal scroll on mobile */}
          <div className="flex gap-4 md:gap-8 overflow-x-auto w-full lg:w-auto pb-2 scrollbar-hide">
            <button className="pb-4 border-b-2 border-blue-600 text-blue-600 font-semibold whitespace-nowrap text-sm md:text-base">
              Overview
            </button>
            <button className="pb-4 text-gray-600 hover:text-gray-900 whitespace-nowrap text-sm md:text-base">
              About
            </button>
            <button className="pb-4 text-gray-600 hover:text-gray-900 whitespace-nowrap text-sm md:text-base">
              Rooms
            </button>
            <button className="pb-4 text-gray-600 hover:text-gray-900 whitespace-nowrap text-sm md:text-base">
              Accessibility
            </button>
            <button className="pb-4 text-gray-600 hover:text-gray-900 whitespace-nowrap text-sm md:text-base">
              Policies
            </button>
          </div>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 w-full lg:w-auto text-sm md:text-base">
            Select a room
          </button>
        </div>
    </>
)
}