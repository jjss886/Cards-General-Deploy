import React from "react";
import { render } from "react-dom";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { createMemoryHistory, createBrowserHistory } from "history";

import "./utils/style.css";
import Home from "./components/Home";
import Room from "./components/Room";

const history =
  process.env.NODE_ENV === "test"
    ? createMemoryHistory()
    : createBrowserHistory();

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/Room/:id" component={Room} />
  </Switch>
);

render(
  <Provider store={store}>
    <Router history={history}>
      <div className="fullPageDiv">
        <div className="actualContent">
          <Routes />
        </div>
      </div>
    </Router>
  </Provider>,
  document.getElementById("main")
);
