import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";

// ---------------- INITIAL STATE ----------------
const initialState = { rooms: {}, channel: initialChannel };
const initialChannel = {
  room: "",
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
const ADD_ROOM = "ADD_ROOM";
const ADD_CHANNEL = "ADD_CHANNEL";
const ADD_PLAYER = "ADD_PLAYER";

// ---------------- ACTION CREATORS ----------------
export const addNewRoom = (room) => ({
  type: ADD_ROOM,
  room,
});

// ---------------- REDUCER ----------------
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ROOM:
      return {
        ...state,
        rooms: { ...state.rooms, ...action.room },
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
