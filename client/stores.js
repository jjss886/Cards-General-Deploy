import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
// import { composeWithDevTools } from "redux-devtools-extension";

// ---------------- INITIAL STATE ----------------
const initialState = {};

// ---------------- ACTION TYPES ----------------

// ---------------- ACTION CREATORS ----------------

// ---------------- REDUCER ----------------
const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

// ---------------- STORE ----------------
const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  middleware(applyMiddleware(createLogger({ collapsed: true })))
);

export default store;
