import React, { useContext, useState } from "react";
import classnames from "classnames";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Context } from "../data/context";
import { FaWhatsapp } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isLoggedIn, name } = useContext(Context);

  if (isLoggedIn) {
    return (
      <div
        className={classnames(
          "dropdown is-right",
          isMenuOpen ? "is-active" : ""
        )}
      >
        <div
          className="dropdown-trigger is-clickable"
          onClick={() => setIsMenuOpen((old) => !old)}
        >
          <div aria-haspopup="true" aria-controls="dropdown-menu">
            <span className="has-text-white">
              {isMenuOpen ? (
                <AiOutlineClose size={25} />
              ) : (
                  <AiOutlineMenu size={25} />
                )}
            </span>
            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </div>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            <Link to="/" className="dropdown-item">
              <span>Hey, </span>
              <span className="has-text-weight-bold">{name}</span>
            </Link>
            <Link to="/date" className="dropdown-item is-clickable">
              Book Slots
            </Link>
            <Link to="/history" className="dropdown-item is-clickable">
              View Bookings
            </Link>
            <hr className="dropdown-divider" />
            <Link to="logout" className="dropdown-item is-clickable">
              Logout
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="call-whatsapp-icon">
        <Link to="/register" className="has-text-white is-clickable">
          Login / Register
        </Link>
        <div style={{ display: "grid", justifyContent: "flex-end" }}>
          <FaWhatsapp
            className="is-clickable mt-4 mx-3"
            size={30}
            color="#FFF"
            onClick={() => {
              window.open(
                "https://api.whatsapp.com/send?phone=919106054633&text=Hi,%20I%20Would%20Like%20to%20Book%20Turf%20Ground%20@Rebounce",
                "_blank"
              );
            }}
          />
          <FiPhoneCall
            className="is-clickable mt-4 mx-3"
            size={30}
            color="#FFF"
            onClick={() => {
              window.open(
                "tel:919106054633",
                "_blank"
              );
            }}
          />
        </div>
      </div>
    );
  }
};

export default Header;
