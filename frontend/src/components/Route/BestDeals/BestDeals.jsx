import React, { useEffect, useState } from "react";
import { productData } from "../../../static/data";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard"

function BestDeals() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const d =
      productData && productData.sort((a, b) => b.total_sell - a.total_sell);
    const firstfive = d.slice(0, 5);
    setData(firstfive);
  }, []);

  return <div>
    <div className={`${styles.section} `}>
        <div className={`${styles.heading}`}>
            <h1>Best Deals</h1>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-6 xl:grid-cols-5 xl:gap-6 mb-12 border-0">
            {data && data.map((i, index) => (
                <ProductCard data={i} key={index} />
            ))}
        </div>
    </div>
  </div>;
}

export default BestDeals;
