import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/styles";
import axios from "axios";
import { toast } from "react-toastify";
import { loadShop } from "../../redux/actions/shop";

function ShopSettings() {
  const { shop } = useSelector((state) => state.shop);
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState(shop ? shop.name : "");
  const [description, setDescription] = useState(shop ? shop.description : "");
  const [address, setAddress] = useState(shop ? shop.address : "");
  const [phoneNumber, setPhoneNumber] = useState(shop ? shop.phoneNumber : "");
  const [zipCode, setZipCode] = useState(shop ? shop.zipCode : "");

  const dispatch = useDispatch();

  const handleImage = async (e) => {
    // e.preventDefault();
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();
    formData.append("file", file);

    await axios
      .put(`${server}/shop/update-shop-avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((response) => {
        dispatch(loadShop());
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const updateShopData = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/shop/update-shop-info`,
        { name, description, phoneNumber, address, zipCode },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success("Shop Information updated successufuly!");
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="flex w-full 800px:w-[80%] flex-col justify-center my-5">
        <div className="w-full flex items-center justify-center">
          <div className="relative">
            <img
              src={
                avatar
                  ? URL.createObjectURL(avatar)
                  : `${backend_url}/${shop.avatar}`
              }
              alt=""
              className="w-52 h-52 rounded-full"
            />
            <div className="w-7 h-7 bg-[#e3e9ee] rounded-full flex items-center justify-center cursor-pointer absolute bottom-3 right-4">
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleImage}
              />
              <label htmlFor="image">
                <AiOutlineCamera />
              </label>
            </div>
          </div>
        </div>

        {/* shop info */}

        <form
          aria-required={true}
          className="flex flex-col items-center p-2"
          onSubmit={updateShopData}
        >
          <div className="w-full 800px:w-[50%] mt-5">
            <label className="block pb-2">Shop Name</label>
            <input
              type="text"
              className={`${styles.input} w-[95%] 800px:mb-0`}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="w-full 800px:w-[50%] mt-5">
            <label className="block pb-2">Shop Description</label>
            <input
              type="text"
              className={`${styles.input} w-[95%] 800px:mb-0`}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="w-full 800px:w-[50%] mt-5">
            <label className="block pb-2">Shop Address</label>
            <input
              type="text"
              className={`${styles.input} w-[95%] 800px:mb-0`}
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="w-full 800px:w-[50%] mt-5">
            <label className="block pb-2">Shop Phone Number</label>
            <input
              type="text"
              className={`${styles.input} w-[95%] 800px:mb-0`}
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div className="w-full 800px:w-[50%] mt-5">
            <label className="block pb-2">Shop Zip Code</label>
            <input
              type="text"
              className={`${styles.input} w-[95%] 800px:mb-0`}
              required
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>

          <div className="w-full 800px:w-[50%] mt-5">
            <input
              type="submit"
              className={`${styles.input} bg-white cursor-pointer border border-blue-500 text-blue-500 hover:font-bold w-[95%]`}
              value="Update Shop Data"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ShopSettings;
