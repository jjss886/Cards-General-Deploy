// Wooz Gist 1: https://bit.ly/35ku7cF
// Wooz Gist 2: https://bit.ly/2VRycSP

const socketFn = (io) => {
  io.on("connection", (socket) => {
    console.log(`Server socket connection made: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`${socket.id} socket left`);
    });

    socket.on("NEW_ROOM", (roomObj) => {
      socket.broadcast.emit("NEW_ROOM", roomObj);
      // io.emit("new-room", roomObj);
    });
  });
};

const broadcast = (type, object) => {
  socket.emit(type, object);
};

module.exports = {
  socketFn,
  broadcast,
};