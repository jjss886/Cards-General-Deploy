import io from "socket.io-client";
import store, { addNewRoom } from "./store";

const socket = io(window.location.origin);
// const socket = io("/ABCD");
// const socket = io(window.location.origin + "/Room/ABCD");
// const socket = io(window.location.href);

socket.on("connect", () => {
  console.log("I am now connected to the server!", socket);

  const { dispatch, getState } = store;

  socket.on("NEW_ROOM", (roomObj) => {
    console.log("client socket -", roomObj);
    dispatch(addNewRoom(roomObj));
  });

  socket.on("JOIN_ROOM", (one, two) =>
    console.log("Joined room: ", socket, one, two)
  );

  socket.on("log", (roomId) => console.log("Log room: ", socket, roomId));
});

export const roomLog = () => socket.emit("ROOM_LOG");

export default socket;
