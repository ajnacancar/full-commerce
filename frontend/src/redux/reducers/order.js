import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const orderReducer = createReducer(initialState, {
  //load all orders for user
  getAllOrdersForUserPending: (state) => {
    state.isLoading = true;
  },
  getAllOrdersForUserSuccess: (state, action) => {
    state.isLoading = false;
    state.orders = action.payload;
    state.success = true;
  },
  getAllOrdersForUserRejeted: (state, action) => {
    state.error = action.payload;
    state.isLoading = false;
    state.orders = null;
    state.success = false;
  },

   //load all orders for shop
   getAllOrdersForShopPending: (state) => {
    state.isLoading = true;
  },
  getAllOrdersForShopSuccess: (state, action) => {
    state.isLoading = false;
    state.shopOrders = action.payload;
    state.success = true;
  },
  getAllOrdersForShopRejeted: (state, action) => {
    state.error = action.payload;
    state.isLoading = false;
    state.shopOrders = null;
    state.success = false;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
