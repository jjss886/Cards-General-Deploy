import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddlware from "redux-thunk";
import axios from "axios";
import socket from "./socket";

// --------------------- INITIAL STATE ---------------------
const initialState = { rooms: {}, channel: {} };
const initialChannel = (room, name) => ({
  room,
  players: { [name]: initialPlayer(name) },
  deck: [],
  table: [],
});
const initialPlayer = (name) => ({
  name,
  hand: [],
  points: 0,
});

// --------------------- ACTION TYPES ---------------------
const GET_ALL_ROOMS = "GET_ALL_ROOMS";
const ADD_NEW_ROOM = "ADD_NEW_ROOM";
const JOIN_ROOM = "JOIN_ROOM";

// --------------------- ACTION CREATORS ---------------------
export const getAllRooms = (rooms) => ({
  type: GET_ALL_ROOMS,
  rooms,
});
export const addNewRoom = (roomId) => ({
  type: ADD_NEW_ROOM,
  roomId,
});
export const joinRoom = (channel) => ({
  type: JOIN_ROOM,
  channel,
});

// --------------------- HELPER ---------------------
const allTypes = {
  // NEW_ROOM: true,
};

export const actionSocket = async (roomObj) => {
  const { type } = roomObj;

  await axios.post("/room-action", { action: roomObj });

  if (!allTypes[type]) socket.emit(type, roomObj);
};

// --------------------- THUNKS ---------------------
export const getAllRoomsAPI = () => async (dispatch) => {
  try {
    const { data: roomObj } = await axios.get("/all-rooms");
    dispatch(getAllRooms(roomObj));
  } catch (error) {
    console.error("Redux Error -", error);
  }
};

// --------------------- REDUCER ---------------------
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
        rooms: { ...state.rooms, [action.roomId]: [action.name] },
      };
    case JOIN_ROOM:
      return {
        ...state,
        channel: action.channel,
      };
    default:
      return state;
  }
};

// --------------------- STORE ---------------------
const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  middleware(applyMiddleware(thunkMiddlware))
  // middleware(applyMiddleware(thunkMiddlware, createLogger({ collapsed: true })))
);

export default store;
