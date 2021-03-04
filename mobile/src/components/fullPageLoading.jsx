import React from "react";

import LoadingGif from "../images/soccer.gif";

const FullPageLoading = ({ text }) => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <img src={LoadingGif} alt="Loading Animations" />
      <p className="subtitle has-text-black">{text}</p>
    </div>
  );
};

export default FullPageLoading;
