import React from "react";
import classnames from "classnames";
import Carousel from "react-multi-carousel";
import { useHistory } from "react-router-dom";
import NextButton from "../components/NextButton";
import Header from "../components/header";

import "react-multi-carousel/lib/styles.css";
import styles from "../css/home.module.css";

import Logo from "../images/logo.png";
import Slider2 from "../images/index_2.png";
import Slider3 from "../images/index_3.png";
import Slider4 from "../images/index_4.png";
import Slider5 from "../images/index_5.png";
import slogan from "../images/Surat’s Biggest and Tallest Turf.png"
import slogan2 from "../images/Football  Cricket  Box Cricket  Family Time.png"
import Footer from "../components/footer";


const Home = () => {
  const history = useHistory();

  return (
    <>
      <div className={classnames(styles.HomeBackGround)}></div>
      <div className="container">
        <div className="columns">
          <div className={classnames("column", styles.column)}>
            <div className={classnames(styles.HomeHeader)}>
              <img src={Logo} alt="Logo" style={{ width: "100px" }} />

              <Header />
            </div>
            <div className={classnames(styles.slogan)}>
              <h2>SURAT'S BIGGEST AND TALLEST TURF</h2>
              <h3>FOOTBALL | CRICKET | BOX CRICKET | FAMILY TIME</h3>
            </div>
            <Carousel
              className={styles.CarouselWrapper}
              additionalTransfrom={0}
              arrows
              autoPlay
              autoPlaySpeed={5000}
              centerMode
              containerClass="container"
              dotListClass=""
              draggable
              focusOnSelect={false}
              infinite
              itemClass=""
              keyBoardControl
              minimumTouchDrag={80}
              renderButtonGroupOutside={true}
              renderDotsOutside={true}
              responsive={{
                desktop: {
                  breakpoint: {
                    max: 3000,
                    min: 1024,
                  },
                  items: 1,
                  partialVisibilityGutter: 10,
                },
                mobile: {
                  breakpoint: {
                    max: 464,
                    min: 0,
                  },
                  items: 1,
                  partialVisibilityGutter: 30,
                },
                tablet: {
                  breakpoint: {
                    max: 1024,
                    min: 464,
                  },
                  items: 1,
                  partialVisibilityGutter: 30,
                },
              }}
              showDots={false}
              sliderClass=""
              slidesToSlide={1}
              swipeable
            >
              <img src={Slider2} alt="slider2" />
              <img src={Slider3} alt="slider3" />
              <img src={Slider4} alt="slider4" />
              <img src={Slider5} alt="slider5" />
            </Carousel>
            <NextButton
              title="Book Slots"
              onClickHandler={() => history.push("/date")}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
