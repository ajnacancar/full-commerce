import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import Loader from "../Layout/Loader";
import { DataGrid } from "@material-ui/data-grid";
import {
  deleteEventOfShop,
  loadEventsForShop,
} from "../../redux/actions/event";

function AllShopEvents() {
  const { shop } = useSelector((state) => state.shop);
  const { events, isLoading } = useSelector((state) => state.event);

  const dispatch = useDispatch();

  useEffect(() => {
    if (shop) {
      dispatch(loadEventsForShop(shop._id));
    }
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteEventOfShop(id));
    window.location.reload(true);
  };

  const columns = [
    {
      field: "id",
      headerName: "Event Id",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },

    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },
    {
      field: "sold_out",
      headerName: "Sold Out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Start date",
      headerName: "Start Date",
      type: "date",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "finish_date",
      headerName: "Finish date",
      type: "date",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "preview",
      headerName: "",
      type: "number",
      minWidth: 100,
      flex: 0.8,
      sortable: false,
      renderCell: (params) => {
        const d = params.row.name;
        const event_name = d.replace(/\s+/g, "-");
        return (
          <>
            <Link to={`/event/${event_name}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "delete",
      headerName: "",
      type: "number",
      minWidth: 120,
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

  events &&
    events.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "US$ " + item.discountPrice,
        stock: item.stock,
        sold_out: 10,
        finish_date: item.finish_date.slice(0, 10),
        start_date: item.start_date.slice(0, 10),
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 mt-10 bg-white">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
}

export default AllShopEvents;
