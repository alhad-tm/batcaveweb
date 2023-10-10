import React from "react";

import Main from "../Main/Main";
import MemberProgress from "../MemberProgress/MemberProgress";
import Cards from "../Cards/Cards";
import About from "../About/About";
import Gift from "../Gift/Gift";


const Home = () => {
  return (
    <div>
      <Main />
      <MemberProgress />
      <Cards />
      <Gift />
      <About />
    </div>
  );
};

export default Home;
