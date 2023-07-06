import React, { useEffect, useState } from "react";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";
import { useDispatch } from "react-redux";
import { server } from "../../../server";
import axios from "axios";

function BestDeals() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getBestDealsProducts = async () => {
      await axios
        .get(`${server}/product/best-deals-products`)
        .then((res) => {
          setData(res.data.products);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getBestDealsProducts();
  }, [dispatch]);

  return (
    <div>
      {data && (
        <div className={`${styles.section} `}>
          <div className={`${styles.heading}`}>
            <h1>Best Deals</h1>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-6 xl:grid-cols-5 xl:gap-6 mb-12 border-0">
            {data.map((i, index) => (
              <ProductCard data={i} key={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BestDeals;
