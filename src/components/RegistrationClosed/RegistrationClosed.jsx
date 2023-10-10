import React from "react";
import css from "./RegistrationClosed.module.css";
import { Link } from "react-router-dom";

const RegistrationClosed = () => {
  return (
    <div className={css.container}>
      <div className={css.wrap}>
        
        <div className={css.div1}>
          <span>registration closed</span>
          <span>Stay Tuned for Our Next Exciting Membership Opportunity!</span>
        </div>

        <div className={css.div2}>
          {/* <Link onClick={()=>window.scrollTo(0,0)}  to ="/"><button className={css.btohomebtn}>BACK TO HOME</button></Link>   */}
          <span>Follow us on instagram to hop into our giveaway</span>
        </div>
      </div>
    </div>
  );
};

export default RegistrationClosed;
