import L from "leaflet";
// @ts-ignore
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useMemo } from "react";

if (typeof window !== "undefined" && L && L.Icon && L.Icon.Default) {
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x.src ?? markerIcon2x,
    iconUrl: markerIcon.src ?? markerIcon,
    shadowUrl: markerShadow.src ?? markerShadow,
  });
}

export type SchoolMapItem = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  level?: string;
};

export type UserLocation = {
  lat: number;
  lng: number;
};

type SchoolsMapProps = {
  schools: SchoolMapItem[];
  userLocation?: UserLocation;
  height?: number | string;
};

export default function SchoolsMapClient({ schools = [], userLocation, height = 400 }: SchoolsMapProps) {
  // Centro inicial: si hay userLocation, usarlo; si no, usar la primera escuela; si no, default México
  const center = useMemo(() => {
    if (userLocation) return [userLocation.lat, userLocation.lng];
    if (schools.length > 0) return [schools[0].lat, schools[0].lng];
    return [23.6345, -102.5528]; // Centro de México
  }, [userLocation, schools]);

  return (
    <MapContainer center={center as [number, number]} zoom={userLocation ? 12 : 6} style={{ height, width: "100%" }} scrollWheelZoom>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {schools.map((school) => (
        <Marker key={school.id} position={[school.lat, school.lng]}>
          <Popup>
            <div className="space-y-1">
              <div className="font-semibold text-slate-900">{school.name}</div>
              {school.level && (
                <div className="text-xs text-slate-600">{school.level}</div>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
      {/* Puedes agregar un marcador para userLocation si lo deseas */}
    </MapContainer>
  );
}