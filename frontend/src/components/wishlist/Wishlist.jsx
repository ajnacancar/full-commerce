import React, { useState } from 'react'
import styles from '../../styles/styles';
import {  IoHeartOutline } from 'react-icons/io5';
import { RxCross1 } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import { BsCartPlus } from "react-icons/bs";

function Wishlist({setOpenWishlist}) {
  const wishlistData = [
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
              onClick={() => setOpenWishlist(false)}
            />
          </div>

          {/* Item length */}
          <div className={`${styles.noramalFlex} p-4`}>
            <IoHeartOutline size={25} color='red' />
            <h5 className="pl-2 text-xl font-semibold text-red-500">3 items</h5>
          </div>

          {/* cart single items */}
          <br />
          <div className="w-full border-t">
            {wishlistData &&
              wishlistData.map((i, index) => (
                <WishlistItem data={i} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}


const WishlistItem = ({ data }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.price * value;

  return (
    <div className="border-b p-4">
      <div className="w-full 800px:flex items-center">
        <RxCross1 size={20} className="cursor-pointer 800px:mb-['unset'] 800px:ml-['unset'] mb-2 ml-2"
        />
        <img
              src="https://euro.montbell.com/products/prod_img/zoom/z_2301368_bric.jpg"
          alt=""
          className="w-20 h-20 ml-2"
        />

        <div className="pl-1">
          <h1>{data.name}</h1>
          <h4 className="font-semibold pt-3 800px:pt-1 text-lg text-[#d02222] font-Roboto">
            US$ {totalPrice}
          </h4>
        </div>
        <div className='ml-5 '>
          <BsCartPlus size={20} className="cursor-pointer" tile="Add to cart"
          />
        </div>
      </div>
    </div>
  );
};

export default Wishlist