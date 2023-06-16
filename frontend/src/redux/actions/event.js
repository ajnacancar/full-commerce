import axios from "axios";
import { server } from "../../server";

// create event
export const createEvent = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "createEventPending",
    });

    const config = { headers: { "Content-Type": "multipart/form" } };

    const { data } = await axios.post(
      `${server}/event/create-event`,
      newForm,
      config
    );

    dispatch({
      type: "createEventSuccess",
      payload: data.event,
    });
  } catch (error) {
    dispatch({
      type: "createEventRejeted",
      payload: error.response.data.message,
    });
  }
};


// load events
export const loadEventsForShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "loadEventsPending",
    });

    const { data } = await axios.get(
      `${server}/event/get-all-events-shop/${id}`
    );

    dispatch({
      type: "loadEventsSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "loadEventsRejeted",
      payload: "",
    });
  }
};

//delete Event of shop
export const deleteEventOfShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteEventOfShopPending",
    });

    const { data } = await axios.delete(
      `${server}/event/delete-shop-event/${id}`,
      {withCredentials: true}
    );

    dispatch({
      type: "deleteEventOfShopSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "deleteEventOfShopRejeted",
      payload: "",
    });
  }
};

// get all events
export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllEventsRequest",
    });

    const { data } = await axios.get(`${server}/event/get-all-events`);
    dispatch({
      type: "getAllEventsSuccess",
      payload: data.allEvents,
    });
  } catch (error) {
    dispatch({
      type: "getAllEventsFailed",
      payload: error.response.data.message,
    });
  }
};
