import React, { useContext } from "react";
import classnames from "classnames";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { BsArrowLeft } from "react-icons/bs";
import styles from "../css/register.module.css";
import SoccerImg from "../images/soccer.svg";
import IndiaFlag from "../images/india-flag.png";
import { Context } from "../data/context";
import NextButton from "../components/NextButton";

const Register = () => {
  const history = useHistory();

  const { phoneNumber, setphoneNumber, name, setName } = useContext(Context);

  const handleOnPhoneSubmit = () => {
    if (name.trim() === "") {
      toast.error("Enter Valid Name");
      setName("");
      return;
    }
    if (phoneNumber.length !== 10) {
      toast.error("Enter Valid Phone Number");
      return;
    }
    history.push("/otp");
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
            <p className="control has-icons-left">
              <input
                className="input"
                type="number"
                placeholder="Eg: 91060 54xxx"
                value={phoneNumber}
                onChange={(event) => setphoneNumber(event.target.value)}
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
