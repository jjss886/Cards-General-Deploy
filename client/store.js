import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import socket from "./utils/socket";

// ---------------- INITIAL STATE ----------------
const initialState = { room: "", players: [], deck: [], table: [] };
const initialChannel = {
  players: [],
  deck: [],
  table: [],
};
const initialPlayer = (id, name) => ({
  id,
  name,
  hand: [],
  points: 0,
});

// ---------------- HELPERS ----------------
export const newChannelFn = (name) => {
  const channelObj = { ...initialChannel };
  channelObj.players = [initialPlayer(1, name)];

  return channelObj;
};

// ---------------- ACTION TYPES ----------------
const ADD_CHANNEL = "ADD_CHANNEL";
const ADD_PLAYER = "ADD_PLAYER";

// ---------------- ACTION CREATORS ----------------
export const addNewChannel = (channel, name) => ({
  type: ADD_CHANNEL,
  channel,
  channelObj: newChannelFn(name),
});

export const addNewPlayer = (channel, name) => ({
  type: ADD_PLAYER,
  channel,
  name,
});

// ---------------- REDUCER ----------------
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHANNEL:
      return {
        ...state,
        channels: { ...state.channels, [action.channel]: action.channelObj },
      };
    case ADD_PLAYER:
      const room = action.channel,
        channelObj = { ...state.channels[room] };

      channelObj.players = [
        ...channelObj.players,
        initialPlayer(channelObj.players.length + 1, action.name),
      ];

      return {
        ...state,
        channels: {
          ...state.channels,
          [room]: channelObj,
        },
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
