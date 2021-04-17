import React from "react";
import classnames from "classnames";
import style from '../css/Pricing.Module.css'
import Footer from "./footer";

const Pricing = () => {
    return (
        <>
            <section className={classnames(style.addRelationalBackground)}>
                <div className={classnames(style.ProfileLeftColumn)}>
                    <div style={{textAlign:"center"}}>
                        <h2>Turf Pricing</h2>
                    </div>
                    <div className={classnames(style.pricedate)}>
                        <div className={classnames(style.priceday)}>
                            <h3>Monday</h3>
                            <h3>Tuesday</h3>
                            <h3>Wednesday</h3>
                            <h3>Thrusday</h3>
                            <h3>Friday</h3>
                            <h3>Saturday</h3>
                            <h3>Sunday</h3>
                        </div>
                        <div className={classnames(style.priceprice)}>
                            <h3>₹ 320</h3>
                            <h3>₹ 420</h3>
                            <h3>₹ 520</h3>
                            <h3>₹ 520</h3>
                            <h3>₹ 520</h3>
                            <h3>₹ 720</h3>
                            <h3>₹ 720</h3>
                        </div>
                    </div>
                    <div className={classnames(style.pricetext)}>
                        <p>The above price is for 30 minute slote.</p>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Pricing;