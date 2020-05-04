import io from "socket.io-client";
import history from "./history";
import store, {
  getAllRooms,
  leaveRoom,
  addNewRoom,
  joinRoom,
  removeUser,
  postMsg,
} from "./store";

const socket = io(window.location.origin);

// -------------------- HELPER FUNCTIONS --------------------
const roomState = (roomObj) =>
  Object.keys(roomObj).reduce((a, v) => {
    a[v] = Object.keys(roomObj[v].players);
    return a;
  }, {});

// -------------------- SOCKET ACTIONS --------------------
socket.on("connect", () => {
  console.log("I am now connected to the server!");

  const { dispatch, getState } = store;

  socket.on("NEW_ROOM", (roomId, roomObj) => {
    console.log("New Room Socket -", roomId, roomObj);

    dispatch(addNewRoom(roomId, Object.keys(roomObj[roomId].players)));
  });

  socket.on("JOIN_ROOM", (roomId, roomObj) => {
    const channel = roomObj[roomId];
    console.log("Join Room Socket - ", channel);

    dispatch(joinRoom(roomId, channel, Object.keys(channel.players)));
  });

  socket.on("LEAVE_ROOM", (roomId, roomObj, actionObj) => {
    const rooms = roomState(roomObj);

    dispatch(getAllRooms(rooms));

    const stateUser = getState().user;

    console.log("Leave Room Socket -", roomId, roomObj, actionObj, stateUser);

    if (stateUser === actionObj.name) dispatch(leaveRoom());
    else {
      const channel = roomObj[roomId];

      if (channel) dispatch(removeUser(roomId, channel.players, channel.host));
    }
  });

  socket.on("CLEAR_ROOM", (roomId, roomObj) => {
    const rooms = roomState(roomObj);
    dispatch(getAllRooms(rooms));
    dispatch(leaveRoom());
    history.push("/");
  });

  socket.on("POST_MSG", (roomId, roomObj) => {
    const { messages } = roomObj[roomId];

    dispatch(postMsg(messages));
  });
});

export const roomLog = () => socket.emit("ROOM_LOG");

export default socket;
