import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartItem, Item } from "../models";

export type CartState = {
  cartItems: CartItem[];
};

export type ChangeItemQuantityPayloadAction = PayloadAction<{
  cartItem: CartItem;
  newQuantity: number;
}>;

const initialState: CartState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<Item>) => {
      const { cartItems } = state;
      const item = action.payload;

      const currentItem = cartItems.find((ci) => ci.item.id === item.id);

      if (currentItem) {
        currentItem.quantity++;
      } else {
        const newItem = { item, quantity: 1 };
        cartItems.push(newItem);
      }
    },
    changeItemQuantity: (state, action: ChangeItemQuantityPayloadAction) => {
      const { cartItem, newQuantity } = action.payload;

      const currentItem = state.cartItems.find((ci) => ci.item.id === cartItem.item.id);

      if (!currentItem) {
        throw new Error("Unable to find specified item to update count.");
      }

      currentItem.quantity = newQuantity;

      state.cartItems = state.cartItems.filter((ci) => ci.quantity > 0);
    }
  },
});

export const { addItemToCart, changeItemQuantity } = cartSlice.actions;
export const cartSliceReducer = cartSlice.reducer;
