import React from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown";

function EventCard({ active }) {
  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2`}
    >
      <div className="w-full lg:w-[50%] m-auto">
        <img src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg" alt="" />
      </div>

      <div className="w-full lg:w-[50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>
          Iphone 14 pro max 256 gb ssd and 8 gb ram silver colour
        </h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae
          blanditiis omnis et dignissimos quisquam sunt, ad, nesciunt soluta aut
          ratione quos, atque eaque eum pariatur velit? Ad quam perferendis quos
          autem dolor. Blanditiis, quia quis error perferendis, nisi sed,
          suscipit saepe beatae ipsum optio maiores! Praesentium nam aut libero
          itaque. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Molestiae blanditiis omnis et dignissimos quisquam sunt, ad, nesciunt
          soluta aut ratione quos, atque eaque eum pariatur velit? Ad quam
          perferendis quos autem dolor. Blanditiis, quia quis error perferendis,
          nisi sed, suscipit saepe beatae ipsum optio maiores! Praesentium nam
          aut libero itaque.
        </p>

        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-bold text-lg text-[#d55b45] pr-3 line-through">
              1099$
            </h5>
            <h5 className="font-bold text-xl text-gray-700 font-Roboto">
              999$
            </h5>
          </div>
          <span className="pr-3 font-normal text-lg text-[#44a55e]">
            120 sold
          </span>
        </div>
        <CountDown />
      </div>
    </div>
  );
}

export default EventCard;
