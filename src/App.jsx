import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./components/AppLayout";
import Form from "./components/Form";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import CityContexts from "./contexts/CityContexts";
export default function App() {
  return (
    <CityContexts>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="city" />} />
            <Route path="city" element={<CityList />} />
            <Route path="city/:id" element={<City />} />
            <Route path="country" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CityContexts>
  );
}
