import axios from "axios";
import { server } from "../../server";

// create product
export const createProduct = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "createProductPending",
    });

    const config = { headers: { "Content-Type": "multipart/form" } };

    const { data } = await axios.post(
      `${server}/product/create-product`,
      newForm,
      config
    );

    dispatch({
      type: "createProductSuccess",
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: "createProductRejeted",
      payload: error.response.data.message,
    });
  }
};

// load products
export const loadProductsForShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "loadProductsPending",
    });

    const { data } = await axios.get(
      `${server}/product/get-all-products-shop/${id}`
    );

    dispatch({
      type: "loadProductsSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "loadProductsRejeted",
      payload: "",
    });
  }
};

//delete product of shop
export const deleteProductOfShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProductOfShopPending",
    });

    const { data } = await axios.delete(
      `${server}/product/delete-shop-product/${id}`,
      {withCredentials: true}
    );

    dispatch({
      type: "deleteProductOfShopSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "deleteProductOfShopRejeted",
      payload: "",
    });
  }
};


// get all products
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsRequest",
    });

    const { data } = await axios.get(`${server}/product/get-all-products`);
    dispatch({
      type: "getAllProductsSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsFailed",
      payload: error.response.data.message,
    });
  }
};
