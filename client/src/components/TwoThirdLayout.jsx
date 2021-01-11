import React from "react";
import classnames from "classnames";
import { ToastContainer } from "react-toastify";

const TwoThirdLayOut = () => {
  return (
    <div className={classnames("container is-fluid")}>
      <div className={classnames("columns")}>
        <div className={classnames("column box")}></div>

        <div className={classnames("column box is-two-thirds")}></div>
      </div>
      <ToastContainer pauseOnHover={false} autoClose={3000} />
    </div>
  );
};

export default TwoThirdLayOut;
