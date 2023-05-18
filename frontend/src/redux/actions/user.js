import axios from "axios";
import { server } from "../../server";

//loadUser

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "loadUserPending",
    });

    const { data } = await axios.get(`${server}/user/get-user`, {
      withCredentials: true,
    });

    dispatch({
        type: "loadUserSuccess",
        payload: data.user
    })
  } catch (error) {
    dispatch({
        type: "loadUserRejeted",
        payload: error.respnse
    })
  }
};
