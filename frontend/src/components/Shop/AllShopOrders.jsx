import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Layout/Loader";
import { DataGrid } from "@material-ui/data-grid";
import { loadAllOrdersForShop } from "../../redux/actions/order";
import { columns_table_order_shop } from "../../static/static_data";

function AllShopOrders() {
  const { shop } = useSelector((state) => state.shop);
  const { shopOrders, isLoading } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  useEffect(() => {
    if (shop) {
      dispatch(loadAllOrdersForShop(shop._id));
    }
  }, [dispatch]);

  const row = [];

  shopOrders &&
    shopOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: `US$ ${item.totalPrice}`,
        status: item.status,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 mt-10 bg-white">
          <DataGrid
            rows={row}
            columns={columns_table_order_shop}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
}

export default AllShopOrders;
