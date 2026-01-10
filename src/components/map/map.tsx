// components/Map/Map.tsx
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";

// ✅ Fix Leaflet default icon issue in production
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

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
  markers?: MapMarker[];
  zoom?: number;
  height?: string;
  width?: string;
  showViewButton?: boolean;
  onViewInMapClick?: () => void;
  scrollWheelZoom?: boolean;
  className?: string;
}

// ✅ مكون جديد لتحديث مركز الخريطة
function ChangeMapView({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) {
  const map = useMap();

  useEffect(() => {
    if (center && center[0] && center[1]) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);

  return null;
}

function FitBoundsToMarkers({ markers }: { markers: MapMarker[] }) {
  const map = useMap();

  useEffect(() => {
    if (markers.length > 1) {
      const bounds = markers.map((m) => m.position);
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [markers, map]);

  return null;
}

export default function Map({
  location,
  markers = [],
  zoom = 11,
  height = "200px",
  width = "100%",
  showViewButton = true,
  onViewInMapClick,
  scrollWheelZoom = true,
  className = "",
}: MapProps) {
  const defaultPosition: [number, number] = [29.9792, 31.1342];

  const centerPosition: [number, number] = (() => {
    if (markers.length > 0) {
      const avgLat =
        markers.reduce((sum, m) => sum + m.position[0], 0) / markers.length;
      const avgLng =
        markers.reduce((sum, m) => sum + m.position[1], 0) / markers.length;
      return [avgLat, avgLng];
    }
    if (location) {
      return [location.latitude, location.longitude];
    }
    return defaultPosition;
  })();

  // ✅ إذا لم يكن هناك markers، أنشئ واحد في المركز
  const displayMarkers: MapMarker[] =
    markers.length > 0
      ? markers
      : location
      ? [
          {
            position: [location.latitude, location.longitude],
            title: "Location",
            description: "Point of interest",
          },
        ]
      : [];

  const handleViewInMap = () => {
    if (onViewInMapClick) {
      onViewInMapClick();
    } else {
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

        <ChangeMapView center={centerPosition} zoom={zoom} />

        {markers.length > 1 && <FitBoundsToMarkers markers={markers} />}

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
