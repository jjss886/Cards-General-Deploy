const router = require("express").Router();
module.exports = router;

// ------------------- VARIABLE SETUP -------------------
const initialChannel = (room) => ({
  room,
  players: [],
  deck: [],
  table: [],
});
const roomObj = { ABCD: initialChannel("ABCD"), XYWZ: initialChannel("XYWZ") };

// ------------------- ROUTES -------------------
router.get("/all-rooms", (req, res, next) => {
  try {
    res.json(roomObj);
  } catch (error) {
    next(error);
  }
});

router.post("/new-room", (req, res, next) => {
  try {
    const { channel } = req.body;

    roomObj[channel] = initialChannel(channel);

    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});
