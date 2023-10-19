import { useDispatch, useSelector } from "react-redux";
import { CartItem, Item } from "../models";
import { AppDispatch, RootState } from "../state";
import { useCallback } from "react";
import {
  addItemToCart as addItemToCartAction,
  changeItemQuantity as changeItemQuantityAction,
} from "../state/cartSlice";

type UseCartResult = {
  cartItems: CartItem[];
  addItemToCart: (item: Item) => void;
  changeItemQuantity: (cartItem: CartItem, newQuantity: number) => void;
};

type UseCart = () => UseCartResult;

export const useCart: UseCart = () => {
  const cartItems = useSelector<RootState, CartItem[]>((state) => state.cart.cartItems);
  const dispatch = useDispatch<AppDispatch>();

  const addItemToCart = useCallback(
    (item: Item) => {
      dispatch(addItemToCartAction(item));
    },
    [dispatch]
  );

  const changeItemQuantity = useCallback(
    (cartItem: CartItem, newQuantity: number) => {
      dispatch(changeItemQuantityAction({ cartItem, newQuantity }))
    },
    [dispatch]
  );

  return { cartItems, addItemToCart, changeItemQuantity };
}
