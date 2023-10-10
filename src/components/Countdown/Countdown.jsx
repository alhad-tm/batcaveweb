import React, { useState, useEffect } from "react";
import css from "./Countdown.module.css";
import { Link } from "react-router-dom";

const Countdown = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  
  const [seconds, setSeconds] = useState(0);

  // Set the target date and time for the countdown
  const targetDate = new Date("2023-10-18T10:00:00").getTime();

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date().getTime();
      const timeLeft = targetDate - currentDate;

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const newDays = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const newHours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const newMinutes = Math.floor(
        (timeLeft % (1000 * 60 * 60)) / (1000 * 60)
      );
      const newSeconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      setDays(newDays);
      setHours(newHours);
      setMinutes(newMinutes);
      setSeconds(newSeconds);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={css.container}>
      <div className={css.wrap}>
        <div className={css.top}>
          <div className={css.div1}>
            <span>Get Ready to Ignite Your Passion </span>
            <span>The Countdown Begins</span>
          </div>

          {/* timer */}
          <div className={css.countdowntimer}>
            <div className={css.timerbox}>
              <span className={css.timer}>{days}</span>
              <span className={css.timerlabel}>Days</span>
            </div>
            <span className={css.dotspan}>:</span>
            <div className={css.timerbox}>
              <span className={css.timer}>{hours}</span>
              <span className={css.timerlabel}>Hours</span>
            </div>
            <span className={css.dotspan}>:</span>
            <div className={css.timerbox}>
              <span className={css.timer}>{minutes}</span>
              <span className={css.timerlabel}>Minutes</span>
            </div>
            <span className={css.dotspan}>:</span>
            <div className={css.timerbox}>
              <span className={css.timer}>{seconds}</span>
              <span className={css.timerlabel}>Seconds</span>
            </div>
          </div>
        </div>

        <div className={css.bottom}>
          {/* <Link onClick={()=>window.scrollTo(0,0)}  to ="/"><button className={css.btohomebtn}>BACK TO HOME</button> </Link>  */}
        </div>
      </div>
    </div>
  );
};

export default Countdown;
