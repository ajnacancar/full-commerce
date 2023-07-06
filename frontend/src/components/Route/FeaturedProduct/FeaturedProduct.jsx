import React, { useState } from "react";
import styles from "../../../styles/styles";
import { productData } from "../../../static/data";
import ProductCard from "../ProductCard/ProductCard";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { server } from "../../../server";

function FeaturedProduct() {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const getFeaturedProducts = async () => {
      await axios
        .get(`${server}/product/featured-products`)
        .then((res) => {
          console.log(res.data)
          setData(res.data.products.slice(0,10));
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getFeaturedProducts();
  }, [dispatch]);

  return (
    <div>
      {data && (
        <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
            <h1>Featured Products</h1>
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

export default FeaturedProduct;
