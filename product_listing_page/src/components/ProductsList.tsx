import React from "react";
import { Button, Card } from "react-bootstrap";

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
  return (
    <Card>
      <Card.Img
        variant="top"
        src={image}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title className="fn-8" style={{ height: "100px" }}>
          {title}, {sku}
        </Card.Title>
        <Card.Text>{price}</Card.Text>
        <Button variant="primary">Add to Basket</Button>
      </Card.Body>
    </Card>
  );
};
