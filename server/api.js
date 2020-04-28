const router = require("express").Router();

module.exports = router;

const roomObj = { ABCD: "test", XYWZ: "test" };

router.get("/all-rooms", (req, res, next) => {
  try {
    res.json(Object.keys(roomObj));
  } catch (error) {
    next(error);
  }
});
