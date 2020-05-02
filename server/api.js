const router = require("express").Router();
const { broadcast } = require("./socket");
// const socketio = require("socket.io");
// const socket = require("socket.io-client")("http://localhost:3000");
// module.exports = router;

let io;
const ioVariable = (x) => (io = x);
module.exports = { router, ioVariable };

// ------------------- VARIABLE SETUP -------------------
const initialChannel = (room, name) => ({
  room,
  players: { [name]: initialPlayer(name) },
  deck: [],
  table: [],
});
const initialPlayer = (name) => ({
  name,
  hand: [],
  points: 0,
});
const roomObj = {
  ABCD: initialChannel("ABCD", "Bob"),
};

// ------------------- HELPER -------------------
const updateRoom = (roomId, action) => {
  switch (action.type) {
    case "NEW_ROOM":
      roomObj[roomId] = initialChannel(roomId, action.name);
      break;

    case "JOIN_ROOM":
      // const targetPlayers = roomObj[roomId].players,
      //   playerId = Math.max(...Object.keys(targetPlayers)) + 1;

      targetPlayers[action.name] = initialPlayer(action.name);
      break;
    default:
      break;
  }

  broadcast(io, action.type, roomId, roomObj, action);
};

// ------------------- ROUTES -------------------
router.get("/all-rooms", (req, res, next) => {
  try {
    const roomState = Object.keys(roomObj).reduce((a, v) => {
      a[v] = Object.keys(roomObj[v].players);
      return a;
    }, {});

    res.json(roomState);
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
