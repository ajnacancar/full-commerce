import React, { useState } from "react";
import { backend_url } from "../../server";
import { useSelector } from "react-redux";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { columns_table } from "../../static/static_data";
import { ordersData } from "../../static/data";

function ProfileContent({ active }) {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user ? user.name : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [password, setPassword] = useState("");

  const handleSubmit = () => {};

  return (
    <div className="w-full">
      {/* profile content */}
      {active == 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${backend_url}/${user?.avatar}`}
                className="w-36 h-36 rounded-full object-cover border-4 border-[#3ad132]"
                alt=""
              />
              <div className="w-7 h-7 bg-[#e3e9ee] rounded-full flex items-center justify-center cursor-pointer absolute bottom-1 right-1">
                <AiOutlineCamera />
              </div>
            </div>
          </div>

          <div className="w-full px-5 mt-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full 800px:flex block pb-3">
                <div className=" w-full 800px:w-[50%]">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className=" w-full 800px:w-[50%]">
                  <label className="block pb-2">Email Address</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3">
                <div className=" w-full 800px:w-[50%]">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Enter your password</label>
                  <input
                    type="password"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <input
                className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                required
                value="Update"
                type="submit"
              />
            </form>
          </div>
        </>
      )}

      {/* order cnotent */}
      {active == 2 && (
        <>
          <AllOrders />
        </>
      )}

      {/* refunds content */}
      {active == 3 && (
        <>
          <AllRefundOrders />
        </>
      )}

      {/* track orders content */}
      {active == 5 && (
        <>
          <TrackOrders />
        </>
      )}

      {/* address content */}
      {active == 6 && (
        <>
          <PaymentMethods />
        </>
      )}

      {/* payment methods content */}
      {active == 7 && (
        <>
          <Address />
        </>
      )}
    </div>
  );
}

const AllOrders = () => {
  const row = [];

  ordersData &&
    ordersData.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: `US$ ${item.totalPrice}`,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns_table}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const AllRefundOrders = () => {
  const row = [];

  ordersData &&
    ordersData.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: `US$ ${item.totalPrice}`,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns_table}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const TrackOrders = () => {
  const row = [];

  ordersData &&
    ordersData.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: `US$ ${item.totalPrice}`,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns_table}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const PaymentMethods = () => {
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold text-black pb-2">
          Payment Methods
        </h1>
        <div className={`${styles.button} !rounded-md`}>
          <span className="text-white">Add New</span>
        </div>
      </div>
      <div className="w-full bg-white h-16 rounded-md flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <img
            src="https://bonik-react.vercel.app/assets/images/payment-methods/Visa.svg"
            alt=""
          />
          <h5 className="pl-5 font-semibold">Ajna Cancar</h5>
        </div>

        <div className="pl-8 flex items-center">
          <h6>1234 **** *** ****</h6>
          <h5 className="pl-6">08/2022</h5>
        </div>

        <div className="min-w-[10%] flex items-center justify-between pl-8">
          <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

const Address = () => {
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold text-black pb-2">My Addresses</h1>
        <div className={`${styles.button} !rounded-md`}>
          <span className="text-white">Add New</span>
        </div>
      </div>
      <div className="w-full bg-white h-16 rounded-md flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <h5 className="pl-5 font-semibold">Default Address</h5>
        </div>

        <div className="pl-8 flex items-center">
          <h6>494 Erdman Passange, New Zoietown, Paraguay</h6>
        </div>
        <div className="pl-8 flex items-center">
          <h6>(213) 840-9416</h6>
        </div>

        <div className="min-w-[10%] flex items-center justify-between pl-8">
          <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
