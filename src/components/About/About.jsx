import React from "react";
import css from "./About.module.css";

const About = () => {
  return (
    <div className={css.container}>
      <div className={css.wrap}>
        <span>ABOUT US</span>
        
        <span>
          Batcave is where car enthusiasts unite. We're more than just a club;
          we're a community fueled by a shared passion for all things
          automotive. With exclusive events, discounts on car services, and a
          network of like-minded enthusiasts, we're your destination for
          unforgettable road adventures and car camaraderie. Join us and
          experience the thrill of the drive at Batcave.
        </span>

        <span>
          The images used are for illustrative purposes only. Batcave does not
          own any intellectual property rights to the above images.
        </span>
      </div>
    </div>
  );
};

export default About;
