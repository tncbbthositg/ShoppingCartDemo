/* eslint-disable @typescript-eslint/no-explicit-any */

import { renderHook } from "@testing-library/react"
import { Provider } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";
import { cartSliceReducer } from "../src/state/cartSlice";

type RenderHook = typeof renderHook;
type Wrapper = React.JSXElementConstructor<{
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}> | undefined;

export const renderHookWithStore: RenderHook = (render, options) => {
  const store = configureStore({
    reducer: {
      cart: cartSliceReducer,
    }
  });

  const wrapper: Wrapper = ({ children }) => (<Provider store={store}>{children}</Provider>);
  return renderHook(render, { ...options, wrapper });
};
