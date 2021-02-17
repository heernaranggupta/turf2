import React, { useState } from "react";
import classnames from "classnames";
import { useHistory } from "react-router-dom";
import styles from "../css/register.module.css";
import PassImg from "../images/security.svg";
import NextButton from "../components/NextButton";

const Password = () => {
  const history = useHistory();

  const [password, setPassword] = useState("");

  const handleVerifyClick = () => {
    history.push("/turf");
  };
  return (
    <div className="container">
      <div className={classnames("columns")}>
        <div className={classnames("column", styles.FirstColumn)}>
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
