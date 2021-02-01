import React, { useContext, useRef } from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import classnames from "classnames";
import {
  AiOutlineGoogle,
  AiFillFacebook,
  AiFillLinkedin,
  AiOutlineTwitter,
} from "react-icons/ai";
import { Context } from "../data/context";
import CartRightSideComponent from "../components/CartRightSideComponent";
import styles from "../css/Login.module.css";
import { toast } from "react-toastify";
import axios from "axios";
import api from "../config/api";
import headerWithoutToken from "../config/headerWithoutToken";

const Login = () => {
  const { state } = useLocation();
  const history = useHistory();

  const { isLoggedIn, setIsLoggedIn, setUserData, cartId } = useContext(
    Context
  );
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
      cartId: cartId,
    };

    axios
      .post(api + "user/login", values, headerWithoutToken)
      .then(async (res) => {
        if (res.data.code === 200) {
          console.log(res.data);
          await localStorage.setItem(
            "turfUserDetails",
            JSON.stringify(res.data.body)
          );
          if (localStorage.getItem("turfCart") !== null) {
            localStorage.removeItem("turfCart");
          }
          setUserData(res.data?.body?.user);
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

  const LoginSideComponent = () => {
    return (
      <div className="my-5 mx-3">
        <p
          className={classnames(
            "subtitle is-1 is-capitalized has-text-white has-text-centered"
          )}
        >
          Sign in
        </p>
        <Link
          to={{
            pathname: "/signup",
            state: {
              from: state?.from || "/",
            },
          }}
          className={classnames("subtitle is-capitalized has-text-white ")}
        >
          New User?
          <span className={classnames("has-text-info")}>
            {" "}
            Create An Account
          </span>
        </Link>

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

        <div className={classnames(styles.dividerWrapper)}>
          <div className={classnames(styles.dividerLine)}></div>
          <p className={classnames("has-text-white subtitle")}>
            Or Sign In With
          </p>
          <div className={classnames(styles.dividerLine)}></div>
        </div>

        <div className={classnames("my-6", styles.socialIconsWrapper)}>
          <AiOutlineGoogle size={40} color="#FFF" />
          <AiFillFacebook size={40} color="#FFF" />
          <AiFillLinkedin size={40} color="#FFF" />
          <AiOutlineTwitter size={40} color="#FFF" />
        </div>
      </div>
    );
  };

  if (isLoggedIn) {
    return <Redirect to={state?.from || "/"} />;
  }

  return (
    <div className={classnames("section", styles.LoginWrapper)}>
      <div
        className={classnames("container is-fluid", styles.overRideContainer)}
      >
        <div className={classnames(" columns mt-5", styles.LoginColumns)}>
          <div className={classnames("column box", styles.LoginLeftWrapper)}>
            <LoginSideComponent />
          </div>
          <div
            className={classnames(
              "column is-two-thirds",
              styles.LoginCartWrapper
            )}
          >
            <CartRightSideComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
