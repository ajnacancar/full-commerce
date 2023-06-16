import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import {
  LoginPage,
  SignUpPage,
  ActivationPage,
  HomePage,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  ProductDetailsPage,
  ProfilePage,
  CheckoutPage,
  ShopCreatePage,
  SellerActivationPage,
  LoginShopPage,
  OrderSuccessPage,
  UserOrderDetailsPage,
  UserTrackOrderPage
} from "./routes/Routes.js";
import {
  ShopHomePage,
  ShopDashboardPage,
  ShopCreateProductPage,
  ShopAllProducts,
  ShopCreateEventPage,
  ShopAllEventsPage,
  ShopAllCoupons,
  ShopPreviewPage,
  PaymentPage,
  AllShopOrdersPage,
  ShopOrderDetailsPage,
} from "./routes/ShopRoutes.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import Store from "./redux/store.js";
import { loadUser } from "./redux/actions/user.js";
import { loadShop } from "./redux/actions/shop.js";
import { useSelector } from "react-redux";
import ProtectedRoute from "./protected_routes/ProtectedRoute.js";
import { getAllProducts } from "./redux/actions/product.js";
import { getAllEvents } from "./redux/actions/event.js";
import axios from "axios";
import { server } from "./server.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const {
    isAuthenticatedShop,
    shop,
    loading: isSellerloading,
  } = useSelector((state) => state.shop);

  async function getStripeKey() {
    const { data } = await axios.get(`${server}/payment/stripe-api-key`);

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadShop());
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());
    getStripeKey();
  }, []);

  return (
    <>
      {loading || isSellerloading ? null : (
        <BrowserRouter>
          {stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <Routes>
                <Route
                  path="/payment"
                  element={
                    <ProtectedRoute
                      isLoading={loading}
                      redirectTo="login"
                      isAuthenticated={isAuthenticated}
                      children={<PaymentPage />}
                    />
                  }
                />
              </Routes>
            </Elements>
          )}
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/login-shop" element={<LoginShopPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route
              path="/activation/:activationToken"
              element={<ActivationPage />}
            />

            <Route
              path="/seller/activation/:activationToken"
              element={<SellerActivationPage />}
            />

            <Route path="/" element={<HomePage />} />

            <Route path="/products" element={<ProductsPage />} />
            <Route path="/best-selling" element={<BestSellingPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  isLoading={loading}
                  redirectTo="login"
                  isAuthenticated={isAuthenticated}
                  children={<ProfilePage />}
                />
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute
                  isLoading={loading}
                  redirectTo="login"
                  isAuthenticated={isAuthenticated}
                  children={<CheckoutPage />}
                />
              }
            />

            <Route
              path="/shop/:id"
              element={
                <ProtectedRoute
                  isLoading={isSellerloading}
                  redirectTo="login-shop"
                  isAuthenticated={isAuthenticatedShop}
                  children={<ShopHomePage />}
                />
              }
            />

            <Route
              path="/dashboard/cupons"
              element={
                <ProtectedRoute
                  isLoading={isSellerloading}
                  redirectTo="login-shop"
                  isAuthenticated={isAuthenticatedShop}
                  children={<ShopAllCoupons />}
                />
              }
            />

            <Route
              path="/dashboard/products"
              element={
                <ProtectedRoute
                  isLoading={isSellerloading}
                  redirectTo="login-shop"
                  isAuthenticated={isAuthenticatedShop}
                  children={<ShopAllProducts />}
                />
              }
            />

            <Route
              path="/dashboard/events"
              element={
                <ProtectedRoute
                  isLoading={isSellerloading}
                  redirectTo="login-shop"
                  isAuthenticated={isAuthenticatedShop}
                  children={<ShopAllEventsPage />}
                />
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute
                  isLoading={isSellerloading}
                  redirectTo="login-shop"
                  isAuthenticated={isAuthenticatedShop}
                  children={<ShopDashboardPage />}
                />
              }
            />

            <Route
              path="/dashboard/create-product"
              element={
                <ProtectedRoute
                  isLoading={isSellerloading}
                  redirectTo="login-shop"
                  isAuthenticated={isAuthenticatedShop}
                  children={<ShopCreateProductPage />}
                />
              }
            />

            <Route
              path="/dashboard/create-event"
              element={
                <ProtectedRoute
                  isLoading={isSellerloading}
                  redirectTo="login-shop"
                  isAuthenticated={isAuthenticatedShop}
                  children={<ShopCreateEventPage />}
                />
              }
            />
            <Route
              path="/dashboard/orders"
              element={
                <ProtectedRoute
                  isLoading={isSellerloading}
                  redirectTo="login-shop"
                  isAuthenticated={isAuthenticatedShop}
                  children={<AllShopOrdersPage />}
                />
              }
            />

            <Route
              path="/order/:id"
              element={
                <ProtectedRoute
                  isLoading={isSellerloading}
                  redirectTo="login-shop"
                  isAuthenticated={isAuthenticatedShop}
                  children={<ShopOrderDetailsPage />}
                />
              }
            />

            <Route
              path="/user/order/:id"
              element={
                <ProtectedRoute
                  isLoading={isSellerloading}
                  redirectTo="login-shop"
                  isAuthenticated={isAuthenticatedShop}
                  children={<UserOrderDetailsPage />}
                />
              }
            />

            <Route
              path="/user/track/order/:id"
              element={
                <ProtectedRoute
                  isLoading={isSellerloading}
                  redirectTo="login-shop"
                  isAuthenticated={isAuthenticatedShop}
                  children={<UserTrackOrderPage />}
                />
              }
            />
            <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
            <Route path="/shop-create" element={<ShopCreatePage />} />
            <Route path="/order/success" element={<OrderSuccessPage />} />
          </Routes>

          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
