const router = require("express").Router();
module.exports = router;

// ------------------- VARIABLE SETUP -------------------
const initialChannel = (room, id, name) => ({
  room,
  players: { id: initialPlayer(id, name) },
  deck: [],
  table: [],
});
const initialPlayer = (id, name) => ({
  id,
  name,
  hand: [],
  points: 0,
});
const roomObj = { ABCD: initialChannel("ABCD"), XYWZ: initialChannel("XYWZ") };

// ------------------- HELPER -------------------
const updateRoom = (roomId, action) => {
  switch (action.type) {
    case "NEW_ROOM":
      roomObj[roomId] = initialChannel(roomId, 1, action.name);
    default:
      break;
  }
};

// ------------------- ROUTES -------------------
router.get("/all-rooms", (req, res, next) => {
  try {
    res.json(roomObj);
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
