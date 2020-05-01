const router = require("express").Router();
const { broadcast } = require("./socket");
// const socketio = require("socket.io");
// const socket = require("socket.io-client")("http://localhost:3000");
// module.exports = router;

let io;
const ioVariable = (x) => (io = x);
module.exports = { router, ioVariable };

// ------------------- VARIABLE SETUP -------------------
const initialChannel = (room, id, name) => ({
  room,
  players: { [id]: initialPlayer(id, name) },
  deck: [],
  table: [],
});
const initialPlayer = (id, name) => ({
  id,
  name,
  hand: [],
  points: 0,
});
const roomObj = {
  ABCD: initialChannel("ABCD", 1, "Bob"),
};

// ------------------- HELPER -------------------
const updateRoom = (roomId, action) => {
  switch (action.type) {
    case "NEW_ROOM":
      roomObj[roomId] = initialChannel(roomId, 1, action.name);
    default:
      break;
  }
  broadcast(io, roomId, action.type, action);
};

// ------------------- ROUTES -------------------
router.get("/all-rooms", (req, res, next) => {
  try {
    res.json(Object.keys(roomObj));
  } catch (error) {
    next(error);
  }
});

router.post("/room-action", (req, res, next) => {
  try {
    const { action } = req.body;
    updateRoom(action.roomId, action);

    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});
