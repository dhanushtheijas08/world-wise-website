import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./components/AppLayout";
import Country from "./components/Country";
import Form from "./components/Form";
import { useEffect, useState } from "react";
import CityList from "./components/CityList";
export default function App() {
  const [cityData, setCityData] = useState();
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
            <Route path="city" element={<CityList />} />
            <Route path="country" element={<Country />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
