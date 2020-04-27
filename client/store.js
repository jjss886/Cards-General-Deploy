import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import socket from "./utils/socket";

// ---------------- INITIAL STATE ----------------
const initialState = { channels: [] };

// ---------------- ACTION TYPES ----------------
const GET_CHANNELS = "GET_CHANNELS";
const ADD_CHANNEL = "ADD_CHANNEL";

// ---------------- ACTION CREATORS ----------------
export const getChannels = (channels) => ({
  type: GET_CHANNELS,
  channels,
});
export const addChannel = (channel) => ({
  type: ADD_CHANNEL,
  channel,
});

// ---------------- REDUCER ----------------
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHANNELS:
      return {
        ...state,
        channels: action.channels,
      };
    case ADD_CHANNEL:
      return {
        ...state,
        channels: [...state.channels, action.channel],
      };
    default:
      return state;
  }
};

// ---------------- STORE ----------------
const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer
  // middleware(applyMiddleware(createLogger({ collapsed: true })))
);

export default store;
