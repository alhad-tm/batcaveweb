import React, { useEffect, useState } from "react";
import css from "./YProgressbar.module.css";
import { useLocation } from "react-router-dom";

const YProgressbar = () => {
  // Define state to track scroll percentage
  const [scrollPercentage, setScrollPercentage] = useState(0);

  
  // Get the current location using React Router's useLocation

  const location = useLocation();

  const isHomePage = location.pathname === "/";

  // Set up an effect to update scroll percentage on scroll
  useEffect(() => {
    // Function to calculate and update scroll percentage
    const updateScrollPercentage = () => {
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - windowHeight;
      const percentage = (scrollY / totalHeight) * 100;
      setScrollPercentage(percentage);
    };
    // Add a scroll event listener to the window
    window.addEventListener("scroll", updateScrollPercentage);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", updateScrollPercentage);
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div className={isHomePage ? "" + css.progresscontainer : ""}>
      <div
        className={css.progress}
        style={{ height: `${scrollPercentage}%` }}
      ></div>
    </div>
  );
};

export default YProgressbar;
