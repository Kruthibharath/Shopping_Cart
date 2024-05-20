import React from "react";
import { Button, Card } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import "../App.css";
import { useShoppingCart } from "../context/shoppingCartContext";

type ProductsListProps = {
  productId: string;
  sku: string;
  title: string;
  price: number;
  image: string;
};

export const ProductsList = ({
  productId,
  sku,
  title,
  price,
  image,
}: ProductsListProps) => {
  const {
    getItemQuantity,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(productId);
  return (
    <Card className="h-100">
      <Card.Img
        className="mt-4"
        variant="top"
        src={image}
        height="200px"
        style={{ objectFit: "contain" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="flex-grow-1">
          {title}, {sku}
        </Card.Title>
        <Card.Text>{formatCurrency(price)}</Card.Text>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button
              variant="primary"
              className="w-100"
              onClick={() => incrementQuantity(productId)}
            >
              Add to Basket
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: "0.5rem" }}
            >
              <div
                className="d-flex align-items-center"
                style={{ gap: "0.5rem" }}
              >
                {" "}
                <Button onClick={() => incrementQuantity(productId)}>+</Button>
                <div>
                  <span className="fs-3">{quantity}</span>in the basket
                </div>
                <Button onClick={() => decrementQuantity(productId)}>-</Button>{" "}
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeFromCart(productId)}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
        {/* <Button variant="primary">Add to Basket</Button> */}
      </Card.Body>
    </Card>
  );
};
