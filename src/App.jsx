import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";

function App() {
  return (
    <div>
      <BrowserRouter>
        <>Hello</>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="product" element={<Product />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
