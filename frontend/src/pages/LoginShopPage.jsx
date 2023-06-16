import React, { useEffect } from "react";
import ShopLogin from "../components/Shop/ShopLogin";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function LoginShopPage() {
  const { isAuthenticatedShop, shop } = useSelector((state) => state.shop);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticatedShop === true && shop) {
      navigate(`/dashboard`);
    }
  }, []);
  return (
    <div>
      <ShopLogin />
    </div>
  );
}

export default LoginShopPage;
