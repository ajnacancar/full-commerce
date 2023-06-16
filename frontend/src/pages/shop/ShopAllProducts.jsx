import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSidebar from '../../components/Shop/Layout/DashboardSidebar'
import AllProducts from "../../components/Shop/AllProducts.jsx"

function ShopAllProducts() {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="800px:w-[330px] w-[80px]">
          <DashboardSidebar active={3} />
        </div>
        <div className="w-full flex justify-center">
            <AllProducts />
        </div>
      </div>
    </div>
  )
}

export default ShopAllProducts