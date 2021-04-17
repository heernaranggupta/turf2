import React from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import style from '../css/About.module.css'

const Footer = () => {
    return (
        <>
            <div className={classnames(style.aboutfooter)}>
                <div className={classnames(style.powerby)}>
                    Powered by <Link onClick={() => window.open("https://www.smartypantstechnologies.com/")} target="_blank">Smarty Pants Technologies</Link>
                </div>
                <div className={classnames(style.pol)}>
                    <Link to="/pricing">Pricing</Link>
                    <Link to="/policy">Privacy Policy</Link>
                    <Link to="/term">Terms & conditions</Link>
                    <Link to="/refund">Cancellation/Refund Policy</Link>
                </div>
            </div>
        </>
    )
}

export default Footer;