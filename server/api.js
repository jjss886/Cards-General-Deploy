const router = require("express").Router();
const { broadcast } = require("./socket");

let io;
const ioVariable = (x) => (io = x);
module.exports = { router, ioVariable };

// ------------------- STATE SETUP -------------------
const initialChannel = (room, name) => ({
  room,
  host: name,
  players: { [name]: initialPlayer(name) },
  livePlayer: "",
  messages: [],
  deck: [],
  table: [],
  trash: [],
});
const initialPlayer = (name) => ({
  name,
  hand: [],
  points: 0,
});
const initialRoom = { ABCD: initialChannel("ABCD", "Bob") };
let roomObj = { ...initialRoom };

// ------------------- VARIABLE TRIGGERS -------------------
const msgLen = 30;

// ------------------- SOCKET REDUCER -------------------
const updateRoom = (roomId, action) => {
  switch (action.type) {
    case "NEW_ROOM":
      {
        roomObj[roomId] = initialChannel(roomId, action.name);
      }
      break;
    case "JOIN_ROOM":
      {
        const curPlayers = roomObj[roomId].players;
        curPlayers[action.name] = initialPlayer(action.name);
      }
      break;
    case "CLEAR_ROOM":
      {
        roomObj = { ...initialRoom };
      }
      break;
    case "LEAVE_ROOM":
      {
        const { name } = action,
          channel = roomObj[roomId],
          curPlayers = channel ? channel.players || [] : [],
          curNames = Object.keys(curPlayers);

        channel.messages = channel.messages
          .slice(1 - msgLen)
          .concat({ name: "", message: `${name} has left the room!` });

        if (curNames.length === 1) delete roomObj[roomId];
        else {
          if (channel.host === name)
            channel.host = curNames.filter((x) => x !== name)[0];

          delete curPlayers[name];
        }
      }
      break;
    case "POST_MSG":
      {
        console.log("posting -", roomObj, roomId);
        const channel = roomObj[roomId];
        channel.messages = channel.messages
          .slice(1 - msgLen)
          .concat({ name: action.name, message: action.message });
      }
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
