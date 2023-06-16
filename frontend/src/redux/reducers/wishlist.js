import { createReducer } from "@reduxjs/toolkit";
import { WISHLIST_ITEMS } from "../../server";

const initialState = {
  wishlist: localStorage.getItem(WISHLIST_ITEMS)
    ? JSON.parse(localStorage.getItem(WISHLIST_ITEMS))
    : [],
};

export const wishListReducer = createReducer(initialState, {
  addToWishlist: (state, action) => {
    const item = action.payload;

    const isItemExist = state.wishlist.find((i) => i._id === item._id);

    if (!isItemExist) {
      return {
        ...state,
        wishlist: [...state.wishlist, item],
      };
    }
  },
  removeFromWishlist: (state, action) => {
    return {
      ...state,
      wishlist: state.wishlist.filter((i) => i._id !== action.payload),
    };
  },
});