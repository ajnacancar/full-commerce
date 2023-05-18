import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";

function Cart({ setOpenCart }) {
  const cartData = [
    {
      name: "IPhone 14 pro max 256 gb ssd and 8gb ram sliver color",
      description: "test",
      price: 999,
    },
    {
      name: "IPhone 14 pro max 256 gb ssd and 8gb ram sliver color",
      description: "test",
      price: 245,
    },
    {
      name: "IPhone 14 pro max 256 gb ssd and 8gb ram sliver color",
      description: "test",
      price: 645,
    },
  ];

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm">
        <div>
          <div className="flex w-full justify-end pt-5 pr-5">
            <RxCross1
              size={25}
              className="cursor-pointer"
              onClick={() => setOpenCart(false)}
            />
          </div>

          {/* Item length */}
          <div className={`${styles.noramalFlex} p-4`}>
            <IoBagHandleOutline size={25} />
            <h5 className="pl-2 text-xl font-semibold">3 items</h5>
          </div>

          {/* cart single items */}
          <br />
          <div className="w-full border-t">
            {cartData &&
              cartData.map((i, index) => <CartSingle key={index} data={i} />)}
          </div>
        </div>
        <div className="px-5 mb-3 ">
          {/* checkout buttons */}
          <Link to="/checkout">
            <div className="h-11 flex items-center justify-center w-full bg-[#e44343] rounded-md">
              <h1 className="text-white text-lg font-semibold">
                Checkout Now (USD$ 1080)
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

const CartSingle = ({ data }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.price * value;

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div>
          <div
            className={`bg-[#e44343] border border-[#e44343] rounded-full w-6 h-6 ${styles.noramalFlex} justify-center cursor-pointer`}
            onClick={() => setValue(value + 1)}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="pl-2">{value}</span>
          <div
            className="bg-[#a7abb14f] rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
            onClick={() => setValue(value === 1 ? 1 : value - 1)}
          >
            <HiOutlineMinus size={18} color="#7d879c" />
          </div>
        </div>

        <img
          src="https://euro.montbell.com/products/prod_img/zoom/z_2301368_bric.jpg"
          alt=""
          className="w-20 h-20 ml-2"
        />

        <div className="pl-1">
          <h1> {data.name} </h1>
          <h4 className="font-normal text-base text-[#00000082]">
            ${data.price} * {value}
          </h4>
          <h4 className="font-bold text-lg pt-1 text-[#d02222] font-Roboto">
            US$ {totalPrice}
          </h4>
        </div>
        <RxCross1 className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Cart;
