import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import styles from "./Map.module.css";
import { useCityContexts } from "../contexts/CityContexts";
function Map() {
  const [location] = useSearchParams();
  const [mapPosition, setMapPosition] = useState([10, 20]);
  const { cityData } = useCityContexts();

  // useEffect(
  //   function () {
  //     setMapPosition([location.get("lat"), location.get("lng")]);
  //   },
  //   [location]
  // );
  const renderMarker = cityData.map((city) => {
    return (
      <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
        <Popup>
          <span> {city.emoji} </span>
          <span> {city.cityName} </span>
        </Popup>
      </Marker>
    );
  });
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
        {renderMarker}
        <changePosition position={[location.get("lat"), location.get("lng")]} />
      </MapContainer>
    </div>
  );
}

function changePosition({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
export default Map;
