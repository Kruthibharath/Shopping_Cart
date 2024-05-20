import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { Offers } from "./pages/Offers";
import { Navbar } from "./components/Navbar";
import { BasketProvider } from "./context/basketContext";

function App() {
  return (
    <BasketProvider>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/offers" element={<Offers />} />
        </Routes>
      </Container>
    </BasketProvider>
  );
}

export default App;
