import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { Popup, MapContainer, TileLayer, Marker } from "react-leaflet";
import { useState } from "react";
import { useCities } from "../context/CitiesContext";

function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { cities } = useCities();

  const [mapPosition, setMapPosition] = useState([43.7182412, -79.3780581]);

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>{(city.cityName, city.country)}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
