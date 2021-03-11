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
                            <p>Rebounce Turf is Surat's largest and tallest Turf! There are 3-a side turfs that be booked at hourly basis. Turf 1 is the parking side turf, Turf 2 is the one by the stands, Turf 3 is the one by the food court and viewing container. Now book online for hassle free unlimited fun.</p>
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