import React from "react";
import gif from "../images/loder.gif";

const LandingPage = () => {
    const handleScrollToStats = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        })
   }
  return (
    <div>
      <div className="has-text-centered"  id="booknow">
        {/* <img src={gif} /> */}
        {/* <button className="button" onClick={() => handleScrollToStats()}>Book Now</button> */}
      </div>
    </div>
  );
};
export default LandingPage;
