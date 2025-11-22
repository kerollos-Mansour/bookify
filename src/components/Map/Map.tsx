// components/Map/Map.tsx
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { MapPin } from "lucide-react";
import { useEffect } from "react";

export default function Map() {
    const gizaPosition: [number, number] = [29.9792, 31.1342];

    return (
        <div className="relative w-full rounded-2xl overflow-hidden">
            <MapContainer
                center={gizaPosition}
                zoom={11}
                scrollWheelZoom={true}
                className="h-full w-full"
                style={{ height: "200px", width: "250px" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                <Marker position={gizaPosition}>
                    <Popup>
                        <div className="text-center p-2">
                            <p className="font-bold text-lg">
                                Giza Pyramids Area
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                                300+ stays available
                            </p>
                        </div>
                    </Popup>
                </Marker>
            </MapContainer>

            <button className="absolute cursor-pointer bottom-7 left-2/4 -translate-x-2/4 z-1000 text-sm whitespace-nowrap bg-white px-5 py-3 rounded-xl shadow-lg font-medium hover:shadow-xl transition-all duration-200 flex items-center gap-2 hover:bg-gray-50">
                <MapPin className="w-5 h-5 text-blue-600" />
                View in a map
            </button>
        </div>
    );
}
