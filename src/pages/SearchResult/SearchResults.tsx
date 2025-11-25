import { SearchBar } from "../../components/searchBar/SearchBar";
import HotelCard from "../../components/HotelCard/HotelCard";
import { useEffect, useState } from "react";
import { Building2, HomeIcon, Home, MapPin, Search, X } from "lucide-react";
import Map from "../../components/map/map";
import Tabs from "../../components/tabs/tabs";
import FilterProperties from "../../components/filterProperties/filterProperties";
import { Link, useLocation } from "react-router-dom";

export default function SearchResult() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const selectedLocation = params.get("location") || "";
  const checkIn = params.get("checkIn") || "";
  const checkOut = params.get("checkOut") || "";
  const adults = Number(params.get("adults")) || 1;
  const rooms = Number(params.get("rooms")) || 1;

  const cardData = {
    data: [
      {
        id: 1,
        img: {
          img: ["/7aa4d452.avif", "/4c20e37c.avif"],
          alt: "this is img",
        },
        title: "Avenue Al Arab Residence",
        location: "giza",
        Amenities: ["Pool", "Hot tub", "Kitchen"],
        reviews: { reviewsCount: 120, avgReview: 8.4 },
        withFees: true,
        prices: { day: 2500, nightly: 1000, offer: 12 },
        vip: true,
      },
      {
        id: 2,
        img: {
          img: ["/7aa4d452.avif", "/4c20e37c.avif"],
          alt: "this is img",
        },
        title: "Avenue Al Arab Residence",
        location: "giza",
        Amenities: ["Pool", "Hot tub", "Kitchen"],
        reviews: { reviewsCount: 120, avgReview: 8.4 },
        withFees: true,
        prices: { day: 2500, nightly: 1000, offer: 12 },
        vip: true,
      },
      {
        id: 3,
        img: {
          img: ["/7aa4d452.avif", "/4c20e37c.avif"],
          alt: "this is img",
        },
        title: "Avenue Al Arab Residence",
        location: "giza",
        Amenities: ["Pool", "Hot tub", "Kitchen"],
        reviews: { reviewsCount: 120, avgReview: 8.4 },
        withFees: true,
        prices: { day: 2500, nightly: 1000, offer: 12 },
        vip: true,
      },
    ],
    length: 3,
    state: "success",
  };
  const [showCompare, setShowCompare] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  
  useEffect(() => {
    console.log(activeTab);
  }, [activeTab]);

    // Filter hotels based on the search query
  const filteredHotels = cardData.data.filter((hotel) =>
    hotel.location.toLowerCase().includes(selectedLocation.toLowerCase())
  );

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="xl:max-w-[1200px] lg:max-w-[992px] md:max-w-[720px] sm:max-w-[540px] mx-auto mt-5">
          <SearchBar />
          <div className="flex min-h-screen mt-5">
            <div className="bg-white hidden p-6 md:block w-fit">
              <Map />

              <div className="w-full my-5 py-5 border-gray-300 border-b border-t">
                <div className="">
                  <p className="font-medium text-xl mb-2">
                    Search by property name
                  </p>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="e.g. Marriott"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <FilterProperties />
            </div>
            <div className="bg-white p-6 mx-auto w-full">
              <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
              {/* {filteredHotels.map((card) => ( */}
              {cardData.data.map((card) => (
                // <HotelCard key={card.id} cardData={card} />
                <Link key={card.id} to={`/property/${card.id}`}>
                  <HotelCard cardData={card} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
