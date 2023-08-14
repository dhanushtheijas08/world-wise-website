import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./components/AppLayout";
import Form from "./components/Form";
import { useEffect, useState } from "react";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
export default function App() {
  const [cityData, setCityData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchCityData() {
      try {
        setIsLoading(true);
        const res = await fetch("http://localhost:9210/cities");
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
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={<AppLayout />}>
            <Route
              index
              element={<CityList cities={cityData} isLoading={isLoading} />}
            />
            <Route
              path="city"
              element={<CityList cities={cityData} isLoading={isLoading} />}
            />
            <Route path="city/:id" element={<City cities={cityData} />} />
            <Route
              path="country"
              element={<CountryList countries={cityData} />}
            />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
