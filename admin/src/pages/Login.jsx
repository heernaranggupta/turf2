import React, { useContext, useRef } from "react";
import classnames from "classnames";
import { useLocation, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Context } from "../data/context";
import api from "../config/api";
import headerWithoutToken from "../config/headerWithoutToken";
import styles from "../css/Login.module.css";

const Login = () => {
  const { state } = useLocation();
  const history = useHistory();

  const { setIsLoggedIn } = useContext(Context);
  const phoneRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSignInBtnClicked = () => {
    if (!phoneRef.current.value.trim().length) {
      toast.error("Phone Number Cannot be empty");
      return;
    }
    if (!passwordRef.current.value.trim().length) {
      toast.error("Password Cannot be empty");
      return;
    }

    const values = {
      username: phoneRef.current.value,
      password: passwordRef.current.value,
    };

    axios
      .post(api + "business/login", values, headerWithoutToken)
      .then(async (res) => {
        if (res.data.code === 200) {
          await localStorage.setItem(
            "turfAdminDetails",
            JSON.stringify(res.data.body)
          );
          setIsLoggedIn(true);
          history.push(state?.from || "/");
        }
        if (res.data.code === 404) {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log("error here", err);
        console.log("res", err.response);
        if (err.response.code === 500) {
          toast.error(err.response.data.message);
        }
      });
  };

  return (
    <div className="my-5 mx-3">
      <p
        className={classnames(
          "subtitle is-1 is-capitalized has-text-white has-text-centered"
        )}
      >
        Admin Sign in
      </p>
      <div className="field my-3">
        <div className="control">
          <input
            className={classnames("input", styles.LoginInputs)}
            type="text"
            placeholder="Phone Number"
            required
            ref={phoneRef}
          />
        </div>

        <div className="control">
          <input
            className={classnames("input mt-3", styles.LoginInputs)}
            type="password"
            placeholder="Password"
            required
            ref={passwordRef}
          />
        </div>

        <div className="control">
          <label className="checkbox has-text-white ">
            <input type="checkbox" />
            <span className="is-size-5 ml-3">Keep me signed in</span>
          </label>
        </div>
      </div>

      <div className="has-text-centered my-6">
        <button
          onClick={() => handleSignInBtnClicked()}
          className={classnames(styles.signInBtn, "is-clickable")}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Login;
