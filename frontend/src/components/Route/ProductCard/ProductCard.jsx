import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import { backend_url } from "../../../server";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { toast } from "react-toastify";
import { addToCart } from "../../../redux/actions/cart";
import Ratings from "../../Products/Ratings";

function ProductCard({ data }) {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const d = data.name;

  const removeFromwishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (data) => {
    const isItemExist = cart && cart.find((i) => i._id === data._id);

    if (isItemExist) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock is limited");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart!");
      }
    }
  };

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);
  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>

        <Link to={`/product/${data._id}`}>
          <img
            src={`${backend_url}/${data.images && data.images[0]}`}
            alt="image"
            className="w-full h-[170px] object-contain"
          />
        </Link>

        <Link to={`/shop/preview/${data?.shop._id}`}>
          <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
        </Link>

        <Link to={`/product/${data._id}`}>
          <h4 className="pb-3 font-bold">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>

          <div className="flex">
            <Ratings rating={data.ratings} />
          </div>

          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice}`}>
                {data.originalPrice === 0
                  ? data.originalPrice
                  : data.discountPrice}
                $
              </h5>

              <h4 className={`${styles.price}`}>
                {data.originalPrice ? data.originalPrice + " $" : null}
              </h4>
            </div>

            <span className="font-normal text-base text-[#68d284]">
              {data.sold_out} sold
            </span>
          </div>
        </Link>
        {/* side options */}

        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => removeFromwishlistHandler(data)}
              color="red"
              title="Remove from Wishlist "
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => addToWishlistHandler(data)}
              color="#333"
              title="Add to a Wishlist"
            />
          )}

          <AiOutlineEye
            size={22}
            onClick={() => setOpen(!open)}
            className="cursor-pointer absolute right-2 top-14"
            color="#333"
            title="Quick view"
          />

          <AiOutlineShoppingCart
            size={22}
            onClick={() => addToCartHandler(data)}
            className="cursor-pointer absolute right-2 top-24"
            color="#444"
            title="Add to Cart"
          />

          {open ? (
            <ProductDetailsCard open={open} setOpen={setOpen} data={data} />
          ) : null}
        </div>
      </div>
    </>
  );
}

export default ProductCard;
