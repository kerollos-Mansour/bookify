import { useState, useEffect } from "react";
import { BsCamera } from "react-icons/bs";
import { IoRestaurantOutline, IoWifiSharp } from "react-icons/io5";
import { MdPets, MdPool, MdRestaurant, MdSpa } from "react-icons/md";

export default function PropertyInfo(props) {

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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Left column - Property Details */}
        <div className="lg:col-span-2">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {/* {data.name} */}
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
            <span className="bg-green-700 text-white px-2 py-1 rounded font-bold text-sm md:text-base">
              9.4
            </span>
            <span className="font-semibold text-sm md:text-base">
              Exceptional
            </span>
          </div>

          <button className="text-blue-600 hover:underline mb-6 cursor-pointer text-sm md:text-base">
            See all 351 reviews →
          </button>

          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              About this property
            </h2>
            <p className="text-gray-700 mb-6 text-sm md:text-base">
              Waterfront hotel with a full-service spa and a fitness center
            </p>
            {/* Amenities Grid */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-4 mb-6">
              {amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-xl md:text-2xl text-gray-700">
                    {amenity.icon}
                  </span>
                  <span className="text-gray-800 text-sm md:text-base">
                    {amenity.text}
                  </span>
                </div>
              ))}
            </div>

            <button className="text-blue-600 hover:underline flex items-center gap-1 cursor-pointer text-sm md:text-base">
              See all about this property <span>›</span>
            </button>
          </div>
        </div>

        {/* Right column - Map */}
        <div className="lg:col-span-1">
          <h3 className="font-semibold text-base md:text-lg mb-4">
            Explore the area
          </h3>
          <div className="w-full h-48 md:h-64 bg-gray-200 rounded-lg overflow-hidden mb-4">
            <img
              src="/map-placeholder.png"
              alt="Location map"
              className="w-full h-full object-cover"
            />
          </div>

          <p className="text-sm text-gray-800 mb-2">
            11a Woodfield Road, London, England, W9 3RE
          </p>
          <button className="text-blue-600 hover:underline text-sm flex items-center gap-1 mb-6">
            View in a map <span>›</span>
          </button>
        </div>
      </div>
    </>
  );
}
