import { useEffect, useState } from "react";
import { SearchBar } from "../../components/searchBar/SearchBar";
import { FiArrowLeft, FiShare2 } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { BiMessageDetail } from "react-icons/bi";
import RoomsSection from "../../components/propertyDetails/chooseRoom/chooseRoom";
import { useParams } from "react-router-dom";
import axios from "axios";
import Gallery from "../../components/propertyDetails/gallery/gallery";
import NavigationBar from "../../components/propertyDetails/navigationBar/navigationBar";
import Treatments from "../../components/propertyDetails/treatment/treatment";

export default function PropertyDetails() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/hotels/${id}`
        );
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  return (
    <>
      <div className="propertyDetailsWrapper px-4 sm:px-6 md:px-8 lg:px-12 xl:px-60">
        <SearchBar />

        {/* Back link and action buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center my-4 gap-3">
          <button className="flex items-center gap-2 text-blue-600 hover:underline text-sm md:text-base">
            <FiArrowLeft />
            See all properties
          </button>
          <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
            <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 border rounded-lg hover:bg-gray-50 flex-1 sm:flex-initial text-sm md:text-base">
              <FiShare2 />
              <span className="hidden sm:inline">Share</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 border rounded-lg hover:bg-gray-50 flex-1 sm:flex-initial text-sm md:text-base">
              <AiOutlineHeart />
              <span className="hidden sm:inline">Save</span>
            </button>
          </div>
        </div>

        {/* Image Gallery */}
        <Gallery />

        {/* Navigation Tabs and Select Room Button */}
        <NavigationBar />

        {/* Property Info and Map */}
        <PropertyDetails />

        {/* Treatments Section */}
        <Treatments />

        {/* Choose your room */}
        <RoomsSection />
      </div>
    </>
  );
}
