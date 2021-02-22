import React, { useContext, useState } from "react";
import classnames from "classnames";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Context } from "../data/context";

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
      <Link to="/register" className="has-text-white is-clickable">
        Login / Register
      </Link>
    );
  }
};

export default Header;
