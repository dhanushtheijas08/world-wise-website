import Spinner from "./Spinner";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
function CityList({ cities, isLoading }) {
  const renderCityList = cities.map((city) => (
    <CityItem key={city.id} city={city} />
  ));
  if (isLoading) return <Spinner />;
  return <ul className={styles.cityList}>{renderCityList}</ul>;
}

export default CityList;
