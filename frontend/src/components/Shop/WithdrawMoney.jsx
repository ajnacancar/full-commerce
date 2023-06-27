import React, { useEffect, useState } from "react";
import { loadAllOrdersForShop } from "../../redux/actions/order";
import { useDispatch, useSelector } from "react-redux";
import { ORDER_STATUS_DELIVERED } from "../../server";
import styles from "../../styles/styles";

function WithdrawMoney() {
  const { shopOrders } = useSelector((state) => state.order);
  const { shop } = useSelector((state) => state.shop);
  const [deliveredOrder, setDeliveredOrder] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllOrdersForShop(shop._id));

    const orderData =
      shopOrders &&
      shopOrders.filter((item) => item.status === ORDER_STATUS_DELIVERED);
    setDeliveredOrder(orderData);
  }, [dispatch]);

  const totalEarningWithoutTax =
    deliveredOrder &&
    deliveredOrder.reduce((acc, item) => acc + item.totalPrice, 0);
  const serviceCharge = totalEarningWithoutTax * 0.1;
  const availableBalance = totalEarningWithoutTax - serviceCharge.toFixed(2);
  return (
    <div className="w-full h-[90vh] p-8">
      <div className="w-full bg-white h-full rounded flex items-center justify-center flex-col">
        <h5 className="text-xl mb-4">Available Balance: {availableBalance}</h5>

        <div className={`${styles.button} text-white !h-11 !rounded`}>Withdraw</div>
      </div>
    </div>
  );
}

export default WithdrawMoney;
