import React from "react";
import classnames from "classnames";
import style from '../css/About.module.css'
import abouting from '../images/iPhone X.svg'
import Footer from "../components/footer";

const About = () => {
    return (
        <>
            <section className={classnames(style.addRelationalBackground)}>
                <div className={classnames(style.ProfileLeftColumn)}>
                    <div className={classnames(style.detailphoto)}>
                        <div className={classnames(style.aboutdetails)}>
                            <h2>About Us</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Condimentum diam orci pretium a pharetra, feugiat cursus. Dictumst risus, sem egestas odio cras adipiscing vulputate. Nisi, risus in suscipit non. Non commodo volutpat, pharetra, vel.</p>
                        </div>
                        <div className={classnames(style.aboutp)}>
                            <img src={abouting} alt="" />
                        </div>
                    </div>
                </div>
                {/* <div className={classnames(style.aboutfooter)}>
                    <Link to="/policy">Privacy Policy</Link>
                    <Link to="/term">Terms & conditions</Link>
                    <Link to="/refund">Cancellation/Refund Policy</Link>
                </div> */}
                <Footer />
            </section>
        </>
    )
}

export default About;