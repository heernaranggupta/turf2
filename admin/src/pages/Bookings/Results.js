/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Card,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from "@material-ui/core";
import axios from "axios";
import { toast } from "react-toastify";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { CheckCircle, XCircle } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import API from "../../config/api";
import headerWithToken from "../../config/headerWithToken";

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

const Results = ({ className, customers, handleFetchedData, ...rest }) => {
  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleAcceptPayment = (id) => {
    axios
      .get(API + `business/payment_accepted?bookingId=${id}`, headerWithToken)
      .then((res) => {
        console.log(res.data);
        handleFetchedData();
        toast("Payment Accepted Successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };
  const handleCancel = (id) => {
    if (window.confirm("Are you sure? You want to Cancel booking?")) {
      axios
        .delete(
          API + `business/cancel_booking?bookingId=${id}`,
          headerWithToken
        )
        .then(() => {
          handleFetchedData();
          toast.warn("Booking Cancel");
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
        });
    }
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mobile</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Ground</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Paid Amount</TableCell>
                <TableCell>Remaining Amount</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>End Time</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers
                .slice(page * limit, page * limit + limit)
                .map((customer) => (
                  <TableRow
                    hover
                    key={customer.bookingId}
                    selected={
                      selectedCustomerIds.indexOf(customer.bookingId) !== -1
                    }
                  >
                    <TableCell>{customer.userId}</TableCell>
                    <TableCell>{customer.date}</TableCell>
                    <TableCell>{customer.turfId}</TableCell>
                    <TableCell>{customer.status}</TableCell>
                    <TableCell>{customer.price}</TableCell>
                    <TableCell>{customer.payedPrice}</TableCell>
                    <TableCell>{customer.remainingPrice}</TableCell>
                    <TableCell>{customer.startTime}</TableCell>
                    <TableCell>{customer.endTime}</TableCell>
                    <TableCell>
                      <Box alignItems="center" display="flex">
                        {customer.remainingPrice > 0 ? (
                          <Tooltip
                            title="Accept Remaining Payment"
                            aria-label="Accept Remaining Payment"
                          >
                            <Button
                              variant="outlined"
                              style={{ marginRight: 5, borderColor: "green" }}
                              onClick={() => {
                                handleAcceptPayment(customer.id);
                              }}
                            >
                              <CheckCircle style={{ color: "green" }} />
                            </Button>
                          </Tooltip>
                        ) : (
                          <span />
                        )}

                        {customer.status.includes("BOOKED") ? (
                          <Tooltip
                            title="Cancel Booking"
                            aria-label="Cancel Booking"
                          >
                            <Button
                              variant="outlined"
                              style={{ borderColor: "red" }}
                              onClick={() => {
                                handleCancel(customer.id);
                              }}
                            >
                              <XCircle style={{ color: "red" }} />
                            </Button>
                          </Tooltip>
                        ) : (
                          <span />
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={customers.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired,
};

export default Results;
