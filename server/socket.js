let roomObjRef = {};
const allTypes = {
  NEW_ROOM: true,
  CLEAR_ROOM: true,
};

// -------------------- API SERVER FIRST --------------------
const broadcast = (io, type, roomId, roomObj, object) => {
  roomObjRef = roomObj;

  // console.log("BROADCAST ROOM -", io.sockets.adapter.rooms);

  if (allTypes[type]) io.emit(type, roomId, roomObj, object);
  else io.to(roomId).emit(type, roomId, roomObj, object);
};

// -------------------- DIRECT CLIENT SECOND --------------------
const socketFn = (io) => {
  io.on("connection", (socket) => {
    console.log(`SERVER SOCKET CONNECTED: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`${socket.id} SOCKET LEFT DISCONNECTED`);
    });

    socket.on("NEW_ROOM", (roomObj) => {
      socket.join(roomObj.roomId);

      io.to(roomObj.roomId).emit("JOIN_ROOM", roomObj.roomId, roomObjRef);
    });

    socket.on("JOIN_ROOM", (roomObj) => {
      socket.join(roomObj.roomId);

      io.to(roomObj.roomId).emit("JOIN_ROOM", roomObj.roomId, roomObjRef);
    });

    socket.on("ROOM_LOG", () =>
      // console.log("ROOM LOGGING -", Object.keys(socket.rooms))
      console.log("ROOM LOGGING -", io.sockets.adapter.rooms)
    );
  });
};

module.exports = {
  broadcast,
  socketFn,
};

// Wooz Gist 1: https://bit.ly/35ku7cF
// Wooz Gist 2: https://bit.ly/2VRycSP
