import React from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import Page from "../../components/Page";
// import Profile from "./Profile";
import ProfileDetails from "./ProfileDetails";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "90vh",
  },
}));

const AddManager = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Add Manager">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* <Grid item lg={4} md={6} xs={12}>
            <Profile />
          </Grid> */}
          <Grid item lg={8} md={6} xs={12}>
            <ProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default AddManager;
