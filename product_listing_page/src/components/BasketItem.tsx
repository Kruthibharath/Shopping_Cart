import { Button, Stack } from "react-bootstrap";
import { useFetch } from "../hooks/useFetch";
import { formatCurrency } from "../utilities/formatCurrency";
import { useBasket } from "../context/basketContext";

type basketItemProps = {
  id: string;
  quantity: number;
};

export const BasketItem = ({ id, quantity }: basketItemProps) => {
  const { data } = useFetch(
    "https://jsainsburyplc.github.io/front-end-test/products.json"
  );
  const { removeFromBasket } = useBasket();
  const item = data.find((product) => product.productId === id);
  if (item == null) return null;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.image}
        style={{ width: "120px", height: "70px", objectFit: "contain" }}
      />
      <div>
        <div>
          {item.title}{" "}
          {quantity > 1 && (
            <span className="p-1 text-muted" style={{ fontSize: "0.85rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: "0.95rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div> {formatCurrency(item.price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromBasket(item.productId)}
      >
        &times;
      </Button>
    </Stack>
  );
};
