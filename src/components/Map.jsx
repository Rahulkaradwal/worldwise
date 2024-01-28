import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { Popup, MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../context/CitiesContext";

function Map() {
  const { cities } = useCities();
  const navigate = useNavigate();

  const [mapPosition, setMapPosition] = useState([43.7182412, -79.3780581]);
  const [searchParams] = useSearchParams();

  const mapLat = searchParams.get("lat");

  const mapLng = searchParams.get("lng");

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker position={city.position} key={city.id}>
            <Popup>{(city.cityName, city.country)}</Popup>
          </Marker>
        ))}
        <ChangePosition position={mapPosition} />
      </MapContainer>
    </div>
  );
}

function ChangePosition({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

export default Map;
