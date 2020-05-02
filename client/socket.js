import io from "socket.io-client";
import store, { ACaddNewRoom, ACjoinRoom } from "./store";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("I am now connected to the server!", socket);

  const { dispatch, getState } = store;

  socket.on("NEW_ROOM", (roomObj) => {
    console.log("New Room Socket -", roomObj);
    dispatch(ACaddNewRoom(roomObj));
  });

  socket.on("JOIN_ROOM", (roomId, roomObj) => {
    console.log("Joined room: ", roomId, roomObj[roomId]);
    dispatch(ACjoinRoom(roomObj[roomId].players));
  });

  socket.on("log", (roomId) => console.log("Log room: ", socket, roomId));
});

export const roomLog = () => socket.emit("ROOM_LOG");

export default socket;
