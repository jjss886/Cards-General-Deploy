import io from "socket.io-client";
import store, { addNewRoom } from "../store";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("I am now connected to the server!");

  const { dispatch, getState } = store;

  socket.on("new-room", (room) => {
    console.log("CLIENT room socket -", room);

    dispatch(addNewRoom({ [room]: true }));
  });
});

export default socket;
