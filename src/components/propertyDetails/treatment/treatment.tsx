import { BiMessageDetail } from "react-icons/bi";

export default function Treatments(props) {
  return (
    <>
      <div className="mb-12 mt-12">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
          Treatments
        </h2>

        {/* Mobile & Tablet: Stack layout */}
        <div className="block xl:hidden space-y-6">
          {/* Spa image */}
          <div className="h-64 md:h-96">
            <img
              src="spa-main.png"
              alt="Spa area"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Title and Description */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-4">On the beach</h3>
            <p className="text-gray-700 mb-6 leading-relaxed text-sm md:text-base">
              This Art Deco-style all-inclusive property is located on the
              beach. Take advantage of the beach loungers and beach towels at
              the white sand beach. Some on-site activities to enjoy while
              you're visiting include snorkeling, windsurfing, and
              surfing/bodyboarding. Noteworthy nearby activities include
              parasailing and scuba diving.
            </p>
          </div>

          {/* Two smaller images */}
          <div className="grid grid-cols-2 gap-4">
            <img
              src="spa-main2.png"
              alt="Beach view 1"
              className="w-full h-40 md:h-48 object-cover rounded-lg"
            />
            <img
              src="spa-main3.png"
              alt="Beach view 2"
              className="w-full h-40 md:h-48 object-cover rounded-lg"
            />
          </div>

          {/* Guest Review Card */}
          <div className="bg-blue-50 p-4 md:p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-200 p-2 md:p-3 rounded-full">
                <BiMessageDetail className="text-xl md:text-2xl text-blue-600" />
              </div>
              <h3 className="font-semibold text-sm md:text-base">
                What guests liked about the beach
              </h3>
            </div>
            <p className="text-gray-800 leading-relaxed text-sm md:text-base">
              The beach was beautiful, clean, and swimmable with crystal clear
              water and stunning views.
            </p>
          </div>

          {/* Link */}
          <button className="text-blue-600 hover:underline flex items-center gap-1 text-sm md:text-base">
            See all beach amenities
            <span>›</span>
          </button>
        </div>

        {/* Desktop: Three-column layout */}
        <div className="hidden xl:grid xl:grid-cols-[400px_1fr_350px] gap-6">
          {/* Large spa image - Left side */}
          <div className="h-[450px]">
            <img
              src="spa-main.png"
              alt="Spa area"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Middle section */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold mb-4">On the beach</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              This Art Deco-style all-inclusive property is located on the
              beach. Take advantage of the beach loungers and beach towels at
              the white sand beach. Some on-site activities to enjoy while
              you're visiting include snorkeling, windsurfing, and
              surfing/bodyboarding. Noteworthy nearby activities include
              parasailing and scuba diving.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <img
                src="spa-main2.png"
                alt="Beach view 1"
                className="w-full h-[180px] object-cover rounded-lg"
              />
              <img
                src="spa-main3.png"
                alt="Beach view 2"
                className="w-full h-[180px] object-cover rounded-lg"
              />
            </div>
            <button className="text-blue-600 hover:underline flex items-center gap-1 text-sm">
              See all beach amenities
              <span>›</span>
            </button>
          </div>

          {/* Right side - Guest Review Card */}
          <div className="bg-blue-50 p-6 rounded-lg h-fit">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-200 p-3 rounded-full">
                <BiMessageDetail className="text-2xl text-blue-600" />
              </div>
              <h3 className="font-semibold text-sm">
                What guests liked about the beach
              </h3>
            </div>
            <p className="text-gray-800 leading-relaxed text-sm">
              The beach was beautiful, clean, and swimmable with crystal clear
              water and stunning views.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
