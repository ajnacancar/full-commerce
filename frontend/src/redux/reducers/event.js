import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const eventReducer = createReducer(initialState, {
  //create eventf
  createEventPending: (state) => {
    state.isLoading = true;
  },
  createEventSuccess: (state, action) => {
    state.isLoading = false;
    state.event = action.payload;
    state.success = true;
  },
  createEventRejeted: (state, action) => {
    state.error = action.payload;
    state.isLoading = false;
    state.event = null;
    state.success = false;
  },

  //load events
  loadEventsPending: (state) => {
    state.isLoading = true;
  },
  loadEventsSuccess: (state, action) => {
    state.isLoading = false;
    state.events = action.payload;
    state.success = true;
  },
  loadEventsRejeted: (state, action) => {
    state.error = action.payload;
    state.isLoading = false;
    state.events = null;
    state.success = false;
  },

  //delete event
  deleteEventOfShopPending: (state) => {
    state.isLoading = true;
  },
  deleteEventOfShopSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
    state.success = true;
  },
  deleteEventOfShopRejeted: (state, action) => {
    state.error = action.payload;
    state.isLoading = false;
    state.event = null;
    state.success = false;
  },

  // get all events
  getAllEventsRequest: (state) => {
    state.isLoading = true;
  },
  getAllEventsSuccess: (state, action) => {
    state.isLoading = false;
    state.allEvents = action.payload;
  },
  getAllEventsFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
