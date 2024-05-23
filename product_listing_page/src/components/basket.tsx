import { Offcanvas, Stack } from "react-bootstrap";
import { useBasket } from "../context/basketContext";
import { BasketItem } from "./BasketItem";
import { formatCurrency } from "../utilities/formatCurrency";
import { useFetch } from "../hooks/useFetch";

type BasketProps = {
  isOpen: boolean;
};

export const Basket = ({ isOpen }: BasketProps) => {
  const { closeBasket, basketItems } = useBasket();
  const { data } = useFetch(
    "https://jsainsburyplc.github.io/front-end-test/products.json"
  );
  return (
    <Offcanvas show={isOpen} onHide={closeBasket} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Basket Items</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {basketItems.map((item) => (
            <BasketItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              basketItems.reduce((total, basketItem) => {
                const item = data.find(
                  (product) => product.productId === basketItem.id
                );
                return total + (item?.price || 0) * basketItem.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
