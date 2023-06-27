import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadAllOrdersForShop } from "../../redux/actions/order";
import {
  ORDER_STATUS_DELIVERED,
  ORDER_STATUS_ON_THE_WAY,
  ORDER_STATUS_PROCESSING,
  ORDER_STATUS_PROCESSING_REFUND,
  ORDER_STATUS_RECIVED,
  ORDER_STATUS_REFUND_SUCCESS,
  ORDER_STATUS_SHIPPING,
  ORDER_STATUS_TRANSFER_TO_DELIVERY_PARTNET,
  backend_url,
  server,
} from "../../server";
import axios from "axios";
import { toast } from "react-toastify";

function OrderDetailes() {
  const { shopOrders, isLoading } = useSelector((state) => state.order);
  const { shop } = useSelector((state) => state.shop);
  const dispatch = useDispatch();

  const [status, setStatus] = useState("");
  const { id } = useParams();

  useEffect(() => {
    if (shop) {
      dispatch(loadAllOrdersForShop(shop._id));
    }
  }, [dispatch]);

  const data = shopOrders && shopOrders.find((item) => item._id == id);

  const orderStatusUpdateHandler = async () => {
    await axios
      .put(
        `${server}/order/upadte-order-status/${id}`,
        { status },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Updated status!");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const refundOrderUpdateHandler = async () => {
    await axios
      .put(
        `${server}/order//order-refund-success/${id}`,
        { status },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Updated status!");
        dispatch(loadAllOrdersForShop(shop._id));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <>
      {data && (
        <div className={`py-4 min-h-screen ${styles.section}`}>
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center space-x-5">
              <BsFillBagFill size={30} color="crimson" />
              <h1>Order Details</h1>
            </div>
            <Link to="/dashboard/orders">
              <div
                className={`${styles.button} !rounded text-white font-semibold h-11 text-lg`}
              >
                Order List
              </div>
            </Link>
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
              </div>
            ))}

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
              <h4>Status: {data.paymentInfo.status}</h4>
            </div>
          </div>

          <h4 className="pt-3 text-xl font-semibold">Order Status: </h4>
          {data &&
            data.status !== ORDER_STATUS_PROCESSING_REFUND &&
            data.status !== ORDER_STATUS_REFUND_SUCCESS && (
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
              >
                {[
                  ORDER_STATUS_PROCESSING,
                  ORDER_STATUS_TRANSFER_TO_DELIVERY_PARTNET,
                  ORDER_STATUS_SHIPPING,
                  ORDER_STATUS_RECIVED,
                  ORDER_STATUS_ON_THE_WAY,
                  ORDER_STATUS_DELIVERED,
                ]
                  .slice(
                    [
                      ORDER_STATUS_PROCESSING,
                      ORDER_STATUS_TRANSFER_TO_DELIVERY_PARTNET,
                      ORDER_STATUS_SHIPPING,
                      ORDER_STATUS_RECIVED,
                      ORDER_STATUS_ON_THE_WAY,
                      ORDER_STATUS_DELIVERED,
                    ].indexOf(data?.status)
                  )
                  .map((option, index) => (
                    <option value={option} key={index}>
                      {option}
                    </option>
                  ))}
              </select>
            )}

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
          >
            {[ORDER_STATUS_PROCESSING_REFUND, ORDER_STATUS_REFUND_SUCCESS]
              .slice(
                [
                  ORDER_STATUS_PROCESSING_REFUND,
                  ORDER_STATUS_REFUND_SUCCESS,
                ].indexOf(data?.status)
              )
              .map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
          </select>

          <div
            className={`${styles.button} mt-5 !rounded text-white font-semibold h-11 text-lg`}
            onClick={
              data.status !== ORDER_STATUS_PROCESSING_REFUND
                ? orderStatusUpdateHandler
                : refundOrderUpdateHandler
            }
          >
            Update status
          </div>
        </div>
      )}
    </>
  );
}

export default OrderDetailes;
