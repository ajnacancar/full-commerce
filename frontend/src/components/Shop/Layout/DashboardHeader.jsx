import React from "react";
import { AiOutlineGift } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";
import { backend_url, server } from "../../../server";

function DashboardHeader() {
  const { shop } = useSelector((state) => state.shop);
  return (
    <div className="w-full h-20 bg-white shadow sticky top-0 left-0 z-30 flex justify-between items-center px-4">
      <div>
        <Link to="/dashboard">
          <img
            src="https://shopo.quomodothemes.website/assets/images/logo.svg"
            alt=""
          />
        </Link>
      </div>

      <div className="flex items-center mr-4" >
        <Link to="/dashboard/cupons" className="800px:block hidden">
          <AiOutlineGift
            color="#555"
            size={30}
            className="mx-5 cursor-pointer"
          />
        </Link>

        <Link to="/dashboard/events" className="800px:block hidden">
          <MdOutlineLocalOffer
            color="#555"
            size={30}
            className="mx-5 cursor-pointer"
          />
        </Link>

        <Link to="/dashboard/orders" className="800px:block hidden">
          <FiShoppingBag
            color="#555"
            size={30}
            className="mx-5 cursor-pointer"
          />
        </Link>

        <Link to="/dashboard/products" className="800px:block hidden">
          <FiPackage color="#555" size={30} className="mx-5 cursor-pointer" />
        </Link>

        <Link to="/dashboard/messages" className="800px:block hidden">
          <BiMessageSquareDetail
            color="#555"
            size={30}
            className="mx-5 cursor-pointer"
          />
        </Link>

        <Link to={`/shop/${shop._id}`}>
          <img
            src={`${backend_url}/${shop.avatar}`}
            className="w-12 h-12 rounded-full object-cover"
          />
        </Link>
      </div>
    </div>
  );
}

export default DashboardHeader;
