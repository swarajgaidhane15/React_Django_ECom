import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoutes from "./auth/helper/PrivateRoutes";
import Home from "./core/Home";
import Dashboard from "./user/Dashboard";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Cart from "./core/Cart";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <PrivateRoutes exact path="/dashboard" component={Dashboard} />
        <PrivateRoutes exact path="/cart" component={Cart} />
      </Switch>
    </Router>
  );
};

export default Routes;
