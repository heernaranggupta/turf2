import React, { useEffect } from "react";
import classnames from "classnames";
import Carousel from "react-multi-carousel";
import { useHistory } from "react-router-dom";

import styles from "../css/Home.module.css";
import "react-multi-carousel/lib/styles.css";

import titleBanner from "../images/title-banner.png";
import Slider1 from "../images/index_1.png";
import Slider2 from "../images/index_2.png";
import Slider3 from "../images/index_3.png";
import Slider4 from "../images/index_4.png";
import Slider5 from "../images/index_5.png";

const Home = () => {
  const history = useHistory();

  useEffect(() => {
    try {
      document.querySelector(".navbar").style.backgroundColor = "transparent";
    } catch (error) {}

    return () => {
      try {
        document.querySelector(".navbar").style.backgroundColor = "#437520";
      } catch (error) {}
    };
  }, []);

  return (
    <div className={classnames(styles.addHomeBackground)}>
      <div className={classnames("section", styles.HomeSectionWrapper)}>
        <div
          className={classnames("container is-fluid", styles.overRideContainer)}
        >
          <div className={classnames(styles.HomeTitleWrapper, "my-6 ")}>
            <img src={titleBanner} alt="title" />
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
            <img src={Slider1} alt="slider1" />
            <img src={Slider2} alt="slider2" />
            <img src={Slider3} alt="slider3" />
            <img src={Slider4} alt="slider4" />
            <img src={Slider5} alt="slider5" />
          </Carousel>

          <div className={styles.buttonWrapper}>
            <button
              className="button is-large is-rounded"
              onClick={() => history.push("/book")}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
