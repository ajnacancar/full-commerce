import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import Loader from "../Layout/Loader";
import { DataGrid } from "@material-ui/data-grid";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { loadProductsForShop } from "../../redux/actions/product";

function AllCouponsCode() {
  const { shop, loading } = useSelector((state) => state.shop);
  const { products, isLaoding } = useSelector((state) => state.product);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [value, setValue] = useState(0);
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [coupons, setCoupons] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (shop) {
      axios
        .get(`${server}/coupon/get-all-coupons-shop/${shop._id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setCoupons(res.data.coupons);
        })
        .catch((error) => {
          toast.error("Error loading coupons");
        });

      dispatch(loadProductsForShop(shop._id));
    }
  }, [shop]);

  const handleDelete = (id) => {
    axios
      .delete(`${server}/coupon/delete-coupon/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success("Coupon code deleted succesfully!");
        window.location.reload();
      })
      .catch((error) => {
        toast.error("Problem deleting coupn");
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${server}/coupon/create-coupon-code`,
        {
          name,
          minAmount,
          maxAmount,
          selectedProduct,
          value,
          shop,
          shopId: shop._id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Coupon code created successuguly!");
        setOpen(false);
        window.location.reload(true);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const columns = [
    {
      field: "id",
      headerName: "Coupon Id",
      minWidth: 50,
      flex: 0.7,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 100,
      flex: 1.4,
    },
    {
      field: "value",
      headerName: "Discount",
      type: "number",
      minWidth: 50,
      flex: 0.5,
    },
    {
      field: "minAmount",
      headerName: "minAmount",
      type: "number",
      minWidth: 50,
      flex: 0.6,
    },
    {
      field: "maxAmount",
      headerName: "maxAmount",
      type: "number",
      minWidth: 50,
      flex: 0.5,
    },
    {
      field: "selectedProduct",
      headerName: "selected Product",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "delete",
      headerName: "",
      type: "number",
      minWidth: 100,
      flex: 0.8,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  coupons &&
    coupons.forEach((item) => {
      row.push({
        id: item._id,
        value: item.value,
        name: item.name,
        minAmount: item.minAmount,
        maxAmount: item.maxAmount,
        selectedProduct: item.selectedProduct,
      });
    });

  return (
    <>
      {loading || isLaoding ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 mt-10 bg-white">
          <div className="w-full flex justify-end">
            <div
              className={`${styles.button} w-max px-2 !rounded mr-2`}
              onClick={() => setOpen(true)}
            >
              <span className="text-white">Create Coupon Code</span>
            </div>
          </div>
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
          {open && (
            <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[2000] flex items-center justify-center">
              <div className="800px:w-1/2 w-[40%] h-[80vh] bg-white rounded-md shadow p-4">
                <div className="w-full flex justify-end">
                  <RxCross1
                    size={30}
                    className="cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <h5 className="text-3xl font-Poppins text-center">
                  Create Coupon Code
                </h5>

                {/* create coupon code form */}
                <form onSubmit={handleSubmit} aria-required={true}>
                  <div className="mt-5">
                    <label className="pb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      className="mt-2 appearance-none block w-full px-3 h-9 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:border-blue-600 sm:text-sm"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your coupon code name..."
                      required
                    />
                  </div>

                  <div className="mt-5">
                    <label className="pb-2">
                      Discount Percentage
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="value"
                      value={value}
                      className="mt-2 appearance-none block w-full px-3 h-9 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:border-blue-600 sm:text-sm"
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Enter your coupon code discount persentage..."
                      required
                      min={1}
                    />
                  </div>

                  <div className="mt-5">
                    <label className="pb-2">Minimum Amount</label>
                    <input
                      type="number"
                      name="minAmount"
                      value={minAmount}
                      className="mt-2 appearance-none block w-full px-3 h-9 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:border-blue-600 sm:text-sm"
                      onChange={(e) => setMinAmount(e.target.value)}
                      placeholder="Enter your coupon minimum amount..."
                      min={1}
                    />
                  </div>

                  <div className="mt-5">
                    <label className="pb-2">Maximum Amount</label>
                    <input
                      type="number"
                      name="maxAmount"
                      value={maxAmount}
                      className="mt-2 appearance-none block w-full px-3 h-9 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:border-blue-600 sm:text-sm"
                      onChange={(e) => setMaxAmount(e.target.value)}
                      placeholder="Enter your coupon maximum amount..."
                      min={1}
                    />
                  </div>

                  <div className="mt-5">
                    <label className="pb-2">Product</label>
                    <select
                      name="product"
                      className="w-full mt-2 border h-9 rounded"
                      value={selectedProduct}
                      onChange={(e) => setSelectedProduct(e.target.value)}
                    >
                      <option defaultValue={true}>Choose a product</option>
                      {products &&
                        products.map((i, index) => (
                          <option
                            className="capitalize"
                            value={i.name}
                            key={index}
                          >
                            {i.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="mt-5">
                    <input
                      type="submit"
                      value="Create Coupon"
                      className="cursor-pointer font-bold text-blue-600 mt-2 appearance-none block w-full px-3 h-9 border border-gray-300 rounded placeholder-gray-400 focus:outline-none hover:border-blue-600 sm:text-sm"
                    />
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default AllCouponsCode;
