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
      // Animate the progress bar to fill to 70% over a constant duration
      const start = Date.now();
      const end = start + 2200; // 

      const animate = () => {
        const currentTime = Date.now();
        const progressValue = Math.min(1, (currentTime - start) / (end - start)) * 70; // Constant timing

        setProgress(progressValue);

        if (progressValue < 70) {
          requestAnimationFrame(animate);
        }
      };

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
      transition: 'width 3.5s ease-in-out', // Add a smooth transition effect
    };

      // Determine whether to apply the glow effect based on progress
  // const shouldApplyGlow = isVisible;
  return ( 
    
        <div className={css.container}>
            <div className={css.wrap}>
                <div className={css.div1}>
                    <span>Don't Miss Out - Join the Fast Lane to 10,000!</span>
                </div>

               
                <div          className={css.progresscontainer}
                style={containerStyle}ref={progressBarRef}>
        {isVisible && ( <div className={css.progressfill} style={fillStyle}></div>)}
      </div>

 <Link to="/countdown"> <button className={css.registernowbtn}>REGISTER NOW</button>  </Link>

        </div>
      
    </div>
  )
}

export default MemberProgress
