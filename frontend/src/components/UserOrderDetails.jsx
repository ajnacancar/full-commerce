import React, { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadAllOrdersForUser } from "../redux/actions/order";
import {
  ORDER_STATUS_DELIVERED,
  ORDER_STATUS_PROCESSING_REFUND,
  backend_url,
  server,
} from "../server";
import styles from "../styles/styles";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";

function UserOrderDetails() {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");

  const reviewHandler = async () => {
    await axios
      .put(
        `${server}/product/create-new-review`,
        {
          productId: selectedItem._id,
          rating,
          comment,
          orderId: id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        dispatch(loadAllOrdersForUser(user._id));
        setOpen(false);
        setComment("");
        setRating(0);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const refundHandler = async () => {
    await axios
      .put(
        `${server}/order/order-refund/${id}`,
        { status: ORDER_STATUS_PROCESSING_REFUND },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        dispatch(loadAllOrdersForUser(user._id));
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  useEffect(() => {
    if (user) {
      dispatch(loadAllOrdersForUser(user._id));
    }
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id == id);

  return (
    <>
      {data && (
        <div className={`py-4 min-h-screen ${styles.section}`}>
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center space-x-5">
              <BsFillBagFill size={30} color="crimson" />
              <h1>Order Details</h1>
            </div>
          </div>
          <div className="w-full flex items-center justify-between pt-6">
            <h5 className="text-gray-400">
              Order ID: <span># {data._id.slice(0, 8)}</span>
            </h5>
            <h5 className="text-gray-400">
              Placed on: <span>{data.createdAt?.slice(0, 10)}</span>
            </h5>
          </div>

          {/* order items */}
          {data &&
            data.cart &&
            data.cart.map((item) => (
              <div className="w-full flex items-start mb-5">
                <img
                  src={`${backend_url}/${item.images[0]}`}
                  className="w-20 h-20"
                  alt=""
                />
                <div className="w-full">
                  <div className="pl-3 text-xl">{item.name}</div>
                  <div className="pl-3 text-xl text-gray-400">
                    US$ {item.discountPrice} x {item.qty}
                  </div>
                </div>
                {!item.isReviewed && data?.status === ORDER_STATUS_DELIVERED ?  <div
                className={`${styles.button} text-white`}
                onClick={() => setOpen(true) || setSelectedItem(item)}
              >
                Write a review
              </div> : (
             null
            )}
              </div>
            ))}

          {/*review popup  */}
          {open && (
            <div className="w-full fixed top-0 left-0 h-screen bg-[#0005] z-50 flex items-center justify-center">
              <div className="w-[50%] h-min bg-white shadow rounded-md p-3">
                <div className="w-full flex justify-end p-3">
                  <RxCross1
                    size={30}
                    onClick={() => setOpen(false)}
                    className="cursor-pointer"
                  />
                </div>

                <h2 className="text-3xl font-bold font-Poppins text-center">
                  Give a Review
                </h2>

                <div className="w-full flex mt-2">
                  <img
                    src={`${backend_url}/${selectedItem?.images[0]}`}
                    className="w-20 h-20"
                    alt=""
                  />
                  <div>
                    <div className="pl-3 text-xl">{selectedItem.name}</div>
                    <h4 className="pl-3 text-xl">
                      US$ {selectedItem.discountPrice} x {selectedItem.qty}
                    </h4>
                  </div>
                </div>
                {/* ratings */}
                <h5 className="pl-3 text-xl font-bold mt-5">
                  Give a rating <span className="text-red-500">*</span>{" "}
                </h5>
                <div className="flex w-full ml-2 pt-1">
                  {[1, 2, 3, 4, 5].map((i) =>
                    rating >= i ? (
                      <AiFillStar
                        key={i}
                        className="mr-1 cursor-pointer"
                        color="rgb(246,186,0"
                        onClick={() => setRating(i)}
                        size={25}
                      />
                    ) : (
                      <AiOutlineStar
                        size={25}
                        key={i}
                        className="mr-1 cursor-pointer"
                        color="rgb(246,186,0"
                        onClick={() => setRating(i)}
                      />
                    )
                  )}
                </div>

                <div className="w-full ml-2 mt-5">
                  <label htmlFor="" className="block text-xl font-bold">
                    Write a comment{" "}
                    <span className="font-normal text-base text-gray-400">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    onChange={(e) => setComment(e.target.value)}
                    name="comment"
                    id=""
                    cols="20"
                    rows="5"
                    placeholder="How was your product? Write yout rxpression about it!"
                    className="mt-2 w-[95%] border p-2 outline-none "
                  ></textarea>
                </div>

                <div
                  className={`${styles.button} text-white text-xl ml-3`}
                  onClick={reviewHandler}
                >
                  Submit
                </div>
              </div>
            </div>
          )}

          <div className="border-t w-full text-right">
            <h5 className="pt-3 text-lg">
              Total price: <strong>US$ {data.totalPrice}</strong>
            </h5>
          </div>

          <div className="w-full 800px: flex items-center">
            <div className="w-full 800px:w-[60%]">
              <h4 className="pt-3 text-xl font-medium">Shipping address:</h4>
              <h4 className="pt-3 text-xl">
                {data?.shippingAddress.address1 +
                  " " +
                  data.shippingAddress.address2}
              </h4>

              <h4 className="text-xl ">{data.shippingAddress.country}</h4>
              <h4 className="text-xl ">{data.shippingAddress.city}</h4>
              <h4 className="text-xl ">{data.user.phoneNumber}</h4>
            </div>

            <div className="w-full 800px:w-[40%]">
              <h4 className="pt-4 text-xl">Payment info:</h4>
              <h4>
                Status:{" "}
                {data.paymentInfo.status ? data.paymentInfo.status : "Not Paid"}
              </h4>
              {data.status == ORDER_STATUS_DELIVERED && (
                <div
                  onClick={refundHandler}
                  className={`${styles.button} text-white mt-2`}
                >
                  Give a Refund
                </div>
              )}
            </div>
          </div>

          <Link to={`/inbox`}>
            <div className={`${styles.button} text-white`}>Send Message</div>
          </Link>
        </div>
      )}
    </>
  );
}

export default UserOrderDetails;
