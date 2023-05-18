import React from "react";
import styles from "../../../styles/styles";
import { brandingData, categoriesData } from "../../../static/data";
import { useNavigate } from "react-router-dom";

function Categories() {
  const navigate = useNavigate();
  return (
    <>
      <div className={`${styles.section} hidden sm:block`}>
        <div className="branding my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md">
          {brandingData &&
            brandingData.map((i, index) => (
              <div className="flex items-start" key={index}>
                {i.icon}
                <div className="px-3">
                  <h3 className="font-bold text-sm md:text-base ">{i.title}</h3>
                  <p className="text-xs md:text-sm">{i.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div
        id="categories"
        className={`${styles.section} bg-white p-6 rounded-lg mb-12`}
      >
        <div className="grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4 xl:gap-7">
          {categoriesData &&
            categoriesData.map((i, index) => {
              const handleSubmit = (i) => {
                navigate(`/products?category=${i.title}`);
              };

              return (
                <div
                  key={index}
                  onClick={() => handleSubmit(i)}
                  className="w-full h-24 flex items-center justify-center space-x-7 px-2 shadow-lg cursor-pointer overflow-hidden"
                >
                    <h5 className="text-lg leading-[1.3]">{i.title}</h5>
                    <img src={i.image_Url} alt="image" className="w-[120px] object-cover" />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Categories;
