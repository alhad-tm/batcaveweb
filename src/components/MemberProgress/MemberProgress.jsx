import React, { useState,useEffect,useRef } from 'react'
import css from "./MemberProgress.module.css"
import { Link } from 'react-router-dom';

const MemberProgress = () => {


    const [isVisible, setIsVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const progressBarRef = useRef(null);
  
    useEffect(() => {
      const options = {
        threshold: 0.5, // Trigger when at least 50% of the element is visible
      };
  
      const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting);
      }, options);
  
      if (progressBarRef.current) {
        observer.observe(progressBarRef.current);
      }
  
      return () => {
        if (progressBarRef.current) {
          observer.unobserve(progressBarRef.current);
        }
      };
    }, []);
  
    useEffect(() => {
      if (isVisible) {
        // Animate the progress bar to fill around 50% over 2 seconds
        let start = 0;
        const end = 70;
        const duration = 1600; 
  
        const animate = () => {
          const currentTime = Date.now();
          const elapsedTime = currentTime - start;
          const progress = Math.min(1, elapsedTime / duration);
  
          setProgress(progress * end);
  
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
  
        start = Date.now();
        requestAnimationFrame(animate);
      }
    }, [isVisible]);
  
    const containerStyle = {
       // Adjust the width of the container as needed
      height: '3px', // Adjust the height of the container as needed
      backgroundColor: 'rgba(54, 57, 56, 1)', // Grey background color for the container
      position: 'relative',
    };
  
    const fillStyle = {
      width: `${progress}%`, // Dynamically set the width based on progress
      height: '100%', // Match the height of the container
       // Blue fill color for progress
      transition: 'width 0.5s ease-in-out', // Add a smooth transition effect
    };
  return ( 
    
        <div className={css.container}>
            <div className={css.wrap}>
                <div className={css.div1}>
                    <span>Don't Miss Out - Join the Fast Lane to 10,000!</span>
                </div>

               
                <div className={css.progresscontainer}style={containerStyle}ref={progressBarRef}>
        {isVisible && ( <div className={css.progressfill} style={fillStyle}></div>)}
      </div>

 <Link to="/countdown"> <button className={css.registernowbtn}>REGISTER NOW</button>  </Link>

        </div>
      
    </div>
  )
}

export default MemberProgress
