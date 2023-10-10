import React, { useState, useEffect } from "react";
import css from "./Cards.module.css";
import Card1 from "../../assets/batcave-og-card.svg";
import Blur from "../../assets/blur-blue.svg";
import BlurM from "../../assets/blurmobile.png";
import LArrow from "../../assets/left-arrow.svg";
import RArrow from "../../assets/right-arrow.svg";
import { motion } from "framer-motion";

const Cards = () => {
  const [cards, setCards] = useState(0);

  // const increment = () => {
  //   if (cards<4){
  //   setCards(cards + 1);
  //   }
  // };

  // const decrement = () => {
  //   if (cards > 0) {
  //     setCards(cards - 1);
  //   }
  // };

  // const autoScrollInterval = 3000;

  // useEffect(() => {

  //   const autoScrollTimer = setInterval(() => {
  //     increment();
  //   }, autoScrollInterval);

  //   return () => {
  //     clearInterval(autoScrollTimer);
  //   };
  // }, []);

  const increment = () => {
    setCards((prevCards) => (prevCards < 4 ? prevCards + 1 : 0)); // Cycle back to the first card if at the last card
  };

  const decrement = () => {
    setCards((prevCards) => (prevCards > 0 ? prevCards - 1 : 4)); // Cycle to the last card if at the first card
  };

  // Define the auto-scrolling interval in milliseconds
  const autoScrollInterval = 3000; // 3 seconds

  useEffect(() => {
    // Start auto-scrolling when the component mounts
    const autoScrollTimer = setInterval(() => {
      increment();
    }, autoScrollInterval);

    // Clear the interval when the component unmounts to prevent memory leaks
    return () => {
      clearInterval(autoScrollTimer);
    };
  }, []);

  // set mobile width
  const mobile = window.innerWidth <= 768 ? true : false;

  return (
    <div className={css.container}>
      <div className={css.div1}>
        <span>membership card</span>
      </div>
      <div className={css.div2}>
        <span>BATCAVE OGs</span>
      </div>
      <div className={css.div3}>
        {/* left */}
        <div className={css.leftmiddlewrap}>
          <div className={css.left}>
            <span>BATCAVE OGs</span>
            <div className={css.cardline}></div>
            <div className={css.cities}>
              <span>
                Elevate Your Car Enthusiast Status with the Batcave OGs
                Membership Card. An OG is the Original Gearhead, and This Card
                Grants You Access to Exclusive Events, Savings, and Automotive
                Adventure!
              </span>
            </div>
          </div>

          {/* middle */}
          <div className={css.middle}>
            {/* {mobile?   <img className={css.blurmobile} src={BlurM} alt="" /> : <img className={css.blurdesktop} src={Blur} alt="" /> }       */}
            <div className={css.cardblurbg}>
              <img src={Card1} alt="" />{" "}
            </div>
          </div>
          {/* <div className={css.backline}></div> */}
        </div>

        {/* right */}
        <div className={css.right}>
          {/* top */}
          <div className={css.rtop}>
            <img
              className={`${css.larrow} ${cards === 0 ? css.larrowfade : ""}`}
              onClick={decrement}
              src={LArrow}
              alt=""
            />
            <div className={css.sline}></div>
            <span className={css.featurespan}>Features</span>
            <div className={css.sline}></div>
            <img
              className={`${css.rarrow} ${cards === 4 ? css.rarrowfade : ""}`}
              onClick={increment}
              src={RArrow}
              alt=""
            />
          </div>

          {/* top */}

          {/* <div className={css.cardline}></div> */}
          {/* bottom */}
          <div className={css.bottomwrap}>
            <div className={css.bottomcontent}>
              {cards === 0 && (
                <motion.span
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                >
                  Exclusive Events: Access thrilling car meets, scenic rides,
                  and exclusive gatherings.
                </motion.span>
              )}

              {cards === 1 && (
                <motion.span
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 2 }}
                >
                  Savings on Services: Enjoy significant discounts on car
                  maintenance and accessories.
                </motion.span>
              )}

              {cards === 2 && (
                <motion.span
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 2 }}
                >
                  Community Connection: Connect with like-minded car enthusiasts
                  and make lifelong friends.
                </motion.span>
              )}

              {cards === 3 && (
                <motion.span
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 2 }}
                >
                  Personalized Perks: Tailored benefits based on your specific
                  interests.
                </motion.span>
              )}

              {cards === 4 && (
                <motion.span
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.4 }}
                >
                  Lifetime Access: Enjoy lifetime access to club facilities for
                  camaraderie and car passion.
                </motion.span>
              )}
            </div>
          </div>

          {/* bottom */}
        </div>
      </div>
      {/* here */}

      <div className={css.div4}>
        <div className={css.newbottom}>
          <span>Pricing</span>
          {/* <span>₹ 49,999 /- (Lifetime access)</span> */}
          <span>₹ 14,999 /- (Lifetime access)</span>
          <div className={css.pricingline}></div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
