import React from "react";
import css from "./Profile.module.css";

const Profile = () => {
  return (
    <div className={css.container}>
      <div className={css.wrap}>
        <div className={css.left}>
          
          <span className={css.pheading}>Personal Details</span>
          <div className={css.line}>
            <span> Name</span>
            <span>JAMES</span>
          </div>
          <div className={css.line}>
            <span> membership id</span>
            <span>6654w34w4</span>
          </div>
          <div className={css.line}>
            <span> mobile number</span>
            <span>8877880101</span>
          </div>
          <div className={css.lines}>
            <span> email id</span>
            <span>contact@invicous.in</span>
          </div>
          <div className={css.lines}>
            <span> instagram id</span>
            <span>batcave.in</span>
          </div>
        </div>

        <div className={css.right}>
          <span className={css.pheading}>Car Details</span>

          <div className={css.line}>
            <span> car registration number</span>
            <span>tn38cy1201</span>
          </div>
          <div className={css.line}>
            <span> make</span>
            <span>6654w34w4</span>
          </div>
          <div className={css.line}>
            <span> model</span>
            <span>8877880101</span>
          </div>
          <div className={css.line}>
            <span> year</span>
            <span>2022</span>
          </div>
          <div className={css.line}>
            <span> color</span>
            <span>white</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
