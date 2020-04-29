module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log(`Server socket connection made: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`${socket.id} socket left`);
    });

    socket.on("new-room", (roomObj) => {
      io.emit("new-room", roomObj);
    });
  });
};
