let roomObjRef = {};
const allTypes = {
  NEW_ROOM: true,
  CLEAR_ROOM: true,
};

// -------------------- API SERVER CALL --------------------
const broadcast = (io, type, roomId, roomObj, object) => {
  // console.log("BROADCAST ROOM -", io.sockets.adapter.rooms);

  roomObjRef = roomObj;

  if (allTypes[type]) io.emit(type, roomId, roomObj, object);
  else io.to(roomId).emit(type, roomId, roomObj, object);
};

// -------------------- DIRECT CLIENT CALL --------------------
const socketFn = (io) => {
  io.on("connection", (socket) => {
    console.log(`SERVER SOCKET CONNECTED: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`${socket.id} SOCKET LEFT DISCONNECTED`);
    });

    socket.on("NEW_ROOM", (roomObj) => {
      socket.join(roomObj.roomId);

      // console.log("NEW ROOM SOCKET -- ", io.sockets.adapter.rooms, roomObjRef);
      io.to(roomObj.roomId).emit("JOIN_ROOM", roomObj.roomId, roomObjRef);
    });

    socket.on("JOIN_ROOM", (roomObj) => {
      socket.join(roomObj.roomId);

      // console.log("JOIN ROOM SOCKET -- ", io.sockets.adapter.rooms, roomObjRef);
      io.to(roomObj.roomId).emit("JOIN_ROOM", roomObj.roomId, roomObjRef);
    });

    socket.on("ROOM_LOG", () =>
      console.log("ROOM LOGGING -", Object.keys(socket.rooms))
    );
  });
};

module.exports = {
  broadcast,
  socketFn,
};

// Wooz Gist 1: https://bit.ly/35ku7cF
// Wooz Gist 2: https://bit.ly/2VRycSP
