import React, { useEffect, useState } from "react";
import {
  ORDER_STATUS_PROCESSING_REFUND,
  backend_url,
  server,
} from "../../server";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCamera, AiOutlineDelete } from "react-icons/ai";
import styles from "../../styles/styles";
import { DataGrid } from "@material-ui/data-grid";
import { columns_table_order_user, columns_table_track_order_user } from "../../static/static_data";
import { ordersData } from "../../static/data";
import {
  updateUserAddress,
  updateUserInformation,
  clearErrors,
  deleteUserAddress,
} from "../../redux/actions/user";
import { toast } from "react-toastify";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import { City, Country, State } from "country-state-city";
import { loadAllOrdersForUser } from "../../redux/actions/order";

function ProfileContent({ active }) {
  const { user, error, addressUpdatedSuccessufuly } = useSelector(
    (state) => state.user
  );
  const [name, setName] = useState(user ? user.name : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [phoneNumber, setPhoneNumber] = useState(user ? user.phoneNumber : "");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInformation(email, password, phoneNumber, name));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (addressUpdatedSuccessufuly) {
      toast.success("Address updated succesufully!");
    }
  }, [error, addressUpdatedSuccessufuly]);

  const handleImage = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    const formData = new FormData();
    formData.append("image", file);

    await axios
      .put(`${server}/user/update-avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((response) => {
        window.location.reload(true);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div className="w-full">
      {/* profile content */}
      {active == 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${backend_url}/${user?.avatar}`}
                className="w-36 h-36 rounded-full object-cover border-4 border-[#3ad132]"
                alt=""
              />
              <div className="w-7 h-7 bg-[#e3e9ee] rounded-full flex items-center justify-center cursor-pointer absolute bottom-1 right-1">
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

          <div className="w-full px-5 mt-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full 800px:flex block pb-3">
                <div className=" w-full 800px:w-[50%]">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className=" w-full 800px:w-[50%]">
                  <label className="block pb-2">Email Address</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3">
                <div className=" w-full 800px:w-[50%]">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Enter your password</label>
                  <input
                    type="password"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <input
                className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                required
                value="Update"
                type="submit"
              />
            </form>
          </div>
        </>
      )}

      {/* order cnotent */}
      {active == 2 && (
        <>
          <AllOrders />
        </>
      )}

      {/* refunds content */}
      {active == 3 && (
        <>
          <AllRefundOrders />
        </>
      )}

      {/* track orders content */}
      {active == 5 && (
        <>
          <TrackOrders />
        </>
      )}

      {/* change password content */}
      {active == 6 && (
        <>
          <ChangePassword />
        </>
      )}

      {/* address content */}
      {active == 7 && (
        <>
          <Address />
        </>
      )}
    </div>
  );
}

