import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { SearchBar } from "../../components/searchBar/searchBar";
import { FiArrowLeft, FiShare2 } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import RoomsSection from "../../components/propertyDetails/chooseRoom/chooseRoom";
import Gallery from "../../components/propertyDetails/gallery/gallery";
import NavigationBar from "../../components/propertyDetails/navigationBar/navigationBar";
import Treatments from "../../components/propertyDetails/treatment/treatment";
import PropertyInfo from "../../components/propertyDetails/propertyInfo/propertyInto";
import { Room } from "../../Data/rooms";
import PageTransition from "../../components/pageTransition/pageTransition";

const API_BASE_URL = "http://localhost:3000/api";

type HotelExperience = {
  title: string;
  description: string;
  heroImage: string;
  gallery: string[];
  guestQuote: string;
};

type HotelDetail = {
  id: string;
  hotelId: string;
  tagline: string;
  reviewCount?: number;
  highlights?: string[];
  amenities?: string[];
  experience?: HotelExperience;
};

type HotelResponse = {
  id: string;
  name: string;
  images?: string[];
  tripAdvisorRating?: number;
  hotelRating?: number;
  confidenceRating?: number;
  shortDescription?: string;
  address1?: string;
  city?: string;
  stateProvinceCode?: string;
  countryCode?: string;
  rooms?: Room[];
  detail?: HotelDetail | null;
  location: {
    latitude: number;
    longitude: number;
  };
};

export default function PropertyDetailsPage() {
  const [data, setData] = useState<HotelResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    const controller = new AbortController();

    const fetchProperty = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_BASE_URL}/hotels/${id}?_embed=rooms&_embed=hotelDetails`,
          { signal: controller.signal }
        );
        const hotel = response.data;

        setData({
          ...hotel,
          rooms: hotel.rooms ?? [],
          detail: hotel.hotelDetails?.[0] ?? null,
        });
      } catch (err) {
        if (axios.isCancel(err)) return;
        if (
          (err as Error).name === "CanceledError" ||
          (err as { code?: string }).code === "ERR_CANCELED"
        ) {
          return;
        }
        setError(err instanceof Error ? err.message : "Failed to load data.");
        console.error("Error fetching property:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    } else {
      setLoading(false);
      setError("Property id is missing.");
    }

    return () => controller.abort();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        Error: {error}
      </div>
    );
  }

  // Add null check
  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        No data found
      </div>
    );
  }

  return (
    <>
      <PageTransition>
        <div className="propertyDetailsWrapper px-4 sm:px-6 md:px-8 lg:px-12 xl:px-60">
          <SearchBar hideOnMobile={true} />

          {/* Back link and action buttons */}
          {/* <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center my-4 gap-3">
          <button
            className="flex items-center gap-2 text-blue-600 hover:underline text-sm md:text-base"
            onClick={() => navigate("/search")}
          >
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
        </div> */}

          {/* Image Gallery */}
          <Gallery images={data.images ?? []} />

          {/* Navigation Tabs and Select Room Button */}
          <NavigationBar />

          {/* Property Info and Map */}
          <PropertyInfo hotel={data} detail={data.detail ?? undefined} />

          {/* Treatments Section */}
          <Treatments experience={data.detail?.experience} />

          {/* Choose your room */}
          <RoomsSection rooms={data.rooms} />
        </div>
      </PageTransition>
    </>
  );
}
