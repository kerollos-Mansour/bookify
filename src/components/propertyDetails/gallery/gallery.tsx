import {useState,useEffect} from "react";
import { BsCamera } from "react-icons/bs";

export default function Gallery(props){
return (
    <>
            <div className="imageGallery mb-6">
          {/* Mobile: Single column stack */}
          <div className="block md:hidden space-y-2">
            <div className="h-64 overflow-hidden rounded-lg">
              <img
                src="/room1.png"
                alt="Main room view"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <img
                src="/room2.png"
                alt="Room view 2"
                className="w-full h-32 object-cover rounded-lg"
              />
              <img
                src="/room3.png"
                alt="Room view 3"
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>
            <div className="relative h-32">
              <img
                src="/room4.png"
                alt="Room view 4"
                className="w-full h-full object-cover rounded-lg"
              />
              <button className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white gap-2 rounded-lg hover:bg-opacity-60">
                <BsCamera size={20} />
                <span className="font-semibold">71+</span>
              </button>
            </div>
          </div>

          {/* Desktop: Side-by-side layout */}
          <div className="hidden md:flex gap-2 h-96">
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
        </div>
    </>
)
}