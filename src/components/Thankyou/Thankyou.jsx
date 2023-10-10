import React, { useEffect, useState } from "react";
import css from "./Thankyou.module.css";
import { Link } from "react-router-dom";
import backgroundImage from "../../assets/main-bg.png";

const Thankyou = () => {
  // control whitespace before bgimage loads

  
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  useEffect(() => {
    const image = new Image();
    image.src = backgroundImage;
    image.onload = handleImageLoad;
  }, []);

  return (
    <div
      onLoad={handleImageLoad}
      className={`${css.container} ${imageLoaded ? css.loaded : ""}`}
    >
      <div className={css.wrap}>
        <div className={css.div1}>
          <span>THANK YOU</span>
          <span>
            Your Welcome Kit is on the Way - Get Ready for an Exciting Journey
            with Us!
          </span>
        </div>

        <div className={css.div2}>
          {/* <Link onClick={()=>window.scrollTo(10,0)} to ="/"><button className={css.btohomebtn}>BACK TO HOME</button> </Link>  */}
          <span>Follow us on instagram to hop into our giveaway</span>
        </div>
      </div>
    </div>
  );
};

export default Thankyou;
