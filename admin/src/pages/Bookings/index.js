import { Box, Container, makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Page from "../../components/Page";
import api from "../../config/api";
import headerWithToken from "../../config/headerWithToken";
import { Context } from "../../data/context";
import Results from "./Results";
import Toolbar from "./Toolbar";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const CustomerListView = () => {
  const classes = useStyles();
  const [bookingList, setBookingList] = useState([]);
  const { status, toDate, fromDate } = useContext(Context);

  const handleFetchedData = useCallback(() => {
    const postData = {
      userId: "",
      status: status,
      fromDate: fromDate,
      toDate: toDate,
    };

    axios
      .post(api + "business/view-all-bookings", postData, headerWithToken)
      .then((res) => {
        setBookingList(res.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [status, toDate, fromDate]);

  useEffect(() => {
    handleFetchedData();
  }, [handleFetchedData]);

  return (
    <Page className={classes.root} title="Booking List">
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results
            customers={bookingList}
            handleFetchedData={handleFetchedData}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
