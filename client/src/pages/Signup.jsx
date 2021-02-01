import React, { useContext, useRef } from "react";
import { Link, useLocation, useHistory, Redirect } from "react-router-dom";
import classnames from "classnames";
import {
  AiOutlineGoogle,
  AiFillFacebook,
  AiFillLinkedin,
  AiOutlineTwitter,
} from "react-icons/ai";
import { toast } from "react-toastify";
import { Context } from "../data/context";
import CartRightSideComponent from "../components/CartRightSideComponent";
import styles from "../css/Login.module.css";
import axios from "axios";
import api from "../config/api";
import headerWithoutToken from "../config/headerWithoutToken";

// eslint-disable-next-line no-useless-escape
const EmailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const Signup = () => {
  const { state } = useLocation();
  const history = useHistory();

  const { isLoggedIn, setIsLoggedIn, setUserData, cartId } = useContext(
    Context
  );

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const passwordRef = useRef(null);
  const repeatPasswordRef = useRef(null);

  const handleOnSignUpBtnClicked = () => {
    if (!nameRef.current.value.trim().length) {
      toast.error("Name Cannot be empty");
      return;
    }
    if (!emailRef.current.value.trim().length) {
      toast.error("Email Cannot be empty");
      return;
    }
    if (!EmailRegex.test(String(emailRef.current.value).toLowerCase())) {
      toast.error("Email is not valid");
      return;
    }
    if (!phoneRef.current.value.trim().length) {
      toast.error("Phone Number Cannot be empty");
      return;
    }
    if (!passwordRef.current.value.trim().length) {
      toast.error("Password Cannot be empty");
      return;
    }
    if (!passwordRef.current.value.trim().length > 6) {
      toast.error("Password should have more than 6 characters");
      return;
    }
    if (!repeatPasswordRef.current.value.trim().length) {
      toast.error("Repeat Password Cannot be empty");
      return;
    }
    if (
      passwordRef.current.value.trim() !==
      repeatPasswordRef.current.value.trim()
    ) {
      toast.error("Password did not match");
      passwordRef.current.value = "";
      repeatPasswordRef.current.value = "";
      return;
    }

    const values = {
      name: nameRef.current.value,
      emailId: emailRef.current.value,
      phoneNumber: phoneRef.current.value,
      password: passwordRef.current.value,
      role: "USER",
      cartId: cartId,
    };

    axios
      .post(api + "user/sign-up", values, headerWithoutToken)
      .then(async (res) => {
        console.log(res.data);
        if (res.data.code === 200) {
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
      })
      .catch((err) => {
        console.log(err.message);
        if (err.response.data.code === 500) {
          toast.error("Internal Server error");
        }
        if (err.response.data.code === 400) {
          toast.error(err.response.data.message);
        }
      });
  };

  const SignUpSideComponent = () => {
    return (
      <div className="my-5 mx-3">
        <p
          className={classnames(
            "subtitle is-1 is-capitalized has-text-white has-text-centered"
          )}
        >
          Sign up
        </p>
        <Link
          to={{
            pathname: "/login",
            state: {
              from: state?.from || "/",
            },
          }}
          className={classnames("subtitle is-capitalized has-text-white ")}
        >
          Already have an account ?
          <span className={classnames("has-text-info")}> Sign In !</span>
        </Link>

        <div className="field my-3">
          <div className="control">
            <input
              className={classnames("input", styles.LoginInputs)}
              type="text"
              placeholder="Full Name"
              required
              ref={nameRef}
            />
          </div>

          <div className="control">
            <input
              className={classnames("input", styles.LoginInputs)}
              type="email"
              placeholder="Email"
              required
              ref={emailRef}
            />
          </div>

          <div className="control">
            <input
              className={classnames("input", styles.LoginInputs)}
              type="number"
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
            <input
              className={classnames("input mt-3", styles.LoginInputs)}
              type="password"
              placeholder="Repeat Password"
              required
              ref={repeatPasswordRef}
            />
          </div>
        </div>

        <div className="has-text-centered my-6">
          <button
            onClick={() => handleOnSignUpBtnClicked()}
            className={classnames(styles.signInBtn, "is-clickable")}
          >
            Sign Up
          </button>
        </div>

        <div className={classnames(styles.dividerWrapper)}>
          <div className={classnames(styles.dividerLine)}></div>
          <p className={classnames("has-text-white subtitle")}>
            Or Sign Up With
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
            <SignUpSideComponent />
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

export default Signup;
