import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import { useSearchParams } from "react-router-dom";
import { productData } from "../static/data";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import Footer from "../components/Layout/Footer";
import { useSelector } from "react-redux";

function ProductsPage() {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.product);

  useEffect(() => {
    if (categoryData == null) {
      const d =
      allProducts && allProducts.sort((a, b) => a.sold_out - b.sold_out);
      setData(d);
    } else {
      const d =
      allProducts && allProducts.filter((i) => i.category == categoryData);
      setData(d);
    }

    // window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header activeHeading={3} />
      <div className={`${styles.section}  mt-12`}>
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

export default ProductsPage;
