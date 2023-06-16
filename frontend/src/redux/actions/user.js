import axios from "axios";
import { server } from "../../server";

//load user
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
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "loadUserRejeted",
      payload: "",
    });
  }
};

//update user information
export const updateUserInformation =
  (email, password, phoneNumber, name) => async (dispatch) => {
    try {
      dispatch({
        type: "updateUserPending",
      });

      const { data } = await axios.put(
        `${server}/user/update-user-info`,
        { email, password, phoneNumber, name },
        {
          withCredentials: true,
        }
      );

      dispatch({
        type: "updateUserSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "updateUserFailed",
        payload: error.response.data.message,
      });
    }
  };

//update user address
export const updateUserAddress =
  (country, city, address1, address2, zipCode, addressType) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "updateUserAddressPending",
      });

      const { data } = await axios.put(
        `${server}/user/update-user-address`,
        { country, city, address1, address2, zipCode, addressType },
        {
          withCredentials: true,
        }
      );

      dispatch({
        type: "updateUserAddressSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "updateUserAddressFailed",
        payload: error.response.data.message,
      });
    }
  };

//delete user address
export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteUserAddressPending",
    });

    const { data } = await axios.delete(
      `${server}/user/delete-user-address/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deleteUserAddressSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "deleteUserAddressFailed",
      payload: error.response.data.message,
    });
  }
};
