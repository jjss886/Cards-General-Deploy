module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log(`Server socket connection made: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`${socket.id} socket left`);
    });

    socket.on("new-room", (room) => {
      console.log("NEW room socket -", room);
      socket.broadcast.emit("new-room", room);
      // io.emit("new-room", room);
    });
  });
};
