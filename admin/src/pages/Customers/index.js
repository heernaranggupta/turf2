import React, { useState,useEffect,useCallback,useContext } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import Page from "../../components/Page";
import Results from "./Results";
import Toolbar from "./Toolbar";
import axios from "axios";
import headerWithToken from "../../config/headerWithToken";
import api from "../../config/api";
import { Context } from "../../data/context";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const CustomerListView = () => {
  const classes = useStyles();
  const [bookingList,setBookingList] = useState([]);
  const {
    status,
    toDate,
    fromDate
  } = useContext(Context);

  const handleFetchedData = useCallback(() => {
    const postData = {
      userId: "",
      status: status,
      fromDate: fromDate,
      toDate: toDate,
    };

    axios.post(api + 'business/view-all-bookings',postData,headerWithToken).then(res=>{
      console.log(res)
      setBookingList(res.data.body)
    }).catch(err=>{
      console.log(err)
    })
  },[status,toDate,fromDate]);

  useEffect(()=>{
    handleFetchedData()
  },[handleFetchedData])

  return (
    <Page className={classes.root} title="Customers">
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results customers={bookingList} />
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
