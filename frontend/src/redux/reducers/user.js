import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

export const userReducer = createReducer(initialState, {
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
  clearErrors: (state) => {
    state.error = null;
  },
});
