import React, { useContext } from "react";
import classnames from "classnames";
import { Redirect, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { BsArrowLeft } from "react-icons/bs";
import axios from "axios";
import styles from "../css/register.module.css";
import SoccerImg from "../images/soccer.svg";
import IndiaFlag from "../images/india-flag.png";
import { Context } from "../data/context";
import NextButton from "../components/NextButton";
import api from "../config/api";
import headerWithoutToken from "../config/headerWithoutToken";
import FullPageLoading from "../components/fullPageLoading";

const Register = () => {
  const history = useHistory();

  const {
    phoneNumber,
    setphoneNumber,
    token,
    isLoggedIn,
    setIsLoading,
    isLoading,
  } = useContext(Context);

  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      handleOnPhoneSubmit();
    }
  };

  const handleOnPhoneSubmit = () => {
    if (phoneNumber.length !== 10) {
      toast.error("Enter Valid Phone Number");
      return;
    }
    setIsLoading(true);
    const data = {
      countryCode: "+91",
      phoneNumber: phoneNumber,
      isUpdate: true,
    };
    axios
      .post(api + "common/generate-otp", data, headerWithoutToken)
      .then((res) => {
        console.log(res);
        history.push("/otp");
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
    return <FullPageLoading text="Sending OTP" />;
  }
  return (
    <div className="container">
      <div className={classnames("columns")}>
        <div className={classnames("column firstColumn", styles.FirstColumn)}>
          <BsArrowLeft
            className="is-clickable"
            size={30}
            color="#00CB78"
            onClick={() => history.push("/")}
          />
          <div className={classnames(styles.LandingImage)}>
            <img src={SoccerImg} alt="Landing" />
          </div>
        </div>
        <div className={classnames("column", styles.SecondColumn)}>
          <div className={classnames(styles.text)}>
            <p className="is-size-5 has-text-weight-bold">
              What's your number?
            </p>
            <p>We'll text a code to verify your phone</p>
          </div>

          <div className={classnames("field mt-6")} style={{ width: "100%" }}>
            <p className="control has-icons-left">
              <input
                className="input"
                type="number"
                placeholder="Eg: 91060 54xxx"
                value={phoneNumber}
                onChange={(event) => setphoneNumber(event.target.value)}
                onKeyDown={onEnterPress}
              />
              <span className="icon is-small is-left">
                <img src={IndiaFlag} alt="India Flag" />
              </span>
            </p>
          </div>
          <NextButton title="Submit" onClickHandler={handleOnPhoneSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Register;
