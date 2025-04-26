import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/HomePage";
import ProductForm from "./pages/ProductFormPage";
import ProductPage from "./pages/ProductsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="/product/:id" element={<ProductForm />} />
    </Routes>
  );
}

export default App;
