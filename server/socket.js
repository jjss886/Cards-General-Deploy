let roomObjRef = {};
const emitAll = {
    NEW_ROOM: true,
    CLEAR_ROOM: true,
    LEAVE_ROOM: true,
  },
  emitSkip = {
    JOIN_ROOM: true,
  };

// -------------------- 1. API SERVER --------------------
const broadcast = (io, type, roomId, roomObj, actionObj) => {
  roomObjRef = roomObj;

  if (emitAll[type]) io.emit(type, roomId, roomObj, actionObj);
  else if (!emitSkip[type])
    io.to(roomId).emit(type, roomId, roomObj, actionObj);
};

// -------------------- 2. DIRECT CLIENT --------------------
const socketFn = (io) => {
  io.on("connection", (socket) => {
    console.log(`SERVER SOCKET CONNECTED: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`${socket.id} SOCKET LEFT DISCONNECTED`);
    });

    socket.on("NEW_ROOM", (roomObj) => {
      const { roomId } = roomObj;
      socket.join(roomId);

      io.to(roomId).emit("JOIN_ROOM", roomId, roomObjRef);
    });

    socket.on("JOIN_ROOM", (roomObj) => {
      const { roomId } = roomObj;
      socket.join(roomId);

      io.to(roomId).emit("JOIN_ROOM", roomId, roomObjRef);
    });

    socket.on("LEAVE_ROOM", (roomObj) => {
      socket.leave(roomObj.roomId);
    });

    socket.on("ROOM_LOG", () => {
      const rooms = io.sockets.adapter.rooms,
        roomsLog = Object.keys(rooms).reduce((a, v) => {
          if (v.length === 4) a[v] = Object.keys(rooms[v].sockets);
          // a[v] = Object.keys(rooms[v].sockets);

          return a;
        }, {});

      // console.log("ROOM LOGGING -", Object.keys(socket.rooms))
      console.log("ROOM LOGGING -", roomsLog);
    });
  });
};

module.exports = {
  broadcast,
  socketFn,
};

// Wooz Gist 1: https://bit.ly/35ku7cF
// Wooz Gist 2: https://bit.ly/2VRycSP
