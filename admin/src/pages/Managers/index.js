import React, { useState, useEffect, useCallback, useContext } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import Page from "../../components/Page";
import Results from "./Results";
import axios from "axios";
import api from "../../config/api";
import { Context } from "../../data/context";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const CustomerListView = () => {
  const classes = useStyles();

  const { token } = useContext(Context);
  const [managers, setManagers] = useState([]);

  const handleFetchedData = useCallback(() => {
    axios
      .get(api + "business/get-all-business-users", {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setManagers(res.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  useEffect(() => {
    handleFetchedData();
  }, [handleFetchedData]);

  return (
    <Page className={classes.root} title="Booking List">
      <Container maxWidth={false}>
        <Box mt={3}>
          <Results customers={managers} />
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
