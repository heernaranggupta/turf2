import React, { useCallback, useEffect, useState, useContext } from "react";
import classnames from "classnames";
import { Context } from "../data/context";
import styles from "../css/Profile.module.css";

const Profile = () => {
  const [userData, setUserData] = useState(null);

  const { setIsLoggedIn } = useContext(Context);

  const fetchUserData = useCallback(async () => {
    var data = await JSON.parse(localStorage.getItem("turfUserDetails"));
    setUserData(data.user);
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <div className={classnames("section", styles.ProfileWrapper)}>
      <div
        className={classnames("container is-fluid", styles.overRideContainer)}
      >
        <div className={classnames(" columns mt-5")}>
          <div
            className={classnames(
              "column box has-text-centered",
              styles.ProfileLeftColumn
            )}
          >
            <figure className={classnames(styles.ProfileImageWrapper, "my-5")}>
              <img src="https://placeimg.com/640/480/any" alt="Profile " />
            </figure>

            <p
              className={classnames(
                "subtitle is-2 is-uppercase has-text-white"
              )}
            >
              {userData?.name}
            </p>
            <p className={classnames("subtitle is-4  has-text-white")}>
              {userData?.phoneNumber}
            </p>
            <p className={classnames("subtitle is-4  has-text-white")}>
              {userData?.emailId}
            </p>

            <button
              onClick={async () => {
                await localStorage.removeItem("turfUserDetails");
                setIsLoggedIn(false);
              }}
              className="button is-danger"
            >
              Logout
            </button>
          </div>
          <div className={classnames("column is-two-thirds")}></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
