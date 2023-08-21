import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGeolocation } from "../hooks/useGeolocation.js";
import { useCityContexts } from "../contexts/CityContexts";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import Button from "./Button";
import styles from "./Map.module.css";
function Map() {
  const [location] = useSearchParams();
  const [mapPosition, setMapPosition] = useState([10, 20]);
  const { cityData, currentCity } = useCityContexts();
  const {
    isLoading: isLoadingPosition,
    position: geolocationPostion,
    getPosition: getGeolocationPosition,
  } = useGeolocation();

  useEffect(
    function () {
      if (location.get("lat") === null || location.get("lng") === null) return;
      setMapPosition([location.get("lat"), location.get("lng")]);
    },
    [location]
  );

  useEffect(
    function () {
      if (geolocationPostion)
        setMapPosition([geolocationPostion.lat, geolocationPostion.lng]);
    },
    [geolocationPostion]
  );
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
      <Button type="position" handleBtnClick={getGeolocationPosition}>
        {isLoadingPosition ? "Loading..." : "Get my position"}
      </Button>
      <MapContainer
        center={[0, 40] || currentCity.position}
        zoom={8}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {renderMarker}
        <ChangeMarkerPosition position={mapPosition || currentCity.position} />
        <HandleClick />
      </MapContainer>
    </div>
  );
}
function ChangeMarkerPosition({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function HandleClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}
export default Map;
