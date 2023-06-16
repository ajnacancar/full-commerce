import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: true,
};

export const userReducer = createReducer(initialState, {
  //load user
  loadUserPending: (state) => {
    state.loading = true;
  },
  loadUserSuccess: (state, action) => {
    state.isAuthenticated = true;
    state.loading = false;
    state.user = action.payload;
  },
  loadUserRejeted: (state, action) => {
    state.error = action.payload;
    state.loading = false;
    state.isAuthenticated = false;
  },

  //update user
  updateUserPending: (state) => {
    state.loading = true;
  },
  updateUserSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
  },
  updateUserFailed: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  // update user address
  updateUserAddressPending: (state) => {
    state.addressLoading = true;
  },
  updateUserAddressSuccess: (state, action) => {
    state.addressLoading = false;
    state.addressUpdatedSuccessufuly = true;
    state.user = action.payload;
  },
  updateUserAddressFailed: (state, action) => {
    state.addressLoading = false;
    state.error = action.payload;
  },

  // delete user address
  deleteUserAddressPending: (state) => {
    state.addressLoading = true;
  },
  deleteUserAddressSuccess: (state, action) => {
    state.addressLoading = false;
    state.addressUpdatedSuccessufuly = true;
    state.user = action.payload;
  },
  deleteUserAddressFailed: (state, action) => {
    state.addressLoading = false;
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
