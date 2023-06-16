import axios from "axios";
import { server } from "../../server";

// load orders for user
export const loadAllOrdersForUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllOrdersForUserPending",
    });

    const { data } = await axios.get(`${server}/order/get-all-orders/${id}`, {
      withCredentials: true,
    });

    dispatch({
      type: "getAllOrdersForUserSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "getAllOrdersForUserRejeted",
      payload: "",
    });
  }
};

// load orders for shop
export const loadAllOrdersForShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllOrdersForShopPending",
    });

    const { data } = await axios.get(
      `${server}/order/get-shop-all-orders/${id}`,
      { withCredentials: true }
    );

    dispatch({
      type: "getAllOrdersForShopSuccess",
      payload: data.shopOrders,
    });
  } catch (error) {
    dispatch({
      type: "getAllOrdersForShopRejeted",
      payload: "",
    });
  }
};
