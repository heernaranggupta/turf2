/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Edit, Repeat } from "react-feather";

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

const Results = ({ className, customers, ...rest }) => {
  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(1)
      );
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0 &&
                      selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell> */}
                <TableCell>Mobile</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Ground</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Amount</TableCell>
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
                    {/* <TableCell padding="checkbox">
                      <Checkbox
                        checked={
                          selectedCustomerIds.indexOf(customer.bookingId) !== -1
                        }
                        onChange={(event) =>
                          handleSelectOne(event, customer.bookingId)
                        }
                        value="true"
                      />
                    </TableCell> */}
                    <TableCell>
                      {/* <Box alignItems="center" display="flex">
                      <Avatar
                        className={classes.avatar}
                        src={customer.avatarUrl}
                      >
                        {customer.userId}
                      </Avatar>
                      <Typography color="textPrimary" variant="body1"> */}
                      <Typography variant="h5">{customer.userId}</Typography>

                      {/* </Typography>
                    </Box> */}
                    </TableCell>
                    <TableCell>{customer.date}</TableCell>
                    <TableCell>{customer.turfId}</TableCell>
                    <TableCell>{customer.status}</TableCell>
                    <TableCell>
                      <Typography variant="h4">{customer.price}</Typography>
                    </TableCell>
                    <TableCell>
                      <Box alignItems="center" display="flex">
                        <Typography color="textPrimary" variant="body1">
                          <Edit />
                        </Typography>
                        <Typography color="textPrimary" variant="body1">
                          <Repeat />
                        </Typography>
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
