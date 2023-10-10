import React, { useState } from "react";
import css from "./Header.module.css";
// import Logo from "../../assets/VectorBat.svg"
import Logo from "../../assets/batmainlogo-withoutshadow.svg";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [state, setState] = useState(false);
  
  const location = useLocation();

  let buttonContent, buttonLink;

  if (location.pathname === "/") {
    buttonLink = "/register";
  } else {
    buttonLink = "/";
  }

  const headerContent =
    location.pathname === "/" ? (
      <button className={css.registermainbtn}>register</button>
    ) : (
      <button className={css.registermainbtn2}>back to home</button>
    );

  const scrollDown = () => {
    window.scrollY >= 1 ? setState(true) : setState(false);
  };

  window.addEventListener("scroll", scrollDown);

  return (
    <div className={state ? css.newcontainer : css.container}>
      <div className={css.left}>
        <Link to="/">
          {" "}
          <img onClick={() => window.scrollTo(0, 0)} src={Logo} alt="" />{" "}
        </Link>
      </div>

      <div className={css.right}>
        {/* <Link to="/register"><button  className={css.registermainbtn}>REGISTER</button> </Link>     */}
        <Link onClick={() => window.scrollTo(0, 0)} to={buttonLink}>
          {headerContent}{" "}
        </Link>
      </div>
    </div>
  );
};

export default Header;
