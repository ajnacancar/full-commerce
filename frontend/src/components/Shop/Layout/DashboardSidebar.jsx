import React from "react";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { useSelector } from "react-redux";

function DashboardSidebar({ active }) {
  const {shop} = useSelector((state) => state.shop)
  return (
    <div className="h-[100vh] w-full bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {/* Single item */}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard" className="w-full flex items-center">
          <RxDashboard
            size={30}
            color={`${active == 1 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-lg font-normal ${
              active == 1 ? "text-[crimson]" : "text-gray-500"
            }`}
          >
            Dashboard
          </h5>
        </Link>
      </div>

      {/* Single item */}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard/orders" className="w-full flex items-center">
          <FiShoppingBag
            size={30}
            color={`${active == 2 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block  pl-2 text-lg font-normal ${
              active == 2 ? "text-[crimson]" : "text-gray-500"
            }`}
          >
            All Orders
          </h5>
        </Link>
      </div>

      {/* Single item */}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard/products" className="w-full flex items-center">
          <FiPackage size={30} color={`${active == 3 ? "crimson" : "#555"}`} />
          <h5
            className={`hidden 800px:block  pl-2 text-lg font-normal ${
              active == 3 ? "text-[crimson]" : "text-gray-500"
            }`}
          >
            All Products
          </h5>
        </Link>
      </div>

      {/* Single item */}
      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard/create-product"
          className="w-full flex items-center"
        >
          <AiOutlineFolderAdd
            size={30}
            color={`${active == 4 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block  pl-2 text-lg font-normal ${
              active == 4 ? "text-[crimson]" : "text-gray-500"
            }`}
          >
            Create Product
          </h5>
        </Link>
      </div>

      {/* Single item */}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard/events" className="w-full flex items-center">
          <MdOutlineLocalOffer
            size={30}
            color={`${active == 5 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block  pl-2 text-lg font-normal ${
              active == 5 ? "text-[crimson]" : "text-gray-500"
            }`}
          >
            All Events
          </h5>
        </Link>
      </div>

      {/* Single item */}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard/create-event" className="w-full flex items-center">
          <VscNewFile size={30} color={`${active == 6 ? "crimson" : "#555"}`} />
          <h5
            className={`hidden 800px:block  pl-2 text-lg font-normal ${
              active == 6 ? "text-[crimson]" : "text-gray-500"
            }`}
          >
            Create Event
          </h5>
        </Link>
      </div>

      {/* Single item */}
      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard/withdraw-money"
          className="w-full flex items-center"
        >
          <CiMoneyBill
            size={30}
            color={`${active == 7 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-lg font-normal ${
              active == 7 ? "text-[crimson]" : "text-gray-500"
            }`}
          >
            Withdraw Money
          </h5>
        </Link>
      </div>

      {/* Single item */}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard/messages" className="w-full flex items-center">
          <BiMessageSquareDetail
            size={30}
            color={`${active == 8 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-lg font-normal ${
              active == 8 ? "text-[crimson]" : "text-gray-500"
            }`}
          >
            Shop Inbox
          </h5>
        </Link>
      </div>

      {/* Single item */}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard/cupons" className="w-full flex items-center">
          <AiOutlineGift
            size={30}
            color={`${active == 9 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-lg font-normal ${
              active == 9 ? "text-[crimson]" : "text-gray-500"
            }`}
          >
            Discounts Codes
          </h5>
        </Link>
      </div>

      {/* Single item */}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard/refunds" className="w-full flex items-center">
          <HiOutlineReceiptRefund
            size={30}
            color={`${active == 10 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-lg font-normal ${
              active == 10 ? "text-[crimson]" : "text-gray-500"
            }`}
          >
            Refunds
          </h5>
        </Link>
      </div>

      {/* Single item */}
      <div className="w-full flex items-center p-4">
        <Link to={`/shop/${shop._id}/settings`} className="w-full flex items-center">
          <CiSettings
            size={30}
            color={`${active == 11 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-lg font-normal ${
              active == 11 ? "text-[crimson]" : "text-gray-500"
            }`}
          >
            Settings
          </h5>
        </Link>
      </div>
    </div>
  );
}

export default DashboardSidebar;
