import { BrowserRouter, Routes, Route } from "react-router-dom";
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
  ShopCreatePage
} from "./Routes.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import Store from "./redux/store.js";
import { loadUser } from "./redux/actions/user.js";
import { useSelector } from "react-redux";
import ProtectedRoute from "./ProtectedRoute.js";

function App() {
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);

  return (
    <>
      {loading ? null : (
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route
              path="/activation/:activationToken"
              element={<ActivationPage />}
            />
            <Route path="/" element={<HomePage />} />

            <Route path="/products" element={<ProductsPage />} />
            <Route path="/best-selling" element={<BestSellingPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/product/:name" element={<ProductDetailsPage />} />
            <Route path="/profile" element={
              <ProtectedRoute isAuthenticated={isAuthenticated} children={<ProfilePage />} />
            } />
            <Route path="/checkout" element={
              <ProtectedRoute isAuthenticated={isAuthenticated} children={<CheckoutPage />} />
            } />

            <Route path="/shop-create" element={<ShopCreatePage />}  />
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
