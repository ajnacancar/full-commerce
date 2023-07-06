import React, { useState } from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar";
import CreateProduct from "../../components/Shop/CreateProduct.jsx";

function ShopCreateProductPage() {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="800px:w-[330px] w-[80px]">
          <DashboardSidebar active={4} />
        </div>
        <div className="w-full flex justify-center">
          <CreateProduct />
        </div>
      </div>
    </div>
  );
}

export default ShopCreateProductPage;
