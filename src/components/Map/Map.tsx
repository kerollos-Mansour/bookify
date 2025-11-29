// components/Map/Map.tsx
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { MapPin } from "lucide-react";
import L from "leaflet";

// Types
interface Location {
  latitude: number;
  longitude: number;
}

interface MapMarker {
  position: [number, number];
  title: string;
  description?: string;
}

interface MapProps {
  location?: Location;
  markers?: MapMarker[] | any;
  zoom?: number;
  height?: string;
  width?: string;
  showViewButton?: boolean;
  onViewInMapClick?: () => void;
  scrollWheelZoom?: boolean;
  className?: string;
}

export default function Map({
  location,
  markers = [],
  zoom = 11,
  height = "200px",
  width = "250px",
  showViewButton = true,
  onViewInMapClick,
  scrollWheelZoom = true,
  className = "",
}: MapProps) {
  const defaultPosition: [number, number] = [29.9792, 31.1342];

  const centerPosition: [number, number] = location
    ? [location.latitude, location.longitude]
    : defaultPosition;

  // If no markers provided, create one at center
  const displayMarkers =
    markers.length > 0
      ? markers
      : [
          {
            position: centerPosition,
            title: "Location",
            description: "Point of interest",
          },
        ];

  const handleViewInMap = () => {
    if (onViewInMapClick) {
      onViewInMapClick();
    } else {
      // Default behavior: open in Google Maps
      const [lat, lng] = centerPosition;
      window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
    }
  };

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden ${className}`}>
      <MapContainer
        center={centerPosition}
        zoom={zoom}
        scrollWheelZoom={scrollWheelZoom}
        className="h-full w-full"
        style={{ height, width }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {displayMarkers.map((marker, index) => (
          <Marker key={index} position={marker.position}>
            <Popup>
              <div className="text-center p-2">
                <p className="font-bold text-lg">{marker.title}</p>
                {marker.description && (
                  <p className="text-sm text-gray-600 mt-1">
                    {marker.description}
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
