import React, { useContext } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { Formik } from "formik";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { toast } from "react-toastify";
import Page from "../../components/Page";
import { Context } from "../../data/context";
import api from "../../config/api";
import headerWithoutToken from "../../config/headerWithoutToken";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "90vh",
  },
}));

const Login = () => {
  const classes = useStyles();

  const { state } = useLocation();
  const history = useHistory();

  const { isLoggedIn, setIsLoggedIn, setToken, setUserData } = useContext(
    Context
  );

  const handleSignInBtnClicked = (phone, password) => {
    if (!phone.trim().length) {
      toast.error("Phone Number Cannot be empty");
      return;
    }
    if (!password.trim().length) {
      toast.error("Password Cannot be empty");
      return;
    }

    const values = {
      username: phone,
      password: password,
    };

    axios
      .post(api + "business/login", values, headerWithoutToken)
      .then(async (res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          await localStorage.setItem("adminToken", res.data.body.token);
          await localStorage.setItem(
            "turfAdminDetails",
            JSON.stringify(res.data.body.user)
          );
          setUserData(res.data.body.user);
          setToken(res.data.body.token);
          setIsLoggedIn(true);
          history.push(state?.from || "/");
        }
        if (res.data.code === 404) {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log("error here", err.message);
        toast.error(err.response.data.message);
      });
  };

  if (isLoggedIn) {
    return <Redirect to={state?.from || "/"} />;
  }

  return (
    <Page className={classes.root} title="Login">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              phone: "",
              password: "",
            }}
            onSubmit={(values) => {
              handleSignInBtnClicked(values.phone, values.password);
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Sign In
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  label="Phone Number"
                  margin="normal"
                  name="phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="phone"
                  value={values.phone}
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
                <Box my={2}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
                {/* <Typography color="textSecondary" variant="body1">
                  Don&apos;t have an account?{" "}
                  <Link component={RouterLink} to="/register" variant="h6">
                    Sign up
                  </Link>
                </Typography> */}
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default Login;
