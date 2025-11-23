import { SearchBar } from "../../components/SearchBar/SearchBar";
import Header from "../../components/Header/Header";
import HotelCard from "../../components/HotelCard/HotelCard";
import { useEffect, useState } from "react";
import { Building2, HomeIcon, Home, MapPin, Search, X } from "lucide-react";
import Map from "../../components/Map/Map";
import Tabs from "../../components/Tabs/Tabs";
import FilterProperties from "../../components/FilterProperties/FilterProperties";
// i like

export default function SearchResult() {
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
                            <Tabs
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />
                            {cardData.data.map((card) => (
                                <HotelCard key={card.id} cardData={card} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
