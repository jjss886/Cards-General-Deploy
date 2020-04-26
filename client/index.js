import React from "react";
import { render } from "react-dom";
import { Router, Route, Switch } from "react-router-dom";
import { createMemoryHistory, createBrowserHistory } from "history";

import "./utils/style.css";
import Home from "./components/Home";

const history =
  process.env.NODE_ENV === "test"
    ? createMemoryHistory()
    : createBrowserHistory();

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
  </Switch>
);

render(
  <Router history={history}>
    <div className="fullPageDiv">
      <div className="actualContent">
        <Routes />
      </div>
    </div>
  </Router>,
  document.getElementById("main")
);
