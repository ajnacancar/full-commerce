import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const productReducer = createReducer(initialState, {
  //create
  createProductPending: (state) => {
    state.isLoading = true;
  },
  createProductSuccess: (state, action) => {
    state.isLoading = false;
    state.product = action.payload;
    state.successCreate = true;
  },
  createProductRejeted: (state, action) => {
    state.error = action.payload;
    state.isLoading = false;
    state.product = null;
    state.successCreate = false;
  },

  //load
  loadProductsPending: (state) => {
    state.isLoading = true;
  },
  loadProductsSuccess: (state, action) => {
    state.isLoading = false;
    state.products = action.payload;
    state.success = true;
  },
  loadProductsRejeted: (state, action) => {
    state.error = action.payload;
    state.isLoading = false;
    state.products = null;
    state.success = false;
  },

  //deleet
  deleteProductOfShopPending: (state) => {
    state.isLoading = true;
  },
  deleteProductOfShopSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
    state.success = true;
  },
  deleteProductOfShopRejeted: (state, action) => {
    state.error = action.payload;
    state.isLoading = false;
    state.product = null;
    state.success = false;
  },

  // get all products
  getAllProductsRequest: (state) => {
    state.isLoading = true;
  },
  getAllProductsSuccess: (state, action) => {
    state.isLoading = false;
    state.allProducts = action.payload;
  },
  getAllProductsFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
