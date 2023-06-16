import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSidebar from '../../components/Shop/Layout/DashboardSidebar'
import AllShopOrders from "../../components/Shop/AllShopOrders.jsx"

function AllShopOrdersPage() {
  return (
    <div>
    <DashboardHeader />
    <div className="flex justify-between w-full">
      <div className="800px:w-[330px] w-[80px]">
        <DashboardSidebar active={2} />
      </div>
      <div className="w-full flex justify-center">
        <AllShopOrders />
      </div>
    </div>
  </div>
  )
}

export default AllShopOrdersPage