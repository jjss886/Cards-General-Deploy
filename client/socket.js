import io from "socket.io-client";
import store, { getAllRooms, addNewRoom, joinRoom } from "./store";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("I am now connected to the server!", socket);

  const { dispatch, getState } = store;

  socket.on("NEW_ROOM", (roomId, roomObj) => {
    console.log("New Room Socket -", roomId, roomObj);
    // dispatch(addNewRoom(roomId, Object.keys(roomObj[roomId].players)[0]));
    dispatch(addNewRoom(roomId));
  });

  socket.on("JOIN_ROOM", (roomId, roomObj) => {
    console.log("Joined room: ", roomObj[roomId].players);
    dispatch(joinRoom(roomObj[roomId]));
  });

  socket.on("CLEAR_ROOM", (roomId, roomObj) => {
    dispatch(getAllRooms(roomObj));
  });

  socket.on("log", (roomId) => console.log("Log room: ", socket, roomId));
});

export const roomLog = () => socket.emit("ROOM_LOG");

export default socket;
