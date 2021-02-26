import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import api from "../config/api";
import headerWithToken from "../config/headerWithToken.js";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@material-ui/core";

const AddManager = () => {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const [company, setCompany] = useState("Rebounce");

  const handleAddManagerBtnClicked = () => {
    if (!username.trim().length) {
      toast.error("User Name Cannot be empty");
      return;
    }
    if (!phone.trim().length) {
      toast.error("Phone Number Cannot be empty");
      return;
    }
    if (!password.trim().length) {
      toast.error("Password Cannot be empty");
      return;
    }
    if (!repeat.trim().length) {
      toast.error("Confirm Password Cannot be empty");
      return;
    }
    if (repeat.trim() !== password.trim()) {
      toast.error("Passwords does not match");
      return;
    }
    if (!company.trim().length) {
      toast.error("Comapny Name Cannot be empty");
      return;
    }
    const values = {
      name: username,
      phoneNumber: phone,
      companyName: company,
      password: password,
      role: "ADMIN",
    };

    axios
      .post(api + "business/signup", values, headerWithToken)
      .then(async (res) => {
        if (res.data.code === 200) {
          toast("Manager Created Successfully");
          setUsername("");
          setPhone("");
          setPassword("");
          setRepeat("");
          setCompany("Rebounce");
        }
      })
      .catch((err) => {
        console.log("error here", err.response);
        toast.error(err.response.data.message);
      });
  };

  return (
    <div style={{ padding: 50 }}>
      <Card>
        <CardHeader subheader="Add Managers" title="Manager" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the user name"
                label="Username"
                name="username"
                required
                variant="outlined"
                onChange={(event) => setUsername(event.target.value)}
                value={username}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                type="number"
                variant="outlined"
                required
                onChange={(event) => setPhone(event.target.value)}
                value={phone}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                required
                variant="outlined"
                type="password"
                onChange={(event) => setPassword(event.target.value)}
                value={password}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Confirm Password"
                name="repeatPassword"
                required
                variant="outlined"
                type="password"
                onChange={(event) => {
                  setRepeat(event.target.value);
                }}
                value={repeat}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Company Name"
                name="company"
                variant="outlined"
                required
                onChange={(event) => setCompany(event.target.value)}
                value={company}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => handleAddManagerBtnClicked()}
          >
            Create Manager
          </Button>
        </Box>
      </Card>
    </div>
  );
};
export default AddManager;
