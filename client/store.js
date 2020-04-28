import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import socket from "./utils/socket";

// ---------------- INITIAL STATE ----------------
const initialState = { channels: {} };
const initialChannel = {
  players: [],
  deck: [],
};
const initialPlayer = {
  id: "",
  name: "",
  hand: [],
};

// ---------------- ACTION TYPES ----------------
const ADD_CHANNEL = "ADD_CHANNEL";

// ---------------- ACTION CREATORS ----------------
export const addNewChannel = (channel, name) => {
  const playerObj = { ...initialPlayer };
  playerObj.id = 1;
  playerObj.name = name;

  const channelObj = { ...initialChannel };
  channelObj.players.push(playerObj);

  return {
    type: ADD_CHANNEL,
    channel,
    channelObj,
  };
};

// ---------------- REDUCER ----------------
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHANNEL:
      return {
        ...state,
        channels: { ...state.channels, [action.channel]: action.channelObj },
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
