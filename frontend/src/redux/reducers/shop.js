import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticatedShop: false,
  loading: true
};

export const shopReducer = createReducer(initialState, {
  loadShopPending: (state) => {
    state.loading = true;
  },
  loadShopSuccess: (state, action) => {
    state.isAuthenticatedShop = true;
    state.loading = false;
    state.shop = action.payload;
  },
  loadShopRejeted: (state, action) => {
    state.error = action.payload;
    state.loading = false;
    state.isAuthenticatedShop = false;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});
