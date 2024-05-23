import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useBasket } from "../context/basketContext";
export function Navbar() {
  const { openBasket, basketQuantity } = useBasket();
  return (
    <NavbarBs className="bg-white shadow-sm mb-3">
      <Container className="me-auto">
        <Nav className="">
          <Nav.Link to="/" as={NavLink}>
            Home
          </Nav.Link>
          <Nav.Link to="/products" as={NavLink}>
            Products
          </Nav.Link>
          <Nav.Link to="/offers" as={NavLink}>
            Offers
          </Nav.Link>
        </Nav>
        {basketQuantity > 0 && (
          <Button onClick={openBasket}>Your Basket({basketQuantity})</Button>
        )}
      </Container>
    </NavbarBs>
  );
}
