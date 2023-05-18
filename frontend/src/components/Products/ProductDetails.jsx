import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";

function ProductDetails({ data }) {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(1);
  const navigate = useNavigate();

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const handleMessageSubmit = () => {
    navigate("/inbox?conversation=507ejsjkbbvj");
  };

  return (
    <div className="bg-white pb-10">
      {data && (
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={data.image_Url[select].url}
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
                        src={data?.image_Url[0].url}
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
                        src={data?.image_Url[1].url}
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
                    {data.discount_price} $
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.price && data.price + " $"}
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
                        onClick={() => setClick(!click)}
                        color="red"
                        title="Remove from Wishlist "
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer "
                        onClick={() => setClick(!click)}
                        color="#333"
                        title="Add to a Wishlist"
                      />
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.button} !mt-6 !rounded h-11 text-white bg-black ${styles.noramalFlex}`}
                >
                  <span>Add To Cart</span>
                  <AiOutlineShoppingCart className="ml-1" />
                </div>
                <div className="flex items-center pt-8">
                  <img
                    src={data.shop.shop_avatar.url}
                    className="w-12 h-12 rounded-full mr-2"
                    alt=""
                  />
                  <div className="pr-8">
                    <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                      {data.shop.name}
                    </h3>
                    <h5 className="pb-3 text-base">
                      ({data.shop.ratings}) Ratings
                    </h5>
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
        <div className="w-full justify-center min-h-[40vh] flex items-center">
          <p>No Reviews yet!</p>
        </div>
      )}

      {active === 3 && (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
            <div className="flex items-center">
              <img
                src={data.shop.shop_avatar.url}
                alt=""
                className="w-12 h-12 rounded-full "
              />
            </div>
            <div className="pl-3">
              <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
              <h5 className="pb-2 text-base">({data.shop.ratings}) Ratings</h5>
            </div>
            <p className="pt-2 ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              reprehenderit ex perferendis dolor magnam vero quidem,
              consequuntur ipsum molestiae itaque vitae incidunt esse voluptatum
              eius nesciunt neque odit laudantium obcaecati vel repudiandae
              optio? Nulla deserunt rerum illum, blanditiis repellendus alias
              fugit vero dolorem eius vitae ad quasi, eos at impedit?
            </p>
          </div>

          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-semibold">
                Joined on: <span className="font-normal">14 March, 2023</span>
              </h5>

              <h5 className="font-semibold pt-3">
                Total Products: <span className="font-normal">1.223</span>
              </h5>

              <h5 className="font-semibold">
                Total Reviews: <span className="font-normal">131</span>
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
