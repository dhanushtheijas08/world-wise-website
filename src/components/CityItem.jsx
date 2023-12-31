import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCityContexts } from "../contexts/CityContexts";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));
function CityItem({ city }) {
  const { currentCity } = useCityContexts();
  const { cityName, emoji, date, id, position } = city;
  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          currentCity.id === id ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}> {emoji} </span>
        <h3 className={styles.name}> {cityName} </h3>
        <time className={styles.date}> {formatDate(date)} </time>
      </Link>
    </li>
  );
}

export default CityItem;
