import axios from "axios";
import { server } from "../../server";

//load shop

export const loadShop = () => async (dispatch) => {
  try {
    dispatch({
      type: "loadShopPending",
    });

    const { data } = await axios.get(`${server}/shop/get-shop`, {
      withCredentials: true,
    });

    dispatch({
        type: "loadShopSuccess",
        payload: data.shop
    })
  } catch (error) {
    dispatch({
        type: "loadShopRejeted",
        payload: ""
    })
  }
};