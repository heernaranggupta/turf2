import React, { useContext } from 'react';
import {
  Link as RouterLink,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import { toast } from "react-toastify";
import { Formik } from "formik";
import axios from 'axios';
import api from '../../config/api';
import headerWithToken from '../../config/headerWithToken';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();


  const handleSubmitInBtnClicked = (username, password, phoneNumber) => {
    if (!username.trim().length) {
      toast.error("User Name Cannot be empty");
      return;
    }
    if (!password.trim().length) {
      toast.error("Password Cannot be empty");
      return;
    }
    if (!phoneNumber.trim().length) {
      toast.error("Password Cannot be empty");
      return;
    }

    const values = {
      username: username,
      password: password,
      phoneNumber:phoneNumber,
      companyName: "Rebounce",
      role: "MANAGER",
    };
    axios
      .post(api + "business/signup", values, headerWithToken)
      .then(async (res) => {
        if (res.data.code === 200) {
          window.location = "/";
        }
        if (res.data.code === 404) {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log("error here", err);
        console.log("res", err.response);
        if (err.response.code === 500) {
          toast.error(err.response.data.message);
        }
      });
  };

  return (
    <Formik
            initialValues={{
              username: '',
              phoneNumber: '',
              password: ''
            }}
            onSubmit={(values) => {
              handleSubmitInBtnClicked(values.username, values.phoneNumber, values.password);
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          subheader="Add Manager Form"
          title="Add Manager"
        />
        <Divider />
        <CardContent>
        <TextField
            error={Boolean(touched.username && errors.username)}
            fullWidth
            helperText={touched.username && errors.username}
            label="User Name"
            margin="normal"
            name="username"
            onBlur={handleBlur}
            onChange={handleChange}
            type="text"
            value={values.username}
            variant="outlined"
          />
        <TextField
            error={Boolean(touched.phoneNumber && errors.phoneNumber)}
            fullWidth
            helperText={touched.phoneNumber && errors.phoneNumber}
            label="Phone Number"
            margin="normal"
            name="phoneNumber"
            onBlur={handleBlur}
            onChange={handleChange}
            type="text"
            value={values.phoneNumber}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            label="Password"
            margin="normal"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
            type="submit"
          >
            Add Manager
          </Button>
        </Box>
      </Card>
    </form>
    )}
    </Formik>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
