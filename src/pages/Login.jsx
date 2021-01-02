import React, { useState, useContext } from "react";
import { Redirect, useLocation } from "react-router-dom";
import classnames from "classnames";
import { Context } from "../data/context";
import CartRightSideComponent from "../components/CartRightSideComponent";

const Login = () => {
  // eslint-disable-next-line no-unused-vars
  const [redirectTo, setRedirectTo] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const { setIsLoggedIn } = useContext(Context);

  const { state } = useLocation();

  if (redirectTo) {
    return <Redirect to={state?.from || "/"} />;
  }

  return (
    <div className={classnames("section")}>
      <div className={classnames("container")}>
        <div className={classnames(" columns mt-5")}>
          Login
          <div className={classnames("column is-two-thirds")}>
            <CartRightSideComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
