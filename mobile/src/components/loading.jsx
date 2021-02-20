import React from "react";
import LoadingGif from "../images/animation.gif";

const Loading = ({ text }) => {
  return (
    <div
      style={{
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

export default Loading;
