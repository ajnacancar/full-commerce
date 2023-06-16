import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import { createEvent } from "../../redux/actions/event";

function CreateEvent() {
  const { shop } = useSelector((state) => state.shop);
  const { success, error } = useSelector((state) => state.event);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [stock, setStock] = useState(0);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const handleStartDateChange = (e) => {
    const startDate = new Date(e.target.value);
    const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
    setStartDate(startDate);
    setEndDate(null);
    document.getElementById("end-date").min = minEndDate
      .toISOString()
      .slice(0, 10);
  };

  const handleEndDate = (e) => {
    const endDate = new Date(e.target.value);
    setEndDate(endDate);
  };

  const today = new Date().toISOString().slice(0, 10);
  const minEndDate = startDate
    ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    : today;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();
    images.forEach((image) => {
      newForm.append("images", image);
    });
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", shop._id);
    newForm.append("start_date", startDate.toISOString());
    newForm.append("finish_date", endDate.toISOString());

    dispatch(createEvent(newForm));
  };

  const handleImageChange = (e) => {
    e.preventDefault();

    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (success) {
      toast.success("Event created successufuly!");
      navigate("/dashboard");
      window.location.reload(true);
    }
  }, [error, dispatch, success]);

  return (
    <div className="800px:w-[50%] w-[90%] bg-white shadow h-[80vh] rounded p-3 overflow-y-scroll">
      <h5 className="text-3xl font-Poppins text-center">Create Event</h5>

      {/* create event form */}
      <form onSubmit={handleSubmit}>
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
            placeholder="Enter your event product name..."
            required
          />
        </div>

        <div className="mt-5">
          <label className="pb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            type="text"
            name="description"
            cols={50}
            rows={30}
            value={description}
            className="mt-2 appearance-none block w-full px-3 h-9 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:border-blue-600 sm:text-sm"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your event product description..."
            required
          ></textarea>
        </div>

        <div className="mt-5">
          <label className="pb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            name="category"
            className="w-full mt-2 border h-9 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option defaultValue={true}>Choose a category</option>
            {categoriesData &&
              categoriesData.map((i, index) => (
                <option className="capitalize" value={i.title} key={index}>
                  {i.title}
                </option>
              ))}
          </select>
        </div>

        <div className="mt-5">
          <label className="pb-2">Tags</label>
          <input
            type="text"
            name="tags"
            value={tags}
            className="mt-2 appearance-none block w-full px-3 h-9 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:border-blue-600 sm:text-sm"
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter your event product tags..."
          />
        </div>

        <div className="mt-5">
          <label className="pb-2">Original Price</label>
          <input
            type="number"
            name="originalPrice"
            value={originalPrice}
            className="mt-2 appearance-none block w-full px-3 h-9 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:border-blue-600 sm:text-sm"
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Enter your event product price..."
          />
        </div>

        <div className="mt-5">
          <label className="pb-2">
            Price (With Discount) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="discountPrice"
            value={discountPrice}
            className="mt-2 appearance-none block w-full px-3 h-9 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:border-blue-600 sm:text-sm"
            onChange={(e) => setDiscountPrice(e.target.value)}
            placeholder="Enter your event product price with discount..."
            required
          />
        </div>

        <div className="mt-5">
          <label className="pb-2">
            Product Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="stock"
            value={stock}
            className="mt-2 appearance-none block w-full px-3 h-9 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:border-blue-600 sm:text-sm"
            onChange={(e) => setStock(e.target.value)}
            placeholder="Enter your event product stock..."
            required
            min={1}
          />
        </div>

        <div className="mt-5">
          <label className="pb-2">
            Event Start Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="startDate"
            value={startDate ? startDate.toISOString().slice(0, 10) : ""}
            className="mt-2 appearance-none block w-full px-3 h-9 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:border-blue-600 sm:text-sm"
            onChange={(e) => handleStartDateChange(e)}
            placeholder="Enter your event start date..."
            required
            min={today}
          />
        </div>

        <div className="mt-5">
          <label className="pb-2">
            Event End Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="endDate"
            id="end-date"
            value={endDate ? endDate.toISOString().slice(0, 10) : ""}
            min={minEndDate}
            className="mt-2 appearance-none block w-full px-3 h-9 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:border-blue-600 sm:text-sm"
            onChange={(e) => handleEndDate(e)}
            placeholder="Enter your event start date..."
            required
          />
        </div>

        <div className="mt-5">
          <label className="pb-2">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />

          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {images &&
              images.map((i, index) => (
                <img
                  src={URL.createObjectURL(i)}
                  key={index}
                  alt=""
                  className="w-28 h-28 object-cover m-2"
                />
              ))}
          </div>

          <div className="mt-5">
            <input
              type="submit"
              value="Create"
              className="mt-2 font-semibold text-lg text-white cursor-pointer appearance-none block w-full px-3 h-9 border rounded bg-blue-800 sm:text-sm"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateEvent;
