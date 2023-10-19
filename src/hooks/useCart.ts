import { useCallback } from "react";
import { CartItem, Item } from "../models";
import { useLocalStorage } from "usehooks-ts";

type UseCartResult = {
  cartItems: CartItem[];
  addItemToCart: (item: Item) => void;
  changeItemQuantity: (cartItem: CartItem, newQuantity: number) => void;
};

type UseCart = () => UseCartResult;

export const useCart: UseCart = () => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('cart', []);

  const addItemToCart = useCallback(
    (item: Item) => {
      const newItems = [...cartItems];
      const currentItem = newItems.find((ci) => ci.item.id === item.id);

      if (currentItem) {
        currentItem.quantity++;
      } else {
        const newItem = { item, quantity: 1 };
        newItems.push(newItem);
      }

      setCartItems(newItems);
    },
    [cartItems, setCartItems]
  );

  const changeItemQuantity = useCallback(
    (cartItem: CartItem, newQuantity: number) => {
      let newItems = [...cartItems];
      const item = newItems.find((ci) => ci === cartItem);

      if (!item) {
        throw new Error("Unable to find specified item to update count.");
      }

      item.quantity = newQuantity;

      newItems = newItems.filter((ci) => ci.quantity > 0);
      setCartItems(newItems);
    },
    [cartItems, setCartItems]
  );

  return { cartItems, addItemToCart, changeItemQuantity };
}
