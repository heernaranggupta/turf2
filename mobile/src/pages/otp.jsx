import React, { useContext, useState } from "react";
import classnames from "classnames";
import { useHistory } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import OtpInput from "react-otp-input";
import { toast } from "react-toastify";
import styles from "../css/register.module.css";
import LandingImage from "../images/landing.svg";
import { Context } from "../data/context";
import NextButton from "../components/NextButton";

const Otp = () => {
  const history = useHistory();

  const { phoneNumber } = useContext(Context);
  const [opt, setOpt] = useState("");

  if (phoneNumber.length !== 10) {
    history.push("/register");
  }

  const handleVerifyClick = () => {
    if (opt.length !== 6) {
      toast.error("Enter Valid Otp");
      return;
    }
    history.push("/turf");
  };
  return (
    <div className="container">
      <div className={classnames("columns")}>
        <div className={classnames("column", styles.FirstColumn)}>
          <BsArrowLeft
            size={30}
            color="#00CB78"
            onClick={() => history.goBack()}
          />
          <div className={classnames(styles.LandingImage)}>
            <img src={LandingImage} alt="Landing" />
          </div>
        </div>
        <div className={classnames("column", styles.SecondColumn)}>
          <div className={classnames(styles.text)}>
            <p className="is-size-5 has-text-weight-bold">Enter OTP</p>
            <p>OTP has been send to {phoneNumber}</p>
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
