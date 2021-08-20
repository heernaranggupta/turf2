import DateFnsUtils from "@date-io/date-fns";
import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { Done } from "@material-ui/icons";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import axios from "axios";
import React, { useContext, useState } from "react";
import api from "../config/api";
import { Context } from "../data/context";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
}));

const timeFormatter = (time) => {
  if (!time || !time.getHours()) {
    toast.error("Invalid Time Object");
    return;
  }
  const hour = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
  const minute =
    time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();

  return hour + ":" + minute + ":00";
};

const AddPrice = () => {
  const classes = useStyles();

  const { token } = useContext(Context);

  const [typeSelection, setTypeSelection] = useState("everyday");
  const [day, setDay] = useState("Sunday");
  const [pickedDate, setPickedDate] = useState(new Date());
  const [openTime, setOpenTime] = useState(new Date());
  const [closeTime, setCloseTime] = useState(new Date());
  const [isTurf1Checked, setIsTurf1Checked] = useState(true);
  const [isTurf2Checked, setIsTurf2Checked] = useState(false);
  const [isTurf3Checked, setIsTurf3Checked] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [price, setPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [requestList, setRequestList] = useState([]);
  const [slotDuration, setSlotDuration] = useState(60);

  const handleAddRecord = () => {
    if (!startTime || !startTime.getHours()) {
      toast.error("Invalid Start Time");
      return;
    }
    if (!endTime || !endTime.getHours()) {
      toast.error("Invalid End Time");
      return;
    }

    if (isTurf1Checked) {
      setRequestList((old) => [
        ...old,
        {
          turfId: "turf01",
          startTime: timeFormatter(startTime),
          endTime: timeFormatter(endTime),
          price,
          minAmountForBooking: minPrice,
        },
      ]);
    }
    if (isTurf2Checked) {
      setRequestList((old) => [
        ...old,
        {
          turfId: "turf02",
          startTime: timeFormatter(startTime),
          endTime: timeFormatter(endTime),
          price,
          minAmountForBooking: minPrice,
        },
      ]);
    }
    if (isTurf3Checked) {
      setRequestList((old) => [
        ...old,
        {
          turfId: "turf03",
          startTime: timeFormatter(startTime),
          endTime: timeFormatter(endTime),
          price,
          minAmountForBooking: minPrice,
        },
      ]);
    }

    setPrice(0);
    setMinPrice(0);
    setStartTime(new Date());
    setEndTime(new Date());
    setIsTurf1Checked(false);
    setIsTurf2Checked(false);
    setIsTurf3Checked(false);
  };

  const handleUpdate = () => {
    const data = {
      day: typeSelection === "everyday" ? day.toLocaleLowerCase() : null,
      date: typeSelection === "everyday" ? null : pickedDate,
      openTime: timeFormatter(openTime),
      closeTime: timeFormatter(closeTime),
      slotDuration,
      startEndTimeRequestList: requestList,
    };

    axios
      .post(api + "admin/config/add", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toast("Add Successfully");
        console.log(response.data);
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
      });
  };

  return (
    <div style={{ margin: 5, padding: 10 }}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Type</FormLabel>
          <RadioGroup
            row
            aria-label="type"
            name="type"
            value={typeSelection}
            onChange={(event) => setTypeSelection(event.target.value)}
          >
            <FormControlLabel
              value="everyday"
              control={<Radio />}
              label="Everyday"
            />
            <FormControlLabel
              value="date"
              control={<Radio />}
              label="Specific Date"
            />
          </RadioGroup>
        </FormControl>
        <div>
          {typeSelection === "everyday" ? (
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Day</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={day}
                onChange={(event) => setDay(event.target.value)}
              >
                <MenuItem value="Sunday">Sunday</MenuItem>
                <MenuItem value="Monday">Monday</MenuItem>
                <MenuItem value="Tuesday">Tuesday</MenuItem>
                <MenuItem value="Wednesday">Wednesday</MenuItem>
                <MenuItem value="Thursday">Thursday</MenuItem>
                <MenuItem value="Friday">Friday</MenuItem>
                <MenuItem value="Saturday">Saturday</MenuItem>
              </Select>
            </FormControl>
          ) : (
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date"
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              minDate={new Date()}
              value={pickedDate}
              onChange={(event) => {
                setPickedDate(event);
              }}
            />
          )}
        </div>
        <div>
          <KeyboardTimePicker
            margin="normal"
            id="start"
            label="Start Time"
            KeyboardButtonProps={{
              "aria-label": "change time",
            }}
            value={openTime}
            onChange={(event) => {
              setOpenTime(event);
            }}
          />
          <KeyboardTimePicker
            style={{
              marginLeft: 10,
            }}
            margin="normal"
            id="end"
            label="End Time"
            KeyboardButtonProps={{
              "aria-label": "change time",
            }}
            value={closeTime}
            onChange={(event) => {
              setCloseTime(event);
            }}
          />
        </div>
        <div style={{ marginTop: 20 }}>
          <TextField
            id="slot"
            label="Slot Duration"
            helperText="Duration in Minutes"
            type="number"
            min={30}
            variant="outlined"
            value={slotDuration}
            onChange={(event) => setSlotDuration(event.target.value)}
          />
        </div>
        <Divider style={{ marginTop: 25, marginBottom: 25 }} />
        <div>
          <Typography>Select Turf</Typography>
          <FormControlLabel
            control={
              <Checkbox
                name="Turf 1"
                color="primary"
                checked={isTurf1Checked}
                onChange={() => setIsTurf1Checked((old) => !old)}
              />
            }
            label="Turf 1"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="Turf 2"
                color="primary"
                checked={isTurf2Checked}
                onChange={() => setIsTurf2Checked((old) => !old)}
              />
            }
            label="Turf 2"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="Turf 3"
                color="primary"
                checked={isTurf3Checked}
                onChange={() => setIsTurf3Checked((old) => !old)}
              />
            }
            label="Turf 3"
          />
        </div>
        <div>
          <KeyboardTimePicker
            margin="normal"
            id="start"
            label="Start Time"
            KeyboardButtonProps={{
              "aria-label": "change time",
            }}
            value={startTime}
            onChange={(event) => {
              setStartTime(event);
            }}
          />
          <KeyboardTimePicker
            style={{
              marginLeft: 10,
            }}
            margin="normal"
            id="end"
            label="End Time"
            KeyboardButtonProps={{
              "aria-label": "change time",
            }}
            value={endTime}
            onChange={(event) => {
              setEndTime(event);
            }}
          />
        </div>
        <div style={{ marginTop: 30 }}>
          <TextField
            style={{ marginRight: 10 }}
            id="price"
            label="Price"
            type="number"
            min={0}
            variant="outlined"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
          <TextField
            id="min-price"
            label="Minimum Price"
            type="number"
            min={0}
            variant="outlined"
            value={minPrice}
            onChange={(event) => setMinPrice(event.target.value)}
          />
        </div>
        <div>
          <Button
            style={{ marginTop: 10 }}
            variant="outlined"
            color="primary"
            onClick={handleAddRecord}
          >
            Add Record
          </Button>
        </div>
        <div>
          <TableContainer component={Paper} style={{ marginTop: 50 }}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Start Time</TableCell>
                  <TableCell>Close Time</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Minimum Price</TableCell>
                  <TableCell>Turf 1</TableCell>
                  <TableCell>Turf 2</TableCell>
                  <TableCell>Turf 3</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requestList.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell>{item.startTime}</TableCell>
                      <TableCell>{item.endTime}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.minAmountForBooking}</TableCell>
                      <TableCell>
                        {item.turfId === "turf01" ? <Done /> : ""}
                      </TableCell>
                      <TableCell>
                        {item.turfId === "turf02" ? <Done /> : ""}
                      </TableCell>
                      <TableCell>
                        {item.turfId === "turf03" ? <Done /> : ""}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div style={{ marginTop: 50 }}>
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Update
          </Button>
        </div>
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default AddPrice;
