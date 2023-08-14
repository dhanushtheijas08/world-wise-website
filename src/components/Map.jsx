import { useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
function Map() {
  const [location, setLocation] = useSearchParams();
  return <div className={styles.mapContainer}> {location.get("lat")}</div>;
}

export default Map;
