import React, { useContext, useLayoutEffect } from "react";
import { BiCart } from "react-icons/bi";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { Context } from "../data/context";
import styles from "../css/Header.module.css";
import logo from "../images/logo.svg";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";

const Headers = () => {
  const {
    isLoggedIn,
    setIsLoggedIn,
    totalSlots,
    userData,
    setUserData,
  } = useContext(Context);

  useLayoutEffect(() => {
    document.querySelector(".navbar-burger").addEventListener("click", () => {
      document.querySelector(".navbar-burger").classList.toggle("is-active");
      document.querySelector(".navbar-menu").classList.toggle("is-active");
    });
  }, []);

  return (
    <nav
      className={classnames(styles.headerWrapper, "navbar")}
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          {/* <p className={classnames("subtitle is-2 has-text-white mt-3",styles.headerlogo)}>Rebounce</p> */}
          <img
            className={classnames(styles.logorebounce)}
            src={logo}
            alt="rebounceLogo"
          />
        </Link>

        <div
          role="button"
          className="navbar-burger has-text-white"
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
              <div className="navbar-item has-dropdown is-hoverable">
                <p
                  className={classnames(
                    "control button navbar-item has-text-white is-capitalized",
                    styles.btnBackGround
                  )}
                >
                  Hello, {userData?.name}
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
                      await localStorage.clear();
                      setIsLoggedIn(false);
                      setUserData(null);
                    }}
                    className="navbar-item is-clickable"
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>

            <div className="navbar-item">
              <Link
                to="/cart"
                className={classnames("control button", styles.btnBackGround)}
              >
                <BiCart size={50} color="#FFF" className="is-clickable" />
                <NotificationBadge count={totalSlots} effect={Effect.SCALE} />
              </Link>
            </div>
          </div>
        ) : (
          <div className="navbar-end">
            <div className="navbar-item">
              <Link
                to="/login"
                className={classnames("control button", styles.btnBackGround)}
              >
                <span className="has-text-white">Login</span>
              </Link>
            </div>
            <div className="navbar-item">
              <Link
                to="/signup"
                className={classnames("control button", styles.btnBackGround)}
              >
                <span className="has-text-white">Register</span>
              </Link>
            </div>
            <div className="navbar-item">
              <Link
                to="/cart"
                className={classnames("control button", styles.btnBackGround)}
              >
                <BiCart size={30} color="#FFF" className="is-clickable" />
                <NotificationBadge count={totalSlots} effect={Effect.SCALE} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Headers;
