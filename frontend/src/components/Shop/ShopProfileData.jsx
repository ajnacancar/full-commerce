import React, { useEffect, useState } from "react";
import { productData } from "../../static/data";
import ProductCard from "../../components/Route/ProductCard/ProductCard";
import { Link, useParams } from "react-router-dom";
import styles from "../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { loadEventsForShop } from "../../redux/actions/event";
import { loadProductsForShop } from "../../redux/actions/product";
import { backend_url } from "../../server";
import Ratings from "../Products/Ratings.jsx";

function ShopProfileData({ isOwner }) {
  const [active, setActive] = useState(1);

  const { products } = useSelector((state) => state.product);
  const { events } = useSelector((state) => state.event);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProductsForShop(id));
    dispatch(loadEventsForShop(id));
  }, [dispatch]);

  const allReviews =
    products && products.map((product) => product.reviews).flat();

  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center space-x-6 w-full">
          <div className="flex items-center">
            <h4
              className={`font-semibold text-xl cursor-pointer ${
                active == 1 ? "text-red-700" : null
              }`}
              onClick={() => setActive(1)}
            >
              Shop Products
            </h4>
          </div>

          <div className="flex items-center">
            <h4
              className={`font-semibold text-xl cursor-pointer ${
                active == 2 ? "text-red-700" : null
              }`}
              onClick={() => setActive(2)}
            >
              Running Events
            </h4>
          </div>

          <div className="flex items-center">
            <h4
              className={`font-semibold text-xl cursor-pointer ${
                active == 3 ? "text-red-700" : null
              }`}
              onClick={() => setActive(3)}
            >
              Shop reviews
            </h4>
          </div>
        </div>

        <div>
          {isOwner ? (
            <div>
              <Link to="/dashboard">
                <div className={`${styles.button} !rounded h-11 text-white`}>
                  <span>Go to Dashboard</span>
                </div>
              </Link>
            </div>
          ) : null}
        </div>
      </div>

      {active == 1 && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4 xl:gap-5 my-12 border-0">
          {products &&
            products.map((i, index) => (
              <ProductCard data={i} isShop={true} key={index} />
            ))}
        </div>
      )}

      {active === 2 && (
        <div className="w-full">
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
            {events &&
              events.map((i, index) => (
                <ProductCard
                  data={i}
                  key={index}
                  isShop={true}
                  isEvent={true}
                />
              ))}
          </div>
          {events && events.length === 0 && (
            <h5 className="w-full text-center py-5 text-[18px]">
              No Events have for this shop!
            </h5>
          )}
        </div>
      )}

      {active === 3 && (
        <div className="w-full">
          {allReviews &&
            allReviews.map((item, index) => (
              <div className="w-full flex my-4">
                <img
                  src={`${backend_url}/${item.user.avatar}`}
                  className="w-[50px] h-[50px] rounded-full"
                  alt=""
                />
                <div className="pl-2">
                  <div className="flex w-full items-center">
                    <h1 className="font-[600] pr-2">{item.user.name}</h1>
                    <Ratings rating={item.rating} />
                  </div>
                  <p className="font-[400] text-[#000000a7]">{item?.comment}</p>
                  <p className="text-[#000000a7] text-[14px]">{"2days ago"}</p>
                </div>
              </div>
            ))}
          {allReviews && allReviews.length === 0 && (
            <h5 className="w-full text-center py-5 text-[18px]">
              No Reviews have for this shop!
            </h5>
          )}
        </div>
      )}
    </div>
  );
}

export default ShopProfileData;
