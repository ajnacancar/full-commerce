import { createReducer } from "@reduxjs/toolkit";
import { CART_ITEMS } from "../../server";

const initialState = {
  cart: localStorage.getItem(CART_ITEMS)
    ? JSON.parse(localStorage.getItem(CART_ITEMS))
    : [],
};

export const cartReducer = createReducer(initialState, {
  addToCart: (state, action) => {
    const item = action.payload;

    const isItemExist = state.cart.find((i) => i._id === item._id);

    if (isItemExist) {
      return {
        ...state,
        cart: state.cart.map((i) => (i._id === isItemExist._id ? item : i)),
      };
    } else {
      return {
        ...state,
        cart: [...state.cart, item],
      };
    }
  },
  removeFromCart: (state, action) => {
    return {
      ...state,
      cart: state.cart.filter((i) => i._id !== action.payload),
    };
  },
});
