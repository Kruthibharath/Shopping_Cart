import { ReactNode, createContext, useContext, useState } from "react";

type BasketProviderProps = {
  children: ReactNode;
};

type basketItem = {
  id: string;
  quantity: number;
};

type BasketContext = {
  getItemQuantity: (id: string) => number;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
};

const BasketContext = createContext({} as BasketContext);

export function useBasket() {
  return useContext(BasketContext);
}

export function BasketProvider({ children }: BasketProviderProps) {
  const [Basket, setBasket] = useState<basketItem[]>([]);

  function getItemQuantity(id: string) {
    return Basket.find((item) => item.id === id)?.quantity || 0;
  }
  function incrementQuantity(id: string) {
    setBasket((currItems) => {
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
    setBasket((currItems) => {
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
  function removeFromCart(id: string) {
    setBasket((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  return (
    <BasketContext.Provider
      value={{
        getItemQuantity,
        incrementQuantity,
        decrementQuantity,
        removeFromCart,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
}
