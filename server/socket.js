const socketio = require("socket.io");

const socketFn = (io) => {
  // io.on("connection", (socket) => {
  //   console.log(`SERVER SOCKET CONNECTED: ${socket.id}`);
  //   socket.join("ABCD");
  //   socket.on("disconnect", () => {
  //     console.log(`${socket.id} SOCKET LEFT DISCONNECTED`);
  //   });
  //   socket.on("NEW_ROOM", (roomObj) => {
  //     socket.broadcast.emit("NEW_ROOM", roomObj);
  //   });
  // });
};

const broadcast = (io, roomId, type, object, roomObj) => {
  // const socket = socketio(io);
  // socket.emit(type, object);

  console.log("hmmm -", roomObj);
  // io.on("connection", (socket) => {
  //   console.log("COME ON -", socket.id);
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
  io.of(`/Room/${roomId}`).on("connection", (socket) => {
    console.log("hello -", Object.keys(socket), roomId);

    socket.on("JOIN_ROOM", (roomId) => {
      console.log("UMMM ?! -", roomId);
      socket.join(roomId);
      socket.emit("log", roomId);
    });

    socket.emit(type, object);
  });
};

module.exports = {
  socketFn,
  broadcast,
};

// Wooz Gist 1: https://bit.ly/35ku7cF
// Wooz Gist 2: https://bit.ly/2VRycSP
