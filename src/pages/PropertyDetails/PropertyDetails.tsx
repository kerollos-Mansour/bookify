import { SearchBar } from "../../components/searchBar/searchBar";
import { FiArrowLeft, FiShare2 } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import {
  MdPool,
  MdRestaurant,
  MdPets,
  MdSpa,
  MdLocationOn,
  MdFlight,
} from "react-icons/md";
import { IoWifiSharp, IoRestaurantOutline } from "react-icons/io5";
import { BiMessageDetail } from "react-icons/bi";
import { BsCamera } from "react-icons/bs";
import RoomsSection from "../../components/chooseRoom/chooseRoom";
import { useParams } from "react-router-dom";

export default function PropertyDetails() {
  const { id } = useParams();
  const amenities = [
    { icon: <MdPool />, text: "Indoor pool" },
    { icon: <IoRestaurantOutline />, text: "Continental breakfast available" },
    { icon: <MdPets />, text: "Pets stay free" },
    { icon: <MdRestaurant />, text: "Restaurant" },
    { icon: <MdSpa />, text: "Full-service spa" },
    { icon: <IoWifiSharp />, text: "Free WiFi" },
  ];

  return (
    <>
      <div className="propertyDetailsWrapper pr-60 pl-60">
        <SearchBar />

        {/* Back link and action buttons */}
        <div className="flex justify-between items-center my-4">
          <button className="flex items-center gap-2 text-blue-600 hover:underline">
            <FiArrowLeft />
            See all properties
          </button>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <FiShare2 />
              Share
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <AiOutlineHeart />
              Save
            </button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="imageGallery flex gap-2 h-96 mb-6">
          {/* Large image */}
          <div className="flex-1 overflow-hidden rounded-l-lg">
            <img
              src="/room1.png"
              alt="Main room view"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Small images grid */}
          <div className="grid grid-cols-2 gap-2 w-1/2">
            <img
              src="/room2.png"
              alt="Room view 2"
              className="w-full h-full object-cover"
            />
            <img
              src="/room3.png"
              alt="Room view 3"
              className="w-full h-full object-cover rounded-tr-lg"
            />
            <img
              src="/room4.png"
              alt="Room view 4"
              className="w-full h-full object-cover"
            />
            {/* Last image with overlay */}
            <div className="relative">
              <img
                src="/room5.png"
                alt="Room view 5"
                className="w-full h-full object-cover rounded-br-lg"
              />
              <button className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white gap-2 rounded-br-lg hover:bg-opacity-60">
                <BsCamera size={20} />
                <span className="font-semibold">71+</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs and Select Room Button */}
        <div className="flex justify-between items-center  mb-6">
          <div className="flex gap-8">
            <button className="pb-4 border-b-2 border-blue-600 text-blue-600 font-semibold">
              Overview
            </button>
            <button className="pb-4 text-gray-600 hover:text-gray-900">
              About
            </button>
            <button className="pb-4 text-gray-600 hover:text-gray-900">
              Rooms
            </button>
            <button className="pb-4 text-gray-600 hover:text-gray-900">
              Accessibility
            </button>
            <button className="pb-4 text-gray-600 hover:text-gray-900">
              Policies
            </button>
          </div>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700">
            Select a room
          </button>
        </div>

        {/* Property Info and Map */}
        <div className="grid grid-cols-3 gap-8">
          {/* Left column - Property Details */}
          <div className="col-span-2">
            <h1 className="text-3xl font-bold mb-2">
              Mason & Fifth - Westbourne Park
            </h1>

            {/* Star rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-gray-700">
                {[...Array(4)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
            </div>

            {/* Rating badge */}
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-green-700 text-white px-2 py-1 rounded font-bold">
                9.4
              </span>
              <span className="font-semibold">Exceptional</span>
            </div>

            <button className="text-blue-600 hover:underline mb-6 cursor-pointer">
              See all 351 reviews →
            </button>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">About this property</h2>
              <p className="text-gray-700 mb-6">
                Waterfront hotel with a full-service spa and a fitness center
              </p>
              {/* Amenities Grid */}

              <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-6">
                {amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text 2xl text-gray-700">
                      {amenity.icon}
                    </span>
                    <span className="text-gray-800">{amenity.text}</span>
                  </div>
                ))}
              </div>

              <button className="text-blue-600 hover:underline flex items-center gap-1 cursor-pointer">
                See all about this property <span>›</span>
              </button>
            </div>
          </div>

          {/* Right column - Map */}
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">Explore the area</h3>
            <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden mb-4">
              <img
                src="/map-placeholder.png"
                alt="Location map"
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-sm text-gray-800 mb-2 ">
              11a Woodfield Road, London, England, W9 3RE
            </p>
            <button className="text-blue-600 hover:underline text-sm flex items-center gap-1 mb-6">
              View in a map <span>›</span>
            </button>
          </div>
        </div>
        {/* Treatments Section */}
        <div className="mb-12 mt-12">
          <h2 className="text-2xl font-bold mb-4">Treatments</h2>

          <div className="grid grid-cols-[400px_1fr_350px] gap-6">
            {/* Large spa image - Left side */}
            <div className="h-[450px]">
              <img
                src="spa-main.png"
                alt="Spa area"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Middle section - Title, Description, Two images, and Link */}
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold mb-4">On the beach</h3>

              {/* Description */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                This Art Deco-style all-inclusive property is located on the
                beach. Take advantage of the beach loungers and beach towels at
                the white sand beach. Some on-site activities to enjoy while
                you're visiting include snorkeling, windsurfing, and
                surfing/bodyboarding. Noteworthy nearby activities include
                parasailing and scuba diving.
              </p>

              {/* Two smaller images */}
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

              {/* Link */}
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

        {/* Choose your room */}
        <RoomsSection />
      </div>
    </>
  );
}
