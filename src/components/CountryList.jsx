import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
function CountryList({ countries }) {
  const renderCountryList = countries.map((country) => (
    <CountryItem key={country.id} country={country} />
  ));
  return <ul className={styles.countryList}>{renderCountryList}</ul>;
}

export default CountryList;
