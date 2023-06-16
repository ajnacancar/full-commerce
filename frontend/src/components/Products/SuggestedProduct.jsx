import React, { useEffect, useState } from "react";
import { productData } from "../../static/data";
import styles from "../../styles/styles";
import ProductCard from "../Route/ProductCard/ProductCard";
import { useSelector } from "react-redux";
import { all } from "axios";

function SuggestedProduct({ data }) {
  const { allProducts } = useSelector((state) => state.product);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const d = allProducts && allProducts.filter((i) => i.category === data.category);
    setProducts(d);
  }, []);

  return (
    <div>
      {data && (
        <div className={`${styles.section} p-4`}>
          <h2
            className={`${styles.heading} text-2xl font-medium border-b mb-5`}
          >
            Related Products
          </h2>

          <div className="grid grid-cols-1 gap-5 md:gap-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5 xl:gap-7 mb-12">
            {products &&
              products.map((i, index) => <ProductCard key={index} data={i} />)}
          </div>
        </div>
      )}
    </div>
  );
}

export default SuggestedProduct;
