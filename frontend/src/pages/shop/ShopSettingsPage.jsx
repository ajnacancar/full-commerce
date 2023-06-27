import React from 'react'
import ShopSettings from "../../components/Shop/ShopSettings.jsx"
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar"
function ShopSettingsPage() {
  return (
    <div>
    <DashboardHeader />
    <div className="flex justify-between w-full">
      <div className="800px:w-[330px] w-[80px]">
        <DashboardSidebar active={11} />
      </div>
      <div className="w-full flex justify-center">
          <ShopSettings />
      </div>
    </div>
  </div>
  )
}

export default ShopSettingsPage