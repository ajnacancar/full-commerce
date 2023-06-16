import { WISHLIST_ITEMS } from "../../server";

// add to wishlist
export const addToWishlist = (data) => async (dispatch, getState) => {
  dispatch({
    type: "addToWishlist",
    payload: data,
  });

  localStorage.setItem(
    WISHLIST_ITEMS,
    JSON.stringify(getState().wishlist.wishlist)
  );
  return data;
};

//remove from wishlist
export const removeFromWishlist = (data) => async (dispatch, getState) => {
  dispatch({
    type: "removeFromWishlist",
    payload: data._id,
  });

  localStorage.setItem(
    WISHLIST_ITEMS,
    JSON.stringify(getState().wishlist.wishlist)
  );
  return data;
};
