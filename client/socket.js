import io from "socket.io-client";
import store, { ACaddNewRoom, ACjoinRoom } from "./store";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("I am now connected to the server!", socket);

  const { dispatch, getState } = store;

  socket.on("NEW_ROOM", (roomId, roomObj, object) => {
    console.log("New Room Socket -", roomId, roomObj);
    dispatch(ACaddNewRoom(object));
  });

  socket.on("JOIN_ROOM", (roomId, roomObj) => {
    // console.log("Joined room: ", roomId, roomObj[roomId]);
    console.log("Joined room: ", roomObj[roomId].players);
    dispatch(ACjoinRoom(roomObj[roomId].players));
  });

  socket.on("log", (roomId) => console.log("Log room: ", socket, roomId));
});

export const roomLog = () => socket.emit("ROOM_LOG");

export default socket;
