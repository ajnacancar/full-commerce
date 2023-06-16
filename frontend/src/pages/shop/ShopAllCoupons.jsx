import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSidebar from '../../components/Shop/Layout/DashboardSidebar'
import AllCouponsCode from "../../components/Shop/AllCouponsCode.jsx"

function ShopAllCoupons() {
  return (
    <div>
    <DashboardHeader />
    <div className="flex justify-between w-full">
      <div className="800px:w-[330px] w-[80px]">
        <DashboardSidebar active={9} />
      </div>
      <div className="w-full flex justify-center">
          <AllCouponsCode />
      </div>
    </div>
  </div>
  )
}

export default ShopAllCoupons