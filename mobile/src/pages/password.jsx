import React, { useContext, useState } from "react";
import classnames from "classnames";
import axios from "axios";
import { toast } from "react-toastify";
import { Redirect, useHistory } from "react-router-dom";
import styles from "../css/register.module.css";
import PassImg from "../images/security.svg";
import NextButton from "../components/NextButton";
import { Context } from "../data/context";
import api from "../config/api";
import headerWithoutToken from "../config/headerWithoutToken";
import FullPageLoading from "../components/fullPageLoading";

const Password = () => {
  const history = useHistory();

  const {
    token,
    isLoggedIn,
    name,
    setName,
    phoneNumber,
    setIsLoggedIn,
    setToken,
    setIsLoading,
    isLoading,
  } = useContext(Context);
  const [password, setPassword] = useState("");

  const handleVerifyClick = () => {
    if (name.trim() === "") {
      toast.error("Enter Valid Name");
      setName("");
      return;
    }
    if (password.trim() === "") {
      toast.error("Enter Valid Password");
      setPassword("");
      return;
    }

    setIsLoading(true);

    const data = {
      name: name,
      password: password,
      phoneNumber: phoneNumber,
      countryCode: "+91",
      role: "USER",
      cartId: "",
    };
    axios
      .post(api + "user/sign-up", data, headerWithoutToken)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.body.token);
        localStorage.setItem("user", JSON.stringify(res.data.body.user));
        setIsLoggedIn(true);
        setToken(res.data.body.token);
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
        console.log(error.message);
        console.log(error?.response?.data?.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (token && isLoggedIn) {
    return <Redirect to="/" />;
  }
  if (!phoneNumber) {
    return <Redirect to="/register" />;
  }
  if (isLoading) {
    return <FullPageLoading />;
  }
  return (
    <div className="container">
      <div className={classnames("columns")}>
        <div className={classnames("column firstColumn", styles.FirstColumn)}>
          <div className={classnames(styles.LandingImage)}>
            <img src={PassImg} alt="Security" />
          </div>
        </div>
        <div className={classnames("column", styles.SecondColumn)}>
          <div className={classnames(styles.text)}>
            <p className="is-size-5 has-text-weight-bold">Create Password</p>
            <p>Secure password is key to privacy.</p>
          </div>

          <div className="field mt-6" style={{ width: "100%" }}>
            <p className="control my-3">
              <input
                className="input"
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </p>
            <p className="control my-3">
              <input
                className="input"
                type="password"
                placeholder="Create Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </p>
          </div>

          <NextButton
            title="Create Password"
            onClickHandler={handleVerifyClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Password;
