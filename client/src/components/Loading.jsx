import React, { useContext } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Context } from "../data/context";

const Loading = () => {
  const { isLoading } = useContext(Context);
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ClipLoader color="#0AF" loading={isLoading} size={150} />
    </div>
  );
};

export default Loading;
