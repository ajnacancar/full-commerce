import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSidebar from '../../components/Shop/Layout/DashboardSidebar'
import WithdrawMoney from "../../components/Shop/WithdrawMoney.jsx"
function ShopWithdrawMoneyPage() {
  return (
    <div>
    <DashboardHeader />
    <div className="flex justify-between w-full">
      <div className="800px:w-[330px] w-[80px]">
        <DashboardSidebar active={7} />
      </div>
      <div className="w-full flex justify-center">
        <WithdrawMoney />
      </div>
    </div>
  </div>
  )
}

export default ShopWithdrawMoneyPage