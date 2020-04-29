import io from "socket.io-client";
import store from "../store";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("I am now connected to the server!");

  const { dispatch, getState } = store;

  socket.on("new-room", (room) => {
    console.log("NEW room socket -", room);

    // socket.broadcast.emit("new-room", room);
  });
});

export default socket;
