import React, { useState, useEffect } from "react";
import css from "./Gift.module.css";
import Gift1 from "../../assets/new-thar.svg";
import Gift2 from "../../assets/gift2.svg";
import Gift3 from "../../assets/gift33.png";

import { motion ,AnimatePresence} from "framer-motion";
const Gift = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Define your content, images, and spans here
  const content = [
    {
      text: "Mahindra Thar",
      text2: "Diesel, 117 BHP 300NM for LX RWD Worth 16,00,000/-",
      text3: "2 lucky members",
      image: Gift1,
    },
    {
      text: "MSI Stealth 16 Mercedes-AMG",
      text2: "MSI AMG Stealth 16 Laptops for i9-13900H, 32GB, RTX4060 8GB Worth 2,89,990/-",
      text3: "5 lucky members",
      image: Gift2,
    },
    {
      text: "All-expenses-paid BMW Museum trip",
      text2: "Munich, Germany, for German Autobahn Visit Worth 2,50,000/- ",
      text3: "10 lucky members",
      image: Gift3,
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % content.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? content.length - 1 : prevIndex - 1
    );
  };

  const handlePaginationClick = (index) => {
    setCurrentIndex(index);
  };

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     handleNext();
  //   }, 4000); 

  //   return () => clearInterval(timer); 
  // }, []);

  

  return (
    <div className={css.container}>
      <div className={css.wrap}>
        <div className={css.div1}>
          <span>JOIN BATCAVE OGs AND WIN BIG!</span>
        </div>

        <div className={css.div2}>
          {/* <img
        
            className={css.imgauto}
            src={content[currentIndex].image}
            alt=""
          /> */}
          <AnimatePresence >
  <motion.img
    key={currentIndex}
    className={css.imgauto}
    src={content[currentIndex].image}
    alt=""
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    // transition={{ duration: 1.5 }} /
    // mode="wait" 
    // exit={{ opacity: 0 }} 
    exit={{
      transition: { duration: 0.5 }, // Specify the exit animation duration
    }}
    transition={{ duration: 1 , scale:1}} 
    // mode="crossfade"
  />
</AnimatePresence>
          
        </div>

        <div className={css.div3}>

          <div className={css.leftmiddlewrap}>
          <div className={css.left}>
            <span>{content[currentIndex].text}</span>
            <span>{content[currentIndex].text2}</span>
            <span>{content[currentIndex].text3}</span>
          </div>

          {/* <span>Heading</span>
        <span>This is the description of the car</span> */}

          <div className={css.middle}>
            <span>GIVEAWAY PRICES</span>

            <div className={css.pagination}>
              {content.map((_, index) => (
                <React.Fragment key={index}>
                  <svg
                   onClick={() => handlePaginationClick(index)}
                 
                    className={index === currentIndex ? css.active : ""}
                   
                    width="14"
                    height="13"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="Group 33773">
                      <circle
                        id="Ellipse 10"
                        cx="7"
                        cy="6.5"
                        r="6.25"
                        stroke="#666666"
                        stroke-width="0.5"
                      />
                      <circle
                        id="Ellipse 9"
                        cx="7"
                        cy="6.5"
                        r="3.5"
                        fill="#666666"
                      />
                    </g>
                  </svg>
                  {index < content.length - 1 && (
                    <div className={css.linebtw}></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          </div>

          <div className={css.right}>
            <span>How to Enter?</span>
            <span className={css.rspan}>1. Must be a Batcave OG member.</span>
            <span className={css.rspan}>2. Follow @batcave.in on Instagram.</span>
            {/* <span className={css.rspan}>3. Like our giveaway post.</span>
            <span className={css.rspan}>4. Tag any 3 friends in the comments section below.</span>
            <span className={css.rspan}>5. Share our giveaway post in your Instagram story and be sure to tag us.</span> */}
            <span className={css.rspan}>3.Like our giveaway post, tag three friends in the comments, and share the giveaway post in your Instagram story while tagging us.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gift;
