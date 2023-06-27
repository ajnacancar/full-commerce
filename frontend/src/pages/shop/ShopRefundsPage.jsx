import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSidebar from '../../components/Shop/Layout/DashboardSidebar'
import AllShopRefundOrders from "../../components/Shop/AllShopRefundOrders.jsx"

function ShopRefundsPage() {
  return (
    <div>
    <DashboardHeader />
    <div className="flex justify-between w-full">
      <div className="800px:w-[330px] w-[80px]">
        <DashboardSidebar active={10} />
      </div>
      <div className="w-full flex justify-center">
        <AllShopRefundOrders />
      </div>
    </div>
  </div>
  )
}

export default ShopRefundsPage