import React from "react";
import styles from "../../styles/styles";
import { navItems } from "../../static/data";
import { Link } from "react-router-dom";

function Navbar({ active }) {
  return (
    <div className={`800px:${styles.noramalFlex} block`}>
      {navItems &&
        navItems.map((i, index) => (
          <div key={index} className="flex">
            <Link
              to={i.url}
              className={`${
                active === index + 1
                  ? "text-[#17dd1f]"
                  : "800px:text-white text-black"
              } font-bold px-6 cursor-pointer mb-5 800px:mb-0`}
            >
              {i.title}
            </Link>
          </div>
        ))}
    </div>
  );
}

export default Navbar;
