import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import { useCityContexts } from "../contexts/CityContexts";
function CountryList() {
  const { cityData: countries } = useCityContexts();
  const renderCountryList = countries.map((country) => (
    <CountryItem key={country.id} country={country} />
  ));
  return <ul className={styles.countryList}>{renderCountryList}</ul>;
}

export default CountryList;
