import React from "react";
import styles from "../../../styles/styles";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div
      className={`min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat bg-cover ${styles.noramalFlex}`}
      style={{
        backgroundImage:
          "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <h1
          className={`text-[35px] leading-tight 800px:text-[60px] text-[#3d3a3a] font-bold capitalize`}
        >
          Best Colection for home decoration
        </h1>
        <p className="pt-5 text-base font-[Popins] font-normal text-black">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio quod,
          facere fuga asperiores autem ratione ducimus dicta deserunt alias
          ipsam earum est, aspernatur aut nobis magni maxime eveniet
          reprehenderit repellendus.
        </p>
        <Link to="/products" className="inline-block">
          <div className={`${styles.button} mt-5`}>
            <span className="text-white font-[Poppins] text-lg">Shop Now</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
