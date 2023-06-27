import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSidebar from '../../components/Shop/Layout/DashboardSidebar'
import DashboardMessages from "../../components/Shop/DashboardMessages.jsx"

function ShopInboxPage() {
  return (
    <div>
    <DashboardHeader />
    <div className="flex items-center justify-between w-full">
      <div className="800px:w-[330px] w-[80px]">
        <DashboardSidebar active={8} />
      </div>
      <div className="w-full flex justify-center">
        <DashboardMessages />
      </div>
    </div>
  </div>
  )
}

export default ShopInboxPage