import React,{ useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { Context } from "../../data/context";

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();
  
  const {
    status,
    toDate,
    fromDate,
    setStatus,
    setToDate,
    setFromDate
  } = useContext(Context);

  console.log(status)

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <Button className={classes.importButton}>
          Import
        </Button>
        <Button className={classes.exportButton}>
          Export
        </Button>
        <Button
          color="primary"
          variant="contained"
        >
          Add customer
        </Button>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                  label="Status"
                >
                  <MenuItem value={"BOOKED_BY_USER"}>Booked By Use</MenuItem>
                  <MenuItem value={"BOOKED_BY_BUSINESS"}>booked by Business</MenuItem>
                  <MenuItem value={"CANCELLED_BY_USER"}>Cancel by User</MenuItem>
                  <MenuItem value={"CANCELLED_BY_BUSINESS"}>
                    Cancel by Business
                  </MenuItem>
                  <MenuItem value={"RESCHEDULED_BY_USER"}>Reshedule by User</MenuItem>
                  <MenuItem value={"RESCHEDULED_BY_BUSINESS"}>
                    Reshedule by Business
                  </MenuItem>
                  <MenuItem value={"AVAILABLE"}>Available</MenuItem>
                  <MenuItem value={"NOT_AVAILABLE"}>Not Available</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="From Date"
                margin="normal"
                name="fromDate"
                onChange={e => setFromDate(e.target.value)}
                type="date"
                value={fromDate}
                variant="outlined"
              />

              <TextField
                label="To Date"
                margin="normal"
                name="toDate"
                onChange={e => setToDate(e.target.value)}
                type="date"
                value={toDate}
                variant="outlined"
              />

              
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
