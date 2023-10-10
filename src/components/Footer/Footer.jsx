import React from "react";
import css from "./Footer.module.css";
import Insta from "../../assets/instagram.svg";
// import Phone from "../../assets/phone.svg"
import Whatsapp from "../../assets/whatsapp.svg";
import Mail from "../../assets/mail.svg";

const Footer = () => {
  
  const phoneNumber = "+918877880101"; // Replace with the desired phone number
  const message = "Hello....."; // Replace with your message

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className={css.container}>
      <div className={css.wrap}>
        <div className={css.left}>
          <span>©batcave2023</span>
        </div>

        {/* <div className={css.middle}>hi</div> */}

        <div className={css.right}>
          <a
            href="https://www.instagram.com/batcave.in/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            <img src={Insta} alt="" />{" "}
          </a>

          {/* <div className={css.tooltipcontainer}>
            <img onclick="window.open('tel:+91 8877880101');" className={css.phone} src={Phone} alt="" />
            <span className={css.tooltip}>+91 8877880101</span>
            </div> */}
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <img src={Whatsapp} alt="" />{" "}
          </a>

          <a href="mailto: support@batcave.co.in.">
            {" "}
            <img src={Mail} alt="" />{" "}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
