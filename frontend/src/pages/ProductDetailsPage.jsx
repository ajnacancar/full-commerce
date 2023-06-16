import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import ProductDetails from "../components/Products/ProductDetails";
import { useParams, useSearchParams } from "react-router-dom";
import { productData } from "../static/data";
import SuggestedProduct from "../components/Products/SuggestedProduct";
import { useSelector } from "react-redux";

function ProductDetailsPage() {
  const { id } = useParams();
  const { allProducts } = useSelector((state) => state.product);
  const { allEvents } = useSelector((state) => state.event);
  const [searchParams] = useSearchParams();
  const isEvent = searchParams.get("isEvent");

  const [data, setData] = useState(null);

  useEffect(() => {
    if (isEvent) {
      const data = allEvents.find((p) => p._id == id);
      setData(data);
    } else {
      const data = allProducts.find((p) => p._id == id);
      setData(data);
    }
  }, []);
  return (
    <div>
      <Header />

      {data && <ProductDetails data={data} />}

      {!isEvent && data && <SuggestedProduct data={data} />}

      <Footer />
    </div>
  );
}

export default ProductDetailsPage;
