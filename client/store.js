import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";

// ---------------- INITIAL STATE ----------------
const initialState = { rooms: new Set(), channel: {} };
const initialChannel = (room, id, name) => ({
  room,
  players: { [id]: initialPlayer(id, name) },
  deck: [],
  table: [],
});
const initialPlayer = (id, name) => ({
  id,
  name,
  hand: [],
  points: 0,
});

// ---------------- HELPERS ----------------

// ---------------- ACTION TYPES ----------------
const GET_ALL_ROOMS = "GET_ALL_ROOMS";
const ADD_NEW_ROOM = "ADD_NEW_ROOM";
const SET_CHANNEL = "SET_CHANNEL";
const ADD_PLAYER = "ADD_PLAYER";

// ---------------- ACTION CREATORS ----------------
export const getAllRooms = (rooms) => ({
  type: GET_ALL_ROOMS,
  rooms,
});
export const addNewRoom = ({ roomId, id, name }) => {
  console.log("add new room redux -", { roomId, id, name });
  return {
    type: ADD_NEW_ROOM,
    roomId,
    id,
    name,
  };
};

// ---------------- REDUCER ----------------
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ROOMS:
      return {
        ...state,
        rooms: action.rooms,
      };
    case ADD_NEW_ROOM:
      return {
        ...state,
        rooms: new Set(state.rooms).add(action.roomId),
        channel: initialChannel(action.roomId, action.id, action.name),
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
