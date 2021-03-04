import React from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import style from '../css/About.module.css'

const Footer = () => {
    return (
        <>
            <div className={classnames(style.aboutfooter)}>
                <Link to="/policy">Privacy Policy</Link>
                <Link to="/term">Terms & conditions</Link>
                <Link to="/refund">Cancellation/Refund Policy</Link>
            </div>
        </>
    )
}

export default Footer;