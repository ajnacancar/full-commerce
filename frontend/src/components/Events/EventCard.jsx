import React from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown";
import { backend_url } from "../../server";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/actions/cart";

function EventCard({ active, data }) {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (data) => {
    const isItemExist = cart && cart.find((i) => i._id === data?._id);

    if (isItemExist) {
      toast.error("Item already in cart!");
    } else {
      const cartData = { ...data, qty: 1 };
      dispatch(addToCart(cartData));
      toast.success("Item added to cart!");
    }
  };
  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2`}
    >
      <div className="w-full lg:w-[50%] m-auto">
        <img src={`${backend_url}/${data.images[0]}`} alt="" />
      </div>

      <div className="w-full lg:w-[50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>{data.name}</h2>
        <p>{data.description}</p>

        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-bold text-lg text-[#d55b45] pr-3 line-through">
              {data.originalPrice} $
            </h5>
            <h5 className="font-bold text-xl text-gray-700 font-Roboto">
              {data.discountPrice} $
            </h5>
          </div>
          <span className="pr-3 font-normal text-lg text-[#44a55e]">
            {data.sold_out}
          </span>
        </div>
        <CountDown data={data} />

        <div className="flex items-center space-x-5">
          <Link to={`/product/${data._id}?isEvent=true`}>
            <div className={`${styles.button} text-white`}>See Detailes</div>
          </Link>

          <div
            className={`${styles.button} text-white`}
            onClick={(e) => addToCartHandler(data)}
          >
            Add to Cart
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
