import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { backend_url } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import { loadProductsForShop } from "../../redux/actions/product";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/actions/cart";
import Ratings from "./Ratings";

function ProductDetails({ data }) {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const handleMessageSubmit = () => {};

  const removeFromwishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExist = cart && cart.find((i) => i._id === id);

    if (isItemExist) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < count) {
        toast.error("Product stock is limited");
      } else {
        const cartData = { ...data, qty: count };
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
    <div className="bg-white pb-10">
      {data && (
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={`${backend_url}/${data.images[select]}`}
                  alt=""
                  className="w-[80%]"
                />
                <div className="w-full 800px:w-[50%]">
                  <div className="w-full flex">
                    <div
                      className={`${
                        select === 0 ? "border" : null
                      } cursor-default`}
                    >
                      <img
                        src={`${backend_url}/${data.images[0]}`}
                        alt=""
                        className="h-[200px] "
                        onClick={() => setSelect(0)}
                      />
                    </div>

                    <div
                      className={`${
                        select === 1 ? "border" : null
                      } cursor-default`}
                    >
                      <img
                        src={`${backend_url}/${data.images[1]}`}
                        alt=""
                        className="h-[200px] "
                        onClick={() => setSelect(1)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full 800px:w-[50%] pt-5">
                <h1 className={`${styles.productTitle} pt-5`}>{data.name}</h1>
                <p>{data.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discountPrice} $
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.originalPrice && data.originalPrice + " $"}
                  </h3>
                </div>
                <div
                  className={`${styles.noramalFlex} mt-12 justify-between pr-3`}
                >
                  <div>
                    <button
                      className="bg-gradient-to-l from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="text-gray-800 text-base font-bold px-4 py-[11px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>

                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer "
                        onClick={() => removeFromwishlistHandler(data)}
                        color="red"
                        title="Remove from Wishlist "
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer "
                        onClick={() => addToWishlistHandler(data)}
                        color="#333"
                        title="Add to a Wishlist"
                      />
                    )}
                  </div>
                </div>
                <div
                  onClick={() => addToCartHandler(data)}
                  className={`${styles.button} !mt-6 !rounded h-11 text-white bg-black ${styles.noramalFlex}`}
                >
                  <span>Add To Cart</span>
                  <AiOutlineShoppingCart className="ml-1" />
                </div>
                <div className="flex items-center pt-8">
                  <Link to={`/shop/preview/${data?.shop._id}`}>
                    <img
                      src={`${backend_url}/${data?.shop?.avatar}`}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full mr-2"
                    />
                  </Link>
                  <div className="pr-8">
                    <Link to={`/shop/preview/${data?.shop._id}`}>
                      <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                        {data.shop.name}
                      </h3>
                    </Link>
                    <h5 className="pb-3 text-base">{/* ({}/5) Ratings */}</h5>
                  </div>

                  <div
                    className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11`}
                    onClick={() => handleMessageSubmit()}
                  >
                    <span className="text-white flex items-center">
                      Send Mesasge <AiOutlineMessage className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ProductDeatilsInfo data={data} />
        </div>
      )}
    </div>
  );
}

const ProductDeatilsInfo = ({ data }) => {
  const [active, setActive] = useState(1);
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProductsForShop(data && data?.shop._id));
  }, [data]);

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    (products &&
      products.reduce(
        (acc, product) =>
          acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
        0
      )) ||
    0;

  const averageRatings = totalRatings / totalReviewsLength;
  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className="text-black text-lg px-1 leading-5 font-semibold cursor-pointer 800px:text-xl"
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 && <div className={`${styles.active_indicator} `} />}
        </div>

        <div className="relative">
          <h5
            className="text-black text-lg px-1 leading-5 font-semibold cursor-pointer 800px:text-xl"
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 && <div className={`${styles.active_indicator} `} />}
        </div>

        <div className="relative">
          <h5
            className="text-black text-lg px-1 leading-5 font-semibold cursor-pointer 800px:text-xl"
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 && <div className={`${styles.active_indicator} `} />}
        </div>
      </div>

      {active === 1 && (
        <div className="min-h-[40vh]">
          <p className="py-2 text-lg leading-8 pb-10 whitespace-pre-line">
            {data.description}
          </p>
        </div>
      )}

      {active === 2 && (
        <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
          {data &&
            data.reviews.map((item, index) => (
              <div className="w-full flex my-2 items-center">
                <img
                  src={`${backend_url}/${item.user.avatar}`}
                  className="w-14 h-14 rounded-full"
                  alt=""
                />
                <div className="pl-3">
                  <div className="w-full">
                    <h1 className="font-bold">{item.user.name}</h1>
                    <Ratings rating={item.rating} />
                  </div>
                  <p>{item.comment}</p>
                </div>
              </div>
            ))}

          <div className="w-full flex justify-center">
            {data && data.reviews.length == 0 && <h5>No Reviews yet!</h5>}
          </div>
        </div>
      )}

      {active === 3 && (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
            <Link to={`/shop/preview/${data.shop._id}`}>
              <div className="flex items-center">
                <img
                  src={`${backend_url}/${data?.shop?.avatar}`}
                  className="w-[50px] h-[50px] rounded-full"
                  alt=""
                />
                <div className="pl-3">
                  <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                  <h5 className="pb-2 text-[15px]">
                    ({averageRatings}/5) Ratings
                  </h5>
                </div>
              </div>
            </Link>
            <p className="pt-2 ">{data.shop.description}</p>
          </div>

          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-semibold">
                Joined on:{" "}
                <span className="font-normal">
                  {data.shop?.createdAt?.slice(0, 10)}
                </span>
              </h5>

              <h5 className="font-semibold pt-3">
                Total Products:{" "}
                <span className="font-normal">
                  {products && products.length}
                </span>
              </h5>

              <h5 className="font-semibold">
                Total Reviews:{" "}
                <span className="font-normal">{totalReviewsLength}</span>
              </h5>

              <Link to="/">
                <div className={`${styles.button} rounded-[4px] h-10 mt-3`}>
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
