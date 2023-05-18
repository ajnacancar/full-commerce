import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";

function DropDown({ categoriesData, setDropDown }) {
  const navigate = useNavigate();
  const handleSubmit = (i) => {
    navigate(`/products?category=${i.title}`);
    setDropDown(false);
    window.location.reload();
  };

  return (
    <div className="pb-4 w-[270px] bg-white absolute z-30 rounded-b-md shadow-sm">
      {categoriesData &&
        categoriesData.map((i, index) => (
          <div
            key={index}
            className={`${styles.noramalFlex}`}
            onClick={() => handleSubmit(i)}
          >
            <img
              src={i.image_Url}
              className="w-[25px] h-[25px] object-contain ml-2 select-none"
              alt=""
            />
            <h3 className="m-3 cursor-pointer select-none">{i.title}</h3>
          </div>
        ))}
    </div>
  );
}

export default DropDown;
