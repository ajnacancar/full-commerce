import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import Footer from "../../components/Layout/Footer";
import OrderDetailes from "../../components/Shop/OrderDetailes.jsx"

function ShopOrderDetailsPage() {
  return (
    <div>
      <DashboardHeader />
      <OrderDetailes />
      <Footer />
    </div>
  );
}

export default ShopOrderDetailsPage;
