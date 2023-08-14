import Spinner from "./Spinner";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import { useCityContexts } from "../contexts/CityContexts";
function CityList() {
  const { cityData: cities, isLoading } = useCityContexts();
  const renderCityList = cities.map((city) => (
    <CityItem key={city.id} city={city} />
  ));
  if (isLoading) return <Spinner />;
  return <ul className={styles.cityList}>{renderCityList}</ul>;
}

export default CityList;
