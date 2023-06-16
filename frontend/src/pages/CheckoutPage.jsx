import React from "react";
import Header from "../components/Layout/Header";
import CheckoutSteps from "../components/Checkout/CheckoutSteps";
import Checkout from "../components/Checkout/Checkout";

function CheckoutPage() {
  return (
    <div>
      <Header />
      <CheckoutSteps active={1} />

      <Checkout />
    </div>
  );
}

export default CheckoutPage;
