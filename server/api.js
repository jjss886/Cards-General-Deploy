const router = require("express").Router();
// const socket = require("./socket");
module.exports = router;

// ------------------- VARIABLE SETUP -------------------
const roomObj = { ABCD: true, XYWZ: true };
const initialChannel = {
  room: "",
  players: [],
  deck: [],
  table: [],
};

// ------------------- ROUTES -------------------
router.get("/all-rooms", (req, res, next) => {
  try {
    // res.json(Object.keys(roomObj));
    res.json(roomObj);
  } catch (error) {
    next(error);
  }
});

router.post("/new-room", (req, res, next) => {
  try {
    roomObj[req.body.channel] = true;
    // socket.emit("new-room", roomObj);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});
