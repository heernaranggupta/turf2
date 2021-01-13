import React, { useRef } from "react";
import classnames from "classnames";
import styles from "../css/AddManager.module.css";
import { toast } from "react-toastify";
import axios from "axios";
import api from "../config/api";
import headerWithToken from "../config/headerWithToken.js";

const AddManager = () => {
  const phoneRef = useRef(null);
  const usernameRef = useRef(null);
  const companynameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleAddManagerBtnClicked = () => {
    if (!phoneRef.current.value.trim().length) {
      toast.error("Phone Number Cannot be empty");
      return;
    }
    if (!passwordRef.current.value.trim().length) {
      toast.error("Password Cannot be empty");
      return;
    }
    if (!usernameRef.current.value.trim().length) {
      toast.error("User Name Cannot be empty");
      return;
    }
    if (!companynameRef.current.value.trim().length) {
      toast.error("Comapny Name Cannot be empty");
      return;
    }

    const values = {
      username: usernameRef.current.value,
      phoneNumber: phoneRef.current.value,
      companyName: companynameRef.current.value,
      password: passwordRef.current.value,
      role: "MANAGER",
    };

    axios
      .post(api + "business/signup", values, headerWithToken)
      .then(async (res) => {
        if (res.data.code === 200) {
          window.location = "/";
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
    <div>
      Add Manager Form
      <div className="my-5 mx-3">
        <div className="field my-3">
          <div className="control">
            <input
              className={classnames("input", styles.AddManagerInputs)}
              type="text"
              placeholder="UserName"
              required
              ref={usernameRef}
            />
          </div>

          <div className="control">
            <input
              className={classnames("input", styles.AddManagerInputs)}
              type="text"
              placeholder="Phone Number"
              required
              ref={phoneRef}
            />
          </div>
          <div className="control">
            <input
              className={classnames("input", styles.AddManagerInputs)}
              type="text"
              placeholder="Company Name"
              required
              ref={companynameRef}
            />
          </div>

          <div className="control">
            <input
              className={classnames("input mt-3", styles.AddManagerInputs)}
              type="password"
              placeholder="Password"
              required
              ref={passwordRef}
            />
          </div>
        </div>

        <div className="has-text-centered my-6">
          <button
            onClick={() => handleAddManagerBtnClicked()}
            className={classnames(styles.AddManagerBtn, "is-clickable")}
          >
            Add Manager
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddManager;
