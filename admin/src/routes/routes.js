import React, { useCallback, useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import Home from "../pages/Home";

const Routes = () => {
  
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />

      </Switch>
      {/* <ToastContainer pauseOnHover={false} autoClose={3000} /> */}
    </Router>
  );
};

export default Routes;
