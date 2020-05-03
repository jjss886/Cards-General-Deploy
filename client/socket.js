import io from "socket.io-client";
import store, { getAllRooms, addNewRoom, joinRoom } from "./store";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("I am now connected to the server!", socket);

  const { dispatch, getState } = store;

  socket.on("NEW_ROOM", (roomId, roomObj) => {
    console.log("New Room Socket -", roomId, roomObj);
    dispatch(addNewRoom(roomId, Object.keys(roomObj[roomId].players)));
  });

  socket.on("JOIN_ROOM", (roomId, roomObj, name) => {
    console.log("Join Room Socket - ", roomObj[roomId]);
    const channel = roomObj[roomId];
    dispatch(joinRoom(roomId, channel, Object.keys(channel.players), name));
  });

  socket.on("CLEAR_ROOM", (roomId, roomObj) => {
    dispatch(getAllRooms(roomObj));
  });
});

export const roomLog = () => socket.emit("ROOM_LOG");

export default socket;
