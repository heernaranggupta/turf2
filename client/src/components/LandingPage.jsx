import React from "react";

const LandingPage = () => {
    const handleScrollToStats = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        })
   }
  return (
    <div>
      {/* <div className="has-text-centered" style={{"backgroundColor": "none"}} id="booknow">
        <button className="button" onClick={() => handleScrollToStats()}>Book Now</button>
      </div> */}
    </div>
  );
};
export default LandingPage;
