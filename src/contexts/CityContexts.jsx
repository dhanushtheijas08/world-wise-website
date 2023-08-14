import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:9210";
const CitiesContexts = createContext();
function CityContexts({ children }) {
  const [cityData, setCityData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCityData() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCityData(data);
      } catch {
        console.log("Error");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCityData();
  }, []);

  async function fetchCurrentCityData(id) {
    const res = await fetch(`${BASE_URL}/cities/${id}`);
    const data = await res.json();
    setCurrentCity(data);
  }

  return (
    <CitiesContexts.Provider
      value={{
        cityData,
        isLoading,
        currentCity,
        fetchCurrentCityData,
      }}
    >
      {children}
    </CitiesContexts.Provider>
  );
}

function useCityContexts() {
  const context = useContext(CitiesContexts);
  return context;
}
export default CityContexts;
export { useCityContexts };
