import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllOrdersForShop } from "../../redux/actions/order";
import { columns_table_order_shop } from "../../static/static_data";
import { DataGrid } from "@material-ui/data-grid";
import {
  ORDER_STATUS_PROCESSING_REFUND,
  ORDER_STATUS_REFUND_SUCCESS,
} from "../../server";

function AllShopRefundOrders() {
  const { shopOrders } = useSelector((state) => state.order);
  const { shop } = useSelector((state) => state.shop);
  const dispatch = useDispatch();
  const row = [];

  useEffect(() => {
    if (shop) {
      dispatch(loadAllOrdersForShop(shop._id));
    }
  }, [shop]);

  const refundOrders =
    shopOrders &&
    shopOrders.filter(
      (item) =>
        item.status === ORDER_STATUS_PROCESSING_REFUND &&
        item.status === ORDER_STATUS_REFUND_SUCCESS
   );

  refundOrders &&
    refundOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: `US$ ${item.totalPrice}`,
        status: item.status,
      });
    });

  return (
    <div className="w-full mx-8 mt-10 bg-white">
      <DataGrid
        rows={row}
        columns={columns_table_order_shop}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
}

export default AllShopRefundOrders;
