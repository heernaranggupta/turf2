import React, { useCallback, useContext, useEffect, useState } from "react";
import { BiCart } from "react-icons/bi";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { Context } from "../data/context";
import styles from "../css/Header.module.css";

const Headers = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(Context);
  const [userName, setUserName] = useState("");

  const fetchUserData = useCallback(async () => {
    if (isLoggedIn) {
      var data = await JSON.parse(localStorage.getItem("turfUserDetails"));
      setUserName(data?.user?.name);
    }
  }, [isLoggedIn]);

  const navbarClickHandler = useCallback(() => {
    document.querySelector(".navbar-burger").addEventListener("click", () => {
      document.querySelector(".navbar-burger").classList.toggle("is-active");
      document.querySelector(".navbar-menu").classList.toggle("is-active");
    });
  }, []);

  useEffect(() => {
    fetchUserData();
    navbarClickHandler();
  }, [fetchUserData, navbarClickHandler]);

  return (
    <nav
      className={classnames(styles.headerWrapper, "navbar")}
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            width="112"
            height="28"
            alt="Logo"
          />
        </a>

        <div
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </div>
      </div>
      <div id="navbarBasicExample" className="navbar-menu">
        {isLoggedIn ? (
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="field is-grouped">
                <div className="navbar-item has-dropdown is-hoverable mx-1">
                  <p
                    className={classnames(
                      "control button navbar-item has-text-white is-capitalized",
                      styles.btnBackGround
                    )}
                  >
                    Hello, {userName}
                  </p>
                  <div className="navbar-dropdown is-boxed">
                    <Link
                      to="/profile"
                      className="navbar-item"
                      href="https://bulma.io/documentation/overview/start/"
                    >
                      Profile
                    </Link>
                    <p
                      onClick={async () => {
                        await localStorage.removeItem("turfUserDetails");
                        setIsLoggedIn(false);
                      }}
                      className="navbar-item is-clickable"
                    >
                      Logout
                    </p>
                  </div>
                </div>

                <Link
                  to="/cart"
                  className={classnames("control button", styles.btnBackGround)}
                >
                  <BiCart size={30} color="#FFF" className="is-clickable" />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="field is-grouped">
                <Link
                  to="/login"
                  className={classnames("control button", styles.btnBackGround)}
                >
                  <span className="has-text-white">Login</span>
                </Link>
                <Link
                  to="/signup"
                  className={classnames("control button", styles.btnBackGround)}
                >
                  <span className="has-text-white">Register</span>
                </Link>
                <Link
                  to="/cart"
                  className={classnames("control button", styles.btnBackGround)}
                >
                  <BiCart size={30} color="#FFF" className="is-clickable" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Headers;