const AllOrders = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: `US$ ${item.totalPrice}`,
        status: item.status,
      });
    });

  useEffect(() => {
    if (user) {
      dispatch(loadAllOrdersForUser(user._id));
    }
  }, [user]);

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns_table_order_user}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const AllRefundOrders = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const row = [];

  const eligibleOrder =
    orders &&
    orders.filter((item) => item.status === ORDER_STATUS_PROCESSING_REFUND);
  eligibleOrder &&
    eligibleOrder.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: `US$ ${item.totalPrice}`,
        status: item.status,
      });
    });

  useEffect(() => {
    if (user) {
      dispatch(loadAllOrdersForUser(user._id));
    }
  }, [user]);

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns_table_order_user}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const TrackOrders = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: `US$ ${item.totalPrice}`,
        status: item.status,
      });
    });

  useEffect(() => {
    if (user) {
      dispatch(loadAllOrdersForUser(user._id));
    }
  }, [user]);

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns_table_track_order_user}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/user/update-user-password`,
        { oldPassword, newPassword, confirmNewPassword },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="w-full px-5">
      <h1 className="text-2xl text-center block font-semibold text-black pb-2">
        Change Password
      </h1>

      <div className="w-full">
        <form
          aria-required
          onSubmit={handleSubmit}
          className="flex flex-col items-center"
        >
          <div className="w-full 800px:w-[50%] mt-5">
            <label className="block pb-2">Old Password</label>
            <input
              type="password"
              className={`${styles.input} w-[95%] 800px:mb-0`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div className="w-full 800px:w-[50%] mt-5">
            <label className="block pb-2">New Password</label>
            <input
              type="password"
              className={`${styles.input} w-[95%] 800px:mb-0`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="w-full 800px:w-[50%] mt-5">
            <label className="block pb-2">Confirm New Password</label>
            <input
              type="password"
              className={`${styles.input} w-[95%] 800px:mb-0`}
              required
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </div>

          <div className="w-full 800px:w-[50%] mt-5">
            <input
              type="submit"
              className={`${styles.input} bg-white cursor-pointer border border-blue-500 text-blue-500 hover:font-bold w-[95%]`}
              value="Submit New Password"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (addressType == "" || city == "" || country == "") {
      toast.error("Please fill all the fields!");
    }

    dispatch(
      updateUserAddress(country, city, address1, address2, zipCode, addressType)
    );

    setOpen(false);
    setCountry("");
    setCity("");
    setZipCode("");
    setAddress1("");
    setAddress2("");
    setAddressType("");
  };

  const handleDelete = (item) => {
    dispatch(deleteUserAddress(item._id));
  };

  return (
    <div className="w-full px-5">
      {open && (
        <div className="fixed w-full h-screen top-0 left-0 flex items-center justify-center bg-[#0000004b]">
          <div className="w-[35%] h-[80vh] bg-white relative overflow-y-scroll">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-center text-2xl font-Poppins">
              Add New Address
            </h1>
            <div className="w-full">
              <form aria-required onSubmit={handleSubmit} className="w-full">
                <div className="w-full block p-4">
                  <label className="block pb-2">Country</label>
                  <select
                    className="w-[90%] border h-10 rounded"
                    value={country}
                    id=""
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="" className="block pb-2">
                      choose your country
                    </option>
                    {Country &&
                      Country.getAllCountries().map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="w-full block p-4">
                  <label className="block pb-2">City</label>
                  <select
                    className="w-[90%] border h-10 rounded"
                    value={city}
                    id=""
                    onChange={(e) => setCity(e.target.value)}
                  >
                    <option value="" className="block pb-2">
                      choose your city
                    </option>
                    {City &&
                      City.getCitiesOfCountry(country).map((item, index) => (
                        <option key={index} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="w-full block p-4">
                  <label className="block pb-2">Address 1</label>
                  <input
                    type="address"
                    className={`${styles.input}`}
                    required
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                </div>

                <div className="w-full block p-4">
                  <label className="block pb-2">Address 2</label>
                  <input
                    type="address"
                    className={`${styles.input}`}
                    required
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                </div>

                <div className="w-full block p-4">
                  <label className="block pb-2">Zip Code</label>
                  <input
                    type="text"
                    className={`${styles.input}`}
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>

                <div className="w-full block p-4">
                  <label className="block pb-2">Address Type</label>
                  <select
                    className="w-[90%] border h-10 rounded"
                    value={addressType}
                    id=""
                    onChange={(e) => setAddressType(e.target.value)}
                  >
                    <option value="" className="block pb-2">
                      choose your address type
                    </option>
                    {addressTypeData &&
                      addressTypeData.map((item) => (
                        <option key={item.name} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="w-full block p-4">
                  <input
                    type="submit"
                    className={`${styles.input} cursor-pointer hover:border hover:border-blue-500 hover:text-blue-500 hover:font-bold`}
                    value="Submit Address"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold text-black pb-2">My Addresses</h1>
        <div
          className={`${styles.button} !rounded-md`}
          onClick={() => setOpen(true)}
        >
          <span className="text-white">Add New</span>
        </div>
      </div>
      {user &&
        user.addresses &&
        user.addresses.length > 0 &&
        user.addresses.map((address, index) => (
          <div
            key={index}
            className="w-full bg-white h-16 rounded-md flex items-center px-3 shadow justify-between pr-10 my-2"
          >
            <div className="flex items-center">
              <h5 className="pl-5 font-semibold">{address.addressType}</h5>
            </div>

            <div className="pl-8 flex items-center">
              <h6>
                {address.address1} + {address.address2}
              </h6>
            </div>
            <div className="pl-8 flex items-center">
              <h6>{user && user.phoneNumber}</h6>
            </div>

            <div className="min-w-[10%] flex items-center justify-between pl-8">
              <AiOutlineDelete
                size={25}
                className="cursor-pointer"
                onClick={() => handleDelete(address)}
              />
            </div>
          </div>
        ))}

      {user && user.addresses && user.addresses.length === 0 && (
        <h5 className="text-center pt-8 text-lg">
          You not have any saved address
        </h5>
      )}
    </div>
  );
};

export default ProfileContent;
