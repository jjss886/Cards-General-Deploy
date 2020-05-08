import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddlware from "redux-thunk";
import axios from "axios";
import socket from "./socket";
import { createDeck } from "./utils/utilities";

// --------------------- INITIAL STATE ---------------------
const initialState = {
  rooms: {},
  channel: {},
  user: "",
  game: "None",
  live: false,
};

// --------------------- ACTION TYPES ---------------------
const RESTORE_STATE = "RESTORE_STATE";
const GET_ALL_ROOMS = "GET_ALL_ROOMS";
const CLEAR_CHANNEL = "CLEAR_CHANNEL";
const SET_USER = "SET_USER";
const ADD_NEW_ROOM = "ADD_NEW_ROOM";
const JOIN_ROOM = "JOIN_ROOM";
const LEAVE_ROOM = "LEAVE_ROOM";
const REMOVE_USER = "REMOVE_USER";
const POST_MSG = "POST_MSG";
const SET_DECK = "SET_DECK";
const DRAW_CARD = "DRAW_CARD";

// --------------------- ACTION CREATORS ---------------------
export const restoreState = (state) => {
  socket.emit("JOIN_ROOM", { roomId: state.channel.room }, true);

  return {
    type: RESTORE_STATE,
    state,
  };
};
export const getAllRooms = (rooms) => ({
  type: GET_ALL_ROOMS,
  rooms,
});
export const clearChannel = () => ({
  type: CLEAR_CHANNEL,
  channel: {},
});
export const setUser = (user) => ({
  type: SET_USER,
  user,
});
export const addNewRoom = (roomId, players) => ({
  type: ADD_NEW_ROOM,
  roomId,
  players,
});
export const joinRoom = (roomId, channel, players) => ({
  type: JOIN_ROOM,
  roomId,
  channel,
  players,
});
export const leaveRoom = () => ({
  type: LEAVE_ROOM,
  user: "",
  channel: {},
});
export const removeUser = (roomId, players, host, messages) => ({
  type: REMOVE_USER,
  roomId,
  players,
  host,
  messages,
});
export const postMsg = (messages) => ({
  type: POST_MSG,
  messages,
});
export const startGame = (deck = createDeck()) => ({
  type: SET_DECK,
  deck,
});
export const drawCard = (name, card) => ({
  type: DRAW_CARD,
  name,
  card,
});

// --------------------- HELPER ---------------------
export const actionSocket = async (roomObj) => {
  const { type } = roomObj;

  await axios.post("/room-action", { action: roomObj });

  socket.emit(type, roomObj);
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
    case RESTORE_STATE:
      return action.state;
    case GET_ALL_ROOMS:
      return { ...state, rooms: action.rooms };
    case CLEAR_CHANNEL:
      return { ...state, channel: action.channel };
    case SET_USER:
      return { ...state, user: action.user };
    case ADD_NEW_ROOM:
      return {
        ...state,
        rooms: { ...state.rooms, [action.roomId]: action.players },
      };
    case JOIN_ROOM:
      return {
        ...state,
        rooms: {
          ...state.rooms,
          [action.roomId]: action.players,
        },
        channel: action.channel,
      };
    case LEAVE_ROOM:
      return { ...state, channel: action.channel, user: action.user };
    case REMOVE_USER:
      return {
        ...state,
        channel: {
          ...state.channel,
          host: action.host,
          players: action.players,
          messages: action.messages,
        },
      };
    case POST_MSG:
      return {
        ...state,
        channel: {
          ...state.channel,
          messages: action.messages,
        },
      };
    case SET_DECK:
      return { ...state, channel: { ...state.channel, deck: action.deck } };
    case DRAW_CARD:
      return {
        ...state,
        channel: {
          ...state.channel,
          deck: state.channel.deck.slice(0, -1),
          players: {
            ...state.channel.players,
            [action.name]: {
              ...state.channel.players[action.name],
              hand: state.channel.players[action.name].hand.concat(action.card),
            },
          },
        },
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
