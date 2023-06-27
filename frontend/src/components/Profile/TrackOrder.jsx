import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadAllOrdersForUser } from "../../redux/actions/order";
import {
  ORDER_STATUS_DELIVERED,
  ORDER_STATUS_ON_THE_WAY,
  ORDER_STATUS_PROCESSING,
  ORDER_STATUS_PROCESSING_REFUND,
  ORDER_STATUS_RECIVED,
  ORDER_STATUS_REFUND_SUCCESS,
  ORDER_STATUS_SHIPPING,
  ORDER_STATUS_TRANSFER_TO_DELIVERY_PARTNET,
} from "../../server";

function TrackOrder() {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllOrdersForUser(user._id));
  }, []);

  const data = orders && orders.find((item) => item._id === id);

  console.log(data);

  return (
    <div>
      {data && data.status === ORDER_STATUS_PROCESSING && (
        <div className="w-full h-[80vh] flex justify-center items-center">
          <h1 className="text-center text-xl ">
            Your order is processing in shop.
          </h1>
        </div>
      )}
      {data && data.status === ORDER_STATUS_TRANSFER_TO_DELIVERY_PARTNET && (
        <div className="w-full h-[80vh] flex justify-center items-center">
          <h1 className="text-center text-xl ">Your order is on the way.</h1>
        </div>
      )}

      {data && data.status === ORDER_STATUS_SHIPPING && (
        <div className="w-full h-[80vh] flex justify-center items-center">
          <h1 className="text-center text-xl ">
            Your order is coming with our delivery partner.
          </h1>
        </div>
      )}

      {data && data.status === ORDER_STATUS_RECIVED && (
        <div className="w-full h-[80vh] flex justify-center items-center">
          <h1 className="text-center text-xl ">
            Your order is in your city, our delivery man will deliver it.
          </h1>
        </div>
      )}

      {data && data.status === ORDER_STATUS_ON_THE_WAY && (
        <div className="w-full h-[80vh] flex justify-center items-center">
          <h1 className="text-center text-xl ">
            our delivery man going to deliver your order.
          </h1>
        </div>
      )}

      {data && data.status === ORDER_STATUS_DELIVERED && (
        <div className="w-full h-[80vh] flex justify-center items-center">
          <h1 className="text-center text-xl ">
            Your order is deliverd to you.
          </h1>
        </div>
      )}

      {data && data.status === ORDER_STATUS_PROCESSING_REFUND && (
        <div className="w-full h-[80vh] flex justify-center items-center">
          <h1 className="text-center text-xl ">Your refund is processing.</h1>
        </div>
      )}

      {data && data.status === ORDER_STATUS_REFUND_SUCCESS && (
        <div className="w-full h-[80vh] flex justify-center items-center">
          <h1 className="text-center text-xl ">Your refund is success!.</h1>
        </div>
      )}
    </div>
  );
}

export default TrackOrder;
