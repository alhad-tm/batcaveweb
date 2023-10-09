import React, { useEffect, useState } from 'react';
import css from "./YProgressbar.module.css"
import { useLocation } from 'react-router-dom';


const YProgressbar = () => {
    const [scrollPercentage, setScrollPercentage] = useState(0);

    
const location=useLocation()

const isHomePage = location.pathname ==="/"
    
  useEffect(() => {
    const updateScrollPercentage = () => {
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - windowHeight;
      const percentage = (scrollY / totalHeight) * 100;
      setScrollPercentage(percentage);
    };

    window.addEventListener('scroll', updateScrollPercentage);

    return () => {
      window.removeEventListener('scroll', updateScrollPercentage);
    };
  }, []);


  return (
   
    <div className={isHomePage? "" + css.progresscontainer : ""}>
      <div 
        className={css.progress}
        style={{ height: `${scrollPercentage}%` }}>
        </div> 
    </div>
   
  )
}

export default YProgressbar








