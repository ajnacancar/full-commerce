import React, { useState } from "react";
import styles from "../../styles/styles";
import { IoHeartOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { backend_url } from "../../server";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/actions/cart";

function Wishlist({ setOpenWishlist }) {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
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

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm">
        {wishlist && wishlist.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="w-full flex justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishlist(false)}
              />
            </div>
            <h5>Wishlist is empty</h5>
          </div>
        ) : (
          <>
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
                <IoHeartOutline size={25} color="red" />
                <h5 className="pl-2 text-xl font-semibold text-red-500">
                  {wishlist && wishlist.length} items
                </h5>
              </div>

              {/* cart single items */}
              <br />
              <div className="w-full border-t">
                {wishlist &&
                  wishlist.map((i, index) => (
                    <WishlistItem
                      data={i}
                      addToCartHandler={addToCartHandler}
                      removeFromWishlistHandler={removeFromWishlistHandler}
                    />
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const WishlistItem = ({
  data,
  removeFromWishlistHandler,
  addToCartHandler,
}) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.discountPrice * value;

  return (
    <div className="border-b p-4">
      <div className="w-full 800px:flex items-center justify-between">
        <RxCross1
          onClick={() => removeFromWishlistHandler(data)}
          size={20}
          className="cursor-pointer 800px:mb-['unset'] 800px:ml-['unset'] mb-2 ml-2"
        />
        <img
          src={`${backend_url}/${data.images[0]}`}
          alt=""
          className="w-20 h-20 ml-2"
        />

        <div className="pl-1">
          <h1>{data.name}</h1>
          <h4 className="font-semibold pt-3 800px:pt-1 text-lg text-[#d02222] font-Roboto">
            US$ {totalPrice}
          </h4>
        </div>
        <div className="ml-5 ">
          <BsCartPlus
            onClick={() => addToCartHandler(data)}
            size={20}
            className="cursor-pointer"
            tile="Add to cart"
          />
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
