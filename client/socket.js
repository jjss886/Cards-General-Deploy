import io from "socket.io-client";
import store, { addNewRoom } from "./store";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("I am now connected to the server!");

  const { dispatch, getState } = store;

  socket.on("NEW_ROOM", (roomObj) => {
    dispatch(addNewRoom(roomObj));
  });
});

export default socket;
