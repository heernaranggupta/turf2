import React, {
  useCallback,
  useEffect,
  useState,
  useContext,
  useRef,
} from "react";
import classnames from "classnames";
import { Context } from "../data/context";
import styles from "../css/Profile.module.css";
import { toast } from "react-toastify";
import axios from "axios";
import S3 from "react-aws-s3";
import api from "../config/api";
import headerWithToken from "../config/headerWithToken";
import BookingSummary from "../components/BookingSummary";

const config = {
  bucketName: "turf-user-profile-images",
  dirName: "profilePhoto" /* optional */,
  region: "us-east-2",
  accessKeyId: "AKIAJ7GWNHL5K3SRFJTQ",
  secretAccessKey: "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",
};

const ReactS3Client = new S3(config);

const Profile = () => {
  const [isModalOpen, setisModalOpen] = useState(false);

  const { setIsLoggedIn, userData, setUserData } = useContext(Context);

  const nameRef = useRef(userData?.name || "");
  const emailRef = useRef(userData?.emailId || "");
  const DOBRef = useRef(null);

  const fetchUserData = useCallback(async () => {
    var data = await JSON.parse(localStorage.getItem("turfUserDetails"));
    setUserData(data.user);
  }, [setUserData]);

  const handleFilePicker = () => {
    var input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      var file = e.target.files[0];
      const fileExt = file.type;
      if (
        fileExt === "image/png" ||
        fileExt === "image/jpg" ||
        fileExt === "image/jpeg"
      ) {
        ReactS3Client.uploadFile(file, userData.phoneNumber)
          .then((data) => {
            axios
              .put(
                api + "user/update-profile/",
                { downloadUrl: data.location },
                headerWithToken
              )
              .then(async (res) => {
                if (res.data.success) {
                  toast("Profile Changes saved successfully");
                  await localStorage.removeItem("turfUserDetails");
                  await localStorage.setItem(
                    "turfUserDetails",
                    JSON.stringify({ user: res.data.body })
                  );
                  console.log(res.data.body);
                  setUserData(res.data.body);
                  setisModalOpen(false);
                }
              })
              .catch((err) => {
                console.log(err.message);
                toast.error(err.message);
              });
          })
          .catch((err) => console.error(err));
      } else {
        alert("Only Images (PNG, JPG, JPEG) are Allowed");
      }
    };
    input.click();
  };

  const handleSaveProfileChanges = () => {
    if (!nameRef.current.value.trim().length) {
      toast.error("Name Cannot be empty");
      return;
    }
    if (!emailRef.current.value.trim().length) {
      toast.error("Email Cannot be empty");
      return;
    }
    if (!DOBRef.current.value.trim().length) {
      toast.error("Date of Birth Cannot be empty");
      return;
    }

    const data = {
      name: nameRef.current.value,
      emailId: emailRef.current.value,
      dateOfBirth: DOBRef.current.value,
      phoneNumber: userData.phoneNumber,
    };

    axios
      .put(api + "user/update-profile/", data, headerWithToken)
      .then(async (res) => {
        if (res.data.success) {
          toast("Profile Changes saved successfully");
          await localStorage.removeItem("turfUserDetails");
          await localStorage.setItem(
            "turfUserDetails",
            JSON.stringify({ user: res.data.body })
          );
          console.log(res.data.body);
          setUserData(res.data.body);
          setisModalOpen(false);
        }
      })
      .catch((err) => {
        console.log(err.message);
        toast.error(err.message);
      });
  };

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
            <figure
              onClick={handleFilePicker}
              className={classnames(
                styles.ProfileImageWrapper,
                "my-5 is-clickable"
              )}
            >
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

            <div className={classnames("is-flex-direction-row")}>
              <button
                onClick={() => {
                  setisModalOpen(true);
                }}
                className="button is-link mx-3"
              >
                Edit
              </button>
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
          </div>
          <div
            className={classnames("column is-two-thirds", styles.SecondColumns)}
          >
            <BookingSummary />
          </div>
        </div>

        <div className={classnames("modal", isModalOpen ? "is-active" : "")}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Edit Profile</p>
              <button
                onClick={() => setisModalOpen(false)}
                className="delete"
                aria-label="close"
              ></button>
            </header>
            <section className="modal-card-body">
              <div className="field">
                <label className="label">Full Name</label>
                <div className="control">
                  <input
                    ref={nameRef}
                    className="input"
                    type="text"
                    placeholder="Eg: Joe Deo"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Email</label>
                <input
                  ref={emailRef}
                  className="input"
                  type="email"
                  placeholder="Email"
                />
              </div>

              <div className="field">
                <label className="label">Date Of Birth</label>
                <input
                  ref={DOBRef}
                  className="input"
                  type="date"
                  placeholder="Date of Birth"
                />
              </div>
            </section>
            <footer className="modal-card-foot">
              <button
                onClick={() => handleSaveProfileChanges()}
                className="button is-success"
              >
                Save changes
              </button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
