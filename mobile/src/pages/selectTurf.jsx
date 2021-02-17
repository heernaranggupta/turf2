import React, { useContext, useEffect, useState } from "react";
import classnames from "classnames";
import { BsArrowLeft } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import styles from "../css/selectTurf.module.css";
import { Context } from "../data/context";
import NextButton from "../components/NextButton";

const SelectTurf = () => {
  const history = useHistory();
  const [greetingMessage, setGreetingMessage] = useState("");
  const [isTurf1Selected, setIsTurf1Selected] = useState(false);
  const [isTurf2Selected, setIsTurf2Selected] = useState(false);
  const [isTurf3Selected, setIsTurf3Selected] = useState(false);
  const { name } = useContext(Context);

  useEffect(() => {
    var today = new Date();
    var curHr = today.getHours();

    if (curHr < 12) {
      setGreetingMessage("Good Morning,");
    } else if (curHr < 18) {
      setGreetingMessage("Good Afternoon,");
    } else {
      setGreetingMessage("Good Evening,");
    }
  }, []);

  return (
    <div className="conatiner">
      <div className="columns">
        <div className={classnames("column", styles.FirstColumn)}>
          <BsArrowLeft
            size={30}
            color="#FFF"
            onClick={() => history.goBack()}
          />
          <div>
            <p className="is-size-5 has-text-white">{greetingMessage}</p>
            <p className="title has-text-white">{name}</p>
          </div>
        </div>
        <div className={classnames("column", styles.SecondColumn)}>
          <div>
            <p className="is-size-5">Let's Start</p>
            <p className="is-size-4 has-text-weight-bold">Select Truf Ground</p>
            <p>Click To Select</p>
          </div>

          <div className={classnames("my-3", styles.cardWrapper)}>
            <div
              onClick={() => setIsTurf1Selected((old) => !old)}
              className={classnames(
                "card",
                isTurf1Selected && "isCardSelected",
                styles.card
              )}
            >
              <p className="card-header-title">Ground 1 (Parking)</p>
              <div className={classnames("card-content", styles.cardContent)}>
                <div className="content">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </div>
              </div>
            </div>

            <div
              onClick={() => setIsTurf2Selected((old) => !old)}
              className={classnames(
                "card",
                isTurf2Selected && "isCardSelected",
                styles.card
              )}
            >
              <p className="card-header-title">Ground 2 (Center)</p>
              <div className={classnames("card-content", styles.cardContent)}>
                <div className="content">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </div>
              </div>
            </div>

            <div
              onClick={() => setIsTurf3Selected((old) => !old)}
              className={classnames(
                "card",
                isTurf3Selected && "isCardSelected",
                styles.card
              )}
            >
              <p className="card-header-title">Ground 3 (Food Court)</p>
              <div className={classnames("card-content", styles.cardContent)}>
                <div className="content">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </div>
              </div>
            </div>
          </div>
          <NextButton title="Next" onClickHandler={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default SelectTurf;
