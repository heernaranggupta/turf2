import React from "react";
import classnames from "classnames";
import { BsArrowLeft } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";
import styles from "../css/about.module.css";
import { Link, useHistory } from "react-router-dom";
import Header from "../components/header";
import aboutimg from "../images/Image.png"
import Logo from "../images/logo.png";

const AboutUs = () => {

    const history = useHistory();


    return (
        <>
            <div className="container">
                <div className={classnames("columns", styles.columns)}>
                    <div className={classnames("column", styles.FirstColumn)}>
                        <div className={classnames(styles.bookingsHeaderIcons)}>
                            <BsArrowLeft
                                className="is-clickable"
                                size={30}
                                color="#FFF"
                                onClick={() => history.push("/")}
                            />
                            <div className={classnames(styles.headerlogo)}>
                                <img src={Logo} alt="" />
                            </div>
                            <div>
                                <FaWhatsapp
                                    className="is-clickable mr-3"
                                    size={30}
                                    color="#FFF"
                                    onClick={() => {
                                        window.open(
                                            "https://api.whatsapp.com/send?phone=919106054633&text=Hi,%20I%20Would%20Like%20to%20Book%20Turf%20Ground%20@Rebounce",
                                            "_blank"
                                        );
                                    }}
                                />
                                <Header />
                            </div>
                        </div>
                    </div>
                    <div className={classnames(styles.aboutusdetail)}>
                        <h2>About Us</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Condimentum diam orci pretium a pharetra, feugiat cursus. Dictumst risus, sem egestas odio cras adipiscing vulputate. Nisi, risus in suscipit non. Non commodo volutpat, pharetra, vel.</p>
                    </div>
                    <div className={classnames(styles.aboutusimg)}>
                        <img src={aboutimg} alt="" />
                        <div className={classnames(styles.aboutuslinks)}>
                            <Link to="/privacy">Privacy Policy</Link>
                            <Link to="/term">Terms & conditions</Link>
                            <Link to="/refund">Cancellation/Refund Policy</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AboutUs;