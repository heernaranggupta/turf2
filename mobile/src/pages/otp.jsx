import React, { useContext, useState } from "react";
import classnames from "classnames";
import { Link, Redirect, useHistory } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import OtpInput from "react-otp-input";
import { toast } from "react-toastify";
import axios from "axios";
import styles from "../css/register.module.css";
import LandingImage from "../images/landing.svg";
import { Context } from "../data/context";
import NextButton from "../components/NextButton";
import api from "../config/api";
import headerWithoutToken from "../config/headerWithoutToken";
import FullPageLoading from "../components/fullPageLoading";

const Otp = () => {
  const history = useHistory();

  const {
    phoneNumber,
    token,
    setToken,
    isLoggedIn,
    setIsLoggedIn,
    setIsLoading,
    isLoading,
    setUserData,
  } = useContext(Context);
  const [opt, setOpt] = useState("");

  if (phoneNumber.length !== 10) {
    history.push("/register");
  }

  const handleVerifyClick = () => {
    if (opt.length !== 6) {
      toast.error("Enter Valid Otp");
      return;
    }

    setIsLoading(true);
    const data = {
      countryCode: "+91",
      phoneNumber: phoneNumber,
      otp: opt,
      isBusiness: false,
      isUpdate: true,
    };

    axios
      .post(api + "common/validate-otp", data, headerWithoutToken)
      .then((res) => {
        console.log(res.data);

        if (res.data.body.otpStatus === "INVALID") {
          toast.error("Incorrect OTP");
          return;
        }
        if (res.data.body.otpStatus === "VALID") {
          if (res.data.body.userStatus === "EXISTINGUSER") {
            localStorage.setItem("token", res.data.body.token);
            localStorage.setItem("user", JSON.stringify(res.data.body.user));
            setIsLoggedIn(true);
            setToken(res.data.body.token);
            setUserData(res.data.body.user);
            history.push("/");
          }
          if (res.data.body.userStatus === "USERDOESNOTEXIST") {
            history.push("/password");
          }
        }
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

  if (isLoading) {
    return <FullPageLoading text="Verifying OTP" />;
  }
  return (
    <div className="container">
      <div className={classnames("columns")}>
        <div className={classnames("column firstColumn", styles.FirstColumn)}>
          <BsArrowLeft
            className="is-clickable"
            size={30}
            color="#00CB78"
            onClick={() => history.push("/register")}
          />
          <div className={classnames(styles.LandingImage)}>
            <img src={LandingImage} alt="Landing" />
          </div>
        </div>
        <div className={classnames("column", styles.SecondColumn)}>
          <div className={classnames(styles.text)}>
            <p className="is-size-5 has-text-weight-bold">Enter OTP</p>
            <p>OTP has been send to {phoneNumber}</p>
            <Link to="/register">Edit Phone Number</Link>
          </div>

          <OtpInput
            shouldAutoFocus
            isInputNum
            containerStyle={{ width: "100%" }}
            className={styles.otpWrapper}
            value={opt}
            onChange={(event) => setOpt(event)}
            numInputs={6}
          />

          <NextButton title="Verify" onClickHandler={handleVerifyClick} />
        </div>
      </div>
    </div>
  );
};

export default Otp;
