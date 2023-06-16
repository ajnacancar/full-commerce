import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar";
import AllShopEvents from "../../components/Shop/AllShopEvents.jsx"

function ShopAllEventsPage() {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="800px:w-[330px] w-[80px]">
          <DashboardSidebar active={5} />
        </div>
        <div className="w-full flex justify-center">
          <AllShopEvents />
        </div>
      </div>
    </div>
  );
}

export default ShopAllEventsPage;
