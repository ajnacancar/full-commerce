import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { shopReducer } from "./reducers/shop";
import { productReducer } from "./reducers/product";
import { eventReducer } from "./reducers/event";
import { cartReducer } from "./reducers/cart";
import { wishListReducer } from "./reducers/wishlist";
import { orderReducer } from "./reducers/order";

const Store = configureStore({
  reducer: {
    user: userReducer,
    shop: shopReducer,
    product: productReducer,
    event: eventReducer,
    cart: cartReducer,
    wishlist: wishListReducer,
    order: orderReducer,
  },
});

export default Store;
