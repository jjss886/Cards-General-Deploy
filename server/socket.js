const socketio = require("socket.io");

const socketFn = (io) => {
  io.on("connection", (socket) => {
    console.log(`SERVER SOCKET CONNECTED: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`${socket.id} SOCKET LEFT DISCONNECTED`);
    });

    // socket.on("NEW_ROOM", (roomObj) => {
    //   console.log("NEW ROOM SOCKET ?! ", roomObj);
    //   socket.join(roomObj.roomId);
    //   socket.broadcast.emit("NEW_ROOM", roomObj);
    // });

    socket.on("JOIN_ROOM", (roomObj) => {
      socket.join(roomObj.roomId);
      // socket.broadcast.emit("log", roomObj);
      // socket.emit("log", roomObj);
      socket.to(roomObj.roomId).emit("log", roomObj);
      console.log("INSIDE ROUND 2 JOIN ?!", roomObj.roomId, socket.rooms);
    });

    socket.on("ROOM_LOG", () =>
      console.log("ROOM LOGGING -", Object.keys(socket.rooms))
    );
  });
};

const allTypes = {
  NEW_ROOM: true,
};

// IO EMIT LEADS TO ALL CLIENTS SEEING
const broadcast = (io, roomId, type, object, roomObj) => {
  // console.log("BROADCAST -", Object.keys(io), io);
  // console.log("BROADCAST -", io.__proto__);
  if (type in allTypes) io.emit(type, object, roomId, roomObj);
  else io.to(roomId).emit(type, object, roomId, roomObj);

  // console.log("BROADCAST FIRST -", roomId, roomObj);
  // const socket = socketio(io);
  // socket.emit(type, roomId, roomObj, object);
  // socket.emit(type, object, roomObj);
  // socket.emit(type, object);
  // console.log("hmmm -", roomObj);
  // io.on("connection", (socket) => {
  //   console.log("COME ON -", socket.id);
  //   socket.join(roomId);
  // });
  // const room = io.of(`/${roomId}`);
  // room.on("connection", (socket) => console.log("hello -", socket, roomId));
  // room.on("NEW_ROOM", (roomObj) => {
  //   console.log("Hello?! -", roomObj);
  //   room.emit("NEW_ROOM", roomObj);
  // });
  // io.emit("NEW_ROOM", object);
  // room.emit("log", roomId);
  // console.log("hmm -", Object.keys(room));
  // io.of(`/Room/${roomId}`).on("connection", (socket) => {
  //   console.log("hello -", Object.keys(socket), roomId);
  //   socket.on("JOIN_ROOM", (roomId) => {
  //     console.log("UMMM ?! -", roomId);
  //     socket.join(roomId);
  //     socket.emit("log", roomId);
  //   });
  //   socket.emit(type, object);
  // });
};

module.exports = {
  socketFn,
  broadcast,
};

// Wooz Gist 1: https://bit.ly/35ku7cF
// Wooz Gist 2: https://bit.ly/2VRycSP
