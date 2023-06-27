import React, { useEffect, useState } from "react";
import { AiOutlineMoneyCollect } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { MdBorderClear } from "react-icons/md";
import { BiBox } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { loadAllOrdersForShop } from "../../redux/actions/order";
import { loadProductsForShop } from "../../redux/actions/product";
import { ORDER_STATUS_DELIVERED } from "../../server";
import { DataGrid } from "@material-ui/data-grid";
import { columns_table_order_shop } from "../../static/static_data";
function DashboardHero() {
  const { shop } = useSelector((state) => state.shop);
  const { shopOrders } = useSelector((state) => state.order);
  const { products } = useSelector((state) => state.product);
  const [deliveredOrder, setDeliveredOrder] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllOrdersForShop(shop._id));
    dispatch(loadProductsForShop(shop._id));

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
    <div className="w-full p-8">
      <h3 className="text-xl font-Poppins">Overview</h3>
      <div className="w-full block 800px:flex items-center justify-between">
        <div className="w-full 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect size={30} fill="#0000085" className="mr-2" />

            <h3
              className={`${styles.productTitle} !text-lg leading-5 !font-normal text-[#00000085]`}
            >
              Account Balance{" "}
              <span className="text-base">(with 10% service charge)</span>
            </h3>
          </div>
          <h5 className="pt-2 pl-9 text-xl font-medium">${availableBalance}</h5>
          <Link to="/dashboard/withdraw-money">
            <h5 className="pt-4 pl-2 text-blue-400">Withdraw Money</h5>
          </Link>
        </div>

        <div className="w-full 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <MdBorderClear size={30} fill="#0000085" className="mr-2" />

            <h3
              className={`${styles.productTitle} !text-lg leading-5 !font-normal text-[#00000085]`}
            >
              All Orders
            </h3>
          </div>
          <h5 className="pt-2 pl-9 text-xl font-medium">
            {shopOrders && shopOrders.length}
          </h5>
          <Link to="/dashboard/orders">
            <h5 className="pt-4 pl-2 text-blue-400">View Orders</h5>
          </Link>
        </div>

        <div className="w-full 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <BiBox size={30} fill="#0000085" className="mr-2" />

            <h3
              className={`${styles.productTitle} !text-lg leading-5 !font-normal text-[#00000085]`}
            >
              All Products
            </h3>
          </div>
          <h5 className="pt-2 pl-9 text-xl font-medium">
            {products && products.length}
          </h5>
          <Link to="/dashboard/products">
            <h5 className="pt-4 pl-2 text-blue-400">View Products</h5>
          </Link>
        </div>
      </div>

      <h3 className="text-xl font-Poppins pb-2 mt-3">Latest Orders</h3>
      <div className="w-full min-h-[43vh] bg-white rounded">
        <DataGrid
          rows={row}
          columns={columns_table_order_shop}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </div>
  );
}

export default DashboardHero;
