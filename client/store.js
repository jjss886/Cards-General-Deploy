import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import socket from "./utils/socket";

// ---------------- INITIAL STATE ----------------
const initialState = { channels: {} };
const channelObj = {
  players: [],
  deck: [],
};
const playerObj = {
  hand: [],
};

// ---------------- ACTION TYPES ----------------
const ADD_CHANNEL = "ADD_CHANNEL";

// ---------------- ACTION CREATORS ----------------
export const addChannel = (channel) => ({
  type: ADD_CHANNEL,
  channel,
});

// ---------------- REDUCER ----------------
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHANNEL:
      return {
        ...state,
        // channels: [...state.channels, action.channel],
        channels: { ...state.channels, [action.channel]: channelObj },
      };
    default:
      return state;
  }
};

// ---------------- STORE ----------------
const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  middleware()
  // middleware(applyMiddleware(createLogger({ collapsed: true })))
);

export default store;
