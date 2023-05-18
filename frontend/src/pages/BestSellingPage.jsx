import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import { productData } from "../static/data";
import Footer from "../components/Layout/Footer";

function BestSellingPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const d =
      productData && productData.sort((a, b) => b.total_sell - a.total_sell);
    setData(d);
  }, []);
  
  return (
    <div>
      <Header activeHeading={2} />{" "}
      <div className={`${styles.section} mt-12`}>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-6 xl:grid-cols-5 xl:gap-6 mb-12 border-0">
          {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
        {data && data.length == 0 && (
          <h1 className="text-center w-full capitalize pb-24 text-lg">
            No Products found
          </h1>
        )}
      </div>

      <Footer />
    </div>

    
  );
}

export default BestSellingPage;
