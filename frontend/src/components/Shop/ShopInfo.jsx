import React from "react";
import { useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import styles from "../../styles/styles";
import axios from "axios";
import { toast } from "react-toastify";

function ShopInfo({ isOwner }) {
  const { loading, shop } = useSelector((state) => state.shop);

  const logouthandler = async () => {
    await axios
      .get(`${server}/shop/logout-shop`, { withCredentials: true })
      .then(() => {
        window.location.reload(true);
      });
  };

  return (
    <>
      <div className="w-full py-5">
        <div className="w-full flex items-center justify-center">
          <img src={`${backend_url}/${shop.avatar}`} className="w-36 h-fit" />
        </div>

        <h3 className="text-center py-2 text-xl">{shop.name}</h3>
        <p className="text-base text-black p-3 flex items-center">
          {shop.description}
        </p>
      </div>

      <div className="p-3">
        <h5 className="font-semibold">Address</h5>
        <h4 className="text-black">{shop.address}</h4>
      </div>

      <div className="p-3">
        <h5 className="font-semibold">Phone Number</h5>
        <h4 className="text-black">{shop.phoneNumber}</h4>
      </div>

      <div className="p-3">
        <h5 className="font-semibold">Total Products</h5>
        <h4 className="text-black">10</h4>
      </div>

      <div className="p-3">
        <h5 className="font-semibold">Shop Rating</h5>
        <h4 className="text-black">4/5</h4>
      </div>

      <div className="p-3">
        <h5 className="font-semibold">Joined On</h5>
        <h4 className="text-black">{shop.createdAt.slice(0, 10)}</h4>
      </div>

      {isOwner && (
        <div className="py-3 px-4">
          <div className={`${styles.button} w-full h-11 rounded`}>
            <span className="text-white">Edit Shop</span>
          </div>

          <div
            onClick={logouthandler}
            className={`${styles.button} w-full h-11 rounded`}
          >
            <span className="text-white">Logout</span>
          </div>
        </div>
      )}
    </>
  );
}

export default ShopInfo;
