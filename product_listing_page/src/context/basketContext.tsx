import { ReactNode, createContext, useContext, useState } from "react";
import { Basket } from "../components/basket";
import { useLocalStorage } from "../hooks/useLocalStorage";

type BasketProviderProps = {
  children: ReactNode;
};

type basketItem = {
  id: string;
  quantity: number;
};

type BasketContext = {
  openBasket: () => void;
  closeBasket: () => void;
  getItemQuantity: (id: string) => number;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  removeFromBasket: (id: string) => void;
  basketQuantity: number;
  basketItems: basketItem[];
};

const BasketContext = createContext({} as BasketContext);

export function useBasket() {
  return useContext(BasketContext);
}

export function BasketProvider({ children }: BasketProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [basketItems, setBasketItems] = useLocalStorage<basketItem[]>(
    "Basket",
    []
  );

  const basketQuantity = basketItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const openBasket = () => setIsOpen(true);
  const closeBasket = () => setIsOpen(false);

  function getItemQuantity(id: string) {
    return basketItems.find((item) => item.id === id)?.quantity || 0;
  }
  function incrementQuantity(id: string) {
    setBasketItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function decrementQuantity(id: string) {
    setBasketItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => {
          item.id !== id;
        });
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function removeFromBasket(id: string) {
    setBasketItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  return (
    <BasketContext.Provider
      value={{
        openBasket,
        closeBasket,
        getItemQuantity,
        incrementQuantity,
        decrementQuantity,
        removeFromBasket,
        basketItems,
        basketQuantity,
      }}
    >
      {children}
      <Basket isOpen={isOpen} />
    </BasketContext.Provider>
  );
}
